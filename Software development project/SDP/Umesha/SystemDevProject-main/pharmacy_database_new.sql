-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2024 at 08:17 PM
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
-- Database: `pharmacy_database_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `inv_id` mediumint(6) NOT NULL,
  `inv_userid` tinyint(2) DEFAULT NULL,
  `inv_datetime` datetime DEFAULT NULL,
  `inv_paidamount` decimal(10,2) DEFAULT NULL,
  `inv_updatestatus` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`inv_id`, `inv_userid`, `inv_datetime`, `inv_paidamount`, `inv_updatestatus`) VALUES
(1, NULL, '2024-05-30 16:20:32', 0.00, 1),
(2, NULL, '2024-05-30 16:22:57', 0.00, 1),
(4, NULL, '2024-05-30 16:32:43', 0.00, 1),
(5, 2, '2024-05-30 11:48:38', 1000.00, 1),
(6, 2, '2024-05-30 11:54:56', 1000.00, 1),
(7, 2, '2024-05-30 12:04:19', NULL, 1),
(8, 2, '2024-05-30 11:56:48', 200000.00, 1),
(9, 2, '2024-05-30 12:00:56', 200000.00, 1),
(10, 2, '2024-05-30 12:00:59', 200000.00, 1),
(11, 2, '2024-05-30 12:01:00', 200000.00, 1),
(12, 2, '2024-05-30 12:06:46', 1500.00, 1),
(13, 2, '2024-05-30 12:14:24', 1000.00, 1),
(14, 2, '2024-05-30 12:44:33', 50000.00, 1),
(16, NULL, '2024-05-31 09:14:07', 1000.00, 1),
(17, 2, '2024-05-31 09:28:21', 1000.00, 1),
(18, 2, '2024-05-31 09:35:13', 1000.00, 1),
(19, 2, '2024-05-31 09:41:00', NULL, 1),
(20, 2, '2024-05-31 09:54:53', 122.00, 1),
(21, 5, '2024-05-31 10:04:04', 1000.00, 1),
(22, 2, '2024-06-02 20:20:28', 1000.00, 1),
(23, 5, '2024-06-02 20:22:33', 1000.00, 1),
(24, 2, '2024-06-02 20:59:05', NULL, 1),
(25, 2, '2024-06-03 08:31:07', 500.00, 1),
(26, 5, '2024-06-03 08:47:53', 1000.00, 1),
(27, 2, '2024-06-03 08:55:53', 1000.00, 1),
(28, 2, '2024-06-05 12:07:16', NULL, 1),
(29, 5, '2024-06-05 12:07:30', NULL, 1),
(30, 2, '2024-06-05 12:07:32', NULL, 1),
(34, 2, '2024-06-05 12:24:16', 313.00, 1),
(35, 5, '2024-06-05 12:26:19', 3198.00, 1),
(36, 5, '2024-06-05 12:30:10', 100.00, 1),
(37, 2, '2024-06-05 12:32:22', 12313.00, 1),
(38, 2, '2024-06-05 12:32:59', 3212.00, 1),
(39, 5, '2024-06-05 12:33:25', 23132.00, 1),
(40, 2, '2024-06-05 12:36:09', 2343.00, 1),
(41, 2, '2024-06-05 13:23:39', 500.00, 1),
(42, 5, '2024-06-05 13:48:28', 500.00, 1),
(43, 5, '2024-06-09 13:53:31', 1000.00, 2),
(44, 5, '2024-06-09 13:55:37', 1000.00, 2),
(45, 5, '2024-06-09 14:16:38', 100.00, 1),
(46, 8, '2024-06-09 14:20:27', 55.00, 1),
(47, NULL, '2024-06-13 04:08:44', 1000.00, 1),
(48, NULL, '2024-06-13 04:18:48', 500.00, 1),
(49, NULL, '2024-06-13 07:11:49', 200.00, 1),
(50, NULL, '2024-06-13 07:14:37', 100.00, 1),
(51, NULL, '2024-06-13 07:17:12', 1000.00, 1),
(52, NULL, '2024-06-13 07:20:45', 30.00, 1),
(53, NULL, '2024-06-13 07:22:43', 123.00, 1),
(54, NULL, '2024-06-13 07:23:29', 123.00, 1),
(55, NULL, '2024-06-13 07:25:35', 78.00, 1),
(56, NULL, '2024-06-13 07:29:14', 3.00, 1),
(57, NULL, '2024-06-13 07:31:09', 213.00, 1),
(58, NULL, '2024-06-13 07:35:51', 123.00, 1),
(59, NULL, '2024-06-13 07:36:06', 123.00, 1),
(60, NULL, '2024-06-13 07:38:08', 321.00, 1),
(61, NULL, '2024-06-13 07:40:28', 320.00, 1),
(62, NULL, '2024-06-13 09:37:48', 12.00, 1),
(63, NULL, '2024-06-13 09:54:57', 900.00, 1),
(64, NULL, '2024-06-14 00:47:53', 600.00, 1),
(65, NULL, '2024-06-14 00:58:15', 1000.00, 1),
(66, 1, '2024-06-14 01:17:02', 2500.00, 1),
(67, 2, '2024-06-14 02:09:39', 500.00, 1),
(68, 2, '2024-06-14 04:02:56', 500.00, 1),
(69, 2, '2024-06-14 04:08:40', 300.00, 1),
(70, 2, '2024-06-14 06:24:34', 500.00, 1),
(71, NULL, '2024-06-14 12:00:32', 0.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `invoicemedicine`
--

CREATE TABLE `invoicemedicine` (
  `invmd_id` int(10) NOT NULL,
  `invmd_invid` mediumint(6) NOT NULL,
  `invmd_mdid` mediumint(8) NOT NULL,
  `invmd_quantity` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoicemedicine`
--

INSERT INTO `invoicemedicine` (`invmd_id`, `invmd_invid`, `invmd_mdid`, `invmd_quantity`) VALUES
(1, 4, 7, 12),
(2, 4, 7, 12),
(3, 4, 23, 2),
(25, 14, 7, 12),
(26, 14, 23, 70),
(27, 16, 7, 12),
(28, 16, 13, 12),
(37, 17, 7, 12),
(41, 18, 7, 12),
(42, 20, 7, 4),
(43, 21, 7, 12),
(44, 21, 23, 10),
(45, 22, 8, 20),
(46, 22, 8, 20),
(47, 23, 8, 20),
(48, 25, 7, 10),
(50, 27, 7, 20),
(54, 34, 7, 12),
(55, 34, 7, 12),
(56, 35, 7, 123),
(57, 35, 7, 123),
(58, 35, 7, 21),
(59, 36, 7, 2),
(60, 37, 7, 21),
(61, 38, 7, 12),
(62, 39, 7, 12),
(63, 40, 7, 12),
(64, 41, 7, 10),
(65, 42, 18, 16),
(66, 43, 7, 12),
(67, 44, 7, 34),
(68, 44, 7, 34),
(69, 44, 7, 30),
(70, 45, 7, 2),
(71, 46, 37, 3),
(72, 47, 75, 10),
(73, 47, 18, 10),
(74, 47, 18, 10),
(75, 48, 18, 10),
(76, 48, 18, 10),
(77, 49, 18, 5),
(78, 49, 18, 5),
(79, 49, 18, 5),
(80, 49, 18, 5),
(81, 49, 18, 5),
(82, 50, 7, 2),
(83, 50, 7, 2),
(84, 50, 7, 2),
(85, 50, 7, 2),
(86, 51, 75, 12),
(87, 51, 75, 12),
(88, 51, 75, 12),
(89, 51, 75, 12),
(90, 51, 75, 12),
(91, 51, 75, 12),
(92, 51, 75, 12),
(93, 51, 75, 12),
(94, 51, 75, 12),
(95, 51, 75, 12),
(96, 52, 7, 1),
(97, 52, 7, 1),
(98, 52, 7, 1),
(99, 61, 7, 12),
(100, 62, 7, 12),
(101, 63, 74, 12),
(102, 64, 72, 10),
(103, 65, 74, 8),
(104, 66, 70, 50),
(105, 67, 70, 10),
(106, 68, 303, 1),
(107, 68, 303, 1),
(108, 69, 303, 1),
(109, 70, 303, 2);

-- --------------------------------------------------------

--
-- Table structure for table `medicine`
--

