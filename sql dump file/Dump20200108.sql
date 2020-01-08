-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: localhost    Database: auctiondealer
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bid` (
  `bid_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `bid_time` datetime NOT NULL,
  `bid_price` int(11) NOT NULL,
  PRIMARY KEY (`bid_id`),
  KEY `fk_bid_product_idx` (`product_id`),
  KEY `fk_bid_user_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
INSERT INTO `bid` VALUES (1,1,11,'2019-12-22 14:30:20',750),(2,2,12,'2019-12-20 11:22:00',760),(3,3,13,'2019-12-20 11:30:30',760),(4,4,14,'2019-12-01 05:00:00',750),(5,5,15,'2019-12-02 06:12:00',765),(6,6,16,'2019-12-02 06:57:00',765),(7,7,17,'2019-12-05 13:25:23',700),(8,8,18,'2019-11-24 15:47:46',200),(9,9,19,'2019-11-29 18:47:30',800),(10,10,11,'2019-12-15 08:12:48',800),(11,11,12,'2019-12-22 14:30:20',750),(12,12,12,'2019-12-20 11:22:00',750),(13,13,13,'2019-12-20 11:30:30',400),(14,14,13,'2019-12-01 05:00:00',400),(15,15,14,'2019-12-02 06:12:00',400),(16,16,14,'2019-12-02 06:57:00',500),(17,17,15,'2019-12-05 13:25:23',450),(18,18,15,'2019-11-24 15:47:46',100),(19,19,16,'2019-11-29 18:47:30',100),(20,20,16,'2019-12-15 08:12:48',1500),(21,21,17,'2019-12-16 05:00:00',760),(22,21,17,'2019-12-17 18:00:00',770),(23,21,18,'2019-12-18 13:20:10',775),(24,21,18,'2019-12-18 18:00:00',780),(25,22,19,'2019-12-20 06:00:00',130),(26,22,19,'2019-12-21 05:00:00',140),(27,23,11,'2019-12-22 14:30:20',270),(28,24,12,'2019-12-20 11:22:00',250),(29,24,13,'2019-12-20 11:30:30',260),(30,25,14,'2019-12-01 05:00:00',100),(31,25,15,'2019-12-02 06:12:00',150),(32,25,16,'2019-12-02 06:57:00',170),(33,25,17,'2019-12-05 13:25:23',190),(34,26,18,'2019-11-24 15:47:46',550),(35,26,18,'2019-11-29 18:47:30',565),(36,26,19,'2019-12-15 08:12:48',580),(37,27,11,'2019-12-02 12:31:51',150),(38,27,11,'2019-12-05 12:58:59',180),(39,27,12,'2019-12-05 15:12:31',220),(40,27,12,'2019-12-06 13:32:21',300),(41,28,13,'2019-12-21 21:45:00',350),(42,28,13,'2019-12-22 22:56:48',380),(43,29,14,'2019-12-01 05:12:23',750),(44,29,14,'2019-12-01 06:00:00',755),(45,29,15,'2019-12-03 21:41:21',765),(46,30,15,'2019-12-12 14:12:42',750),(47,30,16,'2019-12-12 16:12:45',760),(48,30,16,'2019-12-13 04:12:15',785),(49,30,17,'2019-12-14 06:19:20',795),(50,30,17,'2019-12-14 09:19:20',820);
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_name` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('phone'),('laptop');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `content` text,
  PRIMARY KEY (`user_id`,`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (2,1,'OK'),(2,5,'Not bad'),(3,2,'Excellent'),(3,11,'This product is OK '),(4,3,'Broken product. Need service'),(4,8,'Normal'),(4,13,'OK'),(4,18,'This is the worst item I have ever had'),(5,9,'Bad product'),(5,14,'Worthy product'),(5,16,'OK'),(6,7,'OK'),(6,15,'Best product I have ever bought'),(7,12,'Useless but good price'),(8,4,'Useless one'),(8,6,'Bad product. Recommended not buy'),(8,17,'Broken at the first day have it'),(9,10,'Good item - cheap price'),(9,19,'Worthy one'),(10,20,'Cheap price but useless');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `current_product`
--

DROP TABLE IF EXISTS `current_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `current_product` (
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `current_product`
--

LOCK TABLES `current_product` WRITE;
/*!40000 ALTER TABLE `current_product` DISABLE KEYS */;
INSERT INTO `current_product` VALUES (21),(22),(23),(24),(25),(26),(27),(28),(29),(30);
/*!40000 ALTER TABLE `current_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device`
--

DROP TABLE IF EXISTS `device`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `device` (
  `device_id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` text NOT NULL,
  `type` text NOT NULL,
  `model` text NOT NULL,
  `released` text,
  `status` text,
  `weight` text,
  `display_type` text,
  `display_size` text,
  `display_resolution` text,
  `os` text,
  `cpu` text,
  `chipset` text,
  `gpu` text,
  `ram` text,
  `sensors` text,
  `battery` text,
  `colors` text,
  `img_url` text NOT NULL,
  `img_url1` text,
  `img_url2` text,
  PRIMARY KEY (`device_id`),
  KEY `device_index` (`device_id`),
  FULLTEXT KEY `brand` (`brand`,`model`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device`
--

LOCK TABLES `device` WRITE;
/*!40000 ALTER TABLE `device` DISABLE KEYS */;
INSERT INTO `device` VALUES (1,'Apple','phone','iPhone 11 Pro Max','2019  September','Available. Released 2019  September','226','Super Retina XDR OLED capacitive touchscreen  16M colors','6.5 inches| 102.9 cm','1242 x 2688 pixels| 19.5:9 ratio (~458 ppi density)','iOS 13| upgradable to iOS 13.3','Hexa-core (2x2.65 GHz Lightning + 4x1.8 GHz Thunder)','Apple A13 Bionic (7 nm+)','Apple GPU (4-core graphics)','64GB 4GB RAM','Face ID| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Ion 3969 mAh battery (15.04 Wh)','Space Gray| Silver| Gold| Midnight Green (matte colors)','https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg',NULL,'https://tr4.cbsistatic.com/hub/i/r/2019/09/10/8f24c10f-c2c5-4522-86f0-508e5b1a7356/resize/1200x900/28b7a3e5308d0b4034106c94578e824b/iphone11-hero.jpg'),(2,'Apple','phone','iPhone 11 Pro Max','2019  September','Available. Released 2019  September','226','Super Retina XDR OLED capacitive touchscreen  16M colors','6.5 inches| 102.9 cm','1242 x 2688 pixels| 19.5:9 ratio (~458 ppi density)','iOS 13| upgradable to iOS 13.3','Hexa-core (2x2.65 GHz Lightning + 4x1.8 GHz Thunder)','Apple A13 Bionic (7 nm+)','Apple GPU (4-core graphics)','64GB 4GB RAM','Face ID| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Ion 3969 mAh battery (15.04 Wh)','Space Gray| Silver| Gold| Midnight Green (matte colors)','https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg',NULL,NULL),(3,'Apple','phone','iPhone 11 Pro','2019  September','Available. Released 2019  September','188','Super Retina XDR OLED capacitive touchscreen  16M colors','5.8 inches| 84.4 cm','1125 x 2436 pixels| 19.5:9 ratio (~458 ppi density)','iOS 13| upgradable to iOS 13.3','Hexa-core (2x2.65 GHz Lightning + 4x1.8 GHz Thunder)','Apple A13 Bionic (7 nm+)','Apple GPU (4-core graphics)','64GB 4GB RAM','Face ID| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Ion 3046 mAh battery (11.67 Wh)','Space Gray| Silver| Gold| Midnight Green (matte colors)','https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro-max-.jpg',NULL,NULL),(4,'Apple','phone','iPhone 11','2019  September','Available. Released 2019  September','194','Liquid Retina IPS LCD capacitive touchscreen  16M colors','6.1 inches| 90.3 cm','828 x 1792 pixels| 19.5:9 ratio (~326 ppi density)','iOS 13| upgradable to iOS 13.3','Hexa-core (2x2.65 GHz Lightning + 4x1.8 GHz Thunder)','Apple A13 Bionic (7 nm+)','Apple GPU (4-core graphics)','64GB 4GB RAM','Face ID| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Ion 3110 mAh battery (11.91 Wh)','Black| Green| Yellow| Purple| Red| White','https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg',NULL,NULL),(5,'Apple','phone','iPad 10.2','2019  September','Available. Released 2019  September','483','IPS LCD capacitive touchscreen  16M colors','10.2 inches| 324.6 cm','1620 x 2160 pixels| 4:3 ratio (~264 ppi density)','iPadOS 13.1| upgradable to iPadOS 13.1.2','Quad-core 2.34 GHz (2x Hurricane + 2x Zephyr)','Apple A10 Fusion (16 nm)','PowerVR Series7XT Plus (six-core graphics)','32GB 3GB RAM','Fingerprint (front-mounted)| accelerometer| gyro| compass| barometer','Non-removable Li-Po 8827 mAh battery (32.9 Wh)','Silver| Gold| Space Gray','https://fdn2.gsmarena.com/vv/bigpic/apple-ipad7-102-inches.jpg',NULL,NULL),(9,'Apple','phone','iPad Air (2019)','2019  March','Available. Released 2019  March','456','IPS LCD capacitive touchscreen  16M colors','10.5 inches| 341.4 cm','1668 x 2224 pixels| 4:3 ratio (~265 ppi density)','iOS 12.1.3| upgradable to iPadOS 13.1.2','Hexa-core (2x2.5 GHz Vortex + 4x1.6 GHz Tempest)','Apple A12 Bionic (7 nm)','Apple GPU (4-core graphics)','64GB 3GB RAM','Fingerprint (front-mounted)| accelerometer| gyro| compass| barometer','Non-removable Li-Po 8134 mAh battery (30.8 Wh)','Space Gray| Silver| Gold','https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-air3-2019.jpg',NULL,NULL),(10,'Apple','phone','iPad mini (2019)','2019  March','Available. Released 2019  March','300.5','IPS LCD capacitive touchscreen  16M colors','7.9 inches| 193.3 cm','1536 x 2048 pixels| 4:3 ratio (~324 ppi density)','iOS 12.1.3| upgradable to iPadOS 13.1.2','Hexa-core (2x2.5 GHz Vortex + 4x1.6 GHz Tempest)','Apple A12 Bionic (7 nm)','Apple GPU (4-core graphics)','64GB 3GB RAM','Fingerprint (front-mounted)| accelerometer| gyro| compass| barometer','Non-removable Li-Ion 5124 mAh battery (19.1 Wh)','Space Gray| Silver| Gold','https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-mini-2019.jpg',NULL,NULL),(11,'Huawei','phone','nova 6 SE','2019  December','Coming soon. Exp. release 2019  December 18','183','LTPS IPS LCD capacitive touchscreen  16M colors ','6.4 inches| 101.4 cm','1080 x 2310 pixels (~398 ppi density)','Android 10.0; EMUI 10','Octa-core (2x2.27 GHz Cortex-A76 & 6x1.88 GHz Cortex-A55)','HiSilicon Kirin 810 (7 nm)','Mali-G52 MP6','128GB 8GB RAM','Fingerprint (side-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 4200 mAh battery','Black| Emerald Green| Light Pink/Blue','https://fdn2.gsmarena.com/vv/bigpic/huawei-nova-6-se.jpg',NULL,NULL),(12,'Huawei','phone','MatePad Pro','2019  November','Available. Released 2019  December','460','IPS LCD capacitive touchscreen  16M colors','10.8 inches| 338.2 cm','2560 x 1600 pixels| 16:10 ratio (~280 ppi density)','Android 10.0; EMUI 10','Octa-core (2x2.86 GHz Cortex-A76 & 2x2.09 GHz Cortex-A76 & 4x1.86 GHz Cortex-A55)','HiSilicon Kirin 990 (7 nm+)','Mali-G76 MP16','128GB 6GB RAM','Accelerometer| gyro| proximity| compass','Non-removable Li-Po 7250 mAh battery','Gray| White| Green| Orange','https://fdn2.gsmarena.com/vv/bigpic/huawei-matepad-pro.jpg',NULL,NULL),(13,'Huawei','phone','Mate X','2019  February','Available. Released 2019  November','295','Foldable OLED capacitive touchscreen  16M colors','8.0 inches| 205.0 cm','2200 x 2480 pixels (~414 ppi density)','Android 9.0 (Pie); EMUI 9.1','Octa-core (2x2.6 GHz Cortex-A76 & 2x1.92 GHz Cortex-A76 & 4x1.8 GHz Cortex-A55)','HiSilicon Kirin 980 (7 nm)','Mali-G76 MP10','512GB 8GB RAM','Fingerprint (side-mounted)| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Po 4500 mAh battery','Interstellar Blue','https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-x-.jpg','','https://cnet1.cbsistatic.com/img/Lcq08-9ZafSEAetTTCqcJRAWdDM=/980x551/2019/12/12/8dde7502-c1c5-483b-84f9-193da3a92f98/huawei-mate-x-hands-on-review-14.jpg'),(27,'Huawei','phone','MediaPad M6 10.8','2019  June','Available. Released 2019  July 10','498','IPS LCD capacitive touchscreen  16M colors','10.8 inches| 338.2 cm','2560 x 1600 pixels| 16:10 ratio (~280 ppi density)','Android 9.0 (Pie); EMUI 9.1','Octa-core (2x2.6 GHz Cortex-A76 & 2x1.92 GHz Cortex-A76 & 4x1.8 GHz Cortex-A55)','HiSilicon Kirin 980 (7 nm)','Mali-G76 MP10','64GB 4GB RAM','Fingerprint (front-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 7500 mAh battery','Champagne Gold','https://fdn2.gsmarena.com/vv/bigpic/huawei-mediapad-m6-108.jpg',NULL,NULL),(30,'Huawei','phone','nova 5 Pro','2019  June','Available. Released 2019  June','171','OLED capacitive touchscreen  16M colors','6.39 inches| 100.2 cm','1080 x 2340 pixels| 19.5:9 ratio (~403 ppi density)','Android 9.0 (Pie)| EMUI 9.1','Octa-core (2x2.6 GHz Cortex-A76 & 2x1.92 GHz Cortex-A76 & 4x1.8 GHz Cortex-A55)','HiSilicon Kirin 980 (7 nm)','Mali-G76 MP10','128GB 8GB RAM','Fingerprint (under display| optical)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 3500 mAh battery','Black| Purple| Green| Orange','https://fdn2.gsmarena.com/vv/bigpic/huawei-nova-5-pro-new.jpg',NULL,NULL),(33,'Huawei','phone','Y9 Prime (2019)','2019  May','Available. Released 2019  August','196.8','LTPS IPS LCD capacitive touchscreen  16M colors','6.59 inches| 106.6 cm','1080 x 2340 pixels| 19.5:9 ratio (~391 ppi density)','Android 9.0 (Pie); EMUI 9.1','Octa-core (4x2.2 GHz Cortex-A73 & 4x1.7 GHz Cortex-A53)','Hisilicon Kirin 710F (12 nm)','Mali-G51 MP4','64GB 4GB RAM','Fingerprint (rear-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 4000 mAh battery','Emerald Green| Midnight Black| Sapphire Blue','https://fdn2.gsmarena.com/vv/bigpic/huawei-y9-prime-2019-.jpg',NULL,NULL),(36,'Huawei','phone','Mate 20 X (5G)','2019  May','Available. Released 2019  July','233','OLED capacitive touchscreen  16M colors','7.2 inches| 130.7 cm','1080 x 2244 pixels| 18.7:9 ratio (~346 ppi density)','Android 9.0 (Pie); EMUI 9.1','Octa-core (2x2.6 GHz Cortex-A76 & 2x1.92 GHz Cortex-A76 & 4x1.8 GHz Cortex-A55)','HiSilicon Kirin 980 (7 nm)','Mali-G76 MP10','256GB 8GB RAM','Fingerprint (rear-mounted)| accelerometer| gyro| proximity| barometer| compass','Non-removable Li-Po 4200 mAh battery','Emerald Green','https://fdn2.gsmarena.com/vv/bigpic/huawei-mate-20x-5g-.jpg',NULL,NULL),(37,'Huawei','phone','P30 Pro','2019  March','Available. Released 2019  March','192','OLED capacitive touchscreen  16M colors','6.47 inches| 102.8 cm','1080 x 2340 pixels| 19.5:9 ratio (~398 ppi density)','Android 9.0 (Pie)| upgradable to Android 10.0; EMUI 10','Octa-core (2x2.6 GHz Cortex-A76 & 2x1.92 GHz Cortex-A76 & 4x1.8 GHz Cortex-A55)','HiSilicon Kirin 980 (7 nm)','Mali-G76 MP10','128GB 6GB RAM','Fingerprint (under display| optical)| accelerometer| gyro| proximity| compass| color spectrum','Non-removable Li-Po 4200 mAh battery','Aurora| Amber Sunrise| Breathing Crystal| Black| Pearl White| Misty Lavender| Mystic Blue','https://fdn2.gsmarena.com/vv/bigpic/huawei-p30-pro.jpg',NULL,NULL),(38,'Huawei','phone','P30','2019  March','Available. Released 2019  March','165','OLED capacitive touchscreen  16M colors','6.1 inches| 91.3 cm','1080 x 2340 pixels| 19.5:9 ratio (~422 ppi density)','Android 9.0 (Pie)| upgradable to Android 10.0; EMUI 10','Octa-core (2x2.6 GHz Cortex-A76 & 2x1.92 GHz Cortex-A76 & 4x1.8 GHz Cortex-A55)','HiSilicon Kirin 980 (7 nm)','Mali-G76 MP10','64GB 8GB RAM','Fingerprint (under display| optical)| accelerometer| gyro| proximity| compass| color spectrum','Non-removable Li-Po 3650 mAh battery','Aurora| Amber Sunrise| Breathing Crystal| Black| Pearl White','https://fdn2.gsmarena.com/vv/bigpic/huawei-p30.jpg',NULL,NULL),(44,'Huawei','phone','MediaPad M5 Lite 8','2019  March','Available. Released 2019  March','310','IPS LCD capacitive touchscreen  16M colors','8.0 inches| 185.6 cm','1920 x 1200 pixels| 16:10 ratio (~283 ppi density)','Android 9.0 (Pie)| EMUI 9.0','Octa-core (4x2.2 GHz Cortex-A73 & 4x1.7 GHz Cortex-A53)','Hisilicon Kirin 710 (12 nm)','Mali-G51 MP4','32GB 3GB RAM','Accelerometer| proximity','Non-removable Li-Po 5100 mAh battery','Champagne Gold| Dark Gray','https://fdn2.gsmarena.com/vv/bigpic/huawei-mediapad-m5-lite-8-inch.jpg',NULL,NULL),(48,'Huawei','phone','Y7 Prime (2019)','2019  January','Available. Released 2019  January','168','IPS LCD capacitive touchscreen  16M colors','6.26 inches| 97.8 cm','720 x 1520 pixels| 19:9 ratio (~269 ppi density)','Android 8.1 (Oreo); EMUI 8.2','Octa-core 1.8 GHz Cortex-A53','Qualcomm SDM450 Snapdragon 450 (14 nm)','Adreno 506','32GB 3GB RAM','Fingerprint (rear-mounted)| accelerometer| proximity| compass','Non-removable Li-Ion 4000 mAh battery','Aurora Blue| Midnight Black| Coral Red| Brown (faux leather)','https://fdn2.gsmarena.com/vv/bigpic/huawei-y7-prime-2019.jpg',NULL,NULL),(49,'Huawei','phone','Y7 Pro (2019)','2019  January','Available. Released 2019  January','168','IPS LCD capacitive touchscreen  16M colors','6.26 inches| 97.8 cm','720 x 1520 pixels| 19:9 ratio (~269 ppi density)','Android 8.1 (Oreo); EMUI 8.2','Octa-core 1.8 GHz Cortex-A53','Qualcomm SDM450 Snapdragon 450 (14 nm)','Adreno 506','32GB 3GB RAM','Accelerometer| proximity| compass','Non-removable Li-Ion 4000 mAh battery','Black| Aurora','https://fdn2.gsmarena.com/vv/bigpic/huawei-y7-pro-2019-.jpg',NULL,NULL),(50,'Samsung','phone','Galaxy A70s','2019  September','Available. Released 2019  September','187','Super AMOLED capacitive touchscreen  16M colors','6.7 inches| 108.4 cm','1080 x 2400 pixels| 20:9 ratio (~393 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x2.0 GHz Kryo 460 Gold & 6x1.7 GHz Kryo 460 Silver)','Qualcomm SDM675 Snapdragon 675 (11 nm)','Adreno 612','128GB 6GB RAM','Fingerprint (under display| optical)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 4500 mAh battery','Prism Crush Red| Prism Crush White| Prism Crush Black','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a70s-.jpg',NULL,NULL),(52,'Samsung','phone','Galaxy M30s','2019  September','Available. Released 2019  September','188','Super AMOLED capacitive touchscreen  16M colors','6.4 inches| 100.5 cm','1080 x 2340 pixels| 19.5:9 ratio (~403 ppi density)','Android 9.0 (Pie); One UI','Octa-core (4x2.3 GHz Cortex-A73 & 4x1.7 GHz Cortex-A53)','Exynos 9611 (10nm)','Mali-G72 MP3','64GB 4GB RAM','Fingerprint (rear-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 6000 mAh battery','Opal Black| Sapphire Blue| Pearl White','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m30s-.jpg',NULL,NULL),(53,'Samsung','phone','Galaxy M10s','2019  September','Available. Released 2019  September','169','Super AMOLED capacitive touchscreen  16M colors','6.4 inches| 100.5 cm','720 x 1560 pixels| 19.5:9 ratio (~268 ppi density)','Android 9.0 (Pie)','Octa-core (2x1.6 GHz Cortex-A73 & 6x1.35 GHz Cortex-A53)','Exynos 7884B','Mali-G71 MP2','32GB 3GB RAM','Accelerometer| gyro| proximity| compass','Non-removable Li-Ion 4000 mAh battery','Stone Blue| Piano Black','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m10s-m107f.jpg',NULL,NULL),(54,'Samsung','phone','Galaxy Fold 5G','2019  February','Available. Released 2019  September','263','Foldable Dynamic AMOLED capacitive touchscreen  16M colors','7.3 inches| 162.6 cm','1536 x 2152 pixels (~362 ppi density)','Android 9.0 (Pie)','Octa-core (1x2.84 GHz Kryo 485 & 3x2.42 GHz Kryo 485 & 4x1.78 GHz Kryo 485)','Qualcomm SM8150 Snapdragon 855 (7 nm)','Adreno 640','512GB 12GB RAM','Fingerprint (side-mounted)| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Po 4235 mAh battery','Space Silver| Cosmos Black','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-fold-5g.jpg',NULL,NULL),(55,'Samsung','phone','Galaxy Fold','2019  February','Available. Released 2019  September','263','Foldable Dynamic AMOLED capacitive touchscreen  16M colors','7.3 inches| 162.6 cm','1536 x 2152 pixels (~362 ppi density)','Android 9.0 (Pie)','Octa-core (1x2.84 GHz Kryo 485 & 3x2.42 GHz Kryo 485 & 4x1.78 GHz Kryo 485)','Qualcomm SM8150 Snapdragon 855 (7 nm)','Adreno 640','512GB 12GB RAM','Fingerprint (side-mounted)| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Po 4380 mAh battery','Space Silver| Cosmos Black| Martian Green| Astro Blue','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-fold.jpg',NULL,NULL),(56,'Samsung','phone','Galaxy Tab Active Pro','2019  September','Available. Released 2019  October','653','LCD capacitive touchscreen  16M colors','10.1 inches| 295.8 cm','1920 x 1200 pixels| 16:10 ratio (~224 ppi density)','Android 9.0 (Pie)','Octa-core (2x2.0 GHz Kryo 360 Gold & 6x1.7 GHz Kryo 360 Silver)','Qualcomm SDM710 Snapdragon 710 (10 nm)','Adreno 616','64GB 4GB RAM','Fingerprint (front-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 7600 mAh battery','Black','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-active-pro-sm-t547.jpg',NULL,NULL),(61,'Samsung','phone','Galaxy Note10+','2019  August','Available. Released 2019  August','196','Dynamic AMOLED capacitive touchscreen  16M colors','6.8 inches| 114.0 cm','1440 x 3040 pixels| 19:9 ratio (~498 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x2.73 GHz Mongoose M4 & 2x2.4 GHz Cortex-A75 & 4x1.9 GHz Cortex-A55) - EMEA/LATAM','Exynos 9825 (7 nm) - EMEA/LATAM','Mali-G76 MP12 - EMEA/LATAM','256GB 12GB RAM','Fingerprint (under display| ultrasonic)| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Ion 4300 mAh battery','Aura Glow| Aura White| Aura Black| Aura Blue','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-note10-plus-.jpg',NULL,NULL),(63,'Samsung','phone','Galaxy Note10','2019  August','Available. Released 2019  August','168','Dynamic AMOLED capacitive touchscreen  16M colors','6.3 inches| 98.6 cm','1080 x 2280 pixels| 19:9 ratio (~401 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x2.73 GHz Mongoose M4 & 2x2.4 GHz Cortex-A75 & 4x1.9 GHz Cortex-A55) - EMEA/LATAM','Exynos 9825 (7 nm) - EMEA/LATAM','Mali-G76 MP12 - EMEA/LATAM','256GB 8GB RAM','Fingerprint (under display| ultrasonic)| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Ion 3500 mAh battery','Aura Glow| Aura White| Aura Black| Aura Pink| Aura Red','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-note10-.jpg',NULL,NULL),(66,'Samsung','phone','Galaxy A10s','2019  August','Available. Released 2019  September','168','IPS LCD capacitive touchscreen  16M colors','6.2 inches| 95.9 cm','720 x 1520 pixels| 19:9 ratio (~271 ppi density)','Android 9.0 (Pie)','Octa-core 2.0 GHz Cortex-A53','Mediatek MT6762 Helio P22 (12 nm)','PowerVR GE8320','32GB 2GB RAM','Fingerprint (rear-mounted)| accelerometer| proximity','Non-removable Li-Po 4000 mAh battery','Blue| Green| Red| Black','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a10s.jpg',NULL,NULL),(67,'Samsung','phone','Galaxy A10e','2019  July','Available. Released 2019  August','141','PLS TFT capacitive touchscreen  16M colors','5.83 inches| 83.4 cm','720 x 1560 pixels| 19.5:9 ratio (~295 ppi density)','Android 9.0 (Pie)','Octa-core (2x1.6 GHz Cortex-A73 & 6x1.35 GHz Cortex-A53)','Exynos 7884 (14 nm)','Mali-G71 MP2','32GB 2GB RAM','Accelerometer| proximity','Non-removable Li-Ion 3000 mAh battery','Black','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a10e-sm-a102u.jpg',NULL,NULL),(68,'Samsung','phone','Galaxy Tab S6','2019  July','Available. Released 2019  August','420','Super AMOLED capacitive touchscreen  16M colors','10.5 inches| 321.9 cm','1600 x 2560 pixels| 16:10 ratio (~287 ppi density)','Android 9.0 (Pie); One UI','Octa-core (1x2.84 GHz Kryo 485 & 3x2.42 GHz Kryo 485 & 4x1.78 GHz Kryo 485)','Qualcomm SM8150 Snapdragon 855 (7 nm)','Adreno 640','128GB 6GB RAM','Fingerprint (under display| optical)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 7040 mAh battery','Mountain Gray| Cloud Blue| Rose Blush','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s6.jpg',NULL,NULL),(69,'Samsung','phone','Galaxy Tab A 8.0 (2019)','2019  July','Available. Released 2019  July','345','TFT capacitive touchscreen  16M colors','8.0 inches| 185.6 cm','800 x 1280 pixels| 16:10 ratio (~189 ppi density)','Android 9.0 (Pie)','Quad-core 2.0 GHz Cortex-A53','Qualcomm SDM429 Snapdragon 429','Adreno 504','32GB 2GB RAM','Accelerometer','Non-removable Li-Po 5100 mAh battery','Carbon Black| Silver Gray','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-a-80-2019-r.jpg',NULL,NULL),(74,'Samsung','phone','Galaxy S10 5G','2019  February','Available. Released 2019  April','198','Dynamic AMOLED capacitive touchscreen  16M colors','6.7 inches| 112.0 cm','1440 x 3040 pixels| 19:9 ratio (~502 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x2.73 GHz Mongoose M4 & 2x2.31 GHz Cortex-A75 & 4x1.95 GHz Cortex-A55) - Global','Exynos 9820 (8 nm) - Global','Mali-G76 MP12 - Global','256GB 8GB RAM','Fingerprint (under display| ultrasonic)| accelerometer| gyro| proximity| compass| barometer','Non-removable Li-Ion 4500 mAh battery','Crown Silver| Majestic Black| Royal Gold','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s10-5g.jpg',NULL,NULL),(75,'Samsung','phone','Galaxy S10+','2019  February','Available. Released 2019  March','175','Dynamic AMOLED capacitive touchscreen  16M colors','6.4 inches| 103.8 cm','1440 x 3040 pixels| 19:9 ratio (~522 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x2.73 GHz Mongoose M4 & 2x2.31 GHz Cortex-A75 & 4x1.95 GHz Cortex-A55) - EMEA/LATAM','Exynos 9820 (8 nm) - EMEA/LATAM','Mali-G76 MP12 - EMEA/LATAM','128GB 8GB RAM','Fingerprint (under display| ultrasonic)| accelerometer| gyro| proximity| compass| barometer| heart rate| SpO2','Non-removable Li-Ion 4100 mAh battery','Prism White| Prism Black| Prism Green| Prism Blue| Canary Yellow| Flamingo Pink| Ceramic Black| Ceramic White| Cardinal Red| Smoke Blue','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s10-plus-new.jpg',NULL,NULL),(76,'Samsung','phone','Galaxy S10','2019  February','Available. Released 2019  March','157','Dynamic AMOLED capacitive touchscreen  16M colors','6.1 inches| 93.2 cm','1440 x 3040 pixels| 19:9 ratio (~550 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x2.73 GHz Mongoose M4 & 2x2.31 GHz Cortex-A75 & 4x1.95 GHz Cortex-A55) - EMEA/LATAM','Exynos 9820 (8 nm) - EMEA/LATAM','Mali-G76 MP12 - EMEA/LATAM','128GB 8GB RAM','Fingerprint (under display| ultrasonic)| accelerometer| gyro| proximity| compass| barometer| heart rate| SpO2','Non-removable Li-Ion 3400 mAh battery','Prism White| Prism Black| Prism Green| Prism Blue| Canary Yellow| Flamingo Pink| Cardinal Red| Smoke Blue','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s10.jpg',NULL,NULL),(84,'Samsung','phone','Galaxy A60','2019  April','Available. Released 2019  June','168','PLS TFT capacitive touchscreen  16M colors','6.3 inches| 97.4 cm','1080 x 2340 pixels| 19.5:9 ratio (~409 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x2.0 GHz Kryo 460 Gold & 6x1.7 GHz Kryo 460 Silver)','Qualcomm SDM675 Snapdragon 675 (11 nm)','Adreno 612','64GB 6GB RAM','Fingerprint (rear-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 3500 mAh battery','Daybreak Black| Seawater Blue| Cocktail Orange| Peach Mist','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a60-.jpg',NULL,NULL),(85,'Samsung','phone','Galaxy A50','2019  February','Available. Released 2019  March','166','Super AMOLED capacitive touchscreen  16M colors','6.4 inches| 100.5 cm','1080 x 2340 pixels| 19.5:9 ratio (~403 ppi density)','Android 9.0 (Pie); One UI','Octa-core (4x2.3 GHz Cortex-A73 & 4x1.7 GHz Cortex-A53)','Exynos 9610 (10nm)','Mali-G72 MP3','64GB 4GB RAM','Fingerprint (under display| optical)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 4000 mAh battery','Black| White| Blue| Coral','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a50-sm-a505f-ds.jpg',NULL,NULL),(86,'Samsung','phone','Galaxy A40','2019  March','Available. Released 2019  April','140','Super AMOLED capacitive touchscreen  16M colors','5.9 inches| 85.5 cm','1080 x 2340 pixels| 19.5:9 ratio (~437 ppi density)','Android 9.0 (Pie)','Octa-core (2x1.77 GHz Cortex-A73 & 6x1.59 GHz Cortex-A53)','Exynos 7904 (14 nm)','Mali-G71 MP2','64GB 4GB RAM','Fingerprint (rear-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 3100 mAh battery','Black| White| Blue| Coral','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a40.jpg',NULL,NULL),(87,'Samsung','phone','Galaxy A30','2019  February','Available. Released 2019  March','165','Super AMOLED capacitive touchscreen  16M colors','6.4 inches| 100.5 cm','1080 x 2340 pixels| 19.5:9 ratio (~403 ppi density)','Android 9.0 (Pie)','Octa-core (2x1.8 GHz Cortex-A73 & 6x1.6 GHz Cortex-A53)','Exynos 7904 (14 nm)','Mali-G71 MP2','32GB 3GB RAM','Fingerprint (rear-mounted)| accelerometer| proximity| compass','Non-removable Li-Po 4000 mAh battery','Black| Blue| Red','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a30.jpg',NULL,NULL),(88,'Samsung','phone','Galaxy A20e','2019  April','Available. Released 2019  May','141','PLS TFT capacitive touchscreen  16M colors','5.8 inches| 82.6 cm','720 x 1560 pixels| 19.5:9 ratio (~296 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x1.6 GHz Cortex-A73 & 6x1.35 GHz Cortex-A53)','Exynos 7884 (14 nm)','Mali-G71 MP2','32GB 3GB RAM','Fingerprint (rear-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 3000 mAh battery','Black| White| Blue| Coral','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a20e.jpg',NULL,NULL),(89,'Samsung','phone','Galaxy A20','2019  March','Available. Released 2019  April','169','Super AMOLED capacitive touchscreen  16M colors','6.4 inches| 100.5 cm','720 x 1560 pixels| 19.5:9 ratio (~268 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x1.6 GHz Cortex-A73 & 6x1.35 GHz Cortex-A53)','Exynos 7884 (14 nm)','Mali-G71 MP2','32GB 3GB RAM','Fingerprint (rear-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 4000 mAh battery','Black| Deep Blue| Red| Coral Orange| Gold','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a20.jpg',NULL,NULL),(90,'Samsung','phone','Galaxy A10','2019  February','Available. Released 2019  March','168','IPS LCD capacitive touchscreen  16M colors','6.2 inches| 95.9 cm','720 x 1520 pixels| 19:9 ratio (~271 ppi density)','Android 9.0 (Pie)','Octa-core (2x1.6 GHz Cortex-A73 & 6x1.35 GHz Cortex-A53)','Exynos 7884 (14 nm)','Mali-G71 MP2','32GB 2GB RAM','Accelerometer| proximity','Non-removable Li-Ion 3400 mAh battery','Blue| Black| Red| Gold','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a10.jpg',NULL,NULL),(91,'Samsung','phone','Galaxy Tab S5e','2019  February','Available. Released 2019  April','400','Super AMOLED capacitive touchscreen  16M colors','10.5 inches| 319.7 cm','1600 x 2560 pixels| 16:10 ratio (~288 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x2.0 GHz 360 Gold & 6x1.7 GHz Kryo 360 Silver)','Qualcomm SDM670 Snapdragon 670 (10 nm)','Adreno 615','64GB 4GB RAM','Fingerprint (side-mounted)| accelerometer| gyro| proximity| compass','Non-removable Li-Po 7040 mAh battery','Black| Gold| Silver','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s5e-sm-t725.jpg',NULL,NULL),(92,'Samsung','phone','Galaxy Tab A 10.1 (2019)','2019  February','Available. Released 2019  April','469','TFT capacitive touchscreen  16M colors','10.1 inches| 295.8 cm','1200 x 1920 pixels| 16:10 ratio (~224 ppi density)','Android 9.0 (Pie); One UI','Octa-core (2x1.8 GHz Cortex-A73 & 6x1.6 GHz Cortex-A53)','Exynos 7904 (14 nm)','Mali-G71 MP2','32GB 2GB RAM','Accelerometer| gyro| compass','Non-removable Li-Po 6150 mAh battery','Black| Gold| Silver','https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-a-101-2019.jpg',NULL,NULL),(93,'Xiaomi','phone','Redmi Note 7',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'https://cdn.tgdd.vn/Products/Images/42/167535/xiaomi-redmi-note-7-600x600.jpg',NULL,'https://cdn.didongthongminh.vn/upload_images/2018/01/Redmi-Note-7-16.jpg'),(128,'Dell','laptop','Inspiron 15 Inch 5593','','','','','','','',NULL,NULL,'','','','','','images/device/94/0.jpg','images/device/94/1.webp','images/device/94/2.jfif');
/*!40000 ALTER TABLE `device` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `device_id` int(11) NOT NULL,
  `seller_id` int(11) NOT NULL,
  `first_price` int(11) NOT NULL,
  `step_price` int(11) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `description` text,
  PRIMARY KEY (`product_id`),
  KEY `fk_product_device_idx` (`device_id`),
  CONSTRAINT `fk_product_device` FOREIGN KEY (`device_id`) REFERENCES `device` (`device_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,5,750,10,'2019-11-10 14:30:20','2019-12-27 14:30:20',NULL),(2,1,5,760,5,'2019-11-11 14:30:20','2019-12-29 14:30:20',NULL),(3,1,5,760,5,'2019-11-12 14:30:20','2019-12-29 14:30:20',NULL),(4,1,5,950,10,'2019-11-13 14:30:20','2019-12-26 14:30:20',NULL),(5,2,5,800,1,'2019-11-14 14:30:20','2019-12-23 14:30:20',NULL),(6,2,5,765,2,'2019-11-15 14:30:20','2019-12-29 14:30:20',NULL),(7,3,5,700,5,'2019-11-16 14:30:20','2019-12-29 14:30:20',NULL),(8,4,5,200,150,'2019-11-17 14:30:20','2019-12-24 14:30:20',NULL),(9,88,5,800,20,'2019-11-18 14:30:20','2019-12-29 14:30:20',NULL),(10,88,5,800,20,'2019-11-19 14:30:20','2019-12-29 14:30:20',NULL),(11,75,8,750,2,'2019-11-20 14:30:20','2019-12-29 14:30:20',NULL),(12,75,8,750,2,'2019-11-21 14:30:20','2019-12-29 14:30:20',NULL),(13,44,8,400,15,'2019-11-22 14:30:20','2019-12-29 14:30:20',NULL),(14,44,8,400,15,'2019-11-23 14:30:20','2019-12-29 14:30:20',NULL),(15,44,8,400,15,'2019-11-24 14:30:20','2019-12-29 14:30:20',NULL),(16,9,8,500,50,'2019-11-10 14:30:20','2019-12-29 14:30:20',NULL),(17,48,8,450,1,'2019-11-11 14:30:20','2019-12-29 14:30:20',NULL),(18,49,8,100,20,'2019-11-12 14:30:20','2019-12-29 14:30:20',NULL),(19,13,8,100,5,'2019-11-13 14:30:20','2019-12-29 14:30:20',NULL),(20,13,8,1500,100,'2019-11-14 14:30:20','2019-12-29 14:30:20',NULL),(21,1,8,760,5,'2019-11-15 14:30:20','2019-12-29 14:30:20',NULL),(22,50,10,130,5,'2019-11-16 14:30:20','2019-12-29 14:30:20',NULL),(23,27,10,250,5,'2019-11-17 14:30:20','2019-12-29 14:30:20',NULL),(24,53,10,250,10,'2019-11-18 14:30:20','2019-12-29 14:30:20',NULL),(25,27,10,100,20,'2019-11-19 14:30:20','2019-12-29 14:30:20',NULL),(26,56,10,550,15,'2019-11-20 14:30:20','2019-12-29 14:30:20',NULL),(27,13,10,150,30,'2019-11-21 14:30:20','2019-12-29 14:30:20',NULL),(28,91,9,350,30,'2019-11-22 14:30:20','2019-12-25 14:30:20',NULL),(29,44,9,750,5,'2019-11-23 14:30:20','2019-12-24 14:30:20',NULL),(30,44,9,750,10,'2019-11-24 14:30:20','2019-12-29 14:30:20',NULL),(37,93,9,50,40,'2019-12-27 01:24:54','2019-12-29 04:01:00','0'),(42,90,9,170,10,'2019-12-27 02:02:29','2019-12-29 04:01:00','0'),(43,13,11,800,40,'2019-12-31 10:35:05','2020-01-15 04:00:00','0'),(44,1,11,110,20,'2020-01-01 03:56:00','2020-01-15 04:00:00',''),(45,5,11,900,30,'2020-01-01 04:18:26','2020-01-20 04:00:00',''),(46,128,11,500,10,'2020-01-01 08:52:23','2020-01-18 05:00:00','');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rating` (
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rate` double NOT NULL,
  PRIMARY KEY (`product_id`,`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
INSERT INTO `rating` VALUES (2,3,5),(3,4,2),(4,8,3),(5,2,4),(7,6,4),(9,5,1),(10,9,5),(11,7,3),(12,3,4),(14,6,5),(18,4,1),(19,9,5);
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('53CofBIPeu_s1la9DCkuOGo7tpqFYUT3',1578158384,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAuthenticated\":false}'),('DpoxsZ-4qQmXASsgKygfzE2lU46WBJqn',1578201374,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAuthenticated\":false}'),('OLE83MksUPdzusNssQhoaoVpw3WZcmAc',1578207668,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAuthenticated\":false}'),('Q3taHiPky75gkmkODfuygopRwXJiKDH_',1578145861,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAuthenticated\":true,\"authUser\":{\"user_id\":11,\"name\":\"Tran Thuan Thanh\",\"phone\":null,\"type\":1,\"email\":\"thichdaugia@gmail.com\",\"DOB\":null}}'),('qWR9TlEU6OapvGUJZIrtDEGmiRkbO85w',1578162805,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAuthenticated\":true,\"authUser\":{\"user_id\":5,\"name\":\"DangTrung\",\"phone\":\"093912312\",\"type\":1,\"email\":\"abc7711x@gmail.com\",\"DOB\":\"20-01-2022\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tomerchant`
--

DROP TABLE IF EXISTS `tomerchant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tomerchant` (
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tomerchant`
--

LOCK TABLES `tomerchant` WRITE;
/*!40000 ALTER TABLE `tomerchant` DISABLE KEYS */;
/*!40000 ALTER TABLE `tomerchant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `type` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `DOB` date DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `id` (`user_id`),
  UNIQUE KEY `user_email_idx` (`email`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (5,'DangTrung','093912312','$2a$10$t0hRqwRNQaQGBnk0LvxeF.FXGT.PWd3yYEufGigL1vyLK52FGe9HW',1,'abc7711x@gmail.com','2020-01-22'),(8,'TrungDang',NULL,'$2a$10$mNaR2uDI4sTRICKcPUJ35Oit4TYz1eGhlUepwv7twklfypHgQKZvm',2,'abc771111x@gmail.com',NULL),(9,'Tran Thuan Thanh',NULL,'$2a$10$z0jRi7aW.FJ6BoFVbXIF3eCA2KhfP7lZWWPsqg3bGH/cKh5FiQNmW',2,'t0942842441@gmail.com',NULL),(10,'Thăng',NULL,'$2a$10$d/xWBJdO5yUdmuSpUj.5meV92ICJZBdMhTvI34jyekzBsPmNFtt6C',2,'pthang769@gmail.com',NULL),(11,'Tran Thuan Thanh',NULL,'$2a$10$k0q.J1adrihSgEZUMMPaEegZDEekymWvVKxi3nUlDs.WjnhuR3/zK',1,'thichdaugia@gmail.com',NULL),(12,'Yeu Dau Gia',NULL,'$2a$10$CbiLZTLZqSGA0G4M0oxYcuj4iJwNGGpXmWLc8f/0LudFSKPB91ZIq',0,'yeudaugia@gmail.com',NULL),(13,'Hamm Dau Gia',NULL,'$2a$10$anbXAM0LNKOTo/jHcF/lgOXO5Iv5p5NF.zGVw/pVVwiIxfaSYwbV2',0,'hamdaugia@gmail.com',NULL),(14,'Them Dau Gia',NULL,'$2a$10$u/J7.O9WZkCtAFY5q6Mgre7.Et4zrFDJK0u9NTCrqdQ/VxuiZj3q6',0,'themdaugia@gmail.com',NULL),(15,'Ghien Dau Gia',NULL,'$2a$10$u/J7.O9WZkCtAFY5q6Mgre7.Et4zrFDJK0u9NTCrqdQ/VxuiZj3q6',1,'ghiendaugia@gmail.com',NULL),(16,'Le Ti Tai',NULL,'$2a$10$u/J7.O9WZkCtAFY5q6Mgre7.Et4zrFDJK0u9NTCrqdQ/VxuiZj3q6',0,'letitai@gmail.com',NULL),(17,'Nguyen Thai Dat',NULL,'$2a$10$u/J7.O9WZkCtAFY5q6Mgre7.Et4zrFDJK0u9NTCrqdQ/VxuiZj3q6',0,'nguyenthaidat@gmail.com',NULL),(18,'Le Trong Dai',NULL,'$2a$10$u/J7.O9WZkCtAFY5q6Mgre7.Et4zrFDJK0u9NTCrqdQ/VxuiZj3q6',0,'letrongdai@gmail.com',NULL),(19,'Nuoc Van Duc',NULL,'$2a$10$u/J7.O9WZkCtAFY5q6Mgre7.Et4zrFDJK0u9NTCrqdQ/VxuiZj3q6',0,'nuocvanduc@gmail.com',NULL),(21,'testuser',NULL,'$2a$10$BwaaB7Rk2VZL5sbG.VF9IuX5/e63uNuWYUt/leyNyXs595dk/a9d6',1,'test2@gmail.com',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `watchlist`
--

DROP TABLE IF EXISTS `watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `watchlist` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `fk_watchlist_product_idx` (`product_id`),
  KEY `fk_watchlist_user_idx` (`user_id`),
  CONSTRAINT `fk_watchlist_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `fk_watchlist_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `watchlist`
--

LOCK TABLES `watchlist` WRITE;
/*!40000 ALTER TABLE `watchlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-01-08  8:32:28
