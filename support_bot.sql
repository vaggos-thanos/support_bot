-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for golden
CREATE DATABASE IF NOT EXISTS `golden` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `golden`;

-- Dumping structure for table golden.guildconfigs
CREATE TABLE IF NOT EXISTS `guildconfigs` (
  `guild_id` varchar(50) NOT NULL,
  `wfs_channel_id` varchar(50) DEFAULT NULL,
  `welcome_channel_id` varchar(50) DEFAULT NULL,
  `role_id` varchar(50) DEFAULT NULL,
  `goodbye_channel_id` varchar(50) DEFAULT NULL,
  `wfs_category_id` varchar(50) DEFAULT NULL,
  `membersCID` varchar(50) DEFAULT NULL,
  `channelsCID` varchar(50) DEFAULT NULL,
  `rolesCID` varchar(50) DEFAULT NULL,
  `boostsCID` varchar(50) DEFAULT NULL,
  `lang` varchar(10) DEFAULT 'en',
  PRIMARY KEY (`guild_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table golden.guildconfigs: ~2 rows (approximately)
INSERT INTO `guildconfigs` (`guild_id`, `wfs_channel_id`, `welcome_channel_id`, `role_id`, `goodbye_channel_id`, `wfs_category_id`, `membersCID`, `channelsCID`, `rolesCID`, `boostsCID`, `lang`) VALUES
	('669886758091096095', NULL, NULL, '707183563342348299', NULL, NULL, NULL, NULL, NULL, NULL, 'en'),
	('746856547086499893', '829328332159582209', '970192134210723892', '815650409833299978', NULL, '829327547157577768', '970186926726459462', '970568988784480296', '973734653510975489', '970187246936403998', 'en');

-- Dumping structure for table golden.tickets
CREATE TABLE IF NOT EXISTS `tickets` (
  `user_id` varchar(50) NOT NULL,
  `guild_id` varchar(50) NOT NULL,
  `support_staff_id` varchar(50) DEFAULT NULL,
  `ticket_channel_id` varchar(50) DEFAULT NULL,
  `ticket_message_id` varchar(50) DEFAULT NULL,
  `ticket_id` varchar(50) DEFAULT NULL,
  `ticket_type` varchar(50) DEFAULT NULL,
  `ticket_status` varchar(50) DEFAULT NULL,
  `ticket_created_at` varchar(50) DEFAULT NULL,
  `ticket_closed_at` varchar(50) DEFAULT NULL,
  `ticket_closed_by` varchar(50) DEFAULT NULL,
  `ticket_closed_reason` longtext DEFAULT NULL,
  `ticket_messages_archive` longtext DEFAULT NULL,
  `claimed_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`guild_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table golden.tickets: ~0 rows (approximately)

-- Dumping structure for table golden.ticketsconfigs
CREATE TABLE IF NOT EXISTS `ticketsconfigs` (
  `guild_id` varchar(50) NOT NULL,
  `tickets_types` longtext DEFAULT NULL,
  `custom_emebeds` longtext DEFAULT NULL,
  `ticket_categories_id` longtext DEFAULT NULL,
  `max_archive_tickets` int(11) DEFAULT 10,
  PRIMARY KEY (`guild_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table golden.ticketsconfigs: ~0 rows (approximately)
INSERT INTO `ticketsconfigs` (`guild_id`, `tickets_types`, `custom_emebeds`, `ticket_categories_id`, `max_archive_tickets`) VALUES
	('669886758091096095', '[{"name":"tester","emoji":""},{"name":"test","emoji":""}]', NULL, NULL, 10);

-- Dumping structure for table golden.usersconfigs
CREATE TABLE IF NOT EXISTS `usersconfigs` (
  `user_id` varchar(50) NOT NULL,
  `guilds_in` longtext DEFAULT NULL,
  `total_tickets` bigint(20) DEFAULT NULL,
  `open_tickets` bigint(20) DEFAULT NULL,
  `close_tickets` bigint(20) DEFAULT NULL,
  `archive_tickets` bigint(20) DEFAULT NULL,
  `reputation` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table golden.usersconfigs: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
