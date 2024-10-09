-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 03, 2024 at 12:51 PM
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
-- Indexes for table `trade_unions`
--
ALTER TABLE `trade_unions`
  ADD PRIMARY KEY (`t_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `trade_unions`
--
ALTER TABLE `trade_unions`
  MODIFY `t_id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
