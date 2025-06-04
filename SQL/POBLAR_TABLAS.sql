INSERT INTO [plan] (nombre, precio, perfiles) VALUES 
	('Basico', 30000, 0),
	('Enterprise', 100000, 0),
	('Company', 250000, 0);


INSERT INTO [estado] (estado_id, nombre, descripcion) VALUES
	(1, 'Pendiente', ''),
	(2, 'Ingresada', ''),
	(3, 'Terminada', '');


INSERT INTO usuario (usuario_rut,nombre,apellido,correo,password,telefono,direccion,empresa,plan_id) VALUES
	(N'21.389.785-3',N'Sebastián',N'Morales',N'lunaloboez@gmail.com',N'$2b$10$pCDYfQR.1Fh7dCTz1jEAIetWSwwGForI4bQYng.pamkLThsXZWBGC',N'56990855934',N'Cerro el plomo 5260, piso 8',NULL,NULL),
	(N'21.549.868-9',N'Bastian',N'Ampuero',N'ampuerobastian05@gmail.com',N'$2b$10$KkjOwmpImC5PqStqRirkeuOSfj1KdVpt5IchlgaoQ9G5qi2C5FYSG',N'56972196202',N'los trapenses 0668',NULL,NULL);


INSERT INTO taller (usuario_rut, nombre, telefono, correo, direccion, inicio_jornada, termino_jornada) VALUES
	('21.389.785-3', 'Taller Centro', '56911111111', 'tallercentro@prueba.com', 'Antonio Varas 666, Santiago', 0900, 1700),
	('21.389.785-3', 'Taller Las Condes', '56922222222', 'tallerlascondes@prueba.com', 'Las Condes 0684, Las Condes', 0900, 1800),
	('21.549.868-9', 'Taller Providencia', '56933333333', 'tallerprovidencia@prueba.com', 'Providencia 1234, Providencia', 1000, 2000);


--INSERT INTO taller (usuario_rut, nombre, telefono, correo, direccion, inicio_jornada, termino_jornada) VALUES
--	('21.389.785-3', 'Taller Prueba', '56911111111', 'tallerprueba@prueba.com', 'adasdasd, Santiago', 0900, 1700);


INSERT INTO cliente (cliente_rut, nombre, apaterno, amaterno, correo, telefono) VALUES
	('12.345.678-9', 'Mauricio', 'Urrutia', 'Chandia', 'correodeprueba@taller.com', '56999999999');


INSERT INTO vehiculo (patente, cliente_rut, marca, modelo, color) VALUES
	('BBSJ21', '12.345.678-9', 'Citroen', 'C4', 'Rojo Lucifer');


--DELETE FROM cita;
INSERT INTO cita (taller_id, cliente_rut, patente, hora, descripcion) VALUES
	(1, '12.345.678-9', 'BBSJ21', DATEADD(HOUR, 1, GETDATE()), 'Cambio de aceite y revisión general'), -- Hoy
	(1, '12.345.678-9', 'BBSJ21', DATEADD(HOUR, 3, GETDATE()), 'Reparación de frenos'), -- Hoy
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 1, GETDATE()), 'Alineación y balanceo'), -- Mañana
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 1, DATEADD(HOUR, 12, GETDATE())), 'Diagnóstico de encendido'), -- Mañana
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 7, GETDATE()), 'Mantenimiento preventivo 10.000 km'), -- Proxima Semana
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 7, DATEADD(HOUR, 12, GETDATE())), 'Revisión de sistema eléctrico'); -- Proxima Semana
	
INSERT INTO ot (taller_id, vehiculo_patente, fecha_entrada, descripcion, km, estado_id) VALUES 
	(1, 'BBSJ21', GETDATE(), 'Descripcion de Orden de Trabajo', '160.000', 1),
	(1, 'BBSJ21', GETDATE(), 'Pruebaaaa', '170.000', 2);