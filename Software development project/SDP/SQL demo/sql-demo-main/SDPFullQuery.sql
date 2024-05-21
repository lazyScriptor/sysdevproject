-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 08, 2024 at 01:36 PM
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
-- Database: `sysdevdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `bill_id` int(11) NOT NULL,
  `issued_date` date NOT NULL,
  `bill_inv_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cus_id` int(11) NOT NULL,
  `nic` varchar(10) NOT NULL,
  `cus_phone_number` varchar(12) NOT NULL,
  `cus_fname` varchar(20) NOT NULL,
  `cus_lname` varchar(20) NOT NULL,
  `cus_address1` varchar(30) NOT NULL,
  `cus_address2` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cus_id`, `nic`, `cus_phone_number`, `cus_fname`, `cus_lname`, `cus_address1`, `cus_address2`) VALUES
(4, '654987321V', '0770000004', 'Emily', 'Johnson', '987 Pine St', 'Unit B'),
(5, '789456123V', '0770000005', 'Wil', 'Brown', '246 Maple Ave', 'Room 501'),
(6, '159357246V', '0770000006', 'Olivia', 'Willia', '369 Walnut Blvd', 'Suite 601'),
(7, '753951852V', '0770000007', 'James', 'Jones', '852 Cedar Dr', 'Floor 7'),
(8, '369258147V', '0770000008', 'Emma', 'Garcia', '147 Spruce Blvd', 'Apt 801'),
(9, '258369147V', '0770000009', 'Alexander', 'Martinez', '258 Oakwood Ave', 'Room 901'),
(10, '147258369V', '0770000010', 'Sophia', 'Hernandez', '369 Maple St', 'Unit C'),
(11, '789654321V', '0770000011', 'Liam', 'Lopez', '654 Walnut Blvd', 'Suite 1101'),
(12, '123789456V', '0770000012', 'Avaaaa', 'Gonzalez', '789 Pine Dr', 'Floor 12'),
(13, '456789123V', '0770000013', 'Noah', 'Wilson', '123 Cedar Blvd', 'Apt 1301'),
(14, '987123456V', '0770000014', 'Isabella', 'Anderson', '456 Spruce Dr', 'Room 1401'),
(15, '321654987V', '0770000015', 'Lucas', 'Thomas', '789 Oakwood Blvd', 'Unit D'),
(16, '852741963V', '0770000016', 'Mia', 'Taylor', '159 Maple Ave', 'Suite 1501'),
(17, '369147258V', '0770000017', 'Mason', 'Jackson', '369 Walnut St', 'Floor 16'),
(18, '654258369V', '0770000018', 'Harper', 'White', '741 Pine Ave', 'Apt 1701'),
(19, '789123456V', '0770000019', 'Ethan', 'Harris', '852 Cedar Blvd', 'Room 1801'),
(20, '123456789V', '0770000020', 'Evelyn', 'Martin', '963 Spruce Dr', 'Unit E'),
(21, '987654321V', '0770000021', 'Logan', 'Thompson', '147 Oakwood Blvd', 'Suite 1901'),
(22, '456123789V', '0770000022', 'Avery', 'Robinson', '258 Cedar St', 'Floor 20'),
(23, '654987321V', '0770000023', 'Liam', 'Wood', '369 Elm Ave', 'Apt 2101'),
(24, '789456123V', '0770000024', 'Charlotte', 'Lewis', '741 Maple Blvd', 'Room 2201'),
(25, '159357246V', '0770000025', 'Carter', 'Lee', '852 Pine Dr', 'Unit F'),
(26, '753951852V', '0770000026', 'Amelia', 'Walker', '963 Cedar Blvd', 'Suite 2301'),
(27, '369258147V', '0770000027', 'Daniel', 'Hall', '123 Oak St', 'Floor 24'),
(28, '258369147V', '0770000028', 'Aria', 'Allen', '369 Walnut Blvd', 'Apt 2501'),
(29, '147258369V', '0770000029', 'Matthew', 'Young', '741 Spruce St', 'Room 2601'),
(30, '789654321V', '0770000030', 'Luna', 'King', '852 Maple Ave', 'Unit G'),
(31, '123789456V', '0770000031', 'Michael', 'Wright', '963 Oakwood Blvd', 'Suite 2701'),
(32, '456789123V', '0770000032', 'Sofia', 'Scott', '147 Cedar Dr', 'Floor 28'),
(33, '987123456V', '0770000033', 'William', 'Green', '258 Pine Blvd', 'Apt 2901'),
(34, '321654987V', '0770000034', 'Chloe', 'Baker', '369 Elm St', 'Room 3001'),
(35, '852741963V', '0770000035', 'Alexander', 'Hill', '741 Maple Dr', 'Unit H'),
(36, '369147258V', '0770000036', 'Harper', 'Evans', '852 Cedar Blvd', 'Suite 3101'),
(37, '654258369V', '0770000037', 'Oliver', 'Adams', '963 Spruce Ave', 'Floor 32'),
(38, '789123456V', '0770000038', 'Ava', 'Campbell', '123 Oakwood Blvd', 'Apt 3301'),
(39, '123456789V', '0770000039', 'Emma', 'Parker', '147 Cedar St', 'Room 3401'),
(41, '456123789V', '0770000041', 'Aiden', 'Cooper', '369 Elm Ave', 'Suite 3501'),
(42, '654987321V', '0770000042', 'Charlotte', 'Collins', '741 Pine St', 'Floor 36'),
(43, '789456123V', '0770000043', 'Avery', 'Hunt', '852 Maple Blvd', 'Apt 3701'),
(44, '159357246V', '0770000044', 'Elijah', 'Roberts', '963 Oakwood Dr', 'Room 3801'),
(45, '753951852V', '0770000045', 'Amelia', 'Cook', '123 Cedar Blvd', 'Unit J'),
(46, '369258147V', '0770000046', 'Mia', 'Stewart', '147 Walnut St', 'Suite 3901'),
(47, '258369147V', '0770000047', 'Benjamin', 'Miller', '258 Elm Blvd', 'Floor 40'),
(48, '147258369V', '0770000048', 'Ethan', 'Martin', '369 Pine Ave', 'Apt 4101'),
(49, '789654321V', '0770000049', 'Evelyn', 'Turner', '741 Cedar Blvd', 'Room 4201'),
(50, '123789456V', '0770000050', 'Liam', 'Ward', '852 Spruce Ave', 'Unit K'),
(51, '456789123V', '0770000051', 'Aria', 'Perez', '963 Oak Ln', 'Suite 4301'),
(52, '987123456V', '0770000052', 'Mason', 'Hernandez', '123 Maple Dr', 'Floor 44'),
(53, '321654987V', '0770000053', 'Ava', 'Hill', '147 Walnut Blvd', 'Apt 4501'),
(54, '852741963V', '0770000054', 'Harper', 'Young', '258 Elm St', 'Room 4601'),
(55, '369147258V', '0770000055', 'William', 'Gonzalez', '369 Pine Blvd', 'Unit L'),
(56, '654258369V', '0770000056', 'Olivia', 'Gomez', '741 Cedar Dr', 'Suite 4701'),
(57, '789123456V', '0770000057', 'Mia', 'Perry', '852 Spruce Blvd', 'Floor 48'),
(58, '123456789V', '0770000058', 'Alexander', 'Butler', '963 Oak St', 'Apt 4901'),
(59, '987654321V', '0770000059', 'Charlotte', 'Woods', '123 Maple Ave', 'Room 5001'),
(60, '456123789V', '0770000060', 'Logan', 'Barnes', '147 Walnut Ln', 'Unit M'),
(61, '654987321V', '0770000061', 'James', 'Coleman', '258 Elm Blvd', 'Suite 5101'),
(62, '789456123V', '0770000062', 'Emma', 'Rodriguez', '369 Pine St', 'Floor 52'),
(63, '159357246V', '0770000063', 'Oliver', 'Evans', '741 Cedar Ave', 'Apt 5301'),
(64, '753951852V', '0770000064', 'Ava', 'Fisher', '852 Spruce Ln', 'Room 5401'),
(65, '369258147V', '0770000065', 'Ethan', 'Stevens', '963 Oakwood Dr', 'Unit N'),
(66, '258369147V', '0770000066', 'Sophia', 'Ford', '123 Cedar St', 'Suite 5501'),
(67, '147258369V', '0770000067', 'Jackson', 'Harrison', '147 Walnut Blvd', 'Floor 56'),
(68, '789654321V', '0770000068', 'Avery', 'Murray', '258 Elm Ave', 'Apt 5701'),
(69, '123789456V', '0770000069', 'Liam', 'Washington', '369 Pine Dr', 'Room 5801'),
(70, '456789123V', '0770000070', 'Isabella', 'Jenkins', '741 Cedar Blvd', 'Unit O'),
(71, '987123456V', '0770000071', 'Aria', 'Pierce', '852 Spruce St', 'Suite 5901'),
(72, '321654987V', '0770000072', 'Mason', 'Lawrence', '963 Oak Ln', 'Floor 60'),
(73, '852741963V', '0770000073', 'Ella', 'Cole', '123 Cedar Blvd', 'Apt 6101'),
(74, '369147258V', '0770000074', 'William', 'West', '147 Walnut Blvd', 'Room 6201'),
(75, '654258369V', '0770000075', 'Harper', 'Hayes', '258 Elm St', 'Unit P'),
(76, '789123456V', '0770000076', 'Olivia', 'Gordon', '369 Pine Ave', 'Suite 6301'),
(77, '123456789V', '0770000077', 'Michael', 'Lane', '741 Cedar Blvd', 'Floor 64'),
(78, '987654321V', '0770000078', 'Emma', 'Simpson', '852 Spruce Dr', 'Apt 6501'),
(79, '456123789V', '0770000079', 'Oliver', 'Dunn', '963 Oakwood Blvd', 'Room 6601'),
(82, '159357246V', '0770000082', 'Jackson', 'Perkins', '258 Elm Blvd', 'Floor 68'),
(84, '369258147V', '0770000084', 'Liam', 'Spencer', '741 Cedar Ln', 'Room 7001'),
(85, '258369147V', '0770000085', 'Aria', 'Grant', '852 Spruce Blvd', 'Unit R'),
(86, '147258369V', '0770000086', 'Mason', 'Casey', '963 Oak St', 'Suite 7101'),
(87, '789654321V', '0770000087', 'Ella', 'Knights', '123 Cedar Blvd', 'Floor 72'),
(88, '123789456V', '0770000088', 'William', 'Barrett', '147 Walnut Blvd', 'Apt 7301'),
(89, '456789123V', '0770000089', 'Harper', 'Payne', '258 Elm Ave', 'Room 7401'),
(90, '987123456V', '0770000090', 'Olivia', 'Fletcher', '369 Pine St', 'Unit S'),
(91, '321654987V', '0770000091', 'Michael', 'Gill', '741 Cedar Dr', 'Suite 7501'),
(92, '852741963V', '0770000092', 'Emma', 'Rowe', '852 Spruce Blvd', 'Floor 76'),
(93, '369147258V', '0770000093', 'Oliver', 'Hampton', '963 Oakwood Ave', 'Apt 7701'),
(94, '654258369V', '0770000094', 'Ava', 'Conner', '123 Cedar Blvd', 'Room 7801'),
(95, '789123456V', '0770000095', 'Sophia', 'Black', '147 Walnut St', 'Unit T'),
(96, '123456789V', '0770000096', 'Jackson', 'Cameron', '258 Elm Blvd', 'Suite 7901'),
(97, '987654321V', '0770000097', 'Isabella', 'Lambert', '369 Pine Ave', 'Floor 80'),
(98, '456123789V', '0770000098', 'Liam', 'Adkins', '741 Cedar Blvd', 'Apt 8101'),
(99, '654987321V', '0770000099', 'Aria', 'Keller', '852 Spruce Dr', 'Room 8201'),
(100, '789456123V', '0770000100', 'Mason', 'Bridges', '963 Oakwood Blvd', 'Unit U'),
(102, 'Theekshana', 'Fernando', '200031702568', '0718976568', '52/16 P.M Fernando', '5th lane,Miratuwa');

