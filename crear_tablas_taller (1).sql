SELECT * FROM taller;
/* Data de Taller para pruebas */
INSERT INTO taller (usuario_rut, nombre, telefono, correo, direccion, inicio_jornada, termino_jornada) VALUES
	('21.389.785-3', 'Taller Centro', '56911111111', 'tallercentro@prueba.com', 'Antonio Varas 666, Santiago', 0900, 1700),
	('21.389.785-3', 'Taller Las Condes', '56922222222', 'tallerlascondes@prueba.com', 'Las Condes 0684, Las Condes', 0900, 1800),
	('21.549.868-9', 'Taller Providencia', '56933333333', 'tallerprovidencia@prueba.com', 'Providencia 1234, Providencia', 1000, 2000);


SELECT * FROM taller WHERE taller.usuario_rut = '21.389.785-3';

DELETE FROM cita;
INSERT INTO cita (taller_id, cliente_rut, patente, hora, descripcion) VALUES
	(1, '12.345.678-9', 'BBSJ21', DATEADD(HOUR, 1, GETDATE()), 'Cambio de aceite y revisión general'), -- Hoy
	(1, '12.345.678-9', 'BBSJ21', DATEADD(HOUR, 3, GETDATE()), 'Reparación de frenos'), -- Hoy
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 1, GETDATE()), 'Alineación y balanceo'), -- Mañana
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 1, DATEADD(HOUR, 12, GETDATE())), 'Diagnóstico de encendido'), -- Mañana
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 7, GETDATE()), 'Mantenimiento preventivo 10.000 km'), -- Proxima Semana
	(1, '12.345.678-9', 'BBSJ21', DATEADD(DAY, 7, DATEADD(HOUR, 12, GETDATE())), 'Revisión de sistema eléctrico'); -- Proxima Semana

SELECT TOP 1
                        c.cliente_rut,
                        cl.nombre + ' ' + cl.apaterno AS nombre_cliente,
                        c.patente,
                        v.marca,
                        v.modelo,
                        c.hora,
                        c.descripcion
                    FROM 
                        cita c
                        INNER JOIN cliente cl ON c.cliente_rut = cl.cliente_rut
                        INNER JOIN vehiculo v ON c.patente = v.patente
                    WHERE 
                        c.hora > GETDATE()
                        AND c.taller_id = 1
                    ORDER BY 
                        c.hora ASC


SELECT * FROM [plan] p ;
/* Insert de los planes OFICIAL */
INSERT INTO [plan] (nombre, precio, perfiles) VALUES 
		('Basico', 30000, 0),
		('Enterprise', 100000, 0),
		('Company', 250000, 0);


SELECT * FROM cliente c ;
INSERT INTO cliente (cliente_rut, nombre, apaterno, amaterno, correo, telefono) VALUES
		('12.345.678-9', 'Mauricio', 'Urrutia', 'Chandia', 'correodeprueba@taller.com', '56999999999');


SELECT * FROM vehiculo v ;
INSERT INTO vehiculo (patente, cliente_rut, marca, modelo, color, km) VALUES
		('BBSJ21', '12.345.678-9', 'Citroen', 'C4', 'Rojo Lucifer', '160.000');

SELECT COUNT(*) AS total FROM cliente

/* Data de usuarios Administradores para Pruebas */
SELECT * FROM usuario u;
INSERT INTO usuario (usuario_rut,nombre,apellido,correo,password,telefono,direccion,empresa,plan_id) VALUES
	 (N'21.389.785-3',N'Sebastián',N'Morales',N'lunaloboez@gmail.com',N'$2b$10$pCDYfQR.1Fh7dCTz1jEAIetWSwwGForI4bQYng.pamkLThsXZWBGC',N'56990855934',N'Cerro el plomo 5260, piso 8',NULL,NULL),
	 (N'21.549.868-9',N'Bastian',N'Ampuero',N'ampuerobastian05@gmail.com',N'$2b$10$KkjOwmpImC5PqStqRirkeuOSfj1KdVpt5IchlgaoQ9G5qi2C5FYSG',N'56972196202',N'los trapenses 0668',NULL,NULL);



/* Query Completa de creación de tablas */
DROP TABLE IF EXISTS [cotizacion];
DROP TABLE IF EXISTS [ot];
DROP TABLE IF EXISTS [empleado];
DROP TABLE IF EXISTS [vehiculo];
DROP TABLE IF EXISTS [cliente];
DROP TABLE IF EXISTS [taller];
DROP TABLE IF EXISTS [usuario];
DROP TABLE IF EXISTS [roles];
DROP TABLE IF EXISTS [plan];
DROP TABLE IF EXISTS [estado];
DROP TABLE IF EXISTS [usuarios];
DROP TABLE IF EXISTS [cliente];
DROP TABLE IF EXISTS [cita]


CREATE TABLE [cliente] (
    [cliente_rut] VARCHAR(12) NOT NULL,
    [nombre] VARCHAR(120) NOT NULL,
    [apaterno] VARCHAR(120) NOT NULL,
    [amaterno] VARCHAR(120),
    [correo] VARCHAR(250),
    [telefono] VARCHAR(12) NOT NULL,
    CONSTRAINT [PK_cliente] PRIMARY KEY CLUSTERED ([cliente_rut] ASC)
);

