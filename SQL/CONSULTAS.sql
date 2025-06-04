SELECT * FROM taller;

SELECT * FROM taller WHERE taller.usuario_rut = '21.389.785-3';


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


SELECT * FROM cliente c ;


SELECT * FROM vehiculo v ;

SELECT COUNT(*) AS total FROM cliente

/* Data de usuarios Administradores para Pruebas */
SELECT * FROM usuario u;

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