-- --------------------------------------------------------

--
-- Table structure for table `customerInvoice`
--

CREATE TABLE `customerInvoice` (
  `cusinv_cusid` int(5) NOT NULL,
  `cusinv_invid` int(5) NOT NULL,
  `cusinv_createddate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customerInvoice`
--

INSERT INTO `customerInvoice` (`cusinv_cusid`, `cusinv_invid`, `cusinv_createddate`) VALUES
(9, 7, '2024-05-01'),
(96, 1001, '2024-05-27');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `eq_id` int(11) NOT NULL,
  `eq_name` varchar(20) NOT NULL,
  `eq_rental` decimal(6,2) NOT NULL,
  `eq_description` varchar(255) DEFAULT NULL,
  `eq_dofpurchase` date NOT NULL,
  `eq_warranty_expire` date NOT NULL,
  `eq_image` varchar(40) NOT NULL,
  `eq_cost` decimal(6,2) NOT NULL,
  `eq_defected_status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`eq_id`, `eq_name`, `eq_rental`, `eq_description`, `eq_dofpurchase`, `eq_warranty_expire`, `eq_image`, `eq_cost`, `eq_defected_status`) VALUES
(11, 'Equipment 11', 1366.78, '0', '2024-04-19', '2024-04-19', 'image11.jpg', 1100.00, 0),
(12, 'Equipment 12', 1653.89, '0', '2024-04-18', '2024-04-18', 'image12.jpg', 1200.00, 1),
(14, 'Equipment 14', 283.94, '0', '2024-04-16', '2024-04-16', 'image14.jpg', 1400.00, 1),
(15, 'Equipment 15', 1912.31, '0', '2024-04-15', '2024-04-15', 'image15.jpg', 1500.00, 1),
(16, 'Equipment 16', 1309.74, '0', '2024-04-14', '2024-04-14', 'image16.jpg', 1600.00, 1),
(18, 'Equipment 18', 729.67, '0', '2024-04-12', '2024-04-12', 'image18.jpg', 1800.00, 1),
(19, 'Equipment 19', 1613.01, '0', '2024-04-11', '2024-04-11', 'image19.jpg', 1900.00, 0),
(20, 'Equipment 20', 276.05, '0', '2024-04-10', '2024-04-10', 'image20.jpg', 2000.00, 1),
(21, 'Equipment 21', 1741.23, '0', '2024-04-09', '2024-04-09', 'image21.jpg', 2100.00, 0),
(24, 'Drill', 250.00, 'good drill', '2024-05-14', '2024-05-04', '', 2000.00, 0),
(25, 'Drill', 250.00, 'good drill', '2024-05-14', '2024-05-04', '', 2000.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `equipment_description`
--

CREATE TABLE `equipment_description` (
  `eq_des_id` int(11) NOT NULL,
  `eq_attribute` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `inv_id` int(11) NOT NULL,
  `inv_advance` decimal(6,2) NOT NULL,
  `inv_special_message` varchar(255) DEFAULT NULL,
  `inv_idcardstatus` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`inv_id`, `inv_advance`, `inv_special_message`, `inv_idcardstatus`) VALUES
(7, 2000.00, NULL, 0),
(1001, 500.00, NULL, 0),
(1002, 300.00, NULL, 0),
(1003, 700.00, NULL, 0),
(1004, 200.00, NULL, 0),
(1005, 1000.00, NULL, 0),
(1006, 400.00, NULL, 0),
(1007, 600.00, NULL, 0),
(1008, 800.00, NULL, 0),
(1009, 350.00, NULL, 0),
(1057, 0.00, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `invoiceEquipment`
--

CREATE TABLE `invoiceEquipment` (
  `inveq_eqid` int(5) NOT NULL,
  `inveq_invid` int(5) NOT NULL,
  `inveq_borrow_date` date NOT NULL,
  `inveq_return_date` date NOT NULL,
  `duration_in_days` int(11) GENERATED ALWAYS AS (to_days(`inveq_return_date`) - to_days(`inveq_borrow_date`)) VIRTUAL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoiceEquipment`
--

INSERT INTO `invoiceEquipment` (`inveq_eqid`, `inveq_invid`, `inveq_borrow_date`, `inveq_return_date`) VALUES
(11, 7, '2024-05-02', '2024-05-21'),
(24, 7, '2024-05-02', '2024-05-14'),
(25, 7, '2024-05-01', '2024-05-21');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `pay_id` int(11) NOT NULL,
  `pay_date` date NOT NULL,
  `amount` decimal(6,2) NOT NULL,
  `pay_invoice_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`pay_id`, `pay_date`, `amount`, `pay_invoice_id`) VALUES
(1, '2024-05-01', 234.00, 7),
(2, '2024-05-11', 2341.00, 1001),
(3, '2024-05-03', 532.00, 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_first_name` varchar(20) NOT NULL,
  `user_last_name` varchar(20) NOT NULL,
  `username` varchar(15) NOT NULL,
  `role` varchar(25) NOT NULL,
  `nic` varchar(12) NOT NULL,
  `user_phone_number` varchar(12) NOT NULL,
  `user_address1` varchar(30) NOT NULL,
  `user_address2` varchar(30) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_first_name`, `user_last_name`, `username`, `role`, `nic`, `user_phone_number`, `user_address1`, `user_address2`, `password`) VALUES
(1, 'theekshana', 'fernando', 'theekshana', 'admin', '200031702568', '', '52/16 p.m Fernando, 5th lane', 'moratuwa', '123'),
(2, 'achila', 'dilshan', 'achila', 'cashier', '2000130312', '', '23-A kiribathkumbura', 'kandy', '123'),
(3, 'shehan', 'chamudith', 'shehan', 'cashier', '2001334134', '', '23h-2 ', 'rathnapura', 'shehan'),
(4, 'theekshana', 'fernando', 'theekshana', 'cashier', '200031702568', '', '52/16 p.m Fernando 5h lane,', 'moratuwa', 'theekshana'),
(5, 'shehan', 'chamudith', 'shehan', 'warehouse handler', '2010293930', '', '23-A', 'rathnapura', 'shehan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `bill-invoiceId fk` (`bill_inv_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cus_id`);

--
-- Indexes for table `customerInvoice`
--
ALTER TABLE `customerInvoice`
  ADD PRIMARY KEY (`cusinv_cusid`,`cusinv_invid`),
  ADD KEY `cusinv_fk_invid` (`cusinv_invid`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`eq_id`);

--
-- Indexes for table `equipment_description`
--
ALTER TABLE `equipment_description`
  ADD PRIMARY KEY (`eq_des_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`inv_id`);

