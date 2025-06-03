import { connectToDatabase } from "../bd.js";

class ControlPanelModel {
    async getCountRegisteredVehicles() {
        try {
            const pool = await connectToDatabase();
            const result = await pool.request().query("SELECT COUNT(*) AS total FROM vehiculo");
            return result.recordset[0].total; // Devuelve el total de vehículos registrados
        } catch (error) {
            console.error("Error al obtener el conteo de vehículos registrados:", error);
            throw error;
        }
    }
}

export default new ControlPanelModel();