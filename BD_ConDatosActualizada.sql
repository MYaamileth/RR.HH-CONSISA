-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: consisa
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `tbl_area`
--

DROP TABLE IF EXISTS `tbl_area`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_area` (
  `Id_area` int NOT NULL AUTO_INCREMENT,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_area`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_area`
--

LOCK TABLES `tbl_area` WRITE;
/*!40000 ALTER TABLE `tbl_area` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_area` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_calculo_liquidacion`
--

DROP TABLE IF EXISTS `tbl_calculo_liquidacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_calculo_liquidacion` (
  `Id_Calculo_Liquidacion` int NOT NULL AUTO_INCREMENT,
  `Total_a_Pagar` decimal(10,0) DEFAULT NULL,
  `Total_a_Deducir` decimal(10,0) DEFAULT NULL,
  `Creado_Por` varchar(15) NOT NULL,
  `Modificado_Por` varchar(15) NOT NULL,
  `Fecha_Modificacion` datetime NOT NULL,
  `Fecha_Creacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Calculo_Liquidacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_calculo_liquidacion`
--

LOCK TABLES `tbl_calculo_liquidacion` WRITE;
/*!40000 ALTER TABLE `tbl_calculo_liquidacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_calculo_liquidacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_contrato`
--

DROP TABLE IF EXISTS `tbl_contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_contrato` (
  `Id_Contrato` int NOT NULL AUTO_INCREMENT,
  `Id_Empleado` int NOT NULL,
  `Id_Tipo_Contrato` int NOT NULL,
  `Cantidad_Acumulada_Vacaciones` int NOT NULL,
  `Fecha_Contratacion` datetime NOT NULL,
  `Fecha_Fin_Contrato` datetime NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Contrato`),
  KEY `FK_Contrato_Empleado_idx` (`Id_Empleado`),
  KEY `FK_Contrato_TipoContrato_idx` (`Id_Tipo_Contrato`),
  CONSTRAINT `FK_Contrato_Empleado` FOREIGN KEY (`Id_Empleado`) REFERENCES `tbl_empleado` (`Id_Empleado`),
  CONSTRAINT `FK_Contrato_TipoContrato` FOREIGN KEY (`Id_Tipo_Contrato`) REFERENCES `tbl_tipo_contrato` (`Id_Tipo_Contrato`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_contrato`
--

LOCK TABLES `tbl_contrato` WRITE;
/*!40000 ALTER TABLE `tbl_contrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_deduccion`
--

DROP TABLE IF EXISTS `tbl_deduccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_deduccion` (
  `Id_Deduccion` int NOT NULL AUTO_INCREMENT,
  `Id_Empleado` int NOT NULL,
  `Id_Tipo_Deduccion` int NOT NULL,
  `Id_Estado_Deduccion` int NOT NULL,
  `Nombre_Deduccion` varchar(40) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Deduccion`),
  KEY `FK_Deduccion_Empleado_idx` (`Id_Empleado`),
  KEY `FK_Deduccion_EstadoDeduccion_idx` (`Id_Estado_Deduccion`),
  KEY `Fk_Deduccion_TipoDeduccion_idx` (`Id_Tipo_Deduccion`),
  CONSTRAINT `FK_Deduccion_Empleado` FOREIGN KEY (`Id_Empleado`) REFERENCES `tbl_empleado` (`Id_Empleado`),
  CONSTRAINT `FK_Deduccion_EstadoDeduccion` FOREIGN KEY (`Id_Estado_Deduccion`) REFERENCES `tbl_estado_deduccion` (`Id_Estado_Deduccion`),
  CONSTRAINT `Fk_Deduccion_TipoDeduccion` FOREIGN KEY (`Id_Tipo_Deduccion`) REFERENCES `tbl_tipo_deduccion` (`Id_Tipo_Deduccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_deduccion`
--

LOCK TABLES `tbl_deduccion` WRITE;
/*!40000 ALTER TABLE `tbl_deduccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_deduccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_departamento`
--

DROP TABLE IF EXISTS `tbl_departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_departamento` (
  `Id_departamento` int NOT NULL AUTO_INCREMENT,
  `Nombre_departamento` varchar(30) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_departamento`
--

LOCK TABLES `tbl_departamento` WRITE;
/*!40000 ALTER TABLE `tbl_departamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_detalle_contrato`
--

DROP TABLE IF EXISTS `tbl_detalle_contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_detalle_contrato` (
  `Id_Detalle_Contrato` int NOT NULL AUTO_INCREMENT,
  `Id_Contrato` int NOT NULL,
  `Dias_Vacaciones_Tomadas` int NOT NULL,
  `Fechas_Vacaciones_Tomadas` int NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Detalle_Contrato`),
  KEY `FK_DetalleContrato_Contrato_idx` (`Id_Contrato`),
  CONSTRAINT `FK_DetalleContrato_Contrato` FOREIGN KEY (`Id_Contrato`) REFERENCES `tbl_contrato` (`Id_Contrato`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_detalle_contrato`
--

LOCK TABLES `tbl_detalle_contrato` WRITE;
/*!40000 ALTER TABLE `tbl_detalle_contrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_detalle_contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_empleado`
--

DROP TABLE IF EXISTS `tbl_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_empleado` (
  `Id_Empleado` int NOT NULL AUTO_INCREMENT,
  `Id_EstadoCivil` int NOT NULL,
  `Id_Genero` int NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Apellido` varchar(50) NOT NULL,
  `Direccion_vivienda` varchar(100) DEFAULT NULL,
  `Salario` decimal(10,0) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Empleado`),
  KEY `FK_Empleado_Genero_idx` (`Id_Genero`),
  KEY `FK_Empleado_EstadoCivil_idx` (`Id_EstadoCivil`),
  CONSTRAINT `FK_Empleado_EstadoCivil` FOREIGN KEY (`Id_EstadoCivil`) REFERENCES `tbl_estado_civil` (`Id_estado_civil`),
  CONSTRAINT `FK_Empleado_Genero` FOREIGN KEY (`Id_Genero`) REFERENCES `tbl_genero` (`Id_Genero`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_empleado`
--

LOCK TABLES `tbl_empleado` WRITE;
/*!40000 ALTER TABLE `tbl_empleado` DISABLE KEYS */;
INSERT INTO `tbl_empleado` VALUES (1,1,1,'Marilyn','Mejia','TGU',20000,'Marilyn Mejia','Marilyn Mejia','2024-03-03 00:00:00','2024-03-03 00:00:00'),(2,1,2,'Elan','David','TGU',20000,'Marilyn Mejia','Marilyn Mejia','2024-03-03 00:00:00','2024-03-03 00:00:00');
/*!40000 ALTER TABLE `tbl_empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_empleado_movimientovacaciones`
--

DROP TABLE IF EXISTS `tbl_empleado_movimientovacaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_empleado_movimientovacaciones` (
  `Id_Empleado` int NOT NULL,
  `Id_MovimientoVacaciones` int NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Empleado`,`Id_MovimientoVacaciones`),
  KEY `FK_EmpleadoMovimientoVacaciones_MovimientoVacaciones_idx` (`Id_MovimientoVacaciones`),
  CONSTRAINT `FK_EmpleadoMovimientoVacaciones_Empleado` FOREIGN KEY (`Id_Empleado`) REFERENCES `tbl_empleado` (`Id_Empleado`),
  CONSTRAINT `FK_EmpleadoMovimientoVacaciones_MovimientoVacaciones` FOREIGN KEY (`Id_MovimientoVacaciones`) REFERENCES `tbl_movimiento_vacaciones` (`Id_MovimientoVacaciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_empleado_movimientovacaciones`
--

LOCK TABLES `tbl_empleado_movimientovacaciones` WRITE;
/*!40000 ALTER TABLE `tbl_empleado_movimientovacaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_empleado_movimientovacaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_estado`
--

DROP TABLE IF EXISTS `tbl_estado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_estado` (
  `Id_Estado` int NOT NULL AUTO_INCREMENT,
  `Estado` varchar(10) NOT NULL,
  PRIMARY KEY (`Id_Estado`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_estado`
--

LOCK TABLES `tbl_estado` WRITE;
/*!40000 ALTER TABLE `tbl_estado` DISABLE KEYS */;
INSERT INTO `tbl_estado` VALUES (1,'Activo'),(2,'Innactivo'),(3,'Pendiente');
/*!40000 ALTER TABLE `tbl_estado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_estado_civil`
--

DROP TABLE IF EXISTS `tbl_estado_civil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_estado_civil` (
  `Id_estado_civil` int NOT NULL AUTO_INCREMENT,
  `Estado_civil` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`Id_estado_civil`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_estado_civil`
--

LOCK TABLES `tbl_estado_civil` WRITE;
/*!40000 ALTER TABLE `tbl_estado_civil` DISABLE KEYS */;
INSERT INTO `tbl_estado_civil` VALUES (1,'Soltero'),(2,'Casado');
/*!40000 ALTER TABLE `tbl_estado_civil` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_estado_de_solicitud`
--

DROP TABLE IF EXISTS `tbl_estado_de_solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_estado_de_solicitud` (
  `Id_Estado_Solicitud` int NOT NULL AUTO_INCREMENT,
  `Estado_Solicitud` tinyint NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Estado_Solicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_estado_de_solicitud`
--

LOCK TABLES `tbl_estado_de_solicitud` WRITE;
/*!40000 ALTER TABLE `tbl_estado_de_solicitud` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_estado_de_solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_estado_deduccion`
--

DROP TABLE IF EXISTS `tbl_estado_deduccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_estado_deduccion` (
  `Id_Estado_Deduccion` int NOT NULL AUTO_INCREMENT,
  `Estado_Deduccion` tinyint DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Estado_Deduccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_estado_deduccion`
--

LOCK TABLES `tbl_estado_deduccion` WRITE;
/*!40000 ALTER TABLE `tbl_estado_deduccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_estado_deduccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_genero`
--

DROP TABLE IF EXISTS `tbl_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_genero` (
  `Id_Genero` int NOT NULL AUTO_INCREMENT,
  `Nombre_Genero` varchar(105) DEFAULT NULL,
  PRIMARY KEY (`Id_Genero`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_genero`
--

LOCK TABLES `tbl_genero` WRITE;
/*!40000 ALTER TABLE `tbl_genero` DISABLE KEYS */;
INSERT INTO `tbl_genero` VALUES (1,'Mujer'),(2,'Hombre');
/*!40000 ALTER TABLE `tbl_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_liquidacion`
--

DROP TABLE IF EXISTS `tbl_liquidacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_liquidacion` (
  `Id_Liquidacion` int NOT NULL AUTO_INCREMENT,
  `Id_Calculo_Liquidacion` int NOT NULL,
  `Id_Tipo_Liquidacion` int NOT NULL,
  `Id_Empleado` int NOT NULL,
  `Nombre_Liquidacion` varchar(40) DEFAULT NULL,
  `Dia` date NOT NULL,
  `Mes` date NOT NULL,
  `Año` date NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificaco_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Liquidacion`),
  KEY `FK_Liquidacion_CalculoLiquidacion_idx` (`Id_Calculo_Liquidacion`),
  KEY `FK_Liquidacion_Empleado_idx` (`Id_Empleado`),
  KEY `Fk_Liquidacion_TipoLiquidacion_idx` (`Id_Tipo_Liquidacion`),
  CONSTRAINT `FK_Liquidacion_CalculoLiquidacion` FOREIGN KEY (`Id_Calculo_Liquidacion`) REFERENCES `tbl_calculo_liquidacion` (`Id_Calculo_Liquidacion`),
  CONSTRAINT `FK_Liquidacion_Empleado` FOREIGN KEY (`Id_Empleado`) REFERENCES `tbl_empleado` (`Id_Empleado`),
  CONSTRAINT `Fk_Liquidacion_TipoLiquidacion` FOREIGN KEY (`Id_Tipo_Liquidacion`) REFERENCES `tbl_tipo_liquidacion` (`Id_Tipo_Liquidacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_liquidacion`
--

LOCK TABLES `tbl_liquidacion` WRITE;
/*!40000 ALTER TABLE `tbl_liquidacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_liquidacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_liquidacion_tipoliquidacion`
--

DROP TABLE IF EXISTS `tbl_liquidacion_tipoliquidacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_liquidacion_tipoliquidacion` (
  `Id_TipoLiquidacion` int NOT NULL,
  `Id_Liquidacion` int NOT NULL,
  PRIMARY KEY (`Id_TipoLiquidacion`,`Id_Liquidacion`),
  KEY `FK_LiquidacionTipoLiquidacion_Liquidacion_idx` (`Id_Liquidacion`),
  CONSTRAINT `FK_LiquidacionTipoLiquidacion_Liquidacion` FOREIGN KEY (`Id_Liquidacion`) REFERENCES `tbl_liquidacion` (`Id_Liquidacion`),
  CONSTRAINT `FK_LiquidacionTipoLiquidacion_TipoLiquidacion` FOREIGN KEY (`Id_TipoLiquidacion`) REFERENCES `tbl_tipo_liquidacion` (`Id_Tipo_Liquidacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_liquidacion_tipoliquidacion`
--

LOCK TABLES `tbl_liquidacion_tipoliquidacion` WRITE;
/*!40000 ALTER TABLE `tbl_liquidacion_tipoliquidacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_liquidacion_tipoliquidacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_movimiento_planilla`
--

DROP TABLE IF EXISTS `tbl_movimiento_planilla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_movimiento_planilla` (
  `Id_Deduccion` int NOT NULL,
  `Id_Planilla` int NOT NULL,
  `Fecha_Movimiento` datetime NOT NULL,
  `Calculo_Movimiento` decimal(10,0) NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Deduccion`,`Id_Planilla`),
  KEY `FK_MovimientoPlanilla_Planilla_idx` (`Id_Planilla`),
  CONSTRAINT `FK_MovimientoPlanilla_Deduccion` FOREIGN KEY (`Id_Deduccion`) REFERENCES `tbl_deduccion` (`Id_Deduccion`),
  CONSTRAINT `FK_MovimientoPlanilla_Planilla` FOREIGN KEY (`Id_Planilla`) REFERENCES `tbl_planilla` (`Id_Planilla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_movimiento_planilla`
--

LOCK TABLES `tbl_movimiento_planilla` WRITE;
/*!40000 ALTER TABLE `tbl_movimiento_planilla` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_movimiento_planilla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_movimiento_vacaciones`
--

DROP TABLE IF EXISTS `tbl_movimiento_vacaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_movimiento_vacaciones` (
  `Id_MovimientoVacaciones` int NOT NULL AUTO_INCREMENT,
  `Revision_Dias` int DEFAULT NULL,
  `Cantidad_Dias` int DEFAULT NULL,
  `Fecha_Transaccion` datetime NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_MovimientoVacaciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_movimiento_vacaciones`
--

LOCK TABLES `tbl_movimiento_vacaciones` WRITE;
/*!40000 ALTER TABLE `tbl_movimiento_vacaciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_movimiento_vacaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ms_bitacora`
--

DROP TABLE IF EXISTS `tbl_ms_bitacora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ms_bitacora` (
  `Id_bitacora` int NOT NULL AUTO_INCREMENT,
  `Id_usuario` int NOT NULL,
  `Id_Objeto` int NOT NULL,
  `Fecha` datetime DEFAULT NULL,
  `Accion` varchar(20) DEFAULT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Id_bitacora`),
  KEY `FK_bitacora_usuario_idx` (`Id_usuario`),
  KEY `FK_bitacora_objeto_idx` (`Id_Objeto`),
  CONSTRAINT `FK_bitacora_objeto` FOREIGN KEY (`Id_Objeto`) REFERENCES `tbl_ms_objeto` (`Id_objeto`),
  CONSTRAINT `FK_bitacora_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `tbl_ms_usuario` (`Id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ms_bitacora`
--

LOCK TABLES `tbl_ms_bitacora` WRITE;
/*!40000 ALTER TABLE `tbl_ms_bitacora` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_ms_bitacora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ms_historial_contraseña`
--

DROP TABLE IF EXISTS `tbl_ms_historial_contraseña`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ms_historial_contraseña` (
  `Id_historial_contraseña` int NOT NULL AUTO_INCREMENT,
  `Id_usuario` int NOT NULL,
  `Contraseña_pasada` varchar(45) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_historial_contraseña`),
  KEY `Fk_HistorialContraseña_Usuario_idx` (`Id_usuario`),
  CONSTRAINT `Fk_HistorialContraseña_Usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `tbl_ms_usuario` (`Id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ms_historial_contraseña`
--

LOCK TABLES `tbl_ms_historial_contraseña` WRITE;
/*!40000 ALTER TABLE `tbl_ms_historial_contraseña` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_ms_historial_contraseña` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ms_objeto`
--

DROP TABLE IF EXISTS `tbl_ms_objeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ms_objeto` (
  `Id_objeto` int NOT NULL AUTO_INCREMENT,
  `Objeto` varchar(100) DEFAULT NULL,
  `Descripcion` varchar(200) DEFAULT NULL,
  `Tipo_objeto` varchar(15) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_objeto`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ms_objeto`
--

LOCK TABLES `tbl_ms_objeto` WRITE;
/*!40000 ALTER TABLE `tbl_ms_objeto` DISABLE KEYS */;
INSERT INTO `tbl_ms_objeto` VALUES (1,'Inicio','Pantalla donde el usuario tendra la opcion de reidirigirse hacia varios espacio de el aplicativo','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(2,'Login','Pantalla donde el usuario tendra la opcion de ingresar al sistema, permitiendo poner su respectivo usuario y contraseña','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(3,'Registro','El usuario podra registrarse directamente desde el aplicativo ingresando los datos solicitados en dicha pantalla','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(4,'Recuperacion de contraseña','El usuario podra hacer recuperacion de su contraseña y modificacion de la misma mediante esta pantalla y su correo electronico','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(5,'Administrar empleados','Esta pantalla sera la principal para le gestion de empleados, aqui se podra ver los registros de los empleados dentro del aplicativo y tendra atajos para crear, editar o deshabilitar uno de ellos','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(6,'Crear Empleado','En esta pantalla los administradores  podran crear un nuevo registro de empleado con toda los datos generales e importantes de este','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(7,'Editar Empleado','En esta pantalla los administradores  podran  editar un registro de empleado con toda los datos anteriormente recabados','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(8,'Desactivar Empleado ','En esta pantalla los administradores podran desactividar el registro de un empleado si este renuncio o no esta mas en la empresa por alguna razon.','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(9,'Administrar Usuarios','Esta pantalla sera la principal para le gestion de usuarios. Aqui se podra ver los registros de los usuarios dentro del aplicativo y tendra atajos para crear, editar o deshabilitar uno de ellos','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(10,'Crear usuario','En esta pantalla los administradores  podran crear un nuevo registro de usuario con toda los datos generales de este.','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(11,'Editar Usuario','En esta pantalla los administradores  podran  editar un registro de usuario con toda los datos anteriormente recabados','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(12,'Desactivar Usuario','En esta pantalla los administradores podran desactividar el registro de un usuario si este renuncio, esta de vacaciones o no esta en la empresa por alguna otra razon','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(13,'Contratos','Esta pantalla sera la principal para le gestion de los contratos de todos los usuario/empleados. Tendra atajos para crear, editar o deshabilitar uno de ellos','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(14,'Crear Contrato','En esta pantalla los administradores  podran crear un nuevo contrato para los empleados registrados del sistema.','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(15,'Editar Contrato','En esta pantalla los administradores  podran editar un contrato de los empleados, previamente creado.','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(16,'Desactivar Contrato','En esta pantalla los administradores  podran desactivar un contrato de los empleados, previamente creado.','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00'),(17,'Departamentos','Esta pantalla sera la principal para le gestion de los departamentos donde pertenece los empleados. Tendra atajos para crear, editar o deshabilitar uno de ellos.','Pantalla','Marilyn  Mejia ','2024-03-19 00:00:00','Marilyn  Mejia ','2024-03-19 00:00:00');
/*!40000 ALTER TABLE `tbl_ms_objeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ms_parametro`
--

DROP TABLE IF EXISTS `tbl_ms_parametro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ms_parametro` (
  `Id_parametro` int NOT NULL AUTO_INCREMENT,
  `Id_usuario` int NOT NULL,
  `Parametro` varchar(50) DEFAULT NULL,
  `Valor` varchar(100) DEFAULT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  PRIMARY KEY (`Id_parametro`),
  KEY `FK_parametro_usuario_idx` (`Id_usuario`),
  CONSTRAINT `FK_parametro_usuario` FOREIGN KEY (`Id_usuario`) REFERENCES `tbl_ms_usuario` (`Id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ms_parametro`
--

LOCK TABLES `tbl_ms_parametro` WRITE;
/*!40000 ALTER TABLE `tbl_ms_parametro` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_ms_parametro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ms_permiso`
--

DROP TABLE IF EXISTS `tbl_ms_permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ms_permiso` (
  `Id_objeto` int NOT NULL,
  `Id_rol` int NOT NULL,
  `Permiso_insercion` varchar(1) DEFAULT NULL,
  `Permiso_eliminacion` varchar(1) DEFAULT NULL,
  `Permiso_actualizacion` varchar(1) DEFAULT NULL,
  `Permiso_consultar` varchar(1) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  KEY `FK_Permiso_objeto_idx` (`Id_objeto`),
  KEY `FK_permiso_rol_idx` (`Id_rol`),
  CONSTRAINT `FK_Permiso_objeto` FOREIGN KEY (`Id_objeto`) REFERENCES `tbl_ms_objeto` (`Id_objeto`),
  CONSTRAINT `FK_permiso_rol` FOREIGN KEY (`Id_rol`) REFERENCES `tbl_ms_rol` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ms_permiso`
--

LOCK TABLES `tbl_ms_permiso` WRITE;
/*!40000 ALTER TABLE `tbl_ms_permiso` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_ms_permiso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ms_rol`
--

DROP TABLE IF EXISTS `tbl_ms_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ms_rol` (
  `Id_Rol` int NOT NULL AUTO_INCREMENT,
  `Rol` varchar(30) DEFAULT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ms_rol`
--

LOCK TABLES `tbl_ms_rol` WRITE;
/*!40000 ALTER TABLE `tbl_ms_rol` DISABLE KEYS */;
INSERT INTO `tbl_ms_rol` VALUES (1,'Usuario','Privilegios limitados, solo interactua con ciertas acciones del aplicativo','Marilyn Mejia','2024-03-03 00:00:00','Marilyn Mejia','2024-03-03 00:00:00'),(2,'Administrador','COn privilegios casi a su totalidad, accede a todas las acciones del aplicativo','Marilyn Mejia','2024-03-03 00:00:00','Marilyn Mejia','2024-03-03 00:00:00'),(4,'Seguridad','Define un conjunto de permisos que permiten a los usuarios hacer acciones dentro del aplicativo','Marilyn Mejia','2024-03-03 00:00:00','Marilyn Mejia','2024-03-03 00:00:00');
/*!40000 ALTER TABLE `tbl_ms_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ms_usuario`
--

DROP TABLE IF EXISTS `tbl_ms_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ms_usuario` (
  `Id_usuario` int NOT NULL AUTO_INCREMENT,
  `Id_estado` int DEFAULT NULL,
  `Id_rol` int DEFAULT NULL,
  `Id_Puesto` int DEFAULT NULL,
  `Id_empleado` int DEFAULT NULL,
  `Usuario` varchar(15) DEFAULT NULL,
  `Nombre_Completo_Usuario` varchar(40) DEFAULT NULL,
  `Contraseña` varchar(20) DEFAULT NULL,
  `Primer_ingreso` datetime DEFAULT NULL,
  `Fecha_ultima_conexion` datetime DEFAULT NULL,
  `Correo_electronico` varchar(50) NOT NULL,
  `Fecha_vencimiento` datetime DEFAULT NULL,
  `Token` int DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_usuario`),
  KEY `FK_usuario_rol_idx` (`Id_rol`),
  KEY `Fk_usuario_puesto_idx` (`Id_Puesto`),
  KEY `FK_usuario_empleado_idx` (`Id_empleado`),
  KEY `FK_usuario_estado_idx` (`Id_estado`),
  CONSTRAINT `FK_usuario_empleado` FOREIGN KEY (`Id_empleado`) REFERENCES `tbl_empleado` (`Id_Empleado`),
  CONSTRAINT `FK_usuario_estado` FOREIGN KEY (`Id_estado`) REFERENCES `tbl_estado` (`Id_Estado`),
  CONSTRAINT `Fk_usuario_puesto` FOREIGN KEY (`Id_Puesto`) REFERENCES `tbl_puesto` (`Id_Puesto`),
  CONSTRAINT `FK_usuario_rol` FOREIGN KEY (`Id_rol`) REFERENCES `tbl_ms_rol` (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ms_usuario`
--

LOCK TABLES `tbl_ms_usuario` WRITE;
/*!40000 ALTER TABLE `tbl_ms_usuario` DISABLE KEYS */;
INSERT INTO `tbl_ms_usuario` VALUES (1,1,1,1,1,'MARILYNMEJIA','Marilyn Yamileth Mejia Aguilar','123','2024-03-03 00:00:00','2024-03-03 00:00:00','mymejiaa@unah.hn','2024-04-03 00:00:00',NULL,'Marilyn Mejia','Marilyn Mejia','2024-03-03 00:00:00','2024-03-03 00:00:00'),(2,1,1,3,2,'ELANDAVID','Elan Daniel David Romero','1234','2024-03-02 00:00:00','2024-03-03 00:00:00','elan.davi@unah.hn','2024-04-03 00:00:00',NULL,'Marilyn Mejia','Marilyn Mejia','2024-03-03 00:00:00','2024-03-03 00:00:00'),(3,1,2,1,1,'ADMINROCKETMIND','AdministradorRocketMind','rockentmind_Consisa1','2024-03-14 00:00:00','2024-03-14 00:00:00','marilynyamilethmejia@gmail.com ','2024-04-14 00:00:00',NULL,'Marilyn Mejia','Marilyn Mejia','2024-03-14 00:00:00','2024-03-14 00:00:00'),(8,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(9,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(10,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(11,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(12,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(13,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(14,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(15,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(16,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(17,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(18,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(19,1,1,1,NULL,'MARILYN','Marilyn Mejia Aguilar','pa$$worD1','2024-03-15 00:00:00','2024-03-15 00:00:00','marilyn@gmail.com','2024-04-15 00:00:00',NULL,'Mary Mejia','Mary Mejia','2024-03-15 00:00:00','2024-03-15 00:00:00'),(20,1,1,NULL,NULL,'EDWINCERRATO','Edwin Fernando Cerrato Martinez','PODCAST@74','2024-03-16 00:00:00',NULL,'EDWINN@gmail.com ','2024-04-16 00:00:00',NULL,'Marilyn Mejia','Marilyn Mejia','2024-03-16 00:00:00','2024-03-16 00:00:00'),(21,1,1,NULL,NULL,'EDWINCERRATO','Edwin Fernando Cerrato Martinez','PODCAST@74','2024-03-16 00:00:00',NULL,'EDWINN@gmail.com ','2024-04-16 00:00:00',NULL,'Marilyn Mejia','Marilyn Mejia','2024-03-16 00:00:00','2024-03-16 00:00:00');
/*!40000 ALTER TABLE `tbl_ms_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_planilla`
--

DROP TABLE IF EXISTS `tbl_planilla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_planilla` (
  `Id_Planilla` int NOT NULL AUTO_INCREMENT,
  `Id_Tipo_De_Planilla` int NOT NULL,
  `Id_Empleado` int NOT NULL,
  `Id_Deducciones` int NOT NULL,
  `Salario` decimal(10,0) NOT NULL,
  `Mes` date NOT NULL,
  `Año` date NOT NULL,
  `Dia` date NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Planilla`),
  KEY `FK_Planilla_TipoPlanilla_idx` (`Id_Tipo_De_Planilla`),
  KEY `Fk_Planilla_Empleado_idx` (`Id_Empleado`),
  CONSTRAINT `Fk_Planilla_Empleado` FOREIGN KEY (`Id_Empleado`) REFERENCES `tbl_empleado` (`Id_Empleado`),
  CONSTRAINT `FK_Planilla_TipoPlanilla` FOREIGN KEY (`Id_Tipo_De_Planilla`) REFERENCES `tbl_tipo_de_planilla` (`Id_Tipo_De_Planilla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_planilla`
--

LOCK TABLES `tbl_planilla` WRITE;
/*!40000 ALTER TABLE `tbl_planilla` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_planilla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_puesto`
--

DROP TABLE IF EXISTS `tbl_puesto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_puesto` (
  `Id_Puesto` int NOT NULL AUTO_INCREMENT,
  `Nombre_puesto` varchar(50) DEFAULT NULL,
  `Salario_inicial` decimal(10,0) DEFAULT NULL,
  `Techo_salario` decimal(10,0) unsigned DEFAULT NULL,
  `Requisitos_puesto` varchar(100) DEFAULT NULL,
  `Descripcion_puesto` varchar(100) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Puesto`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_puesto`
--

LOCK TABLES `tbl_puesto` WRITE;
/*!40000 ALTER TABLE `tbl_puesto` DISABLE KEYS */;
INSERT INTO `tbl_puesto` VALUES (1,'Desarrollador de software',20000,10000,'Licenciatura en Ciencias de la Computación o un campo relacionado.','Crea y mantiene aplicaciones de software.','Marilyn Mejia','Marilyn Mejia','2024-03-03 00:00:00','2024-03-03 00:00:00'),(2,'Ingeniero de redes',20000,10000,'Licenciatura en Ingeniería de Redes o un campo relacionado.',' Diseña, instala y mantiene redes informáticas.','Marilyn Mejia','Marilyn Mejia','2024-03-03 00:00:00','2024-03-03 00:00:00'),(3,'Analista de seguridad de la información',25000,10000,'Licenciatura en Seguridad de la Información o un campo relacionado.','Protege los sistemas informáticos de amenazas y vulnerabilidades.','Marilyn Mejia','Marilyn Mejia','2024-03-03 00:00:00','2024-03-03 00:00:00');
/*!40000 ALTER TABLE `tbl_puesto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_puesto_departamento`
--

DROP TABLE IF EXISTS `tbl_puesto_departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_puesto_departamento` (
  `Id_departamento` int NOT NULL,
  `Id_puesto` int NOT NULL,
  `Id_area` int NOT NULL,
  `Nombre_area` varchar(30) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_departamento`,`Id_puesto`,`Id_area`),
  KEY `FK_puesto/departamento_Puesto_idx` (`Id_puesto`),
  KEY `FK_puesto/departamento_Area_idx` (`Id_area`),
  CONSTRAINT `FK_puesto/departamento_Area` FOREIGN KEY (`Id_area`) REFERENCES `tbl_area` (`Id_area`),
  CONSTRAINT `FK_puesto/departamento_departamento ` FOREIGN KEY (`Id_departamento`) REFERENCES `tbl_departamento` (`Id_departamento`),
  CONSTRAINT `FK_puesto/departamento_Puesto` FOREIGN KEY (`Id_puesto`) REFERENCES `tbl_puesto` (`Id_Puesto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_puesto_departamento`
--

LOCK TABLES `tbl_puesto_departamento` WRITE;
/*!40000 ALTER TABLE `tbl_puesto_departamento` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_puesto_departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_solicitud`
--

DROP TABLE IF EXISTS `tbl_solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_solicitud` (
  `Id_Solicitud` int NOT NULL AUTO_INCREMENT,
  `Id_Estado_Solicitud` int NOT NULL,
  `Id_Empleado` int NOT NULL,
  `Id_Tipo_Solicitud` int NOT NULL,
  `Fecha_Inicio_Vacaciones` date NOT NULL,
  `Fecha_Final_Vacaciones` date NOT NULL,
  `Hora_Inicio_Vacaciones` time NOT NULL,
  `Hora_Final_Vacaciones` time NOT NULL,
  `Fecha_Retorno_Vacaciones` date DEFAULT NULL,
  `Tiempo_Parcial` time DEFAULT NULL,
  `Fecha_solicitud` date DEFAULT NULL,
  `Observaciones` varchar(45) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Solicitud`),
  KEY `FK_Solicitud_Empleado_idx` (`Id_Empleado`),
  KEY `FK_Solicitud_EstadoSolicitud_idx` (`Id_Estado_Solicitud`),
  KEY `FK_Solcitud_TipoSolicitud _idx` (`Id_Tipo_Solicitud`),
  CONSTRAINT `FK_Solcitud_TipoSolicitud ` FOREIGN KEY (`Id_Tipo_Solicitud`) REFERENCES `tbl_tipo_solicitud` (`Id_Tipo_Solicitud`),
  CONSTRAINT `FK_Solicitud_Empleado` FOREIGN KEY (`Id_Empleado`) REFERENCES `tbl_empleado` (`Id_Empleado`),
  CONSTRAINT `FK_Solicitud_EstadoSolicitud` FOREIGN KEY (`Id_Estado_Solicitud`) REFERENCES `tbl_estado_de_solicitud` (`Id_Estado_Solicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_solicitud`
--

LOCK TABLES `tbl_solicitud` WRITE;
/*!40000 ALTER TABLE `tbl_solicitud` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_telefono_empleado`
--

DROP TABLE IF EXISTS `tbl_telefono_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_telefono_empleado` (
  `Id_empleado` int NOT NULL,
  `Id_tipo_telefono` int NOT NULL,
  `Numero` int NOT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_empleado`,`Id_tipo_telefono`),
  KEY `FK_telefonooEmpleado_tipoTelefono_idx` (`Id_tipo_telefono`),
  CONSTRAINT `FK_telefonoEmpleado_Empleado` FOREIGN KEY (`Id_empleado`) REFERENCES `tbl_empleado` (`Id_Empleado`),
  CONSTRAINT `FK_telefonooEmpleado_tipoTelefono` FOREIGN KEY (`Id_tipo_telefono`) REFERENCES `tbl_tipo_telefono` (`Id_tipo_telefono`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_telefono_empleado`
--

LOCK TABLES `tbl_telefono_empleado` WRITE;
/*!40000 ALTER TABLE `tbl_telefono_empleado` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_telefono_empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_contrato`
--

DROP TABLE IF EXISTS `tbl_tipo_contrato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_contrato` (
  `Id_Tipo_Contrato` int NOT NULL AUTO_INCREMENT,
  `Nombre_Contrato` varchar(50) DEFAULT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  `Creado_Por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Tipo_Contrato`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_contrato`
--

LOCK TABLES `tbl_tipo_contrato` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_contrato` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tipo_contrato` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_de_planilla`
--

DROP TABLE IF EXISTS `tbl_tipo_de_planilla`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_de_planilla` (
  `Id_Tipo_De_Planilla` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(100) DEFAULT NULL,
  `Creado_Por` varchar(15) NOT NULL,
  `Modificado_Por` varchar(15) NOT NULL,
  `Fecha_Creacion` datetime NOT NULL,
  `Fecha_Modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Tipo_De_Planilla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_de_planilla`
--

LOCK TABLES `tbl_tipo_de_planilla` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_de_planilla` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tipo_de_planilla` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_deduccion`
--

DROP TABLE IF EXISTS `tbl_tipo_deduccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_deduccion` (
  `Id_Tipo_Deduccion` int NOT NULL AUTO_INCREMENT,
  `Porcentaje_Monto` decimal(10,0) DEFAULT NULL,
  `Descripcion` varchar(100) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Id_Tipo_Deduccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_deduccion`
--

LOCK TABLES `tbl_tipo_deduccion` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_deduccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tipo_deduccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_liquidacion`
--

DROP TABLE IF EXISTS `tbl_tipo_liquidacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_liquidacion` (
  `Id_Tipo_Liquidacion` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(100) DEFAULT NULL,
  `Creado_Por` varchar(15) NOT NULL,
  `Modificado_Por` varchar(15) NOT NULL,
  `Fecha_Modificacion` datetime NOT NULL,
  `Fecha_Creacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Tipo_Liquidacion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_liquidacion`
--

LOCK TABLES `tbl_tipo_liquidacion` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_liquidacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tipo_liquidacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_solicitud`
--

DROP TABLE IF EXISTS `tbl_tipo_solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_solicitud` (
  `Id_Tipo_Solicitud` int NOT NULL AUTO_INCREMENT,
  `Nombre_Solicitud` varchar(50) DEFAULT NULL,
  `Descripcion_Solicitud` varchar(100) DEFAULT NULL,
  `Creado_por` varchar(15) NOT NULL,
  `Modificado_por` varchar(15) NOT NULL,
  `Fecha_creacion` datetime NOT NULL,
  `Fecha_modificacion` datetime NOT NULL,
  PRIMARY KEY (`Id_Tipo_Solicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_solicitud`
--

LOCK TABLES `tbl_tipo_solicitud` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_solicitud` DISABLE KEYS */;
/*!40000 ALTER TABLE `tbl_tipo_solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_tipo_telefono`
--

DROP TABLE IF EXISTS `tbl_tipo_telefono`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_tipo_telefono` (
  `Id_tipo_telefono` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(20) NOT NULL,
  PRIMARY KEY (`Id_tipo_telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_tipo_telefono`
--

LOCK TABLES `tbl_tipo_telefono` WRITE;
/*!40000 ALTER TABLE `tbl_tipo_telefono` DISABLE KEYS */;
INSERT INTO `tbl_tipo_telefono` VALUES (1,'Celular'),(2,'Celular'),(3,'Celular');
/*!40000 ALTER TABLE `tbl_tipo_telefono` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-19  1:53:00