CREATE TABLE [vehiculo] (
    [patente] VARCHAR(8) NOT NULL,
    [cliente_rut] VARCHAR(12) NOT NULL,
    [marca] VARCHAR(120) NOT NULL,
    [modelo] VARCHAR(120) NOT NULL,
    [color] VARCHAR(120) NOT NULL,
    [km] VARCHAR(10),
    CONSTRAINT [PK_vehiculo] PRIMARY KEY CLUSTERED ([patente] ASC),
    CONSTRAINT [FK_vehiculo_cliente] FOREIGN KEY ([cliente_rut]) REFERENCES [cliente]([cliente_rut])
    ON DELETE NO ACTION
);

CREATE TABLE [estado] (
    [estado_id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(120),
    [descripcion] VARCHAR(250),
    CONSTRAINT [PK_estado] PRIMARY KEY CLUSTERED ([estado_id] ASC)
);

CREATE TABLE [ot] (
    [ot_id] INT NOT NULL IDENTITY(1,1),
    [taller_id] INT NOT NULL,
    [vehiculo_patente] VARCHAR(8) NOT NULL,
    [fecha_entrada] DATE NOT NULL,
    [fecha_salida] DATE NOT NULL,
    [descripcion] VARCHAR(250),
    [km] VARCHAR(10) NOT NULL,
    [estado_id] INT NOT NULL,
    CONSTRAINT [PK_ot] PRIMARY KEY CLUSTERED ([ot_id] ASC),
    CONSTRAINT [FK_ot_vehiculo] FOREIGN KEY ([vehiculo_patente]) REFERENCES [vehiculo]([patente])
        ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT [FK_ot_estado] FOREIGN KEY ([estado_id]) REFERENCES [estado]([estado_id])
        ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE [cotizacion] (
    [cotizacion_id] INT NOT NULL IDENTITY(1,1),
    [ot_id] INT NOT NULL,
    [precio] INT NOT NULL,
    CONSTRAINT [PK_cotizacion] PRIMARY KEY CLUSTERED ([cotizacion_id] ASC),
    CONSTRAINT [FK_cotizacion_ot] FOREIGN KEY ([ot_id]) REFERENCES [ot]([ot_id])
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE [roles] (
    [roles_id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(250) NOT NULL,
    [descripcion] VARCHAR(250),
    CONSTRAINT [PK_roles] PRIMARY KEY CLUSTERED ([roles_id] ASC)
);

CREATE TABLE [plan] (
    [plan_id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(250) NOT NULL,
    [precio] INT NOT NULL,
    [perfiles] INT NOT NULL,
    CONSTRAINT [PK_plan] PRIMARY KEY NONCLUSTERED ([plan_id] ASC)
);

CREATE TABLE [usuario] (
    [usuario_rut] VARCHAR(13) NOT NULL,
    [nombre] VARCHAR(60) NOT NULL,
    [apellido] VARCHAR(60),
    [correo] VARCHAR(60) NOT NULL,
    [password] VARCHAR(60) NOT NULL,
    [telefono] VARCHAR(12) NOT NULL,
    [direccion] VARCHAR(255) NOT NULL,
    [empresa] CHAR(1),
    [plan_id] INT,
    CONSTRAINT [PK_usuario] PRIMARY KEY CLUSTERED ([usuario_rut] ASC),
    CONSTRAINT [FK_usuario_plan] FOREIGN KEY ([plan_id]) REFERENCES [plan]([plan_id])
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE [taller] (
    [taller_id] INT NOT NULL IDENTITY(1,1),
    [usuario_rut] VARCHAR(13) NOT NULL,
    [nombre] VARCHAR(250) NOT NULL,
    [telefono] VARCHAR(12) NOT NULL,
    [correo] VARCHAR(120),
    [direccion] VARCHAR(250) NOT NULL,
    [inicio_jornada] INT NOT NULL, /* El formato para esto debe de ser por ejemplo 1700, lo cual significaría que serían las 5 PM */
    [termino_jornada] INT NOT NULL,
    CONSTRAINT [PK_taller] PRIMARY KEY CLUSTERED ([taller_id] ASC),
    CONSTRAINT [FK_taller_usuario] FOREIGN KEY ([usuario_rut]) REFERENCES [usuario]([usuario_rut])
        ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE [cita] (
	[taller_id] INT NOT NULL,
	[cliente_rut] VARCHAR(12) NOT NULL,
	[patente] VARCHAR(8) NOT NULL,
	[hora] DATETIME NOT NULL,
	[descripcion] VARCHAR(250),
	CONSTRAINT [PK_cita] PRIMARY KEY CLUSTERED ([cliente_rut], [patente], [hora]),
    CONSTRAINT [FK_cita_cliente] FOREIGN KEY ([cliente_rut]) REFERENCES [cliente]([cliente_rut])
        ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT [FK_cita_vehiculo] FOREIGN KEY ([patente]) REFERENCES [vehiculo]([patente])
        ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT [FK_cita_taller] FOREIGN KEY ([taller_id]) REFERENCES [taller]([taller_id])
        ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE [empleado] (
    [empleado_rut] VARCHAR(12) NOT NULL,
    [taller_id] INT NOT NULL,
    [roles_id] INT NOT NULL,
    [nombre] VARCHAR(120) NOT NULL,
    [apellido] VARCHAR(120),
    [cel] VARCHAR(12),
    [correo] VARCHAR(250) NOT NULL,
    [password] VARCHAR(60) NOT NULL,
    CONSTRAINT [PK_empleado] PRIMARY KEY CLUSTERED ([empleado_rut] ASC),
    CONSTRAINT [FK_empleado_taller] FOREIGN KEY ([taller_id]) REFERENCES [taller]([taller_id])
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT [FK_empleado_roles] FOREIGN KEY ([roles_id]) REFERENCES [roles]([roles_id])
        ON UPDATE CASCADE ON DELETE CASCADE
);