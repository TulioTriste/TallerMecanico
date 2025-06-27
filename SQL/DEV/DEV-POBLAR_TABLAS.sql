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


--DELETE FROM [cliente];
INSERT INTO cliente (cliente_rut, nombre, correo, telefono) VALUES
	('12.345.678-9', 'Mauricio Urrutia Chandia', 'correodeprueba@taller.com', '56999999999');


--DELETE FROM [vehiculo];
INSERT INTO vehiculo (patente, cliente_rut, marca, modelo, anio, color) VALUES
	('BBSJ21', '12.345.678-9', 'Citroen', 'C4', 2008, 'Rojo Lucifer');

--DELETE FROM [usuario];
INSERT INTO usuario (usuario_rut,nombre,apellido,correo,password,telefono,direccion,empresa,plan_id) VALUES
	(N'21.389.785-3',N'Sebastián',N'Morales',N'lunaloboez@gmail.com',N'$2b$10$pCDYfQR.1Fh7dCTz1jEAIetWSwwGForI4bQYng.pamkLThsXZWBGC',N'56990855934',N'Cerro el plomo 5260, piso 8',NULL,2),
	(N'21.549.868-9',N'Bastian',N'Ampuero',N'ampuerobastian05@gmail.com',N'$2b$10$KkjOwmpImC5PqStqRirkeuOSfj1KdVpt5IchlgaoQ9G5qi2C5FYSG',N'56972196202',N'los trapenses 0668',NULL,NULL);


--DELETE FROM [taller];
INSERT INTO taller (usuario_rut, nombre, telefono, correo, direccion, inicio_jornada, termino_jornada) VALUES
	('21.389.785-3', 'Taller Centro', '56911111111', 'tallercentro@prueba.com', 'Antonio Varas 666, Santiago', 0900, 1700),
	('21.389.785-3', 'Taller Las Condes', '56922222222', 'tallerlascondes@prueba.com', 'Las Condes 0684, Las Condes', 0900, 1800),
	('21.549.868-9', 'Taller Providencia', '56933333333', 'tallerprovidencia@prueba.com', 'Providencia 1234, Providencia', 1000, 2000);

INSERT INTO empleado (empleado_rut, taller_id, roles_id, nombre, apellido, cel, correo, password) VALUES 
	('55.555.555-K', 1, 2, 'Vicente', 'Fernandez', '56988888888', 'jefesucursal@gmail.com', '@Prueba1234');

--INSERT INTO taller (usuario_rut, nombre, telefono, correo, direccion, inicio_jornada, termino_jornada) VALUES
--	('21.389.785-3', 'Taller Prueba', '56911111111', 'tallerprueba@prueba.com', 'adasdasd, Santiago', 0900, 1700);


--DELETE FROM [cita];
INSERT INTO cita (taller_id, cliente_rut, patente, hora, descripcion) VALUES
	(1, '12.345.678-9', 'BBSJ21', DATEADD(HOUR, 1, GETDATE()), 'Cambio de aceite y revisión general'), -- Hoy
	(1, '12.345.678-9', 'BBSJ21', DATEADD(HOUR, 3, GETDATE()), 'Reparación de frenos'), -- Hoy
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 1, GETDATE()), 'Alineación y balanceo'), -- Mañana
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 1, DATEADD(HOUR, 12, GETDATE())), 'Diagnóstico de encendido'), -- Mañana
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 7, GETDATE()), 'Mantenimiento preventivo 10.000 km'), -- Proxima Semana
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 7, DATEADD(HOUR, 12, GETDATE())), 'Revisión de sistema eléctrico'); -- Proxima Semana
	
--DELETE FROM [ot];
INSERT INTO ot (taller_id, cliente_rut, vehiculo_patente, empleado_rut, fecha_entrada, fecha_salida, descripcion, km, estado_id, precio) VALUES 
	(1, '12.345.678-9', 'BBSJ21', '55.555.555-K', GETDATE(), DATEADD(MONTH, 2, GETDATE()), 'Descripcion de Orden de Trabajo', '160.000', 1, 100000),
	(1, '12.345.678-9', 'BBSJ21', '55.555.555-K', GETDATE(), DATEADD(MONTH, 2, GETDATE()), 'Pruebaaaa', '170.000', 2, 50000),
	(1, '12.345.678-9', 'BBSJ21', '55.555.555-K', DATEADD(DAY, 2, GETDATE()), DATEADD(MONTH, 2, GETDATE()), 'Descripcion de Orden de Trabajo', '160.000', 2, 150000),
	(1, '12.345.678-9', 'BBSJ21', '55.555.555-K', DATEADD(DAY, 3, GETDATE()), DATEADD(MONTH, 2, GETDATE()), 'Descripcion de Orden de Trabajo', '160.000', 2, 200000),
	(1, '12.345.678-9', 'BBSJ21', '55.555.555-K', DATEADD(DAY, 5, GETDATE()), DATEADD(MONTH, 2, GETDATE()), 'Descripcion de Orden de Trabajo', '160.000', 2, 250000),
	(1, '12.345.678-9', 'BBSJ21', '55.555.555-K', DATEADD(DAY, 8, GETDATE()), DATEADD(MONTH, 2, GETDATE()), 'Descripcion de Orden de Trabajo', '160.000', 3, 300000),
	(1, '12.345.678-9', 'BBSJ21', '55.555.555-K', DATEADD(DAY, 16, GETDATE()), DATEADD(MONTH, 2, GETDATE()), 'Descripcion de Orden de Trabajo', '160.000', 3, 500000);