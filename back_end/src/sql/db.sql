-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2023 at 05:13 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fpt_chanllenge`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `gender` varchar(30) NOT NULL,
  `birthday` varchar(30) NOT NULL,
  `created_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_id` int(11) NOT NULL,
  `updated_at` datetime NOT NULL,
  `delete_flag` int(11) NOT NULL,
  `old_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `gender`, `birthday`, `created_id`, `created_at`, `updated_id`, `updated_at`, `delete_flag`, `old_id`) VALUES
(0, 'Toàn1', 'toan1@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAiLCJlbWFpbCI6InRvYW4xQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzMTIzIn0.yuLskDluxniiKjniIHnrUDDnpMpuDE0lb91WNgZOwfg', 'Nam', '1/1/2002', 99, '2023-06-16 17:05:38', 99, '2023-06-16 17:05:38', 0, 0),
(1, 'Toàn2', 'toan2@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAiLCJlbWFpbCI6InRvYW4xQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzMTIzIn0.yuLskDluxniiKjniIHnrUDDnpMpuDE0lb91WNgZOwfg', 'Nam', '2/1/2002', 99, '2023-06-16 17:05:38', 99, '2023-06-16 17:05:38', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `authen`
--

CREATE TABLE `authen` (
  `id` int(11) NOT NULL,
  `accessToken` varchar(300) NOT NULL,
  `refreshToken` varchar(300) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `delete_flag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `authen`
--

INSERT INTO `authen` (`id`, `accessToken`, `refreshToken`, `created_at`, `updated_at`, `delete_flag`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAiLCJlbWFpbCI6InRvYW4xQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzMTIzIn0.yuLskDluxniiKjniIHnrUDDnpMpuDE0lb91WNgZOwfg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjAiLCJlbWFpbCI6InRvYW4xQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzMTIzIn0.yuLskDluxniiKjniIHnrUDDnpMpuDE0lb91WNgZOwfg', '2023-06-16 17:12:03', '2023-06-16 17:12:03', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `authen`
--
ALTER TABLE `authen`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `authen`
--
ALTER TABLE `authen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
