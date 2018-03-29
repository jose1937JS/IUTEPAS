-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 31-10-2012 a las 23:16:02
-- Versión del servidor: 5.5.58-0ubuntu0.14.04.1
-- Versión de PHP: 7.1.11-1+ubuntu14.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `InstitutoPascal`
--
CREATE DATABASE IF NOT EXISTS `InstitutoPascal` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `InstitutoPascal`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `cedulaEmp` varchar(8) NOT NULL,
  `nombreEmp` varchar(60) NOT NULL,
  `profesion` varchar(10) NOT NULL,
  `cargo` varchar(70) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncar tablas antes de insertar `empleados`
--

TRUNCATE TABLE `empleados`;
--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `cedulaEmp`, `nombreEmp`, `profesion`, `cargo`) VALUES
(1, '2154321', 'HUGO RAMON', 'Dr', 'Jefe de Control de Estudios y Evaluación'),
(2, '10669414', 'Henry Padilla', 'Prof', 'Coordinador(a) de Pasantia'),
(3, '12300000', 'Henry Padilla', 'Prof', 'Coodinador(a) de Servicio Comunitario'),
(4, '21603201', 'Nestor Gomez', 'Ing', 'Coordinador(a) Control de Estudios y Evaluación'),
(5, '12321312', 'Nicolas Maduro Moros', 'Prof', 'Director'),
(6, '12345678', 'editame', 'Ing', 'Sub Director');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Estudiantes`
--

CREATE TABLE `Estudiantes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `cedula` varchar(8) NOT NULL,
  `telefono` varchar(11) DEFAULT NULL,
  `correo` varchar(30) NOT NULL,
  `carrera` varchar(50) DEFAULT NULL,
  `imagen` varchar(40) DEFAULT 'user.png'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncar tablas antes de insertar `Estudiantes`
--

TRUNCATE TABLE `Estudiantes`;
--
-- Volcado de datos para la tabla `Estudiantes`
--

