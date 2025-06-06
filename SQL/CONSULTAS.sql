SELECT * FROM taller;

SELECT * FROM taller WHERE taller.usuario_rut = '21.389.785-3';


SELECT 
                    plan_id
                FROM 
                    usuario
                WHERE usuario_rut = '21.389.785-3';

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
        c.hora ASC;
      
SELECT * FROM cita c ;
        
SELECT 
        c.cita_id,
        c.cliente_rut,
        cl.nombre + ' ' + cl.apaterno AS nombre_cliente,
        c.patente,
        v.marca + ' ' + v.modelo + ' ' + CAST(v.anio AS VARCHAR(5)) AS nombre_vehiculo,
        c.hora,
        c.descripcion
    FROM 
        cita c
        INNER JOIN cliente cl ON c.cliente_rut = cl.cliente_rut
        INNER JOIN vehiculo v ON c.patente = v.patente
    WHERE 
        CAST(c.hora AS DATE) = CAST(GETDATE() AS DATE)
        AND c.taller_id = 1
    ORDER BY 
        c.hora ASC;


SELECT * FROM [plan] p ;


SELECT * FROM cliente c ;
SELECT nombre + ' ' + apaterno nombre FROM cliente WHERE cliente_rut = '12.345.678-9';


SELECT * FROM vehiculo v ;
SELECT 
		(marca + ' ' + modelo + ' ' + CAST(anio as VARCHAR(5))) nombre 
	FROM 
		vehiculo v
	WHERE v.patente = 'BBSJ21';

SELECT COUNT(*) AS total FROM cliente

/* Data de usuarios Administradores para Pruebas */
SELECT * FROM usuario u;

SELECT * FROM cotizacion c ;

SELECT * FROM estado;
SELECT * FROM ot;

SELECT 
		COUNT(*) AS total
	FROM 
	    ot
	WHERE 
	    taller_id = 1 AND estado_id = 2
	GROUP BY 
	    taller_id;

SELECT 
		COUNT(*) AS total
	FROM 
		cita
	WHERE 
		hora >= CAST(GETDATE() AS DATE)
	 	AND hora < DATEADD(DAY, 7, CAST(GETDATE() AS DATE))
	 	AND taller_id = 1;


SELECT 
		*
	FROM 
		ot
	WHERE 
		taller_id = 1
		AND fecha_entrada >= DATEADD(DAY, -7, CAST(GETDATE() AS DATE))
	 	AND fecha_entrada < DATEADD(DAY, 8, CAST(GETDATE() AS DATE))
	ORDER BY fecha_entrada DESC;

SELECT 
		COUNT(*) AS total
	FROM 
		ot
	WHERE MONTH(fecha_entrada) = MONTH(GETDATE())
  		AND YEAR(fecha_entrada) = YEAR(GETDATE())
  		AND taller_id = 1;

SELECT 
        SUM(precio) AS total
    FROM 
        ot
    WHERE 
        MONTH(fecha_salida) = MONTH(GETDATE())
        AND YEAR(fecha_salida) = YEAR(GETDATE())
        AND estado_id = 3
        AND taller_id = 1;
SELECT * FROM ot;