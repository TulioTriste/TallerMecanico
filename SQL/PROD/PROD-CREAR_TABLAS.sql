/* Query Completa de creación de tablas */
DROP TABLE IF EXISTS [password_reset_tokens];
DROP TABLE IF EXISTS [ot_estado_historial];
DROP TABLE IF EXISTS [ot_tareas];
DROP TABLE IF EXISTS [ot];
DROP TABLE IF EXISTS [cita];
DROP TABLE IF EXISTS [empleado];
DROP TABLE IF EXISTS [vehiculo];
DROP TABLE IF EXISTS [alertas];
DROP TABLE IF EXISTS [taller];
DROP TABLE IF EXISTS [usuario];
DROP TABLE IF EXISTS [roles];
DROP TABLE IF EXISTS [plan];
DROP TABLE IF EXISTS [estado];
DROP TABLE IF EXISTS [cliente];

CREATE TABLE [estado] (
    [estado_id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(120),
    [descripcion] VARCHAR(250),
    CONSTRAINT [PK_estado] PRIMARY KEY CLUSTERED ([estado_id] ASC)
    );

CREATE TABLE [cliente] (
    [cliente_rut] VARCHAR(12) NOT NULL,
    [nombre] VARCHAR(255) NOT NULL,
    [correo] VARCHAR(250),
    [telefono] VARCHAR(12) NOT NULL,
    [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_cliente] PRIMARY KEY CLUSTERED ([cliente_rut] ASC)
    );

CREATE TABLE [vehiculo] (
    [patente] VARCHAR(8) NOT NULL,
    [cliente_rut] VARCHAR(12) NOT NULL,
    [marca] VARCHAR(120) NOT NULL,
    [modelo] VARCHAR(120) NOT NULL,
    [anio] INT NOT NULL,
    [color] VARCHAR(120) NOT NULL,
    [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_vehiculo] PRIMARY KEY CLUSTERED ([patente] ASC),
    CONSTRAINT [FK_vehiculo_cliente] FOREIGN KEY ([cliente_rut]) REFERENCES [cliente]([cliente_rut])
    ON DELETE NO ACTION
    );

CREATE TABLE [plan] (
    [plan_id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(250) NOT NULL,
    [precio] INT NOT NULL,
    [talleres] INT NOT NULL,
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
    [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
    [empresa] CHAR(1),
    [plan_id] INT,
    CONSTRAINT [PK_usuario] PRIMARY KEY CLUSTERED ([usuario_rut] ASC),
    CONSTRAINT [FK_usuario_plan] FOREIGN KEY ([plan_id]) REFERENCES [plan]([plan_id])
    ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE [roles] (
    [roles_id] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(250) NOT NULL,
    [descripcion] VARCHAR(250),
    CONSTRAINT [PK_roles] PRIMARY KEY CLUSTERED ([roles_id] ASC)
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
    [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_taller] PRIMARY KEY CLUSTERED ([taller_id] ASC),
    CONSTRAINT [FK_taller_usuario] FOREIGN KEY ([usuario_rut]) REFERENCES [usuario]([usuario_rut])
    ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE [empleado] (
    [empleado_rut] VARCHAR(12) NOT NULL,
    [taller_id] INT NOT NULL,
    [roles_id] INT NOT NULL,
    [nombre] VARCHAR(120) NOT NULL,
    [apellido] VARCHAR(120),
    [cel] VARCHAR(12),
    [correo] VARCHAR(250) NOT NULL,
    [password] VARCHAR(255) NOT NULL,
    [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_empleado] PRIMARY KEY CLUSTERED ([empleado_rut] ASC),
    CONSTRAINT [FK_empleado_taller] FOREIGN KEY ([taller_id]) REFERENCES [taller]([taller_id])
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT [FK_empleado_roles] FOREIGN KEY ([roles_id]) REFERENCES [roles]([roles_id])
    ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE [ot] (
    [ot_id] INT NOT NULL IDENTITY(1,1),
    [cliente_rut] VARCHAR(12) NOT NULL,
    [taller_id] INT NOT NULL,
    [vehiculo_patente] VARCHAR(8) NOT NULL,
    [empleado_rut] VARCHAR(12) NOT NULL,
    [fecha_entrada] DATETIME NOT NULL DEFAULT GETDATE(),
    [fecha_salida] DATETIME NOT NULL,
    [descripcion] VARCHAR(500),
    [km] VARCHAR(10) NOT NULL,
    [estado_id] INT NOT NULL,
    [precio] INT NOT NULL,
    [uniqueId] VARCHAR(255) NOT NULL,
    [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_ot] PRIMARY KEY CLUSTERED ([ot_id] ASC),
    CONSTRAINT [FK_ot_cliente] FOREIGN KEY ([cliente_rut]) REFERENCES [cliente]([cliente_rut])
    ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT [FK_ot_vehiculo] FOREIGN KEY ([vehiculo_patente]) REFERENCES [vehiculo]([patente])
    ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT [FK_ot_estado] FOREIGN KEY ([estado_id]) REFERENCES [estado]([estado_id])
    ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT [FK_ot_empleado] FOREIGN KEY ([empleado_rut]) REFERENCES [empleado]([empleado_rut]),
    CONSTRAINT [FK_ot_taller] FOREIGN KEY ([taller_id]) REFERENCES [taller]([taller_id])
    ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE [ot_tareas] (
    [tarea_id] INT NOT NULL IDENTITY(1,1),
    [ot_id] INT NOT NULL,
    [titulo] VARCHAR(50) NOT NULL,
    [descripcion] VARCHAR(500) NOT NULL,
    [ruta_imagenes] NVARCHAR(MAX),
    [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_ot_tareas] PRIMARY KEY CLUSTERED ([tarea_id] ASC),
    CONSTRAINT [FK_ot_tareas_ot] FOREIGN KEY ([ot_id]) REFERENCES [ot]([ot_id])
    ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE [ot_estado_historial] (
    [historial_id] INT NOT NULL IDENTITY(1,1),
    [ot_id] INT NOT NULL,
    [estado_anterior_id] INT,
    [estado_nuevo_id] INT NOT NULL,
    [empleado_rut] VARCHAR(12) NOT NULL,
    [fecha_cambio] DATETIME NOT NULL DEFAULT GETDATE(),
    [comentario] VARCHAR(500),
    CONSTRAINT [PK_ot_estado_historial] PRIMARY KEY CLUSTERED ([historial_id] ASC),
    CONSTRAINT [FK_historial_ot] FOREIGN KEY ([ot_id]) REFERENCES [ot]([ot_id])
    ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT [FK_historial_estado_anterior] FOREIGN KEY ([estado_anterior_id]) REFERENCES [estado]([estado_id]),
    CONSTRAINT [FK_historial_estado_nuevo] FOREIGN KEY ([estado_nuevo_id]) REFERENCES [estado]([estado_id])
    );


CREATE TABLE [cita] (
    [cita_id] INT NOT NULL IDENTITY(1, 1),
    [taller_id] INT NOT NULL,
    [cliente_rut] VARCHAR(12) NOT NULL,
    [patente] VARCHAR(8) NOT NULL,
    [hora] DATETIME NOT NULL,
    [descripcion] VARCHAR(250),
    [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_cita] PRIMARY KEY CLUSTERED ([cita_id] ASC),
    CONSTRAINT [FK_cita_cliente] FOREIGN KEY ([cliente_rut]) REFERENCES [cliente]([cliente_rut])
    ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT [FK_cita_vehiculo] FOREIGN KEY ([patente]) REFERENCES [vehiculo]([patente])
    ON UPDATE CASCADE ON DELETE NO ACTION,
    CONSTRAINT [FK_cita_taller] FOREIGN KEY ([taller_id]) REFERENCES [taller]([taller_id])
    ON UPDATE CASCADE ON DELETE CASCADE
    );

CREATE TABLE [password_reset_tokens] (
    [usuario_rut] VARCHAR(13) NOT NULL,
    [token] VARCHAR(255) NOT NULL,
    [expires_at] DATETIME NOT NULL,
    [created_at] DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_token] PRIMARY KEY CLUSTERED ([token] ASC),
    CONSTRAINT [FK_PRT_usuario_rut] FOREIGN KEY ([usuario_rut]) REFERENCES [usuario]([usuario_rut])
    );

CREATE TABLE [alertas] (
    [alerta_id] INT NOT NULL IDENTITY(1,1),
    [tipo] VARCHAR(50) NOT NULL,
    [descricion] VARCHAR(500) NOT NULL,
    [taller_id] INT NOT NULL,
    [created_at] DATETIME NOT NULL,
    CONSTRAINT [PK_alerta_id] PRIMARY KEY CLUSTERED ([alerta_id] ASC),
    FOREIGN KEY ([taller_id]) REFERENCES [taller]([taller_id])
    );