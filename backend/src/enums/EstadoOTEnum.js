class EstadoOTEnum {
    constructor() {
        this.tableName = "estado";
        this.values = new Map();
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        try {
            const connection = await mysql2.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            });

            const [rows] = await connection.execute(
                `SELECT estado_id, nombre, descripcion FROM ${this.tableName}`
            );

            rows.forEach(row => {
                this.values.set(row.estado_id, {
                    codigo: row.codigo,
                    nombre: row.nombre,
                    descripcion: row.descripcion
                });
            });

            await connection.end();
            this.initialized = true;
        } catch (error) {
            console.error(`Error al cargar enum desde ${this.tableName}:`, error);
            throw error;
        }

    }

    async getValue(codigo) {
        if (!this.initialized) await this.initialize();
        return this.values.get(codigo);
    }

    async getAllValues() {
        if (!this.initialized) await this.initialize();
        return Array.from(this.values.values());
    }

    async isValid(codigo) {
        if (!this.initialized) await this.initialize();
        return this.values.has(codigo);
    }
}