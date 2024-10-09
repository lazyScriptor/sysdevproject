-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 05, 2024 at 07:03 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trade_union`
--

-- --------------------------------------------------------

--
-- Table structure for table `president`
--

CREATE TABLE `president` (
  `p_id` smallint(6) UNSIGNED NOT NULL,
  `p_trade_union_id` mediumint(8) UNSIGNED DEFAULT NULL,
  `p_name` varchar(255) NOT NULL,
  `p_nic` varchar(12) NOT NULL,
  `p_normal_phone_number` varchar(15) DEFAULT NULL,
  `p_whatsapp_phone_number` varchar(15) DEFAULT NULL,
  `p_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `president`
--

INSERT INTO `president` (`p_id`, `p_trade_union_id`, `p_name`, `p_nic`, `p_normal_phone_number`, `p_whatsapp_phone_number`, `p_email`) VALUES
(5, 6, 'Theekshana Vimukthi Fernando', '200031702568', '0718976568', '0718976568', 'theekshana.jny@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `secretary`
--

CREATE TABLE `secretary` (
  `s_id` smallint(6) UNSIGNED NOT NULL,
  `s_trade_union_id` mediumint(8) UNSIGNED DEFAULT NULL,
  `s_name` varchar(255) NOT NULL,
  `s_nic` varchar(12) NOT NULL,
  `s_normal_phone_number` varchar(15) DEFAULT NULL,
  `s_whatsapp_phone_number` varchar(15) DEFAULT NULL,
  `s_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `secretary`
--

INSERT INTO `secretary` (`s_id`, `s_trade_union_id`, `s_name`, `s_nic`, `s_normal_phone_number`, `s_whatsapp_phone_number`, `s_email`) VALUES
(4, 6, 'Danushka Gangoda', '123456789v', '0777722295', '0777722295', 'danushka@sltds.lk');

-- --------------------------------------------------------

--
-- Table structure for table `trade_unions`
--

CREATE TABLE `trade_unions` (
  `t_id` mediumint(8) UNSIGNED NOT NULL,
  `t_trade_union_name` varchar(255) NOT NULL,
  `t_address` varchar(255) NOT NULL,
  `t_establishment_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trade_unions`
--

INSERT INTO `trade_unions` (`t_id`, `t_trade_union_name`, `t_address`, `t_establishment_date`) VALUES
(6, 'United Industrial Workers Union', '45 Industrial Ave, Suite 102 Springfield, IL 62704 USA', '2024-08-04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `president`
--
ALTER TABLE `president`
  ADD PRIMARY KEY (`p_id`),
  ADD KEY `fk_trade_union` (`p_trade_union_id`);

--
-- Indexes for table `secretary`
--
ALTER TABLE `secretary`
  ADD PRIMARY KEY (`s_id`),
  ADD KEY `s_trade_union_id` (`s_trade_union_id`);

--
-- Indexes for table `trade_unions`
--
ALTER TABLE `trade_unions`
  ADD PRIMARY KEY (`t_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `president`
--
ALTER TABLE `president`
  MODIFY `p_id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `secretary`
--
ALTER TABLE `secretary`
  MODIFY `s_id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `trade_unions`
--
ALTER TABLE `trade_unions`
  MODIFY `t_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `president`
--
ALTER TABLE `president`
  ADD CONSTRAINT `fk_trade_union` FOREIGN KEY (`p_trade_union_id`) REFERENCES `trade_unions` (`t_id`);

--
-- Constraints for table `secretary`
--
ALTER TABLE `secretary`
  ADD CONSTRAINT `secretary_ibfk_1` FOREIGN KEY (`s_trade_union_id`) REFERENCES `trade_unions` (`t_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
