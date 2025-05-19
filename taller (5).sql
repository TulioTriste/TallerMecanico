-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-04-2025 a las 04:59:59
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `taller`
--
CREATE DATABASE IF NOT EXISTS `taller` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `taller`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

DROP TABLE IF EXISTS `cliente`;
CREATE TABLE IF NOT EXISTS `cliente` (
  `rut` varchar(12) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `apaterno` varchar(120) NOT NULL,
  `amaterno` varchar(120) DEFAULT NULL,
  `correo` varchar(250) DEFAULT NULL,
  `telefono` varchar(12) NOT NULL,
  PRIMARY KEY (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion`
--

DROP TABLE IF EXISTS `cotizacion`;
CREATE TABLE IF NOT EXISTS `cotizacion` (
  `id_ot` varchar(12) NOT NULL,
  `id_cotizacion` varchar(6) NOT NULL,
  `precio` int(11) NOT NULL,
  PRIMARY KEY (`id_cotizacion`),
  UNIQUE KEY `cotizacion__idx` (`id_ot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

DROP TABLE IF EXISTS `empleado`;
CREATE TABLE IF NOT EXISTS `empleado` (
  `taller_id` varchar(6) NOT NULL,
  `roles_id` varchar(2) NOT NULL,
  `rut` varchar(12) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `apellido` varchar(120) DEFAULT NULL,
  `cel` varchar(12) DEFAULT NULL,
  `correo` varchar(250) NOT NULL,
  PRIMARY KEY (`rut`),
  KEY `empleado_roles_fk` (`roles_id`),
  KEY `empleado_taller_fk` (`taller_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado`
--

DROP TABLE IF EXISTS `estado`;
CREATE TABLE IF NOT EXISTS `estado` (
  `id` varchar(2) NOT NULL,
  `nombre` varchar(120) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ot`
--

DROP TABLE IF EXISTS `ot`;
CREATE TABLE IF NOT EXISTS `ot` (
  `taller_id` varchar(6) NOT NULL,
  `vehiculo_patente` varchar(8) NOT NULL,
  `id` varchar(12) NOT NULL,
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `km` varchar(10) NOT NULL,
  `estado_id` varchar(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ot__idx` (`estado_id`),
  KEY `ot_taller_fk` (`taller_id`),
  KEY `ot_vehiculo_fk` (`vehiculo_patente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

DROP TABLE IF EXISTS `plan`;
CREATE TABLE IF NOT EXISTS `plan` (
  `id` varchar(10) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `precio` int(11) NOT NULL,
  `perfiles` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` varchar(2) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `taller`
--

DROP TABLE IF EXISTS `taller`;
CREATE TABLE IF NOT EXISTS `taller` (
  `usuario_rut` varchar(10) NOT NULL,
  `id` varchar(6) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `correo` varchar(120) DEFAULT NULL,
  `direccion` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `taller_usuario_fk` (`usuario_rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `rut` varchar(10) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) DEFAULT NULL,
  `correo` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `empresa` char(1) DEFAULT NULL,
  `plan_id` varchar(10) NOT NULL,
  PRIMARY KEY (`rut`),
  UNIQUE KEY `usuario__idx` (`plan_id`),
  UNIQUE KEY `usuario_rut_un` (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
CREATE TABLE IF NOT EXISTS `vehiculo` (
  `cliente_rut` varchar(12) NOT NULL,
  `patente` varchar(8) NOT NULL,
  `marca` varchar(120) NOT NULL,
  `modelo` varchar(120) NOT NULL,
  `color` varchar(120) NOT NULL,
  `km` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`patente`),
  KEY `vehiculo_cliente_fk` (`cliente_rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD CONSTRAINT `cotizacion_ot_fk` FOREIGN KEY (`id_ot`) REFERENCES `ot` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD CONSTRAINT `empleado_roles_fk` FOREIGN KEY (`roles_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `empleado_taller_fk` FOREIGN KEY (`taller_id`) REFERENCES `taller` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ot`
--
ALTER TABLE `ot`
  ADD CONSTRAINT `ot_estado_fk` FOREIGN KEY (`estado_id`) REFERENCES `estado` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ot_taller_fk` FOREIGN KEY (`taller_id`) REFERENCES `taller` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ot_vehiculo_fk` FOREIGN KEY (`vehiculo_patente`) REFERENCES `vehiculo` (`patente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `taller`
--
ALTER TABLE `taller`
  ADD CONSTRAINT `taller_usuario_fk` FOREIGN KEY (`usuario_rut`) REFERENCES `usuario` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_plan_fk` FOREIGN KEY (`plan_id`) REFERENCES `plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `vehiculo`
--
ALTER TABLE `vehiculo`
  ADD CONSTRAINT `vehiculo_cliente_fk` FOREIGN KEY (`cliente_rut`) REFERENCES `cliente` (`rut`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
