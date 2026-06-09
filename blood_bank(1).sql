-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2026 at 12:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blood_bank`
--

-- --------------------------------------------------------

--
-- Table structure for table `blood_requests`
--

CREATE TABLE `blood_requests` (
  `id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `receiver_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `receiver_blood_group` varchar(5) NOT NULL,
  `hospital_name` varchar(255) NOT NULL,
  `requested_blood_group` varchar(5) NOT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_requests`
--

INSERT INTO `blood_requests` (`id`, `receiver_id`, `receiver_name`, `email`, `contact`, `address`, `receiver_blood_group`, `hospital_name`, `requested_blood_group`, `quantity`, `status`, `created_at`) VALUES
(1, 3, 'harsh123', 'harsh123@gmail.com', '1234567899', 'harsh123', 'O+', 'hospital', 'O+', 1, 'Approved', '2026-06-01 14:39:17'),
(2, 5, 'Harsh', 'harsh@gmail.com', '78994561233', 'harsh@gmail.com', 'O+', 'Max', 'O+', 5, 'Approved', '2026-06-07 21:45:28');

-- --------------------------------------------------------

--
-- Table structure for table `blood_samples`
--

CREATE TABLE `blood_samples` (
  `id` int(11) NOT NULL,
  `hospital_id` int(11) NOT NULL,
  `hospital_name` varchar(255) NOT NULL,
  `blood_group` enum('A+','A-','B+','B-','O+','O-','AB+','AB-') NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blood_samples`
--

INSERT INTO `blood_samples` (`id`, `hospital_id`, `hospital_name`, `blood_group`, `quantity`, `created_at`) VALUES
(9, 12, 'Apollo Hospital', 'A+', 5, '2026-06-03 22:33:24'),
(10, 12, 'Apollo Hospital', 'A-', 10, '2026-06-03 22:33:31'),
(13, 12, 'Apollo Hospital', 'O+', 1, '2026-06-03 22:33:54'),
(14, 12, 'Apollo Hospital', 'O-', 4, '2026-06-03 22:34:03'),
(16, 8, 'Max', 'A+', 5, '2026-06-03 22:35:18'),
(20, 8, 'Max', 'O+', 8, '2026-06-03 22:35:55'),
(23, 7, 'Fortis', 'B+', 8, '2026-06-03 22:40:21'),
(24, 7, 'Fortis', 'A+', 2, '2026-06-03 22:40:38'),
(25, 8, 'Max', 'AB+', 5, '2026-06-07 21:43:55');

-- --------------------------------------------------------

--
-- Table structure for table `hospitals`
--

CREATE TABLE `hospitals` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hospitals`
--

INSERT INTO `hospitals` (`id`, `username`, `email`, `password`, `address`, `phone`, `role`, `created_at`) VALUES
(6, 'hospital', 'hospital@gmail.com', '$2y$10$uRBoI4cAm8yQyQVIUPqoRut29WCYGc0bxzPVXavByMGnt8Kjw1uAW', 'hospital', '1234567899', 'hospital', '2026-06-01 08:16:18'),
(7, 'Fortis', 'fortis@gmail.com', '$2y$10$tWH9.tnQuJJLdN7/qaxSMODNSgsT5Mb9gsNKdtb4X1cHOuE.B44OC', 'Noida, sector22, Uttar Pradesh, India', '12457852814', 'hospital', '2026-06-03 22:15:24'),
(8, 'Max', 'max@gmail.com', '$2y$10$4fUd9Z80gSONoWHSHm.t3.Np6vxtPV4fSO93bNr9M1Kxd0BEpwmjy', 'Noida, Sector66, Uttar Pradesh, India', '7896332145', 'hospital', '2026-06-03 22:17:08'),
(9, 'Gorakhnath Hospital', 'gorakhnath@gamil.com', '$2y$10$foWCGjmHw7/As5u0uP/pm.B92.QclFiHyqeTaYQ9p2sjT46H.eMFi', 'Bichhiya, Gorakhpur, Uttar Pradesh, India', '78564214545455', 'hospital', '2026-06-03 22:23:02'),
(10, 'AIIMS', 'aiims@gmail.com', '$2y$10$kVHVyArktJgVOt5kl/4nAuDTHED/rEJIIYHZLIjv5TVoxLxhVdeKS', 'AIIMS, New Delhi, India', '784532563256', 'hospital', '2026-06-03 22:25:15'),
(11, 'PGIMER (Postgraduate Institute of Medical Education & Research)', 'pgimer@gmail.com', '$2y$10$ax/mor2AbtSFy5xPYZRGa.FYRWLJZUmdXxbB58zHpBf84NwP4.mpW', 'Chandigarh', '78451239765', 'hospital', '2026-06-03 22:27:38'),
(12, 'Apollo Hospital', 'apollo@gmail.com', '$2y$10$AYP4GjC6Czb1FrNAn/W8T.XILa1UNGmVfjf0BGwcuujA0BqzyjgLG', 'Chennai, India', '7894561239', 'hospital', '2026-06-03 22:30:14');

-- --------------------------------------------------------

--
-- Table structure for table `receivers`
--

CREATE TABLE `receivers` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `role` varchar(15) NOT NULL,
  `blood_group` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receivers`
--

INSERT INTO `receivers` (`id`, `username`, `email`, `password`, `address`, `contact`, `role`, `blood_group`, `created_at`) VALUES
(3, 'harsh123', 'harsh123@gmail.com', '$2y$10$3OqvaJMLf.WsQFjjOxx41uqrbeJXWIfkRbd0rYUlEBpigH83FVw4S', 'harsh123', '1234567899', 'receiver', 'O+', '2026-06-01 08:27:57'),
(4, 'Anshika', 'anshika@gmail.com', '$2y$10$nu.LXe7rslFYXr3/Wz5D3ejqADOeL5HW8FfmFg5vv6GaTfY4beDhG', 'anshika@gmail.com', '7894561235', 'receiver', 'O+', '2026-06-03 22:31:03'),
(5, 'Harsh', 'harsh@gmail.com', '$2y$10$sitLN/eEYkK84uJzLxf0wOLDweuqiUGnkq47vU5S94ZNRR.8cq76m', 'harsh@gmail.com', '78994561233', 'receiver', 'O+', '2026-06-03 22:31:39'),
(6, 'Pari', 'pari@gmail.com', '$2y$10$tIunKWkaImj3bims8HKXfeq6IPy5oGejZv4JsfQ1ZxIJCBiJXNyQm', 'pari@gmail.com', '7894561235', 'receiver', 'A+', '2026-06-03 22:32:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blood_requests`
--
ALTER TABLE `blood_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blood_samples`
--
ALTER TABLE `blood_samples`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hospitals`
--
ALTER TABLE `hospitals`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `receivers`
--
ALTER TABLE `receivers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blood_requests`
--
ALTER TABLE `blood_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blood_samples`
--
ALTER TABLE `blood_samples`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `hospitals`
--
ALTER TABLE `hospitals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `receivers`
--
ALTER TABLE `receivers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