--
-- Indexes for table `invoiceEquipment`
--
ALTER TABLE `invoiceEquipment`
  ADD PRIMARY KEY (`inveq_eqid`,`inveq_invid`),
  ADD KEY `inveq_fk_eq` (`inveq_invid`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`pay_id`),
  ADD KEY `payment-invoiceId` (`pay_invoice_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `eq_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `inv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1089;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `pay_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill-invoiceId fk` FOREIGN KEY (`bill_inv_id`) REFERENCES `invoice` (`inv_id`);

--
-- Constraints for table `customerInvoice`
--
ALTER TABLE `customerInvoice`
  ADD CONSTRAINT `cusinv_fk_cusid` FOREIGN KEY (`cusinv_cusid`) REFERENCES `customer` (`cus_id`),
  ADD CONSTRAINT `cusinv_fk_invid` FOREIGN KEY (`cusinv_invid`) REFERENCES `invoice` (`inv_id`);

--
-- Constraints for table `invoiceEquipment`
--
ALTER TABLE `invoiceEquipment`
  ADD CONSTRAINT `inveq_fk_eq` FOREIGN KEY (`inveq_invid`) REFERENCES `invoice` (`inv_id`),
  ADD CONSTRAINT `inveq_fk_inv` FOREIGN KEY (`inveq_eqid`) REFERENCES `equipment` (`eq_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment-invoiceId` FOREIGN KEY (`pay_invoice_id`) REFERENCES `invoice` (`inv_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;














































































-- -----------------------------------

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 20, 2024 at 09:25 PM
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
-- Database: `sysdevdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bill`
--

CREATE TABLE `bill` (
  `bill_id` int(11) NOT NULL,
  `issued_date` date NOT NULL,
  `bill_inv_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cus_id` int(11) NOT NULL,
  `nic` varchar(10) NOT NULL,
  `cus_phone_number` varchar(12) NOT NULL,
  `cus_fname` varchar(20) NOT NULL,
  `cus_lname` varchar(20) NOT NULL,
  `cus_address1` varchar(30) NOT NULL,
  `cus_address2` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cus_id`, `nic`, `cus_phone_number`, `cus_fname`, `cus_lname`, `cus_address1`, `cus_address2`) VALUES
(5, '789456123V', '0770000005', 'Wil', 'Brown', '246 Maple Ave', 'Room 501'),
(6, '159357246V', '0770000006', 'Olivia', 'Willia', '369 Walnut Blvd', 'Suite 601'),
(7, '753951852V', '0770000007', 'James', 'Jones', '852 Cedar Dr', 'Floor 7'),
(8, '369258147V', '0770000008', 'Emma', 'Garcia', '147 Spruce Blvd', 'Apt 801'),
(9, '258369147V', '0770000009', 'Alexander', 'Martinez', '258 Oakwood Ave', 'Room 901'),
(10, '147258369V', '0770000010', 'Sophia', 'Hernandez', '369 Maple St', 'Unit C'),
(11, '789654321V', '0770000011', 'Liam', 'Lopez', '654 Walnut Blvd', 'Suite 1101'),
(12, '123789456V', '0770000012', 'Avaaaa', 'Gonzalez', '789 Pine Dr', 'Floor 12'),
(13, '456789123V', '0770000013', 'Noah', 'Wilson', '123 Cedar Blvd', 'Apt 1301'),
(14, '987123456V', '0770000014', 'Isabella', 'Anderson', '456 Spruce Dr', 'Room 1401'),
(15, '321654987V', '0770000015', 'Lucas', 'Thomas', '789 Oakwood Blvd', 'Unit D'),
(16, '852741963V', '0770000016', 'Mia', 'Taylor', '159 Maple Ave', 'Suite 1501'),
(17, '369147258V', '0770000017', 'Mason', 'Jackson', '369 Walnut St', 'Floor 16'),
(18, '654258369V', '0770000018', 'Harper', 'White', '741 Pine Ave', 'Apt 1701'),
(19, '789123456V', '0770000019', 'Ethan', 'Harris', '852 Cedar Blvd', 'Room 1801'),
(20, '123456789V', '0770000020', 'Evelyn', 'Martin', '963 Spruce Dr', 'Unit E'),
(21, '987654321V', '0770000021', 'Logan', 'Thompson', '147 Oakwood Blvd', 'Suite 1901'),
(22, '456123789V', '0770000022', 'Avery', 'Robinson', '258 Cedar St', 'Floor 20'),
(23, '654987321V', '0770000023', 'Liam', 'Wood', '369 Elm Ave', 'Apt 2101'),
(24, '789456123V', '0770000024', 'Charlotte', 'Lewis', '741 Maple Blvd', 'Room 2201'),
(25, '159357246V', '0770000025', 'Carter', 'Lee', '852 Pine Dr', 'Unit F'),
(26, '753951852V', '0770000026', 'Amelia', 'Walker', '963 Cedar Blvd', 'Suite 2301'),
(27, '369258147V', '0770000027', 'Daniel', 'Hall', '123 Oak St', 'Floor 24'),
(28, '258369147V', '0770000028', 'Aria', 'Allen', '369 Walnut Blvd', 'Apt 2501'),
(29, '147258369V', '0770000029', 'Matthew', 'Young', '741 Spruce St', 'Room 2601'),
(30, '789654321V', '0770000030', 'Luna', 'King', '852 Maple Ave', 'Unit G'),
(31, '123789456V', '0770000031', 'Michael', 'Wright', '963 Oakwood Blvd', 'Suite 2701'),
(32, '456789123V', '0770000032', 'Sofia', 'Scott', '147 Cedar Dr', 'Floor 28'),
(33, '987123456V', '0770000033', 'William', 'Green', '258 Pine Blvd', 'Apt 2901'),
(34, '321654987V', '0770000034', 'Chloe', 'Baker', '369 Elm St', 'Room 3001'),
(35, '852741963V', '0770000035', 'Alexander', 'Hill', '741 Maple Dr', 'Unit H'),
(36, '369147258V', '0770000036', 'Harper', 'Evans', '852 Cedar Blvd', 'Suite 3101'),
(37, '654258369V', '0770000037', 'Oliver', 'Adams', '963 Spruce Ave', 'Floor 32'),
(38, '789123456V', '0770000038', 'Ava', 'Campbell', '123 Oakwood Blvd', 'Apt 3301'),
(39, '123456789V', '0770000039', 'Emma', 'Parker', '147 Cedar St', 'Room 3401'),
(41, '456123789V', '0770000041', 'Aiden', 'Cooper', '369 Elm Ave', 'Suite 3501'),
(42, '654987321V', '0770000042', 'Charlotte', 'Collins', '741 Pine St', 'Floor 36'),
(43, '789456123V', '0770000043', 'Avery', 'Hunt', '852 Maple Blvd', 'Apt 3701'),
(44, '159357246V', '0770000044', 'Elijah', 'Roberts', '963 Oakwood Dr', 'Room 3801'),
(45, '753951852V', '0770000045', 'Amelia', 'Cook', '123 Cedar Blvd', 'Unit J'),
(46, '369258147V', '0770000046', 'Mia', 'Stewart', '147 Walnut St', 'Suite 3901'),
(47, '258369147V', '0770000047', 'Benjamin', 'Miller', '258 Elm Blvd', 'Floor 40'),
(48, '147258369V', '0770000048', 'Ethan', 'Martin', '369 Pine Ave', 'Apt 4101'),
(49, '789654321V', '0770000049', 'Evelyn', 'Turner', '741 Cedar Blvd', 'Room 4201'),
(50, '123789456V', '0770000050', 'Liam', 'Ward', '852 Spruce Ave', 'Unit K'),
(51, '456789123V', '0770000051', 'Aria', 'Perez', '963 Oak Ln', 'Suite 4301'),
(52, '987123456V', '0770000052', 'Mason', 'Hernandez', '123 Maple Dr', 'Floor 44'),
(53, '321654987V', '0770000053', 'Ava', 'Hill', '147 Walnut Blvd', 'Apt 4501'),
(54, '852741963V', '0770000054', 'Harper', 'Young', '258 Elm St', 'Room 4601'),
(55, '369147258V', '0770000055', 'William', 'Gonzalez', '369 Pine Blvd', 'Unit L'),
(56, '654258369V', '0770000056', 'Olivia', 'Gomez', '741 Cedar Dr', 'Suite 4701'),
(57, '789123456V', '0770000057', 'Mia', 'Perry', '852 Spruce Blvd', 'Floor 48'),
(58, '123456789V', '0770000058', 'Alexander', 'Butler', '963 Oak St', 'Apt 4901'),
(59, '987654321V', '0770000059', 'Charlotte', 'Woods', '123 Maple Ave', 'Room 5001'),
(60, '456123789V', '0770000060', 'Logan', 'Barnes', '147 Walnut Ln', 'Unit M'),
(61, '654987321V', '0770000061', 'James', 'Coleman', '258 Elm Blvd', 'Suite 5101'),
(62, '789456123V', '0770000062', 'Emma', 'Rodriguez', '369 Pine St', 'Floor 52'),
(63, '159357246V', '0770000063', 'Oliver', 'Evans', '741 Cedar Ave', 'Apt 5301'),
(64, '753951852V', '0770000064', 'Ava', 'Fisher', '852 Spruce Ln', 'Room 5401'),
(65, '369258147V', '0770000065', 'Ethan', 'Stevens', '963 Oakwood Dr', 'Unit N'),
(66, '258369147V', '0770000066', 'Sophia', 'Ford', '123 Cedar St', 'Suite 5501'),
(67, '147258369V', '0770000067', 'Jackson', 'Harrison', '147 Walnut Blvd', 'Floor 56'),
(68, '789654321V', '0770000068', 'Avery', 'Murray', '258 Elm Ave', 'Apt 5701'),
(69, '123789456V', '0770000069', 'Liam', 'Washington', '369 Pine Dr', 'Room 5801'),
(70, '456789123V', '0770000070', 'Isabella', 'Jenkins', '741 Cedar Blvd', 'Unit O'),
(71, '987123456V', '0770000071', 'Aria', 'Pierce', '852 Spruce St', 'Suite 5901'),
(72, '321654987V', '0770000072', 'Mason', 'Lawrence', '963 Oak Ln', 'Floor 60'),
(73, '852741963V', '0770000073', 'Ella', 'Cole', '123 Cedar Blvd', 'Apt 6101'),
(74, '369147258V', '0770000074', 'William', 'West', '147 Walnut Blvd', 'Room 6201'),
(75, '654258369V', '0770000075', 'Harper', 'Hayes', '258 Elm St', 'Unit P'),
(76, '789123456V', '0770000076', 'Olivia', 'Gordon', '369 Pine Ave', 'Suite 6301'),
(77, '123456789V', '0770000077', 'Michael', 'Lane', '741 Cedar Blvd', 'Floor 64'),
(78, '987654321V', '0770000078', 'Emma', 'Simpson', '852 Spruce Dr', 'Apt 6501'),
(82, '159357246V', '0770000082', 'Jackson', 'Perkins', '258 Elm Blvd', 'Floor 68'),
(84, '369258147V', '0770000084', 'Liam', 'Spencer', '741 Cedar Ln', 'Room 7001'),
(85, '258369147V', '0770000085', 'Aria', 'Grant', '852 Spruce Blvd', 'Unit R'),
(86, '147258369V', '0770000086', 'Mason', 'Casey', '963 Oak St', 'Suite 7101'),
(87, '789654321V', '0770000087', 'Ella', 'Knights', '123 Cedar Blvd', 'Floor 72'),
(88, '123789456V', '0770000088', 'William', 'Barrett', '147 Walnut Blvd', 'Apt 7301'),
(89, '456789123V', '0770000089', 'Harper', 'Payne', '258 Elm Ave', 'Room 7401'),
(90, '987123456V', '0770000090', 'Olivia', 'Fletcher', '369 Pine St', 'Unit S'),
(91, '321654987V', '0770000091', 'Michael', 'Gill', '741 Cedar Dr', 'Suite 7501'),
(92, '852741963V', '0770000092', 'Emma', 'Rowe', '852 Spruce Blvd', 'Floor 76'),
(93, '369147258V', '0770000093', 'Oliver', 'Hampton', '963 Oakwood Ave', 'Apt 7701'),
(94, '654258369V', '0770000094', 'Ava', 'Conner', '123 Cedar Blvd', 'Room 7801'),
(95, '789123456V', '0770000095', 'Sophia', 'Black', '147 Walnut St', 'Unit T'),
(96, '123456789V', '0770000096', 'Jackson', 'Cameron', '258 Elm Blvd', 'Suite 7901'),
(97, '987654321V', '0770000097', 'Isabella', 'Lambert', '369 Pine Ave', 'Floor 80'),
(98, '456123789V', '0770000098', 'Liam', 'Adkins', '741 Cedar Blvd', 'Apt 8101'),
(99, '654987321V', '0770000099', 'Aria', 'Keller', '852 Spruce Dr', 'Room 8201'),
(100, '789456123V', '0770000100', 'Mason', 'Bridges', '963 Oakwood Blvd', 'Unit U'),
(102, 'Theekshana', 'Fernando', '200031702568', '0718976568', '52/16 P.M Fernando', '5th lane,Miratuwa');

-- --------------------------------------------------------

--
-- Table structure for table `customerInvoice`
--

CREATE TABLE `customerInvoice` (
  `cusinv_cusid` int(5) NOT NULL,
  `cusinv_invid` int(5) NOT NULL,
  `cusinv_createddate` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customerInvoice`
--

INSERT INTO `customerInvoice` (`cusinv_cusid`, `cusinv_invid`, `cusinv_createddate`) VALUES
(9, 7, '2024-05-01'),
(12, 1001, '2024-05-20'),
(12, 1002, '2024-05-20'),
(12, 1005, '2024-05-20'),
(12, 1008, '2024-05-20'),
(12, 1105, '2024-05-18'),
(12, 1106, '2024-05-20'),
(12, 1107, '2024-05-18'),
(12, 1108, '2024-05-18'),
(12, 1109, '2024-05-21'),
(12, 1110, '2024-05-21'),
(12, 1112, '2024-05-18'),
(12, 1117, '2024-05-18'),
(12, 1126, '2024-05-18'),
(36, 1114, '2024-05-18'),
(96, 1001, '2024-05-27'),
(102, 7, '2024-05-19'),
(102, 1003, '2024-05-20'),
(102, 1004, '2024-05-20'),
(102, 1006, '2024-05-20'),
(102, 1007, '2024-05-20'),
(102, 1130, '2024-05-19'),
(102, 1131, '2024-05-19'),
(102, 1132, '2024-05-19');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `eq_id` int(11) NOT NULL,
  `eq_name` varchar(20) NOT NULL,
  `eq_rental` decimal(6,2) NOT NULL,
  `eq_description` varchar(255) DEFAULT NULL,
  `eq_dofpurchase` date NOT NULL,
  `eq_warranty_expire` date NOT NULL,
  `eq_image` varchar(40) NOT NULL,
  `eq_cost` decimal(6,2) NOT NULL,
  `eq_defected_status` int(1) NOT NULL,
  `eq_completestock` int(3) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`eq_id`, `eq_name`, `eq_rental`, `eq_description`, `eq_dofpurchase`, `eq_warranty_expire`, `eq_image`, `eq_cost`, `eq_defected_status`, `eq_completestock`) VALUES
(11, 'Equipment 11', 1366.78, '0', '2024-04-19', '2024-04-19', 'image11.jpg', 1100.00, 0, 1),
(12, 'Equipment 12', 1653.89, '0', '2024-04-18', '2024-04-18', 'image12.jpg', 1200.00, 1, 1),
(14, 'Equipment 14', 283.94, '0', '2024-04-16', '2024-04-16', 'image14.jpg', 1400.00, 1, 1),
(15, 'Equipment 15', 1912.31, '0', '2024-04-15', '2024-04-15', 'image15.jpg', 1500.00, 1, 1),
(16, 'Equipment 16', 1309.74, '0', '2024-04-14', '2024-04-14', 'image16.jpg', 1600.00, 1, 1),
(18, 'Equipment 18', 729.67, '0', '2024-04-12', '2024-04-12', 'image18.jpg', 1800.00, 1, 1),
(19, 'Equipment 19', 1613.01, '0', '2024-04-11', '2024-04-11', 'image19.jpg', 1900.00, 0, 1),
(20, 'Equipment 20', 276.05, '0', '2024-04-10', '2024-04-10', 'image20.jpg', 2000.00, 1, 1),
(24, 'Drill', 250.00, 'good drill', '2024-05-14', '2024-05-04', '', 2000.00, 0, 1),
(25, 'Drill', 250.00, 'good drill', '2024-05-14', '2024-05-04', '', 2000.00, 0, 1),
(26, 'scaffoldins', 150.00, NULL, '2024-05-01', '2024-05-17', '', 2500.00, 1, 150);

-- --------------------------------------------------------

--
-- Table structure for table `equipment_description`
--

CREATE TABLE `equipment_description` (
  `eq_des_id` int(11) NOT NULL,
  `eq_attribute` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `inv_id` int(11) NOT NULL,
  `inv_advance` int(10) NOT NULL,
  `inv_special_message` varchar(255) DEFAULT NULL,
  `inv_idcardstatus` tinyint(1) NOT NULL,
  `inv_updatedstatus` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`inv_id`, `inv_advance`, `inv_special_message`, `inv_idcardstatus`, `inv_updatedstatus`) VALUES
(7, 2000, '', 1, 1),
(1001, 2000, '', 1, 1),
(1002, 2000, '', 1, 1),
(1003, 2000, '', 1, 1),
(1004, 2000, '', 1, 1),
(1005, 2000, '', 1, 1),
(1006, 2000, '', 1, 1),
(1007, 2000, '', 0, 1),
(1008, 2000, '', 0, 1),
(1105, 2000, '', 1, 1),
(1106, 2000, '', 1, 1),
(1107, 2000, '', 1, 1),
(1108, 20000, '', 0, 1),
(1109, 20000, '', 1, 1),
(1110, 2000, '', 1, 1),
(1111, 0, '', 0, 0),
(1112, 2000, '', 1, 0),
(1113, 0, '', 0, 0),
(1114, 2000, '', 1, 0),
(1115, 0, '', 0, 0),
(1116, 0, '', 0, 0),
(1117, 1000, '', 1, 0),
(1118, 0, '', 0, 0),
(1119, 0, '', 0, 0),
(1120, 0, '', 0, 0),
(1121, 0, '', 0, 0),
(1122, 0, '', 0, 0),
(1123, 0, '', 0, 0),
(1124, 0, '', 0, 0),
(1125, 0, '', 0, 0),
(1126, 2000, '', 1, 0),
(1127, 0, '', 0, 0),
(1128, 0, '', 0, 0),
(1129, 0, '', 0, 0),
(1130, 0, '', 0, 0),
(1131, 2000, '', 1, 0),
(1132, 2000, '', 1, 0),
(1133, 0, '', 0, 0),
(1134, 0, '', 0, 0),
(1135, 0, '', 0, 0),
(1136, 0, '', 0, 0),
(1137, 0, '', 0, 0),
(1138, 0, '', 0, 0),
(1139, 0, '', 0, 0),
(1140, 0, '', 0, 0),
(1141, 0, '', 0, 0),
(1142, 0, '', 0, 0),
(1143, 0, '', 0, 0),
(1144, 0, '', 0, 0),
(1145, 0, '', 0, 0),
(1146, 0, '', 0, 0),
(1147, 0, '', 0, 0),
(1148, 0, '', 0, 0),
(1149, 0, '', 0, 0),
(1150, 0, '', 0, 0),
(1151, 0, '', 0, 0),
(1152, 0, '', 0, 0),
(1153, 0, '', 0, 0),
(1154, 0, '', 0, 0),
(1155, 0, '', 0, 0),
(1156, 0, '', 0, 0),
(1157, 0, '', 0, 0),
(1158, 0, '', 0, 0),
(1159, 0, '', 0, 0),
(1160, 0, '', 0, 0),
(1161, 0, '', 0, 0),
(1162, 0, '', 0, 0),
(1163, 0, '', 0, 0),
(1164, 0, '', 0, 0),
(1165, 0, '', 0, 0),
(1166, 0, '', 0, 0),
(1167, 0, '', 0, 0),
(1168, 0, '', 0, 0),
(1169, 0, '', 0, 0),
(1170, 0, '', 0, 0),
(1171, 0, '', 0, 0),
(1172, 0, '', 0, 0),
(1173, 0, '', 0, 0),
(1174, 0, '', 0, 0),
(1175, 0, '', 0, 0),
(1176, 0, '', 0, 0),
(1177, 0, '', 0, 0),
(1178, 0, '', 0, 0),
(1179, 0, '', 0, 0),
(1180, 0, '', 0, 0),
(1181, 0, '', 0, 0),
(1182, 0, '', 0, 0),
(1183, 0, '', 0, 0),
(1184, 0, '', 0, 0),
(1185, 0, '', 0, 0),
(1186, 0, '', 0, 0),
(1187, 0, '', 0, 0),
(1188, 0, '', 0, 0),
(1189, 0, '', 0, 0),
(1190, 0, '', 0, 0),
(1191, 0, '', 0, 0),
(1192, 0, '', 0, 0),
(1193, 0, '', 0, 0),
(1194, 0, '', 0, 0),
(1195, 0, '', 0, 0),
(1196, 0, '', 0, 0),
(1197, 0, '', 0, 0),
(1198, 0, '', 0, 0),
(1199, 0, '', 0, 0),
(1200, 0, '', 0, 0),
(1201, 0, '', 0, 0),
(1202, 0, '', 0, 0),
(1203, 0, '', 0, 0),
(1204, 0, '', 0, 0),
(1205, 0, '', 0, 0),
(1206, 0, '', 0, 0),
(1207, 0, '', 0, 0),
(1208, 0, '', 0, 0),
(1209, 0, '', 0, 0),
(1210, 0, '', 0, 0),
(1211, 0, '', 0, 0),
(1212, 0, '', 0, 0),
(1213, 0, '', 0, 0),
(1214, 0, '', 0, 0),
(1215, 0, '', 0, 0),
(1216, 0, '', 0, 0),
(1217, 0, '', 0, 0),
(1218, 0, '', 0, 0),
(1219, 0, '', 0, 0),
(1220, 0, '', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `invoiceEquipment`
--

CREATE TABLE `invoiceEquipment` (
  `inveq_eqid` int(5) NOT NULL,
  `inveq_invid` int(5) NOT NULL,
  `inveq_borrow_date` date NOT NULL DEFAULT current_timestamp(),
  `inveq_return_date` date DEFAULT NULL,
  `duration_in_days` int(11) GENERATED ALWAYS AS (to_days(`inveq_return_date`) - to_days(`inveq_borrow_date`)) VIRTUAL,
  `inveq_borrowqty` int(5) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoiceEquipment`
--

INSERT INTO `invoiceEquipment` (`inveq_eqid`, `inveq_invid`, `inveq_borrow_date`, `inveq_return_date`, `inveq_borrowqty`) VALUES
(14, 1107, '2024-05-20', NULL, 0),
(19, 1001, '2024-05-20', NULL, 1),
(19, 1002, '2024-05-20', NULL, 1),
(19, 1004, '2024-05-20', NULL, 1),
(19, 1105, '2024-05-20', NULL, 1),
(24, 1002, '2024-05-20', NULL, 1),
(24, 1004, '2024-05-20', NULL, 1),
(24, 1106, '2024-05-20', NULL, 1),
(24, 1109, '2024-05-21', NULL, 1),
(24, 1110, '2024-05-21', NULL, 1),
(26, 1002, '2024-05-20', NULL, 140),
(26, 1003, '2024-05-20', NULL, 3),
(26, 1005, '2024-05-20', NULL, 148),
(26, 1006, '2024-05-20', NULL, 148),
(26, 1007, '2024-05-20', NULL, 148),
(26, 1008, '2024-05-20', NULL, 148),
(26, 1105, '2024-05-20', NULL, 148),
(26, 1106, '2024-05-20', NULL, 148),
(26, 1107, '2024-05-20', NULL, 148),
(26, 1108, '2024-05-20', NULL, 149);

-- --------------------------------------------------------

--
-- Table structure for table `invoicePayments`
--

CREATE TABLE `invoicePayments` (
  `invpay_payment_id` varchar(30) NOT NULL,
  `invpay_inv_id` int(10) NOT NULL,
  `invpay_payment_date` date NOT NULL DEFAULT current_timestamp(),
  `invpay_amount` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoicePayments`
--

INSERT INTO `invoicePayments` (`invpay_payment_id`, `invpay_inv_id`, `invpay_payment_date`, `invpay_amount`) VALUES
('1110052165620000d90', 1110, '2024-05-21', 200);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_first_name` varchar(20) NOT NULL,
  `user_last_name` varchar(20) NOT NULL,
  `username` varchar(15) NOT NULL,
  `role` varchar(25) NOT NULL,
  `nic` varchar(12) NOT NULL,
  `user_phone_number` varchar(12) NOT NULL,
  `user_address1` varchar(30) NOT NULL,
  `user_address2` varchar(30) NOT NULL,
  `password` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_first_name`, `user_last_name`, `username`, `role`, `nic`, `user_phone_number`, `user_address1`, `user_address2`, `password`) VALUES
(1, 'theekshana', 'fernando', 'theekshana', 'admin', '200031702568', '', '52/16 p.m Fernando, 5th lane', 'moratuwa', '123'),
(2, 'achila', 'dilshan', 'achila', 'cashier', '2000130312', '', '23-A kiribathkumbura', 'kandy', '123'),
(3, 'shehan', 'chamudith', 'shehan', 'cashier', '2001334134', '', '23h-2 ', 'rathnapura', 'shehan'),
(4, 'theekshana', 'fernando', 'theekshana', 'cashier', '200031702568', '', '52/16 p.m Fernando 5h lane,', 'moratuwa', 'theekshana'),
(5, 'shehan', 'chamudith', 'shehan', 'warehouse handler', '2010293930', '', '23-A', 'rathnapura', 'shehan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill`
--
ALTER TABLE `bill`
  ADD PRIMARY KEY (`bill_id`),
  ADD KEY `bill-invoiceId fk` (`bill_inv_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cus_id`);

--
-- Indexes for table `customerInvoice`
--
ALTER TABLE `customerInvoice`
  ADD PRIMARY KEY (`cusinv_cusid`,`cusinv_invid`),
  ADD KEY `cusinv_fk_invid` (`cusinv_invid`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`eq_id`);

--
-- Indexes for table `equipment_description`
--
ALTER TABLE `equipment_description`
  ADD PRIMARY KEY (`eq_des_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`inv_id`);

--
-- Indexes for table `invoiceEquipment`
--
ALTER TABLE `invoiceEquipment`
  ADD PRIMARY KEY (`inveq_eqid`,`inveq_invid`),
  ADD KEY `inveq_fk_eq` (`inveq_invid`);

--
-- Indexes for table `invoicePayments`
--
ALTER TABLE `invoicePayments`
  ADD PRIMARY KEY (`invpay_payment_id`),
  ADD KEY `fk_invoice_payment` (`invpay_inv_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill`
--
ALTER TABLE `bill`
  MODIFY `bill_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `eq_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `inv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1221;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill`
--
ALTER TABLE `bill`
  ADD CONSTRAINT `bill-invoiceId fk` FOREIGN KEY (`bill_inv_id`) REFERENCES `invoice` (`inv_id`);

--
-- Constraints for table `customerInvoice`
--
ALTER TABLE `customerInvoice`
  ADD CONSTRAINT `cusinv_fk_cusid` FOREIGN KEY (`cusinv_cusid`) REFERENCES `customer` (`cus_id`),
  ADD CONSTRAINT `cusinv_fk_invid` FOREIGN KEY (`cusinv_invid`) REFERENCES `invoice` (`inv_id`);

--
-- Constraints for table `invoiceEquipment`
--
ALTER TABLE `invoiceEquipment`
  ADD CONSTRAINT `inveq_fk_eq` FOREIGN KEY (`inveq_invid`) REFERENCES `invoice` (`inv_id`),
  ADD CONSTRAINT `inveq_fk_inv` FOREIGN KEY (`inveq_eqid`) REFERENCES `equipment` (`eq_id`);

--
-- Constraints for table `invoicePayments`
--
ALTER TABLE `invoicePayments`
  ADD CONSTRAINT `fk_invoice_payment` FOREIGN KEY (`invpay_inv_id`) REFERENCES `invoice` (`inv_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
