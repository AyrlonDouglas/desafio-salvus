CREATE DATABASE  IF NOT EXISTS `salvus` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `salvus`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: salvus
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `professional`
--

DROP TABLE IF EXISTS `professional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `professional` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `profession` varchar(255) NOT NULL,
  `RegistrationNumber` varchar(255) NOT NULL,
  `specialties` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `maximumDisplacement` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_e3398315ec4259b240b032299c` (`user_id`),
  CONSTRAINT `FK_e3398315ec4259b240b032299c0` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `professional`
--

LOCK TABLES `professional` WRITE;
/*!40000 ALTER TABLE `professional` DISABLE KEYS */;
INSERT INTO `professional` VALUES (1,1,'médico','5965','onco','recife','569km','2022-10-18 23:03:45.172397','2022-10-18 23:03:45.172397'),(2,2,'bombeiro','1452','resgate nas alturas','pernambuco','nordeste','2022-10-18 23:26:42.499368','2022-10-18 23:26:42.499368'),(3,3,'enfermeiro','4563','clinica','são paulo','30km','2022-10-19 20:13:02.647316','2022-10-19 20:13:02.647316'),(4,4,'enfermeiro','2137213','tornados','krakovia','4343m','2022-10-20 13:34:25.278288','2022-10-23 20:54:44.000000'),(5,5,'socorrista','9685','afogamento','Espanha','12','2022-10-20 23:06:53.261894','2022-10-20 23:06:53.261894'),(6,7,'médico','8563','cardiologia','São Paulo','30','2022-10-23 14:22:17.782047','2022-10-23 14:22:17.782047'),(7,8,'Professor','854112','Matemática','recife','309','2022-10-23 15:30:16.827784','2022-10-23 15:30:16.827784');
/*!40000 ALTER TABLE `professional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint NOT NULL DEFAULT '1',
  `telephone` varchar(13) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `professional_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`),
  UNIQUE KEY `REL_3223d6d827605c4eb237390d23` (`professional_id`),
  CONSTRAINT `FK_3223d6d827605c4eb237390d239` FOREIGN KEY (`professional_id`) REFERENCES `professional` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Ayrlon DOugas','ayrlon','teste@email.com','123456',1,'81992751174','masculino','2022-10-18 22:58:59.743997','2022-10-23 19:44:35.000000',1),(2,'Lucas Danilo','lucas','lucas@hotmail.com','123',1,'8199999999','Masculino','2022-10-18 23:25:58.006607','2022-10-18 23:26:42.000000',2),(3,'Anthony Hellyston','tony','tony@hotmail.com','123456',1,'8196969696','masculino','2022-10-19 20:12:30.452651','2022-10-19 20:13:02.000000',3),(4,'leo','leo','leonardofenix10@gmail.com','363636',1,'8140028922','Divindade','2022-10-20 13:30:06.396939','2022-10-23 19:52:45.000000',4),(5,'Paulas Otton','paula','paula@hotmail.com','123456',1,'81999999999','feminino','2022-10-20 22:56:35.096881','2022-10-20 23:06:53.000000',5),(6,'Debora Nicole','debs','1@hotmail.com','123456',1,'81965874569','feminino','2022-10-20 23:20:46.159246','2022-10-20 23:20:46.159246',NULL),(7,'Bianca Silva','bi','bi@test.com','123456',1,'11968574589','Feminino','2022-10-23 14:21:41.697112','2022-10-23 14:22:17.000000',6),(8,'Alejandro Loamy','leoMatematica','leoMatematica@teste.com','123456',1,'81996369854','masculino','2022-10-23 15:29:51.819072','2022-10-23 15:30:16.000000',7);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-23 21:05:21