CREATE TABLE `medicine` (
  `medicine_id` mediumint(7) NOT NULL,
  `medicine_brandname` varchar(100) NOT NULL,
  `medicine_genericname` varchar(255) NOT NULL,
  `medicine_categoryid` tinyint(2) NOT NULL,
  `medicine_unitid` tinyint(1) NOT NULL,
  `medicine_unitprice` decimal(10,2) NOT NULL,
  `medicine_packsize` varchar(8) NOT NULL,
  `medicine_inhandquantity` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicine`
--

INSERT INTO `medicine` (`medicine_id`, `medicine_brandname`, `medicine_genericname`, `medicine_categoryid`, `medicine_unitid`, `medicine_unitprice`, `medicine_packsize`, `medicine_inhandquantity`) VALUES
(7, 'Zyrtec', 'Cetirizine', 12, 1, 26.00, '30', 473),
(8, 'Nexium 20mg', 'Esomeprazole 20mg', 6, 1, 40.70, '30', 400),
(13, 'Cymbalta', 'Duloxetine', 4, 1, 80.00, '30', 500),
(18, 'Metoprolol', 'Metoprolol', 2, 1, 30.00, '100', 35),
(22, 'Ritalin', 'Methylphenidate', 2, 5, 100.00, '30', 150),
(23, 'Tramadol', 'Tramadol', 4, 1, 25.00, '50', 200),
(31, 'PetPetbits Tablet', 'Petbits Tablet', 1, 1, 16.50, '20', 200),
(32, 'Vetzy Tablet', 'Vetzyme Tablet', 1, 1, 15.52, '50', 200),
(35, 'Vetzy B+E Tablet', 'Vetzyme B+E Tablet', 1, 1, 27.94, '100', 200),
(37, 'Stress Tabs', 'Stress Tabs', 1, 1, 15.50, '30', 147),
(38, 'Orcalmin Suspension', 'Chlorpheniramine maleate and dextromethorphan hydrobromide suspension', 1, 3, 940.00, '200 ml', 3),
(39, 'Nutri-Coat Syrup', 'Vitamin and mineral supplement\n', 1, 3, 2500.00, '200 ml', 3),
(40, 'Nutri-Coat Advanced', 'Vitamin and mineral supplement', 1, 3, 2700.00, '200 ml', 2),
(44, 'Stresstabs Powder', 'Multivitamin and mineral supplement', 1, 3, 1540.00, '300 g', 6),
(46, 'P/VET Flea Tick Guard Powder', 'Insecticidal powder', 1, 3, 625.00, '70 g', 5),
(47, 'Show Shampoo', 'Pet shampoo for grooming and cleaning', 1, 3, 135.00, '200 ml', 4),
(48, 'Top Dog Shampoo', 'Pet shampoo for grooming and cleaning', 1, 3, 460.00, '100 ml', 4),
(49, 'Furguard shampoo', 'Pet shampoo for grooming and cleaning', 1, 3, 549.00, '250 ml', 4),
(50, 'Petdog Shampoo', 'Pet shampoo for grooming and cleaning', 1, 3, 585.00, '250 ml', 3),
(51, 'Scoo Tear Free Shampoo', 'Shampoo for tear\r\n', 1, 3, 795.00, '300 ml', 5),
(52, 'Petdog Tick Lotion', 'Topical tick treatment for pets', 1, 3, 590.00, '200 ml', 5),
(54, 'P/Vet Mange Guard Lotion', 'Topical treatment for mange in pets', 1, 3, 690.00, '200 ml', 8),
(56, 'Top Dog Soap', 'Medicated soap for pets', 1, 7, 605.00, '75 g', 6),
(57, 'Furguard Soap', 'Medicated soap for pets fleas', 1, 7, 402.00, '80 g', 0),
(58, 'Limpo Conditioning Shampoo', 'Shampoo for fleas and ticks', 1, 3, 775.00, '200 ml', 5),
(63, 'P/Vet Flea Tick Guard Spray', 'Spray for fleas, ticks', 1, 3, 740.00, '200 ml', 8),
(64, 'P/Vet Flea Tick Guard Soap', 'Soap for fleas, ticks', 1, 7, 565.00, '70 g', 150),
(65, 'P/Vet Pet Care Soap', 'Pet care soap', 1, 7, 565.00, '70 g', 100),
(66, 'Amiodar 100mg', 'Amlodipine 100mg', 2, 1, 72.43, '100', 120),
(67, 'HCL 50mg', 'Hydrochlorothiazide 50mg', 2, 1, 2.00, '100', 200),
(68, 'Ezita 10mg', 'Ezitamibe 10mg', 2, 1, 38.80, '20', 150),
(69, 'Lipitor 10mg-SPC', 'Lipitor 10mg', 2, 1, 26.33, '14', 100),
(70, 'Lipitor 20mg-SPC', 'Lipitor 20mg', 2, 1, 41.57, '14', 190),
(71, 'Natrilix SR 1.5mg-SPC', 'Natrilix SR 1.5mg', 2, 1, 64.87, '20', 200),
(72, 'Lorvas SR 1.5mg', 'Lorvastatin sustained release 1.5mg', 2, 1, 50.43, '20', 190),
(73, 'Simvas 10mg', 'Simvastatin 10mg', 2, 1, 41.68, '50', 200),
(74, 'Simvas 20mg', 'Simvastatin 20mg', 2, 1, 71.76, '50', 230),
(75, 'Atorva 5mg', 'Atorvastatin 5mg', 2, 1, 26.45, '100', 120),
(76, 'Atorva 10mg', 'Atorvastatin 10mg', 2, 1, 36.42, '100', 400),
(77, 'Atorva 20mg', 'Atorvastatin 20mg', 2, 1, 41.64, '100', 450),
(78, 'Atorva 40mg', 'Atorvastatin 40mg', 2, 1, 68.53, '50', 200),
(79, 'Atorvastatin 10mg-SPC', 'Atorvastatin 10mg', 2, 1, 2.10, '50', 300),
(80, 'Atorvastatin 20mg-SPC', 'Atorvastatin 20mg', 2, 1, 5.75, '100', 250),
(81, 'Aztor 10mg', 'Atorvastatin 10mg', 2, 1, 26.36, '20', 150),
(82, 'Astat 10 mg', 'Atorvastatin 10mg', 2, 1, 26.36, '20', 330),
(83, 'Vasolip 10mg', 'Vasolip 10mg', 2, 1, 26.34, '50', 150),
(84, 'Vasolip 20mg', 'Vasolip 20mg', 2, 1, 41.60, '50', 200),
(85, 'Atocor 10mg', 'Atorvastatin 10mg', 2, 1, 26.36, '20', 350),
(86, 'Crestor 10mg', 'Rosuvastatin 10mg', 2, 1, 87.36, '14', 800),
(87, 'Plavix 75 mg', 'Clopidogrel 75mg', 2, 1, 28.70, '14', 300),
(88, 'Crestor 20 mg', 'Rosuvastatin 20mg', 2, 1, 27.80, '30', 600),
(89, 'Zestril 10 mg', 'Lisinopril 10mg', 2, 1, 15.20, '30', 150),
(90, 'Norvasc 5 mg', 'Amlodipine 5mg', 2, 1, 10.50, '15', 300),
(91, 'Coreg 12.5 mg', 'Carvedilol 12.5mg', 2, 1, 35.20, '20', 400),
(92, 'Tenormin 50 mg', 'Atenolol 50mg', 2, 1, 12.80, '30', 200),
(93, 'Micardis 40 mg', 'Telmisartan 40mg', 2, 1, 28.40, '30', 500),
(94, 'Diovan 80 mg', 'Valsartan 80mg', 2, 1, 32.50, '28', 250),
(96, 'Aldactone 25 mg', 'Spironolactone 25mg', 2, 1, 22.30, '30', 180),
(97, 'Isordil 10 mg', 'Isosorbide Dinitrate 10mg', 2, 1, 8.50, '25', 500),
(98, 'Imdur 60 mg', 'Isosorbide Mononitrate 60mg', 2, 1, 18.70, '30', 250),
(99, 'Brilinta 90 mg', 'Ticagrelor 90mg', 2, 1, 45.60, '28', 390),
(100, 'Xarelto 20 mg', 'Rivaroxaban 20mg', 2, 1, 55.90, '30', 180),
(101, 'Lasix 40 mg', 'Furosemide 40mg', 2, 1, 10.00, '15', 300),
(102, 'Cozaar 50 mg', 'Losartan 50mg', 2, 1, 20.40, '30', 200),
(103, 'Effient 10 mg', 'Prasugrel 10mg', 2, 1, 35.20, '28', 250),
(104, 'Toprol XL 25 mg', 'Metoprolol Succinate 25mg', 2, 1, 15.60, '30', 360),
(105, 'Nitrostat 0.4 mg', 'Nitroglycerin 0.4mg', 2, 1, 12.00, '25', 200),
(106, 'Eliquis 5 mg', 'Apixaban 5mg', 2, 1, 50.50, '60', 400),
(107, 'Zebeta 5 mg', 'Bisoprolol 5mg', 2, 1, 25.00, '30', 300),
(108, 'Pradaxa 150 mg', 'Dabigatran 150mg', 2, 1, 60.00, '30', 200),
(109, 'Minipress 2 mg', 'Prazosin 2mg', 2, 1, 97.50, '60', 400),
(110, 'Tambocor 100 mg', 'Flecainide 100mg', 2, 1, 40.80, '60', 300),
(112, 'Onglyza 5 mg', 'Saxagliptin 5mg', 3, 1, 35.00, '30', 150),
(113, 'Glucophage XR 750 mg', 'Metformin XR 750mg', 3, 1, 30.00, '60', 80),
(114, 'Nesina 12.5 mg', 'Alogliptin 12.5mg', 3, 1, 20.00, '30', 300),
(115, 'Glipizide XL 10 mg', 'Glipizide 10mg', 3, 1, 15.00, '30', 300),
(116, 'Glucophage 500 mg', 'Metformin 500mg', 3, 1, 15.00, '30', 250),
(117, 'Januvia 100 mg', 'Sitagliptin 100mg', 3, 1, 40.00, '28', 330),
(118, 'Actos 15 mg', 'Pioglitazone 15mg', 3, 1, 25.00, '30', 430),
(119, 'Victoza 0.6 mg', 'Liraglutide 0.6mg', 3, 1, 60.00, '30', 470),
(120, 'Invokana 300 mg', 'Canagliflozin 300mg', 3, 1, 45.00, '30', 90),
(121, 'Trulicity 1.5 mg', 'Dulaglutide 1.5mg', 3, 1, 70.00, '50', 100),
(122, 'Amaryl 2 mg', 'Glimepiride 2mg', 3, 1, 12.50, '30', 120),
(123, 'Farxiga 10 mg', 'Dapagliflozin 10mg', 3, 1, 50.00, '30', 170),
(124, 'Glucotrol XL 10 mg', 'Glipizide 10mg', 3, 1, 20.00, '30', 230),
(125, 'Glyset 50 mg', 'Miglitol 50mg', 3, 1, 18.00, '30', 150),
(126, 'Starlix 120 mg', 'Nateglinide 120mg', 3, 1, 35.00, '60', 340),
(127, 'Ozempic 0.5 mg', 'Semaglutide 0.5mg', 3, 1, 55.00, '4', 460),
(128, 'Byetta 5 mcg', 'Exenatide 5mcg', 3, 1, 45.00, '30', 300),
(129, 'Tanzeum 30 mg', 'Albiglutide 30mg', 3, 1, 60.00, '4', 170),
(130, 'Nesina 25 mg', 'Alogliptin 25mg', 3, 1, 25.00, '30', 230),
(131, 'Precose 100 mg', 'Acarbose 100mg', 3, 1, 30.00, '30', 150),
(132, 'Jardiance 25 mg', 'Empagliflozin 25mg', 3, 1, 50.00, '30', 350),
(133, 'Glyburide 5 mg', 'Glyburide 5mg', 3, 1, 10.00, '60', 200),
(134, 'Tradjenta 5 mg', 'Linagliptin 5mg', 3, 1, 40.00, '30', 100),
(135, 'Steglatro 15 mg', 'Ertugliflozin 15mg', 3, 1, 45.00, '30', 600),
(136, 'Janumet 50/500 mg', 'Sitagliptin/Metformin 50mg/500mg', 3, 1, 45.00, '60', 150),
(137, 'Glynase 5 mg', 'Glyburide 5mg', 3, 1, 12.00, '30', 100),
(138, 'Kazano 12.5/500 mg', 'Alogliptin/Metformin 12.5mg/500mg', 3, 1, 40.00, '60', 50),
(139, 'Xigduo XR 5/1000 mg', 'Dapagliflozin/Metformin XR 5mg/1000mg', 3, 1, 50.00, '60', 180),
(140, 'Glucotrol 10 mg', 'Glipizide 10mg', 3, 1, 18.00, '60', 140),
(141, 'Ciprofloxacin Ear Drops', 'Ciprofloxacin 0.3% Ear Drops', 4, 3, 350.00, '1', 10),
(142, 'Lubristil Eye Drops', 'Polyvinyl alcohol 1.4%/Povidone 0.6% Eye Drops', 4, 3, 1050.00, '1', 10),
(143, 'Otrivin Nasal Drops', 'Xylometazoline 0.1% Nasal Drops', 4, 3, 875.00, '1', 3),
(144, 'Sofradex Ear Drops', 'Framycetin Sulfate/Dexamethasone 0.5%/0.05% Ear Drops', 4, 3, 200.00, '1', 12),
(145, 'Optive Eye Drops', 'Carboxymethylcellulose 0.5% Eye Drops', 4, 3, 128.00, '1', 9),
(146, 'Beclometasone Nasal Spray', 'Beclometasone 50mcg/dose Nasal Spray', 4, 3, 185.00, '1', 11),
(147, 'Acetic Acid Ear Drops', 'Acetic Acid 2% Ear Drops', 4, 3, 480.00, '1', 8),
(148, 'Gentamicin Eye Drops', 'Gentamicin 0.3% Eye Drops', 4, 3, 150.00, '1', 10),
(149, 'Nasivion Nasal Drops', 'Oxymetazoline 0.05% Nasal Drops', 4, 3, 100.00, '1', 7),
(150, 'Ciprodex Ear Drops', 'Ciprofloxacin/Dexamethasone 0.3%/0.1% Ear Drops', 4, 3, 250.00, '1', 4),
(151, 'Visine Eye Drops', 'Tetrahydrozoline 0.05% Eye Drops', 4, 3, 310.00, '1', 5),
(152, 'Ciprofloxacin Ear Drops', 'Ciprofloxacin 0.3% Ear Drops', 4, 3, 215.00, '1', 4),
(153, 'Lubristil Eye Drops', 'Polyvinyl alcohol 1.4%/Povidone 0.6% Eye Drops', 4, 3, 410.50, '1', 7),
(154, 'Otrivin Nasal Drops', 'Xylometazoline 0.1% Nasal Drops', 4, 3, 875.00, '1', 10),
(155, 'Sofradex Ear Drops', 'Framycetin Sulfate/Dexamethasone 0.5%/0.05% Ear Drops', 4, 3, 800.00, '1', 6),
(156, 'Optive Eye Drops', 'Carboxymethylcellulose 0.5% Eye Drops', 4, 3, 130.00, '1', 5),
(157, 'Beclometasone Nasal Spray', 'Beclometasone 50mcg/dose Nasal Spray', 4, 3, 180.00, '1', 13),
(158, 'Acetic Acid Ear Drops', 'Acetic Acid 2% Ear Drops', 4, 3, 800.00, '1', 17),
(159, 'Gentamicin Eye Drops', 'Gentamicin 0.3% Eye Drops', 4, 3, 150.00, '1', 6),
(160, 'Nasivion Nasal Drops', 'Oxymetazoline 0.05% Nasal Drops', 4, 3, 240.00, '1', 8),
(161, 'Ciprodex Ear Drops', 'Ciprofloxacin/Dexamethasone 0.3%/0.1% Ear Drops', 4, 3, 250.00, '1', 7),
(162, 'Visine Eye Drops', 'Tetrahydrozoline 0.05% Eye Drops', 4, 3, 510.00, '1', 8),
(163, 'Visine Eye Drops', 'Tetrahydrozoline 0.05% Eye Drops', 4, 3, 600.00, '1', 5),
(164, 'Neomycin Ear Drops', 'Neomycin 0.5% Ear Drops', 4, 3, 250.00, '1', 2),
(165, 'Refresh Tears Eye Drops', 'Carboxymethylcellulose 0.5% Eye Drops', 4, 3, 145.00, '1', 6),
(166, 'Oxymetazoline Nasal Drops', 'Oxymetazoline 0.05% Nasal Drops', 4, 3, 975.00, '1', 10),
(167, 'Polymyxin B Ear Drops', 'Polymyxin B 10,000 IU Ear Drops', 4, 3, 180.00, '1', 10),
(168, 'Pataday Eye Drops', 'Olopatadine 0.2% Eye Drops', 4, 3, 220.00, '1', 10),
(169, 'Nasoclear Nasal Drops', 'Sodium Chloride 0.65% Nasal Drops', 4, 3, 750.00, '1', 5),
(170, 'Clotrimazole Ear Drops', 'Clotrimazole 1% Ear Drops', 4, 3, 140.00, '1', 8),
(171, 'Optrex Eye Drops', 'Sodium Cromoglicate 2% Eye Drops', 4, 3, 160.00, '1', 7),
(172, 'Afrin Nasal Spray', 'Oxymetazoline 0.05% Nasal Spray', 4, 3, 115.00, '1', 6),
(173, 'Mycostatin Ear Drops', 'Nystatin 100,000 IU Ear Drops', 4, 3, 200.00, '1', 10),
(174, 'Axcil 500mg Tablets', 'Amoxicillin 500mg', 5, 1, 30.00, '35', 150),
(175, 'Ciprobid 250mg Tablets', 'Ciprofloxacin 250mg', 5, 1, 15.00, '20', 70),
(176, 'Doxyn 100mg Tablets', 'Doxycycline 100mg', 5, 1, 12.00, '100', 170),
(177, 'Metronid 400mg Tablets', 'Metronidazole 400mg', 5, 1, 8.50, '100', 290),
(178, 'Azee 500mg Tablets', 'Azithromycin 500mg', 5, 1, 20.00, '50', 210),
(179, 'Amoxicillin 250mg Capsules-SPC', 'Amoxicillin 250mg', 5, 2, 8.00, '500', 180),
(180, 'Cephadex 500mg Capsules', 'Cephalexin 500mg', 5, 2, 12.00, '50', 160),
(181, 'Claritex 250mg Capsules', 'Clarithromycin 250mg', 5, 2, 18.00, '50', 270),
(182, 'Erythromycin 250mg Capsules', 'Erythromycin 250mg', 5, 2, 15.00, '100', 450),
(183, 'Ciprobid 500mg Capsules', 'Ciprofloxacin 500mg', 5, 2, 25.00, '50', 130),
(184, 'Axcil 125mg/5ml Syrup', 'Amoxicillin 125mg/5ml', 5, 3, 650.00, '1', 107),
(185, 'Cephadex 250mg/5ml Syrup', 'Cephalexin 250mg/5ml', 5, 3, 800.00, '1', 5),
(186, 'Claritex 125mg/5ml Syrup', 'Clarithromycin 125mg/5ml', 5, 3, 410.00, '1', 6),
(187, 'Azee 200mg/5ml Syrup', 'Azithromycin 200mg/5ml', 5, 3, 512.00, '1', 18),
(188, 'Metronid 200mg/5ml Syrup', 'Metronidazole 200mg/5ml', 5, 3, 7.50, '1', 4),
(189, 'Amoxin 500mg Tablets', 'Amoxicillin 500mg', 5, 1, 32.00, '100', 300),
(190, 'Cipra 250mg Tablets', 'Ciprofloxacin 250mg', 5, 1, 35.00, '14', 140),
(191, 'Axcil 250mg Capsules', 'Amoxicillin 250mg', 5, 2, 31.00, '35', 250),
(192, 'Cephadex 500mg Capsules', 'Cephalexin 500mg', 5, 2, 34.00, '14', 270),
(193, 'Axcil 250mg/5ml Syrup', 'Amoxicillin 125mg/5ml', 5, 3, 300.00, '1', 6),
(194, 'Cephixin 250mg/5ml Syrup', 'Cephalexin 250mg/5ml', 5, 3, 320.00, '1', 5),
(195, 'Omez 20mg Tablets', 'Omeprazole 20mg', 6, 1, 35.20, '14', 100),
(196, 'Pantodac 40mg Tablets', 'Pantoprazole 40mg', 6, 1, 38.50, '10', 190),
(197, 'Esome 40mg Capsules', 'Esomeprazole 40mg', 6, 2, 40.10, '14', 50),
(198, 'Rabez 20mg Capsules', 'Rabeprazole 20mg', 6, 2, 35.00, '10', 100),
(199, 'Sucralfate 1g/5ml Syrup', 'Sucralfate 1g/5ml', 6, 3, 320.00, '1', 6),
(200, 'Domperidone 10mg/5ml Syrup', 'Domperidone 10mg/5ml', 6, 3, 330.00, '1', 5),
(202, 'Pantop 80mg Repository', 'Pantoprazole 80mg', 6, 4, 350.80, '5', 220),
(203, 'Ranidine 150mg Tablets', 'Ranitidine 150mg', 6, 1, 32.20, '14', 190),
(204, 'Esome 20mg Tablets', 'Esomeprazole 20mg', 6, 1, 43.20, '10', 150),
(205, 'Lansoprazole 30mg-SPC Tablets', 'Lansoprazole 30mg', 6, 1, 44.00, '14', 130),
(206, 'Pantoprazole 20mg-SPC Tablets', 'Pantoprazole 20mg', 6, 1, 35.40, '10', 230),
(207, 'Famot 40mg Tablets', 'Famotidine 40mg', 6, 1, 36.50, '14', 130),
(208, 'Radine 300mg Capsules', 'Ranitidine 300mg', 6, 2, 27.00, '10', 180),
(209, 'Eso 40mg Capsules', 'Esomeprazole 40mg', 6, 2, 18.00, '14', 140),
(210, 'Lanse 15mg Capsules', 'Lansoprazole 15mg', 6, 2, 39.00, '10', 230),
(211, 'Pantod 40mg Capsules', 'Pantoprazole 40mg', 6, 2, 40.00, '14', 400),
(212, 'Famot 20mg Capsules', 'Famotidine 20mg', 6, 2, 41.00, '10', 250),
(213, 'Sucra 1g/5ml Syrup', 'Sucralfate 1g/5ml', 6, 3, 320.00, '100 ml', 13),
(214, 'Domper 10mg/5ml Syrup', 'Domperidone 10mg/5ml', 6, 3, 330.00, '100 ml', 20),
(215, 'Metoclopramide 5mg/5ml Syrup-SPC', 'Metoclopramide 5mg/5ml', 6, 3, 340.00, '100 ml', 7),
(216, 'Ondans 4mg/5ml Syrup', 'Ondansetron 4mg/5ml', 6, 3, 350.00, '50 ml', 6),
(217, 'Esome 10mg/5ml Syrup', 'Esomeprazole 10mg/5ml', 6, 3, 360.00, '100 ml', 6),
(218, 'Aceta 500mg Tablets', 'Acetaminophen 500mg', 6, 1, 29.00, '20', 250),
(219, 'Aspirin 325mg Tablets-SPC', 'Aspirin 325mg', 6, 1, 18.00, '50', 300),
(220, 'Ranit 150mg Capsules', 'Ranitidine 150mg', 6, 2, 45.95, '20', 190),
(221, 'Famone 20mg Capsules', 'Famotidine 20mg', 6, 2, 28.50, '30', 250),
(222, 'Sucralfate 1g/5ml Syrup-SPC', 'Sucralfate 1g/5ml', 6, 3, 320.00, '100 ml', 9),
(223, 'Domperidone 10mg/5ml Syrup-SPC', 'Domperidone 10mg/5ml', 6, 3, 330.00, '150 ml', 6),
(224, 'Metoclop 5mg/5ml Syrup', 'Metoclopramide 5mg/5ml', 6, 3, 340.00, '100 ml', 8),
(225, 'Panadol 500mg Tablets', 'Paracetamol 500mg', 7, 1, 5.00, '144', 250),
(226, 'Ibuprofen 200mg Tablets-SPC', 'Ibuprofen 200mg', 7, 1, 55.00, '30', 160),
(227, 'Aspin 100mg Tablets', 'Aspirin 100mg', 7, 1, 45.00, '50', 300),
(228, 'Diclofen 50mg Tablets', 'Diclofenac 50mg', 7, 1, 58.00, '50', 200),
(229, 'Naprox 250mg Tablets', 'Naproxen 250mg', 7, 1, 59.00, '50', 560),
(230, 'Parace 250mg Capsules', 'Paracetamol 250mg', 7, 2, 27.80, '50', 300),
(231, 'Profen 400mg Capsules', 'Ibuprofen 400mg', 7, 2, 75.20, '20', 240),
(232, 'Aspin 200mg Capsules', 'Aspirin 200mg', 7, 2, 65.60, '100', 300),
(233, 'Dec 100mg Capsules', 'Diclofenac 100mg', 7, 2, 28.40, '100', 600),
(234, 'Naprox 500mg Capsules', 'Naproxen 500mg', 7, 2, 49.00, '50', 280),
(235, 'Gaba 100mg Tablets', 'Gabapentin 100mg', 8, 1, 55.00, '10', 350),
(236, 'Carbzine 200mg Tablets', 'Carbamazepine 200mg', 8, 1, 50.00, '10', 200),
(237, 'Amit 25mg Tablets', 'Amitriptyline 25mg', 8, 1, 45.00, '30', 150),
(238, 'Pregab 75mg Tablets', 'Pregabalin 75mg', 8, 1, 58.00, '10', 100),
(239, 'Nortriptyline 10mg Tablets- SPC', 'Nortriptyline 10mg', 8, 1, 59.00, '30', 140),
(240, 'Dulox 20mg Tablets', 'Duloxetine 20mg', 8, 1, 55.00, '20', 480),
(241, 'Col 0.5mg Tablets', 'Clonazepam 0.5mg', 8, 1, 52.00, '100', 800),
(242, 'Phenob 30mg Capsules', 'Phenobarbital 30mg', 8, 2, 49.00, '25', 700),
(243, 'Ramate 25mg Capsules', 'Topiramate 25mg', 8, 2, 56.00, '50', 600),
(244, 'Trigine 50mg Tablets', 'Lamotrigine 50mg', 8, 1, 59.00, '30', 260),
(245, 'Dulox 50mg Tablets', 'Duloxetine 50mg', 8, 1, 65.25, '20', 520),
(246, 'Dulox 100mg Tablets', 'Duloxetine 100mg', 8, 1, 75.50, '50', 150),
(247, 'Sertral 50mg Tablets', 'Sertraline 50mg', 9, 1, 85.00, '14', 80),
(248, 'Fluoxetine 20mg Tablets', 'Fluoxetine 20mg', 9, 1, 38.00, '10', 60),
(249, 'Cital 20mg Tablets', 'Citalopram 20mg', 9, 1, 52.80, '10', 110),
(250, 'Escitalo 10mg Tablets', 'Escitalopram 10mg', 9, 1, 85.00, '14', 140),
(251, 'Venl 75mg Tablets', 'Venlafaxine 75mg', 9, 1, 80.10, '10', 230),
(252, 'Mirtaz 15mg Tablets', 'Mirtazapine 15mg', 9, 1, 75.00, '30', 150),
(253, 'Bupro 150mg Tablets', 'Bupropion 150mg', 9, 1, 85.00, '50', 140),
(255, 'Quet 25mg Tablets', 'Quetiapine 25mg', 9, 1, 85.00, '10', 180),
(256, 'Arip 10mg Tablets', 'Aripiprazole 10mg', 8, 1, 85.00, '15', 150),
(257, 'Rispe 2mg Tablets', 'Risperidone 2mg', 8, 1, 79.00, '30', 300),
(258, 'Olanza 5mg Tablets', 'Olanzapine 5mg', 8, 1, 75.00, '20', 240),
(259, 'Haloper 1mg Tablets', 'Haloperidol 1mg', 8, 1, 65.00, '25', 260),
(260, 'Chlorpromazine 25mg Tablets-SPC', 'Chlorpromazine 25mg', 8, 1, 60.00, '100', 180),
(262, 'Valper 200mg Tablets', 'Valproate 200mg', 8, 1, 80.00, '20', 190),
(264, 'Diazepa 5mg Tablets', 'Diazepam 5mg', 8, 1, 70.00, '20', 130),
(265, 'Loraze 1mg Tablets', 'Lorazepam 1mg', 8, 1, 88.00, '30', 320),
(266, 'Clonaze 0.5mg Tablets', 'Clonazepam 0.5mg', 8, 1, 89.00, '20', 270),
(270, 'Minterra Tablets', 'Vitamin A 5000 IU', 10, 1, 120.00, '30', 310),
(271, 'Beroca 100mg Tablets', 'Vitamin B1 100mg', 10, 1, 100.00, '60', 350),
(272, 'Becosules B12 500mg Tablets', 'Vitamin B12 500mg', 10, 1, 80.00, '60', 220),
(273, 'Becom-C 1000mcg Tablets', 'Vitamin B12 1000mcg', 10, 1, 140.00, '30', 300),
(274, 'Vita C 500mg Tablets', 'Vitamin C 500mg', 10, 1, 90.00, '60', 280),
(275, 'CAD D Tablets', 'Vitamin D 400 IU', 10, 1, 130.00, '30', 160),
(276, 'Vitae E 400 IU Tablets', 'Vitamin E 400 IU', 10, 1, 110.00, '60', 90),
(277, 'FA1 5mg Tablets', 'Folic Acid 5mg', 10, 1, 70.00, '60', 170),
(278, 'Menopace Tablets', 'Multivitamin', 10, 1, 140.00, '30', 200),
(279, 'Biovita 5000mcg Tablets', 'Biotin 5000mcg', 10, 1, 130.00, '30', 250),
(280, 'Forceval Capsules', 'Prenatal Multivitamin', 10, 2, 140.00, '30', 300),
(281, 'Omega-3 Capsules', 'Multivitamin with Omega-3', 10, 2, 135.00, '30', 280),
(282, 'Perfectil Capsules', 'Multivitamin for Hair, Skin & Nails', 10, 2, 125.00, '30', 240),
(283, 'Orslim Capsules', 'Multivitamin for Immune Support', 10, 2, 145.00, '30', 240),
(284, 'Zifam Capsules', 'Multivitamin with Antioxidants', 10, 2, 138.00, '30', 200),
(285, 'Cartigen Capsules', 'Multivitamin for Bone Health', 10, 2, 140.00, '30', 10),
(286, 'OralDox 50mg Tablets', 'Doxycycline 50mg', 11, 1, 80.00, '10', 200),
(287, 'Nystatin Tablets', 'Nystatin 100,000 IU', 11, 1, 70.00, '30', 250),
(288, 'OralZole 20mg Tablets', 'Omeprazole 20mg', 6, 1, 85.00, '14', 200),
(289, 'Flucon 50mg Tablets', 'Fluconazole 50mg', 11, 1, 75.00, '10', 200),
(290, 'Metro 200mg Tablets', 'Metronidazole 200mg', 11, 1, 60.00, '20', 350),
(291, 'Acyclo 200mg Tablets', 'Acyclovir 200mg', 11, 1, 85.00, '10', 50),
(292, 'Clinda 150mg Tablets', 'Clindamycin 150mg', 11, 1, 80.00, '10', 400),
(293, 'Ketra 5mg Tablets', 'Ketoconazole 5mg', 11, 1, 70.00, '10', 350),
(294, 'Mycosta 100mg Tablets', 'Mycostatin 100mg', 11, 1, 80.00, '30', 270),
(295, 'Diflu 50mg Tablets', 'Diflucan 50mg', 11, 1, 90.00, '10', 310),
(296, 'Broncho 5mg Tablets', 'Salbutamol 5mg', 12, 1, 80.00, '20', 90),
(297, 'Cetra 10mg Tablets', 'Cetirizine 10mg', 12, 1, 85.00, '10', 120),
(298, 'Monti 10mg Tablets', 'Montelukast 10mg', 12, 1, 70.00, '14', 60),
(299, 'Theo 200mg Tablets', 'Theophylline 200mg', 12, 1, 60.00, '20', 280),
(300, 'Muci 8mg Tablets', 'Bromhexine 8mg', 12, 1, 75.00, '10', 190),
(301, 'Antihis 25mg Tablets', 'Diphenhydramine 25mg', 12, 1, 50.00, '30', 160),
(302, 'Broncof Syrup', 'Salbutamol Syrup', 12, 3, 250.00, '100ml', 10),
(303, 'Cetra Syrup', 'Cetirizine Syrup', 12, 3, 200.00, '60ml', 2),
(304, 'Mucot Syrup', 'Bromhexine Syrup', 12, 3, 220.00, '100ml', 10),
(305, 'Antihis Syrup', 'Diphenhydramine Syrup', 12, 3, 180.00, '100ml', 10),
(306, 'Clobet Cream', 'Clobetasol Propionate 0.05%', 13, 6, 250.00, '15g', 12),
(307, 'Betnovate Cream', 'Betamethasone 0.1%', 13, 6, 230.00, '15g', 12),
(308, 'Fucidin Cream', 'Fusidic Acid 2%', 13, 6, 270.00, '15g', 4),
(309, 'Neosporin Cream', 'Neomycin Sulfate 1%', 13, 6, 210.00, '15g', 12),
(310, 'Hydrozole Cream', 'Hydrocortisone 1% + Clotrimazole 1%', 13, 6, 290.00, '5g', 18),
(311, 'Dermovate Cream', 'Clobetasol Propionate 0.05%', 13, 6, 260.00, '15g', 5),
(312, 'Elocon Cream', 'Mometasone Furoate 0.1%', 13, 6, 280.00, '5g', 4),
(313, 'Trosyd Cream', 'Tioconazole 1%', 13, 6, 240.00, '15g', 12),
(314, 'Zovirax Cream', 'Acyclovir 5%', 13, 6, 220.00, '15g', 12),
(315, 'Kenacomb Cream', 'Triamcinolone Acetonide 0.1%', 13, 6, 200.00, '15g', 10),
(316, 'Tiger Balm', 'Menthol & Camphor', 14, 7, 180.00, '30g', 20),
(317, 'Vicks VapoRub', 'Menthol & Eucalyptus Oil', 14, 7, 150.00, '25g', 10),
(318, 'Amrutanjan Balm', 'Menthol & Camphor', 14, 7, 170.00, '30g', 12),
(319, 'Siddhalepa Balm 25g', 'Herbal Extracts', 14, 7, 160.00, '25g', 15),
(320, 'Siddhalepa Balm 50g', 'Herbal Extracts', 14, 7, 190.00, '30g', 10),
(321, 'Dettol 50ml', 'Chloroxylenol', 14, 3, 180.00, '50ml', 20),
(322, 'Savlon Antiseptic', 'Cetrimide & Chlorhexidine', 14, 3, 170.00, '100ml', 8),
(323, 'Lifebuoy Liquid', 'Phenol', 14, 3, 160.00, '100ml', 10),
(324, 'Hansaplast', 'Adhesive Bandages', 14, 7, 120.00, '10 strip', 20),
(325, 'Cotton Wool', '100% Cotton', 14, 7, 100.00, '50g', 20),
(326, 'Levothyrox 50mcg Tablets', 'Levothyroxine 50mcg', 15, 1, 80.00, '30', 260),
(327, 'Levo 500mg Tablets', 'Levothyroxine 50mcg', 15, 1, 70.00, '20', 200),
(328, 'Gliben 5mg Tablets', 'Glibenclamide 5mg', 15, 1, 90.00, '30', 150),
(329, 'Pioglit 15mg Tablets', 'Pioglitazone 15mg', 15, 1, 85.00, '28', 250),
(330, 'Gliclaz 80mg Tablets', 'Gliclazide 80mg', 3, 1, 75.00, '30', 200),
(333, 'Panadol', 'Paracetamol', 7, 4, 0.00, '5', 0),
(334, 'Mixtard', 'Insulin 5ml', 3, 5, 0.00, '5', 0),
(335, 'meta', 'metformin 500mg', 3, 1, 0.00, '50', 0),
(336, 'AXIL', 'AMOXICILLIN', 12, 2, 0.00, '50', 0);

-- --------------------------------------------------------

--
-- Table structure for table `medicinecategory`
--

CREATE TABLE `medicinecategory` (
  `mdct_id` tinyint(2) NOT NULL,
  `mdct_name` varchar(50) NOT NULL,
  `mdct_code` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medicinecategory`
--

INSERT INTO `medicinecategory` (`mdct_id`, `mdct_name`, `mdct_code`) VALUES
(1, 'Drugs for Animals', 'DA'),
(2, 'Drugs for Anxiety', 'DC'),
(3, 'Drugs for Diabetics', 'DD'),
(4, 'Drugs for Ear / Eye / Nose', 'DE'),
(5, 'Drugs for Infections', 'DF'),
(6, 'Drugs for Digestive System', 'DG'),
(7, 'Drugs for Pain', 'DJ'),
(8, 'Drugs for Nerve System', 'DL'),
(9, 'Drugs for Mental Health', 'DM'),
(10, 'Drugs for Nutrition', 'DN'),
(11, 'Drugs for Oral Diseases', 'DO'),
(12, 'Drugs for Respiratory System', 'DR'),
(13, 'Drugs for Skin', 'DS'),
(14, 'Drugs for Other', 'DT'),
(15, 'Drugs for Hormone Diseases', 'DU'),
(40, 'Drugs for sugars', 'DZ');

-- --------------------------------------------------------

--
-- Table structure for table `ordermedicine`
--

CREATE TABLE `ordermedicine` (
  `odmd_id` smallint(6) NOT NULL,
  `odmd_orderid` mediumint(5) NOT NULL,
  `odmd_mdid` mediumint(6) NOT NULL,
  `odmd_quantity` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ordertable`
--

CREATE TABLE `ordertable` (
  `order_id` mediumint(5) NOT NULL,
  `order_userid` tinyint(2) NOT NULL,
  `order_spid` int(2) NOT NULL,
  `order_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` varchar(10) NOT NULL,
  `role_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
('1', 'Manager'),
('2', 'Cashier'),
('3', 'Purchasing Clerk'),
('4', 'Inventory Clerk'),
('5', 'Staff');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `sp_id` int(2) NOT NULL,
  `sp_fname` varchar(20) NOT NULL,
  `sp_lname` varchar(20) NOT NULL,
  `sp_companyname` varchar(50) NOT NULL,
  `sp_pno` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`sp_id`, `sp_fname`, `sp_lname`, `sp_companyname`, `sp_pno`) VALUES
(1, 'Kasun', 'Fernando', 'Astron LTD', '0777593701'),
(2, 'Nimal', 'Perera', 'Baurs & Company (PVT)LTD', '0718976568'),
(3, 'John', 'Doe', 'AstraZeneca Pharmaceuticals', '0712345678'),
(4, 'Jane', 'Smith', 'Sri Lanka Pharmaceutical Corporation', '0723456789'),
(5, 'James', 'Brown', 'Hemas Pharmaceuticals', '0734567890'),
(6, 'Emily', 'Johnson', 'Swiss Pharma (Pvt)LTD', '0745678901'),
(7, 'Michael', 'Williams', 'Zahara Group', '0756789012'),
(8, 'Sarah', 'Jones', 'George Steuart Health', '0767890123'),
(9, 'David', 'Taylor', 'Durdans Pharmaceuticals', '0778901234'),
(10, 'Laura', 'Davis', 'Salus International ', '0789012345'),
(11, 'Robert', 'Miller', 'Ceymed Pharmaceuticals', '0790123456'),
(12, 'Jessica', 'Wilson', 'Healthguard Pharmacy', '0701234567'),
(13, 'Daniel', 'Moore', 'Sunshine Healthcare ', '0712345678'),
(14, 'Sophia', 'Martinez', 'Global Surgical Prod', '0723456789');

-- --------------------------------------------------------

--
-- Table structure for table `supply`
--

CREATE TABLE `supply` (
  `sply_spid` int(2) NOT NULL,
  `sply_mdid` mediumint(9) NOT NULL,
  `sply_quantity` smallint(3) NOT NULL,
  `sply_datetime` datetime NOT NULL,
  `sply_expiredate` date NOT NULL,
  `sply_stockid` smallint(5) NOT NULL,
  `sply_unit_buying_price` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supply`
--

INSERT INTO `supply` (`sply_spid`, `sply_mdid`, `sply_quantity`, `sply_datetime`, `sply_expiredate`, `sply_stockid`, `sply_unit_buying_price`) VALUES
(3, 7, 500, '2024-05-07 15:00:00', '2024-10-23', 13, 23.00),
(3, 7, 20, '2024-05-07 15:00:00', '2026-06-19', 15, 23.54),
(1, 8, 300, '2024-05-08 14:47:00', '2027-07-11', 18, 35.00),
(1, 8, 100, '2024-06-02 13:48:00', '2026-06-23', 19, 36.41),
(3, 7, 100, '2024-06-03 12:39:00', '2026-06-04', 20, 45.00),
(1, 13, 500, '2024-05-27 12:42:00', '2024-06-18', 21, 45.10),
(1, 31, 200, '2024-05-07 14:41:07', '2026-03-19', 22, 16.50),
(1, 32, 200, '2024-05-07 14:41:07', '2027-06-17', 23, 15.52),
(1, 35, 200, '2024-05-07 14:41:07', '2025-05-08', 24, 27.94),
(1, 37, 150, '2024-05-07 14:41:07', '2026-09-10', 25, 15.50),
(1, 38, 3, '2024-05-07 14:41:07', '2026-10-30', 26, 900.00),
(1, 39, 3, '2024-05-07 14:41:07', '2026-10-23', 27, 2250.00),
(1, 40, 2, '2024-05-07 14:41:07', '2026-10-12', 28, 2600.00),
(1, 141, 50, '2024-05-07 10:00:00', '2025-03-15', 30, 300.00),
(1, 142, 100, '2024-05-07 10:00:00', '2025-04-10', 31, 950.00),
(1, 143, 200, '2024-05-07 10:00:00', '2025-06-01', 32, 850.00),
(1, 174, 150, '2024-05-07 10:00:00', '2025-07-10', 33, 25.50),
(1, 184, 120, '2024-05-07 10:00:00', '2025-08-05', 34, 600.00),
(1, 191, 250, '2024-05-07 10:00:00', '2025-09-25', 35, 30.40),
(1, 193, 180, '2024-05-07 10:00:00', '2025-10-10', 36, 290.00),
(1, 197, 50, '2024-05-14 12:19:00', '2026-02-01', 37, 38.50),
(1, 198, 100, '2024-05-14 12:19:00', '2026-03-10', 38, 29.50),
(1, 204, 150, '2024-05-14 12:19:00', '2026-04-15', 39, 41.00),
(1, 217, 200, '2024-05-14 12:19:00', '2026-05-20', 40, 320.00),
(1, 225, 250, '2024-05-14 12:19:00', '2026-06-25', 41, 24.00),
(1, 247, 80, '2024-05-14 12:19:00', '2026-07-30', 42, 26.50),
(1, 248, 60, '2024-05-14 12:19:00', '2026-08-05', 43, 28.00),
(1, 296, 90, '2024-05-14 12:19:00', '2026-09-10', 44, 29.50),
(1, 297, 120, '2024-05-14 12:19:00', '2026-10-15', 45, 31.00),
(2, 44, 80, '2024-05-15 14:19:00', '2026-02-01', 46, 1500.00),
(2, 46, 120, '2024-05-15 14:19:00', '2026-03-10', 47, 620.00),
(2, 54, 60, '2024-05-15 14:19:00', '2026-04-15', 48, 670.00),
(2, 63, 200, '2024-05-15 14:19:00', '2026-05-20', 49, 720.00),
(2, 64, 150, '2024-05-15 14:19:00', '2026-06-25', 50, 550.00),
(2, 65, 100, '2024-05-15 14:19:00', '2026-07-30', 51, 550.00),
(2, 112, 90, '2024-05-15 14:19:00', '2026-08-05', 52, 25.75),
(2, 144, 180, '2024-05-15 14:19:00', '2026-09-10', 53, 190.00),
(2, 145, 75, '2024-05-15 14:19:00', '2026-10-15', 54, 125.00),
(2, 146, 140, '2024-05-15 14:19:00', '2026-11-20', 55, 170.00),
(2, 147, 200, '2024-05-15 14:19:00', '2026-12-25', 56, 450.00),
(2, 175, 70, '2024-05-15 14:19:00', '2026-02-01', 57, 13.50),
(2, 183, 130, '2024-05-15 14:19:00', '2026-03-10', 58, 20.50),
(2, 195, 100, '2024-05-15 14:19:00', '2026-04-15', 59, 32.25),
(2, 196, 190, '2024-05-15 14:19:00', '2026-05-20', 60, 33.75),
(2, 249, 110, '2024-05-15 14:19:00', '2026-06-25', 61, 45.00),
(2, 250, 140, '2024-05-15 14:19:00', '2026-07-30', 62, 76.50),
(2, 251, 230, '2024-05-15 14:19:00', '2026-08-05', 63, 77.75),
(2, 252, 150, '2024-05-15 14:19:00', '2026-09-10', 64, 68.50),
(2, 276, 90, '2024-05-15 14:19:00', '2026-10-15', 65, 100.00),
(2, 277, 170, '2024-05-15 14:19:00', '2026-11-20', 66, 62.00),
(2, 278, 200, '2024-05-15 14:19:00', '2026-12-25', 67, 135.00),
(2, 298, 60, '2024-05-15 14:19:00', '2026-02-01', 68, 65.00),
(3, 18, 100, '2024-05-16 15:10:00', '2026-02-01', 69, 20.00),
(3, 22, 150, '2024-05-16 15:10:00', '2026-03-10', 70, 92.50),
(3, 67, 200, '2024-05-16 15:10:00', '2026-04-15', 71, 1.00),
(3, 110, 300, '2024-05-16 15:10:00', '2026-05-20', 72, 56.80),
(3, 113, 80, '2024-05-16 15:10:00', '2026-06-25', 73, 24.50),
(3, 116, 250, '2024-05-16 15:10:00', '2026-07-30', 74, 13.00),
(3, 148, 180, '2024-05-16 15:10:00', '2026-08-05', 75, 120.00),
(3, 149, 120, '2024-05-16 15:10:00', '2026-09-10', 76, 90.00),
(3, 151, 230, '2024-05-16 15:10:00', '2026-10-15', 77, 300.00),
(3, 176, 170, '2024-05-16 15:10:00', '2026-11-20', 78, 9.75),
(3, 177, 290, '2024-05-16 15:10:00', '2026-12-25', 79, 5.50),
(3, 178, 210, '2024-05-16 15:10:00', '2026-02-01', 80, 14.75),
(3, 199, 160, '2024-05-16 15:10:00', '2026-03-10', 81, 300.00),
(3, 200, 130, '2024-05-16 15:10:00', '2026-04-15', 82, 310.00),
(3, 202, 220, '2024-05-16 15:10:00', '2026-06-25', 84, 320.00),
(3, 253, 140, '2024-05-16 15:10:00', '2026-07-30', 85, 71.00),
(3, 255, 180, '2024-05-16 15:10:00', '2026-08-05', 86, 82.75),
(3, 266, 270, '2024-05-16 15:10:00', '2026-09-10', 87, 74.00),
(3, 270, 310, '2024-05-16 15:10:00', '2026-10-15', 88, 100.00),
(3, 271, 350, '2024-05-16 15:10:00', '2026-11-20', 89, 80.00),
(3, 272, 220, '2024-05-16 15:10:00', '2026-12-25', 90, 60.00),
(3, 299, 280, '2024-05-16 15:10:00', '2026-02-01', 91, 50.00),
(3, 326, 260, '2024-05-16 15:10:00', '2026-03-10', 92, 70.00),
(4, 69, 100, '2024-05-17 15:00:00', '2026-02-01', 93, 19.00),
(4, 70, 150, '2024-05-17 15:00:00', '2026-03-10', 94, 35.50),
(4, 71, 200, '2024-05-17 15:00:00', '2026-04-15', 95, 61.00),
(4, 79, 300, '2024-05-17 15:00:00', '2026-05-20', 96, 2.00),
(4, 80, 250, '2024-05-17 15:00:00', '2026-06-25', 97, 3.00),
(4, 179, 180, '2024-05-17 15:00:00', '2026-07-30', 98, 7.50),
(4, 205, 130, '2024-05-17 15:00:00', '2026-08-05', 99, 40.75),
(4, 206, 230, '2024-05-17 15:00:00', '2026-09-10', 100, 32.50),
(4, 215, 170, '2024-05-17 15:00:00', '2026-10-15', 101, 330.00),
(4, 222, 290, '2024-05-17 15:00:00', '2026-11-20', 102, 300.00),
(4, 223, 210, '2024-05-17 15:00:00', '2026-12-25', 103, 300.00),
(4, 226, 160, '2024-05-17 15:00:00', '2026-02-01', 104, 45.00),
(4, 239, 140, '2024-05-17 15:00:00', '2026-03-10', 105, 51.75),
(4, 260, 180, '2024-05-17 15:00:00', '2026-04-15', 106, 50.75),
(4, 294, 270, '2024-05-17 15:00:00', '2026-05-20', 107, 74.25),
(4, 295, 310, '2024-05-17 15:00:00', '2026-06-25', 108, 86.00),
(5, 66, 120, '2024-05-17 16:15:00', '2026-02-01', 109, 68.50),
(5, 81, 150, '2024-05-17 16:15:00', '2026-03-10', 110, 19.75),
(5, 102, 200, '2024-05-17 16:15:00', '2026-04-15', 111, 18.25),
(5, 103, 250, '2024-05-17 16:15:00', '2026-05-20', 112, 31.50),
(5, 114, 300, '2024-05-17 16:15:00', '2026-06-25', 113, 17.75),
(5, 139, 180, '2024-05-17 16:15:00', '2026-07-30', 114, 43.50),
(5, 140, 140, '2024-05-17 16:15:00', '2026-08-05', 115, 16.25),
(5, 150, 4, '2024-05-17 16:15:00', '2026-09-10', 116, 240.00),
(5, 152, 4, '2024-05-17 16:15:00', '2026-10-15', 117, 200.00),
(5, 153, 7, '2024-05-17 16:15:00', '2026-11-20', 118, 400.00),
(5, 154, 10, '2024-05-17 16:15:00', '2026-12-25', 119, 850.00),
(5, 180, 160, '2024-05-17 16:15:00', '2026-02-01', 120, 10.50),
(5, 185, 5, '2024-05-17 16:15:00', '2026-03-10', 121, 790.00),
(5, 192, 270, '2024-05-17 16:15:00', '2026-04-15', 122, 33.25),
(5, 203, 190, '2024-05-17 16:15:00', '2026-05-20', 123, 28.00),
(5, 207, 130, '2024-05-17 16:15:00', '2026-06-25', 124, 34.50),
(5, 212, 250, '2024-05-17 16:15:00', '2026-07-30', 125, 39.00),
(5, 273, 300, '2024-05-17 16:15:00', '2026-08-05', 126, 72.50),
(5, 274, 280, '2024-05-17 16:15:00', '2026-09-10', 127, 88.75),
(5, 275, 160, '2024-05-17 16:15:00', '2026-10-15', 128, 120.25),
(5, 300, 190, '2024-05-17 16:15:00', '2026-11-20', 129, 72.50),
(5, 321, 210, '2024-05-17 16:15:00', '2026-12-25', 130, 170.00),
(6, 68, 150, '2024-05-17 17:00:00', '2026-02-01', 131, 35.50),
(6, 73, 200, '2024-05-17 17:00:00', '2026-03-10', 132, 39.75),
(6, 74, 250, '2024-05-17 17:00:00', '2026-04-15', 133, 69.25),
(6, 101, 300, '2024-05-17 17:00:00', '2026-05-20', 134, 8.50),
(6, 108, 200, '2024-05-17 17:00:00', '2026-06-25', 135, 58.75),
(6, 115, 300, '2024-05-17 17:00:00', '2026-07-30', 136, 13.50),
(6, 132, 350, '2024-05-17 17:00:00', '2026-08-05', 137, 48.25),
(6, 155, 6, '2024-05-17 17:00:00', '2026-09-10', 138, 750.00),
(6, 156, 5, '2024-05-17 17:00:00', '2026-10-15', 139, 120.00),
(6, 181, 270, '2024-05-17 17:00:00', '2026-11-20', 140, 16.75),
(6, 186, 6, '2024-05-17 17:00:00', '2026-12-25', 141, 400.00),
(6, 208, 180, '2024-05-17 17:00:00', '2026-02-01', 142, 25.50),
(6, 209, 140, '2024-05-17 17:00:00', '2026-03-10', 143, 16.75),
(6, 210, 230, '2024-05-17 17:00:00', '2026-04-15', 144, 35.25),
(6, 262, 190, '2024-05-17 17:00:00', '2026-05-20', 145, 78.00),
(6, 264, 130, '2024-05-17 17:00:00', '2026-06-25', 146, 68.25),
(6, 279, 250, '2024-05-17 17:00:00', '2026-07-30', 147, 128.00),
(6, 280, 300, '2024-05-17 17:00:00', '2026-08-05', 148, 138.50),
(6, 281, 280, '2024-05-17 17:00:00', '2026-09-10', 149, 132.75),
(6, 301, 160, '2024-05-17 17:00:00', '2026-10-15', 150, 45.25),
(6, 302, 10, '2024-05-17 17:00:00', '2026-11-20', 151, 230.00),
(7, 72, 200, '2024-05-18 15:40:00', '2026-02-01', 152, 47.50),
(7, 82, 150, '2024-05-18 15:40:00', '2026-03-10', 153, 18.25),
(7, 99, 220, '2024-05-18 15:40:00', '2026-04-15', 154, 42.50),
(7, 109, 170, '2024-05-18 15:40:00', '2026-05-20', 155, 15.75),
(7, 117, 180, '2024-05-18 15:40:00', '2026-06-25', 156, 37.50),
(7, 118, 230, '2024-05-18 15:40:00', '2026-07-30', 157, 22.25),
(7, 119, 250, '2024-05-18 15:40:00', '2026-08-05', 158, 58.75),
(7, 157, 8, '2024-05-18 15:40:00', '2026-09-10', 159, 160.00),
(7, 158, 7, '2024-05-18 15:40:00', '2026-10-15', 160, 780.00),
(7, 182, 170, '2024-05-18 15:40:00', '2026-11-20', 161, 14.50),
(7, 187, 8, '2024-05-18 15:40:00', '2026-12-25', 162, 500.00),
(7, 188, 220, '2024-05-18 15:40:00', '2026-02-01', 163, 5.50),
(7, 211, 140, '2024-05-18 15:40:00', '2026-03-10', 164, 34.75),
(7, 213, 5, '2024-05-18 15:40:00', '2026-04-15', 165, 310.00),
(7, 214, 10, '2024-05-18 15:40:00', '2026-05-20', 166, 310.00),
(7, 265, 150, '2024-05-18 15:40:00', '2026-06-25', 167, 81.75),
(7, 303, 7, '2024-05-18 15:40:00', '2026-07-30', 168, 190.00),
(7, 304, 10, '2024-05-18 15:40:00', '2026-08-05', 169, 200.00),
(7, 305, 10, '2024-05-18 15:40:00', '2026-09-10', 170, 170.00),
(8, 75, 150, '2024-05-18 17:30:00', '2026-02-01', 171, 25.50),
(8, 76, 200, '2024-05-18 17:30:00', '2026-03-10', 172, 34.25),
(8, 77, 250, '2024-05-18 17:30:00', '2026-04-15', 173, 38.50),
(8, 82, 180, '2024-05-18 17:30:00', '2026-05-20', 174, 21.75),
(8, 99, 170, '2024-05-18 17:30:00', '2026-06-25', 175, 12.50),
(8, 109, 230, '2024-05-18 17:30:00', '2026-07-30', 176, 53.25),
(8, 117, 150, '2024-05-18 17:30:00', '2026-08-05', 177, 35.75),
(8, 118, 200, '2024-05-18 17:30:00', '2026-09-10', 178, 20.00),
(8, 119, 220, '2024-05-18 17:30:00', '2026-10-15', 179, 53.00),
(8, 157, 5, '2024-05-18 17:30:00', '2026-11-20', 180, 175.00),
(8, 158, 10, '2024-05-18 17:30:00', '2026-12-25', 181, 750.00),
(8, 182, 280, '2024-05-18 17:30:00', '2026-02-01', 182, 13.50),
(8, 187, 10, '2024-05-18 17:30:00', '2026-03-10', 183, 500.00),
(8, 188, 240, '2024-05-18 17:30:00', '2026-04-15', 184, 5.25),
(8, 211, 260, '2024-05-18 17:30:00', '2026-05-20', 185, 35.50),
(8, 213, 8, '2024-05-18 17:30:00', '2026-06-25', 186, 300.00),
(8, 214, 10, '2024-05-18 17:30:00', '2026-07-30', 187, 300.00),
(8, 265, 170, '2024-05-18 17:30:00', '2026-08-05', 188, 79.75),
(8, 306, 12, '2024-05-18 17:30:00', '2026-09-10', 189, 220.00),
(8, 307, 12, '2024-05-18 17:30:00', '2026-10-15', 190, 210.00),
(9, 83, 150, '2024-05-19 14:30:00', '2026-02-01', 191, 25.50),
(9, 84, 200, '2024-05-19 14:30:00', '2026-03-10', 192, 38.75),
(9, 94, 250, '2024-05-19 14:30:00', '2026-04-15', 193, 30.00),
(9, 100, 180, '2024-05-19 14:30:00', '2026-05-20', 194, 49.50),
(9, 123, 170, '2024-05-19 14:30:00', '2026-06-25', 195, 45.25),
(9, 124, 230, '2024-05-19 14:30:00', '2026-07-30', 196, 20.00),
(9, 125, 150, '2024-05-19 14:30:00', '2026-08-05', 197, 17.75),
(9, 162, 8, '2024-05-19 14:30:00', '2026-09-10', 198, 490.00),
(9, 163, 220, '2024-05-19 14:30:00', '2026-10-15', 199, 590.00),
(9, 220, 190, '2024-05-19 14:30:00', '2026-11-20', 200, 44.00),
(9, 221, 250, '2024-05-19 14:30:00', '2026-12-25', 201, 22.50),
(9, 234, 280, '2024-05-19 14:30:00', '2026-02-01', 202, 43.50),
(9, 257, 300, '2024-05-19 14:30:00', '2026-03-10', 203, 75.00),
(9, 258, 240, '2024-05-19 14:30:00', '2026-04-15', 204, 71.50),
(9, 259, 260, '2024-05-19 14:30:00', '2026-05-20', 205, 60.75),
(9, 284, 200, '2024-05-19 14:30:00', '2026-06-25', 206, 130.00),
(9, 285, 10, '2024-05-19 14:30:00', '2026-07-30', 207, 310.00),
(9, 308, 12, '2024-05-19 14:30:00', '2026-08-05', 208, 250.00),
(9, 309, 12, '2024-05-19 14:30:00', '2026-09-10', 209, 200.00),
(10, 90, 150, '2024-05-19 15:30:00', '2026-02-01', 210, 17.50),
(10, 91, 200, '2024-05-19 15:30:00', '2026-03-10', 211, 18.75),
(10, 93, 250, '2024-05-19 15:30:00', '2026-04-15', 212, 20.00),
(10, 104, 180, '2024-05-19 15:30:00', '2026-05-20', 213, 19.50),
(10, 126, 170, '2024-05-19 15:30:00', '2026-06-25', 214, 21.25),
(10, 127, 230, '2024-05-19 15:30:00', '2026-07-30', 215, 22.00),
(10, 128, 150, '2024-05-19 15:30:00', '2026-08-05', 216, 21.75),
(10, 164, 200, '2024-05-19 15:30:00', '2026-09-10', 217, 20.25),
(10, 165, 220, '2024-05-19 15:30:00', '2026-10-15', 218, 22.75),
(10, 166, 190, '2024-05-19 15:30:00', '2026-11-20', 219, 24.00),
(10, 224, 250, '2024-05-19 15:30:00', '2026-12-25', 220, 22.50),
(10, 229, 280, '2024-05-19 15:30:00', '2026-02-01', 221, 23.50),
(10, 233, 300, '2024-05-19 15:30:00', '2026-03-10', 222, 24.00),
(10, 240, 240, '2024-05-19 15:30:00', '2026-04-15', 223, 21.50),
(10, 245, 260, '2024-05-19 15:30:00', '2026-05-20', 224, 20.75),
(10, 90, 150, '2024-05-19 15:30:00', '2026-02-01', 225, 7.50),
(10, 91, 200, '2024-05-19 15:30:00', '2026-03-10', 226, 28.75),
(10, 93, 250, '2024-05-19 15:30:00', '2026-04-15', 227, 25.00),
(10, 104, 180, '2024-05-19 15:30:00', '2026-05-20', 228, 13.50),
(10, 126, 170, '2024-05-19 15:30:00', '2026-06-25', 229, 31.25),
(10, 127, 230, '2024-05-19 15:30:00', '2026-07-30', 230, 52.00),
(10, 128, 150, '2024-05-19 15:30:00', '2026-08-05', 231, 42.75),
(10, 164, 12, '2024-05-19 15:30:00', '2026-09-10', 232, 230.00),
(10, 165, 8, '2024-05-19 15:30:00', '2026-10-15', 233, 142.00),
(10, 166, 10, '2024-05-19 15:30:00', '2026-11-20', 234, 210.00),
(10, 224, 8, '2024-05-19 15:30:00', '2026-12-25', 235, 320.00),
(10, 229, 280, '2024-05-19 15:30:00', '2026-02-01', 236, 133.50),
(10, 233, 300, '2024-05-19 15:30:00', '2026-03-10', 237, 24.00),
(10, 240, 240, '2024-05-19 15:30:00', '2026-04-15', 238, 51.50),
(10, 245, 260, '2024-05-19 15:30:00', '2026-05-20', 239, 60.75),
(10, 246, 150, '2024-05-19 15:30:00', '2026-02-01', 240, 74.75),
(10, 286, 200, '2024-05-19 15:30:00', '2026-03-10', 241, 78.20),
(10, 287, 250, '2024-05-19 15:30:00', '2026-04-15', 242, 60.00),
(10, 310, 18, '2024-05-19 15:30:00', '2026-05-20', 243, 280.00),
(10, 311, 12, '2024-05-19 15:30:00', '2026-06-25', 244, 250.00),
(10, 312, 12, '2024-05-19 15:30:00', '2026-07-30', 245, 250.00),
(10, 319, 15, '2024-05-19 15:30:00', '2026-08-05', 246, 150.00),
(10, 320, 10, '2024-05-19 15:30:00', '2026-09-10', 247, 180.00),
(11, 89, 150, '2024-05-20 16:30:00', '2026-02-01', 248, 13.50),
(11, 92, 200, '2024-05-20 16:30:00', '2026-03-10', 249, 10.75),
(11, 96, 180, '2024-05-20 16:30:00', '2026-05-20', 251, 19.50),
(11, 129, 170, '2024-05-20 16:30:00', '2026-06-25', 252, 58.25),
(11, 130, 230, '2024-05-20 16:30:00', '2026-07-30', 253, 22.00),
(11, 131, 150, '2024-05-20 16:30:00', '2026-08-05', 254, 25.75),
(11, 167, 10, '2024-05-20 16:30:00', '2026-09-10', 255, 170.00),
(11, 168, 10, '2024-05-20 16:30:00', '2026-10-15', 256, 250.00),
(11, 169, 5, '2024-05-20 16:30:00', '2026-11-20', 257, 740.00),
(11, 170, 8, '2024-05-20 16:30:00', '2026-12-25', 258, 120.00),
(11, 171, 7, '2024-05-20 16:30:00', '2026-02-01', 259, 150.00),
(11, 230, 300, '2024-05-20 16:30:00', '2026-03-10', 260, 24.00),
(11, 231, 240, '2024-05-20 16:30:00', '2026-04-15', 261, 71.50),
(11, 244, 260, '2024-05-20 16:30:00', '2026-05-20', 262, 20.75),
(11, 256, 150, '2024-05-20 16:30:00', '2026-02-01', 263, 50.50),
(11, 288, 200, '2024-05-20 16:30:00', '2026-03-10', 264, 72.75),
(11, 311, 250, '2024-05-20 16:30:00', '2026-04-15', 265, 78.90),
(11, 313, 12, '2024-05-20 16:30:00', '2026-05-20', 266, 230.00),
(11, 314, 12, '2024-05-20 16:30:00', '2026-06-25', 267, 200.00),
(11, 316, 20, '2024-05-20 16:30:00', '2026-07-30', 268, 160.00),
(12, 86, 350, '2024-05-20 22:00:00', '2026-01-01', 269, 15.00),
(12, 88, 300, '2024-05-20 22:00:00', '2026-01-01', 270, 18.00),
(12, 97, 250, '2024-05-20 22:00:00', '2026-01-01', 271, 20.00),
(12, 106, 200, '2024-05-20 22:00:00', '2026-01-01', 272, 22.50),
(12, 107, 150, '2024-05-20 22:00:00', '2026-01-01', 273, 25.00),
(12, 133, 100, '2024-05-20 22:00:00', '2026-01-01', 274, 28.00),
(12, 134, 50, '2024-05-20 22:00:00', '2026-01-01', 275, 30.00),
(12, 135, 300, '2024-05-20 22:00:00', '2026-01-01', 276, 32.50),
(12, 172, 350, '2024-05-20 22:00:00', '2026-01-01', 277, 35.00),
(12, 173, 200, '2024-05-20 22:00:00', '2026-01-01', 278, 38.00),
(12, 227, 150, '2024-05-20 22:00:00', '2026-01-01', 279, 40.00),
(12, 228, 100, '2024-05-20 22:00:00', '2026-01-01', 280, 42.50),
(12, 232, 50, '2024-05-20 22:00:00', '2026-01-01', 281, 45.00),
(12, 241, 400, '2024-05-20 22:00:00', '2026-01-01', 282, 48.00),
(12, 242, 350, '2024-05-20 22:00:00', '2026-01-01', 283, 50.00),
(12, 243, 300, '2024-05-20 22:00:00', '2026-01-01', 284, 52.50),
(12, 86, 350, '2024-05-20 22:00:00', '2026-01-01', 285, 85.00),
(12, 88, 300, '2024-05-20 22:00:00', '2026-01-01', 286, 25.00),
(12, 97, 250, '2024-05-20 22:00:00', '2026-01-01', 287, 7.00),
(12, 106, 200, '2024-05-20 22:00:00', '2026-01-01', 288, 48.50),
(12, 107, 150, '2024-05-20 22:00:00', '2026-01-01', 289, 23.00),
(12, 133, 100, '2024-05-20 22:00:00', '2026-01-01', 290, 8.00),
(12, 134, 50, '2024-05-20 22:00:00', '2026-01-01', 291, 36.00),
(12, 135, 300, '2024-05-20 22:00:00', '2026-01-01', 292, 42.50),
(12, 172, 12, '2024-05-20 22:00:00', '2026-01-01', 293, 100.00),
(12, 173, 12, '2024-05-20 22:00:00', '2026-01-01', 294, 180.00),
(12, 227, 150, '2024-05-20 22:00:00', '2026-01-01', 295, 40.00),
(12, 228, 100, '2024-05-20 22:00:00', '2026-01-01', 296, 55.00),
(12, 232, 250, '2024-05-20 22:00:00', '2026-01-01', 297, 60.00),
(12, 241, 400, '2024-05-20 22:00:00', '2026-01-01', 298, 48.00),
(12, 242, 350, '2024-05-20 22:00:00', '2026-01-01', 299, 45.00),
(12, 243, 300, '2024-05-20 22:00:00', '2026-01-01', 300, 52.50),
(12, 290, 350, '2024-05-20 22:00:00', '2026-01-01', 301, 58.75),
(12, 315, 10, '2024-05-20 22:00:00', '2026-01-01', 302, 180.00),
(12, 317, 10, '2024-05-20 22:00:00', '2026-01-01', 303, 140.00),
(12, 327, 200, '2024-05-20 22:00:00', '2026-01-01', 304, 66.00),
(12, 328, 150, '2024-05-20 22:00:00', '2026-01-01', 305, 88.50),
(13, 85, 350, '2024-05-20 22:00:00', '2026-01-01', 306, 17.00),
(13, 87, 300, '2024-05-20 22:00:00', '2026-01-01', 307, 25.00),
(13, 98, 250, '2024-05-20 22:00:00', '2026-01-01', 308, 15.00),
(13, 105, 200, '2024-05-20 22:00:00', '2026-01-01', 309, 10.50),
(13, 136, 150, '2024-05-20 22:00:00', '2026-01-01', 310, 35.00),
(13, 137, 100, '2024-05-20 22:00:00', '2026-01-01', 311, 10.00),
(13, 138, 50, '2024-05-20 22:00:00', '2026-01-01', 312, 39.00),
(13, 235, 350, '2024-05-20 22:00:00', '2026-01-01', 313, 51.00),
(13, 236, 200, '2024-05-20 22:00:00', '2026-01-01', 314, 43.00),
(13, 237, 150, '2024-05-20 22:00:00', '2026-01-01', 315, 42.00),
(13, 238, 100, '2024-05-20 22:00:00', '2026-01-01', 316, 52.00),
(13, 291, 50, '2024-05-20 22:00:00', '2026-01-01', 317, 79.00),
(13, 292, 400, '2024-05-20 22:00:00', '2026-01-01', 318, 75.00),
(13, 293, 350, '2024-05-20 22:00:00', '2026-01-01', 319, 65.00),
(13, 318, 12, '2024-05-20 22:00:00', '2026-01-01', 320, 150.00),
(13, 329, 250, '2024-05-20 22:00:00', '2026-01-01', 321, 82.52),
(13, 330, 200, '2024-05-20 22:00:00', '2026-01-01', 322, 70.20),
(14, 322, 8, '2024-05-20 22:00:00', '2026-01-01', 323, 160.00),
(14, 323, 10, '2024-05-20 22:00:00', '2026-01-01', 324, 150.00),
(14, 324, 20, '2024-05-20 22:00:00', '2026-01-01', 325, 100.00),
(14, 325, 20, '2024-05-20 22:00:00', '2026-01-01', 326, 90.00),
(1, 70, 100, '2024-06-09 19:12:00', '2026-06-09', 327, 120.00),
(1, 23, 200, '2024-05-22 10:45:00', '2026-12-14', 328, 23.50),
(1, 23, 200, '2024-05-22 10:45:00', '2026-12-14', 329, 23.50),
(8, 75, 100, '2024-06-01 11:50:00', '2027-01-08', 330, 26.00),
(8, 76, 200, '2024-06-01 11:50:00', '2027-05-03', 331, 35.10),
(8, 77, 200, '2024-06-01 11:50:00', '2025-08-03', 332, 39.10),
(12, 86, 100, '2024-06-02 09:10:00', '2026-03-03', 333, 50.60),
(1, 184, 1, '2024-06-14 09:17:00', '2026-06-08', 334, 600.00),
(5, 184, 100, '2024-06-03 00:53:00', '2026-07-14', 335, 600.00);

--
-- Triggers `supply`
--
DELIMITER $$
CREATE TRIGGER `trg_delete_supply` AFTER DELETE ON `supply` FOR EACH ROW BEGIN
  UPDATE medicine
  SET medicine_inhandquantity = medicine_inhandquantity - OLD.sply_quantity
  WHERE medicine_id = OLD.sply_mdid;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_insert_supply` AFTER INSERT ON `supply` FOR EACH ROW BEGIN
  UPDATE medicine
  SET medicine_inhandquantity = medicine_inhandquantity + NEW.sply_quantity
  WHERE medicine_id = NEW.sply_mdid;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_update_supply` AFTER UPDATE ON `supply` FOR EACH ROW BEGIN
  IF OLD.sply_quantity <> NEW.sply_quantity THEN
    UPDATE medicine
    SET medicine_inhandquantity = medicine_inhandquantity - OLD.sply_quantity + NEW.sply_quantity
    WHERE medicine_id = NEW.sply_mdid;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `unit`
--

CREATE TABLE `unit` (
  `unit_id` tinyint(1) NOT NULL,
  `unit_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `unit`
--

INSERT INTO `unit` (`unit_id`, `unit_name`) VALUES
(1, 'Tablet'),
(2, 'Capsule'),
(3, 'Bottle'),
(4, 'Repository'),
(5, 'Cartridge'),
(6, 'Tube'),
(7, 'Unit');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` tinyint(2) NOT NULL,
  `user_fname` varchar(20) NOT NULL,
  `user_lname` varchar(20) NOT NULL,
  `user_role_id` varchar(20) NOT NULL,
  `user_nic` varchar(12) NOT NULL,
  `user_pno` int(15) NOT NULL,
  `user_password` varchar(20) NOT NULL,
  `user_username` varchar(20) NOT NULL,
  `user_delete_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_fname`, `user_lname`, `user_role_id`, `user_nic`, `user_pno`, `user_password`, `user_username`, `user_delete_status`) VALUES
(1, 'Theekshana', 'Fernando', '5', '200031702568', 718976568, 'Theekshana123!@#', 'Taniya', 1),
(2, 'Umesha', 'Silva', '1', '200031302567', 765241549, 'Umesha123!@#', 'Umesha', 0),
(5, 'Pramodya', 'Nethmini', '2', '123456789V', 782918293, 'Pramodya123!@#', 'Pramodya', 0),
(6, 'Amali', 'Perera', '4', '200031702561', 718976453, 'Amali123!@#', 'Amali', 0),
(7, 'Thanusha', 'Withaana', '5', '200031789864', 719273618, 'Thanusha123!@#', 'Thanusha', 0),
(8, 'Vishmi', 'Ramesha', '3', '200013238722', 214748362, 'Vishmi123!@#', 'Vishmi', 0),
(12, 'nimali', 'silva', '5', '200013238724', 712648389, 'Nimali1237!@#', 'Nimali55', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`inv_id`),
  ADD KEY `fk_invoice_user` (`inv_userid`);

--
-- Indexes for table `invoicemedicine`
--
ALTER TABLE `invoicemedicine`
  ADD PRIMARY KEY (`invmd_id`),
  ADD KEY `fk_invoicemedicine_mdid` (`invmd_mdid`),
  ADD KEY `fk_invoicemedicine_invid` (`invmd_invid`);

--
-- Indexes for table `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`medicine_id`),
  ADD KEY `fk_md_unitid` (`medicine_unitid`),
  ADD KEY `fk_md_catid` (`medicine_categoryid`);

--
-- Indexes for table `medicinecategory`
--
ALTER TABLE `medicinecategory`
  ADD PRIMARY KEY (`mdct_id`);

--
-- Indexes for table `ordermedicine`
--
ALTER TABLE `ordermedicine`
  ADD PRIMARY KEY (`odmd_id`),
  ADD KEY `fk_ordermedicine_mdid` (`odmd_mdid`),
  ADD KEY `fk_ordermedicine_orderid` (`odmd_orderid`);

--
-- Indexes for table `ordertable`
--
ALTER TABLE `ordertable`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `fk_order_userid` (`order_userid`),
  ADD KEY `fk_order_supplierId` (`order_spid`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`sp_id`);

--
-- Indexes for table `supply`
--
ALTER TABLE `supply`
  ADD PRIMARY KEY (`sply_stockid`),
  ADD KEY `fk_supply_supplierid` (`sply_spid`),
  ADD KEY `fk_supply_medicineid` (`sply_mdid`);

--
-- Indexes for table `unit`
--
ALTER TABLE `unit`
  ADD PRIMARY KEY (`unit_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_user_role` (`user_role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `inv_id` mediumint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `invoicemedicine`
--
ALTER TABLE `invoicemedicine`
  MODIFY `invmd_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `medicine`
--
ALTER TABLE `medicine`
  MODIFY `medicine_id` mediumint(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=337;

--
-- AUTO_INCREMENT for table `medicinecategory`
--
ALTER TABLE `medicinecategory`
  MODIFY `mdct_id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `ordermedicine`
--
ALTER TABLE `ordermedicine`
  MODIFY `odmd_id` smallint(6) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ordertable`
--
ALTER TABLE `ordertable`
  MODIFY `order_id` mediumint(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `sp_id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `supply`
--
ALTER TABLE `supply`
  MODIFY `sply_stockid` smallint(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=336;

--
-- AUTO_INCREMENT for table `unit`
--
ALTER TABLE `unit`
  MODIFY `unit_id` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` tinyint(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `fk_invoice_user` FOREIGN KEY (`inv_userid`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `invoicemedicine`
--
ALTER TABLE `invoicemedicine`
  ADD CONSTRAINT `fk_invoicemedicine_invid` FOREIGN KEY (`invmd_invid`) REFERENCES `invoice` (`inv_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_invoicemedicine_mdid` FOREIGN KEY (`invmd_mdid`) REFERENCES `medicine` (`medicine_id`) ON UPDATE CASCADE;

--
-- Constraints for table `medicine`
--
ALTER TABLE `medicine`
  ADD CONSTRAINT `fk_md_catid` FOREIGN KEY (`medicine_categoryid`) REFERENCES `medicinecategory` (`mdct_id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_md_unitid` FOREIGN KEY (`medicine_unitid`) REFERENCES `unit` (`unit_id`) ON UPDATE CASCADE;

--
-- Constraints for table `ordermedicine`
--
ALTER TABLE `ordermedicine`
  ADD CONSTRAINT `fk_ordermedicine_mdid` FOREIGN KEY (`odmd_mdid`) REFERENCES `medicine` (`medicine_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ordermedicine_orderid` FOREIGN KEY (`odmd_orderid`) REFERENCES `ordertable` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ordertable`
--
ALTER TABLE `ordertable`
  ADD CONSTRAINT `fk_order_supplierId` FOREIGN KEY (`order_spid`) REFERENCES `supplier` (`sp_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_order_userid` FOREIGN KEY (`order_userid`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `supply`
--
ALTER TABLE `supply`
  ADD CONSTRAINT `fk_supply_medicineid` FOREIGN KEY (`sply_mdid`) REFERENCES `medicine` (`medicine_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_supply_supplierid` FOREIGN KEY (`sply_spid`) REFERENCES `supplier` (`sp_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_role` FOREIGN KEY (`user_role_id`) REFERENCES `role` (`role_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
