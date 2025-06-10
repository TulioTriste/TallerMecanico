import { connectToDatabase } from "../bd.js";
import sql from "mssql";

class PassModel {
    async createRequestReset(data) {
        try {
            const pool = await connectToDatabase();
            const request = pool.request();

            request
                .input("usuario_rut", sql.VarChar, data.usuario_rut)
                .input("token", sql.VarChar, data.token)
                .input("expires_at", sql.DateTime, data.expires_at);

            const result = await request.query(`
                MERGE password_reset_tokens AS target
                USING (SELECT @usuario_rut AS usuario_rut) AS source
                ON (target.usuario_rut = source.usuario_rut)
                WHEN MATCHED THEN
                    UPDATE SET token = @token, expires_at = @expires_at
                WHEN NOT MATCHED THEN
                    INSERT (usuario_rut, token, expires_at)
                    VALUES (@usuario_rut, @token, @expires_at);
            `);

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error creating password reset request:", error);
            throw error;
        }
    }

    async getRequestResetByToken(token) {
        try {
            const pool = await connectToDatabase();
            const request = pool.request();

            request.input("token", sql.VarChar, token);

            const result = await request.query(`
                SELECT *
                FROM password_reset_tokens
                WHERE token = @token;
            `);

            return result.recordset[0] || null;
        } catch (error) {
            console.error("Error retrieving password reset request by token:", error);
            throw error;
        }
    }

    async updatePasswordUser(rut, newPassword) {
        try {
            const pool = await connectToDatabase();
            const request = pool.request();

            request
                .input("usuario_rut", sql.VarChar, rut)
                .input("new_password", sql.VarChar, newPassword);

            const result = await request.query(`
                UPDATE usuario
                SET password = @new_password
                WHERE usuario_rut = @usuario_rut;
            `);

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error updating user password:", error);
            throw error;
        }
    }

    async deleteRequestByToken(token) {
        try {
            const pool = await connectToDatabase();
            const request = pool.request();

            request.input("token", sql.VarChar, token);

            const result = await request.query(`
                DELETE FROM password_reset_tokens
                WHERE token = @token;
            `);

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Error deleting password reset request by token:", error);
            throw error;
        }
    }
}

export default new PassModel;