INSERT INTO `Estudiantes` (`id`, `nombre`, `apellido`, `cedula`, `telefono`, `correo`, `carrera`, `imagen`) VALUES
(1, 'Jose Fernnado', 'Lopez', '25897212', '04244444444', 'jose@loepz', 'informatica', 'user.png'),
(2, 'Nicolas', 'Maduro', '12313213', '13231323123', 'nicolas@maduro', 'informatica', 'user.png'),
(3, 'Julio', 'Yanez', '26026083', '431262626', 'julio@asda', 'informatica', 'user.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Pasantes`
--

CREATE TABLE `Pasantes` (
  `id` int(11) NOT NULL,
  `fechaFin` varchar(10) DEFAULT NULL,
  `semanas` smallint(6) DEFAULT '0',
  `fechaInicio` varchar(10) DEFAULT NULL,
  `organizacion` varchar(100) NOT NULL,
  `espTutor` varchar(20) NOT NULL,
  `tutor` varchar(30) NOT NULL,
  `cedulaTutor` varchar(8) NOT NULL,
  `correoTutor` varchar(50) NOT NULL,
  `cargoTutor` varchar(30) NOT NULL,
  `direccionOrg` varchar(100) NOT NULL,
  `telefonoOrg` varchar(11) NOT NULL,
  `tutorAcad` varchar(40) NOT NULL,
  `cedulaTutorAcad` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncar tablas antes de insertar `Pasantes`
--

TRUNCATE TABLE `Pasantes`;
--
-- Volcado de datos para la tabla `Pasantes`
--

INSERT INTO `Pasantes` (`id`, `fechaFin`, `semanas`, `fechaInicio`, `organizacion`, `espTutor`, `tutor`, `cedulaTutor`, `correoTutor`, `cargoTutor`, `direccionOrg`, `telefonoOrg`, `tutorAcad`, `cedulaTutorAcad`) VALUES
(1, '2012-10-31', 14, '2018-01-01', 'Google', 'Ing', 'Seymor Gray', '13131231', 'seimor@google.com', 'Co Fundador', 'avenida los llanos calle oasis', '02424241414', 'Maria Yanez', '31232131');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pivote`
--

CREATE TABLE `pivote` (
  `id` int(11) NOT NULL,
  `id_estudiantes` int(11) DEFAULT NULL,
  `id_pasantia` int(11) DEFAULT NULL,
  `id_comunitario` int(11) DEFAULT NULL,
  `id_seminario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncar tablas antes de insertar `pivote`
--

TRUNCATE TABLE `pivote`;
--
-- Volcado de datos para la tabla `pivote`
--

INSERT INTO `pivote` (`id`, `id_estudiantes`, `id_pasantia`, `id_comunitario`, `id_seminario`) VALUES
(1, 1, 1, NULL, NULL),
(2, 2, NULL, 1, NULL),
(3, 3, NULL, 2, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Seminarios`
--

CREATE TABLE `Seminarios` (
  `id` int(11) NOT NULL,
  `nombresem` varchar(50) NOT NULL,
  `duracion` time NOT NULL,
  `fecha_inicio` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncar tablas antes de insertar `Seminarios`
--

TRUNCATE TABLE `Seminarios`;
--
-- Volcado de datos para la tabla `Seminarios`
--

INSERT INTO `Seminarios` (`id`, `nombresem`, `duracion`, `fecha_inicio`) VALUES
(1, 'diseño gráfico', '98:00:00', '2013-02-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ServicioComunitario`
--

CREATE TABLE `ServicioComunitario` (
  `id` int(11) NOT NULL,
  `institucion` varchar(100) NOT NULL,
  `proyecto` varchar(500) NOT NULL,
  `fechaInicio` varchar(10) NOT NULL,
  `fechaFin` varchar(10) DEFAULT NULL,
  `horasCumplidas` smallint(6) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncar tablas antes de insertar `ServicioComunitario`
--

TRUNCATE TABLE `ServicioComunitario`;
--
-- Volcado de datos para la tabla `ServicioComunitario`
--

INSERT INTO `ServicioComunitario` (`id`, `institucion`, `proyecto`, `fechaInicio`, `fechaFin`, `horasCumplidas`) VALUES
(1, 'Instituto Universitario de Tecnología Pascal', 'adsadadasd', '2012-10-17', '2012-10-31', 120),
(2, 'Unidad Educativa Negra Matea', 'asdasdasdasd', '2012-10-09', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuarios`
--

CREATE TABLE `Usuarios` (
  `user` tinytext NOT NULL,
  `pass` tinytext NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Truncar tablas antes de insertar `Usuarios`
--

TRUNCATE TABLE `Usuarios`;
--
-- Volcado de datos para la tabla `Usuarios`
--

INSERT INTO `Usuarios` (`user`, `pass`, `role`) VALUES
('admin', 'admin', 'admin'),
('jose', 'lopez', 'programmer'),
('director', 'director', 'director'),
('secretaria', 'secretaria', 'secretaria');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Estudiantes`
--
ALTER TABLE `Estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`);

--
-- Indices de la tabla `Pasantes`
--
ALTER TABLE `Pasantes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pivote`
--
ALTER TABLE `pivote`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pivote_ibfk_1` (`id_comunitario`),
  ADD KEY `pivote_ibfk_3` (`id_pasantia`),
  ADD KEY `pivote_ibfk_4` (`id_seminario`),
  ADD KEY `pivote_ibfk_2` (`id_estudiantes`);

--
-- Indices de la tabla `Seminarios`
--
ALTER TABLE `Seminarios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ServicioComunitario`
--
ALTER TABLE `ServicioComunitario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_inst` (`institucion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `Estudiantes`
--
ALTER TABLE `Estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `Pasantes`
--
ALTER TABLE `Pasantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `pivote`
--
ALTER TABLE `pivote`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `Seminarios`
--
ALTER TABLE `Seminarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `ServicioComunitario`
--
ALTER TABLE `ServicioComunitario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pivote`
--
ALTER TABLE `pivote`
  ADD CONSTRAINT `pivote_ibfk_1` FOREIGN KEY (`id_comunitario`) REFERENCES `ServicioComunitario` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pivote_ibfk_2` FOREIGN KEY (`id_estudiantes`) REFERENCES `Estudiantes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pivote_ibfk_3` FOREIGN KEY (`id_pasantia`) REFERENCES `Pasantes` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `pivote_ibfk_4` FOREIGN KEY (`id_seminario`) REFERENCES `Seminarios` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
