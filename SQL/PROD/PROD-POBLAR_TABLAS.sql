DROP TRIGGER [trg_registrar_cambio_estado];

CREATE TRIGGER [trg_registrar_cambio_estado]
ON [ot]
AFTER UPDATE
AS
BEGIN
    -- Solo proceder si el estado ha cambiado
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
            i.empleado_rut, -- Asumiendo que el empleado que actualiza la OT es quien realiza el cambio
            GETDATE(),
            'Cambio de estado automático'
        FROM
            inserted i
            INNER JOIN deleted d ON i.ot_id = d.ot_id
        WHERE
            i.estado_id <> d.estado_id;
    END
END;

--DELETE FROM [plan];
INSERT INTO [plan] (nombre, precio, talleres) VALUES 
	('Basico', 30000, 1),
	('Enterprise', 100000, 5),
	('Company', 250000, 15);


--DELETE FROM [estado];
INSERT INTO [estado] (nombre, descripcion) VALUES
	('Pendiente', ''),
	('Ingresada', ''),
	('Terminada', '');

--DELETE FROM [roles];
INSERT INTO [roles] (nombre, descripcion) VALUES
	('Administrador', ''),
	('Jefe de Sucursal', ''),
	('Mecanico', ''),
	('Practicante', '');