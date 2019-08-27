-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: school
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `teachers_students`
--

DROP TABLE IF EXISTS `teachers_students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teachers_students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teachers_id` int(11) NOT NULL,
  `students_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`,`teachers_id`,`students_id`),
  KEY `fk_teachers_has_students_students1_idx` (`students_id`),
  KEY `fk_teachers_has_students_teachers_idx` (`teachers_id`),
  CONSTRAINT `fk_teachers_has_students_students1` FOREIGN KEY (`students_id`) REFERENCES `students` (`id`),
  CONSTRAINT `fk_teachers_has_students_teachers` FOREIGN KEY (`teachers_id`) REFERENCES `teachers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teachers_students`
--

LOCK TABLES `teachers_students` WRITE;
/*!40000 ALTER TABLE `teachers_students` DISABLE KEYS */;
INSERT INTO `teachers_students` VALUES (1,2,4,'2019-08-26 20:27:19','2019-08-26 20:27:19'),(2,2,5,'2019-08-26 20:27:19','2019-08-26 20:27:19'),(3,1,6,'2019-08-26 21:22:32','2019-08-26 21:22:32'),(4,1,5,'2019-08-26 21:22:32','2019-08-26 21:22:32'),(5,3,7,'2019-08-26 21:23:37','2019-08-26 21:23:37'),(6,3,8,'2019-08-26 21:23:37','2019-08-26 21:23:37'),(7,3,9,'2019-08-26 21:23:37','2019-08-26 21:23:37'),(8,3,4,'2019-08-26 21:48:52','2019-08-26 21:48:52');
/*!40000 ALTER TABLE `teachers_students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-27 21:04:41
