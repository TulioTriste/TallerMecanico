
DROP TRIGGER IF EXISTS [trg_registrar_cambio_estado];
GO

CREATE TRIGGER [trg_registrar_cambio_estado]
    ON [ot]
    AFTER UPDATE
    AS
BEGIN
    IF UPDATE(estado_id)
        BEGIN
            INSERT INTO [ot_estado_historial] (
                [ot_id],
                [estado_anterior_id],
                [estado_nuevo_id],
                [empleado_rut],
                [fecha_cambio],
                [comentario]
            )
            SELECT
                i.ot_id,
                d.estado_id,  -- Estado anterior
                i.estado_id,  -- Estado nuevo
                i.empleado_rut,
                GETDATE(),
                'Cambio de estado automático'
            FROM
                inserted i
                    INNER JOIN deleted d ON i.ot_id = d.ot_id
            WHERE
                i.estado_id <> d.estado_id;
        END
END;
GO

DROP TRIGGER IF EXISTS [trg_UpsertCliente];
GO

CREATE TRIGGER [trg_UpsertCliente]
    ON [cliente]
    INSTEAD OF INSERT
    AS
BEGIN
    MERGE [cliente] AS target
    USING (SELECT * FROM inserted) AS source
    ON target.cliente_rut = source.cliente_rut
    WHEN MATCHED THEN
        UPDATE SET
                   nombre = source.nombre,
                   correo = source.correo,
                   telefono = source.telefono
    WHEN NOT MATCHED THEN
        INSERT (cliente_rut, nombre, correo, telefono)
        VALUES (source.cliente_rut, source.nombre, source.correo, source.telefono);
END
GO

DROP TRIGGER IF EXISTS [trg_UpsertVehiculo];
GO

CREATE TRIGGER [trg_UpsertVehiculo]
    ON [vehiculo]
    INSTEAD OF INSERT
    AS
BEGIN
    MERGE [vehiculo] AS target
    USING (SELECT * FROM inserted) AS source
    ON target.patente = source.patente
    WHEN MATCHED THEN
        UPDATE SET
                   cliente_rut = source.cliente_rut,
                   marca = source.marca,
                   modelo = source.modelo,
                   anio = source.anio,
                   color = source.color
    WHEN NOT MATCHED THEN
        INSERT (patente, cliente_rut, marca, modelo, anio, color, created_at)
        VALUES (source.patente, source.cliente_rut, source.marca, source.modelo, source.anio, source.color, source.created_at);
END
GO

CREATE INDEX idx_empleado_correo ON empleado(correo)
GO

CREATE INDEX idx_usuario_correo ON usuario(correo)
GO

CREATE INDEX idx_ot_estado ON ot(estado_id)
GO

-- Inserción de datos en las tablas
INSERT INTO [plan] (nombre, precio, talleres) VALUES
                                                  ('Basico', 30000, 1),
                                                  ('Enterprise', 100000, 5),
                                                  ('Company', 250000, 15);
GO

INSERT INTO [estado] (nombre, descripcion) VALUES
                                               ('Pendiente', ''),
                                               ('Ingresada', ''),
                                               ('Terminada', '');
GO

INSERT INTO [roles] (nombre, descripcion) VALUES
                                              ('Administrador', ''),
                                              ('Jefe de Sucursal', ''),
                                              ('Mecanico', ''),
                                              ('Practicante', '');
GO