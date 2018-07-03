-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 29, 2012 at 04:22 PM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `scandit`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `sku` varchar(20) NOT NULL,
  `name` varchar(200) NOT NULL,
  `img_url` varchar(400) NOT NULL,
  `walmart_p` decimal(10,2) NOT NULL,
  `target_p` decimal(10,2) NOT NULL,
  `publix_p` decimal(10,2) NOT NULL,
  `winndixie_p` decimal(10,2) NOT NULL,
  PRIMARY KEY (`sku`),
  UNIQUE KEY `sku` (`sku`),
  KEY `sku_2` (`sku`),
  KEY `sku_3` (`sku`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`sku`, `name`, `img_url`, `walmart_p`, `target_p`, `publix_p`, `winndixie_p`) VALUES
('0022200004831', 'Speed Stick Deodorant, Regular, 3.25 oz', 'http://ecx.images-amazon.com/images/I/41fkGCEipaL._SL160_.jpg', 2.04, 1.01, 3.12, 1.12),
('0026169058102', 'Bod Man Really Ripped Abs 4 oz Deodorant Spray', 'http://ecx.images-amazon.com/images/I/41jM1%2Biq9NL._SL160_.jpg', 3.59, 0.00, 0.00, 0.00),
('0026169058119', 'Bod Man Fresh Blue Musk 4 oz Deodorant Spray', 'http://ecx.images-amazon.com/images/I/41WhZUceQ8L._SL160_.jpg', 3.59, 0.00, 0.00, 0.00),
('0035000741196', 'Colgate Total Whitening Gel', 'http://ecx.images-amazon.com/images/I/21sATqBxwHL._SL160_.jpg', 1.02, 2.13, 2.10, 2.13),
('0047400263741', 'Right Guard Sport Aerosol Antiperspirant Deodorant  Scented 6 Oz-6 Pack', '', 2.34, 0.00, 0.00, 0.00),
('0078347001554', 'Natures Gate Natural Toothpaste, Cool Mint Gel, 5-Ounce Tubes', 'http://ecx.images-amazon.com/images/I/410kaWhwLhL._SL160_.jpg', 2.49, 0.00, 1.20, 0.00),
('0079400507402', 'Dove Invisible Solids, Sensitive Skin, 2.6 Ounce Stick (Pack of 6)', 'http://ecx.images-amazon.com/images/I/31pjMIIkRgL._SL160_.jpg', 12.00, 0.00, 0.00, 0.00),
('0079400550200', 'Axe Phoenix Deodorant Body Spray 4 oz.', 'http://ecx.images-amazon.com/images/I/31K-27P7CJL._SL160_.jpg', 2.29, 0.00, 0.00, 0.00),
('0079400553003', 'Axe Deodorant Body Spray For Men-Essence-4 oz', 'http://ecx.images-amazon.com/images/I/21b6wUhioNL._SL160_.jpg', 3.12, 0.00, 0.00, 0.00),
('0079400558404', 'AXE Deodorant Bodyspray For Men, Touch', 'http://ecx.images-amazon.com/images/I/21QY9VRWHCL._SL160_.jpg', 1.16, 2.01, 3.00, 1.20),
('0079400834706', 'Suave Naturals Anti-perspirant & Deodorant Invisible Solid, Pacific Breeze 2.6oz (Pack of 4)', 'http://ecx.images-amazon.com/images/I/2176Ro4ubXL._SL160_.jpg', 8.29, 0.00, 0.00, 0.00),
('0309975104004', 'Mitchum Anti-Perspirant & Deodorant, Roll On, Unscented, 2.5 fl oz (73 ml) (Pack of 4)', 'http://ecx.images-amazon.com/images/I/413kJ86qIRL._SL160_.jpg', 12.99, 0.00, 0.00, 0.00),
('0732168909801', 'Naturally Fresh Deodorant Crystal Spray Mist, 4-Ounce Bottles (Pack of 6)', 'http://ecx.images-amazon.com/images/I/41zi-QM1O9L._SL160_.jpg', 14.92, 0.00, 0.00, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `type` text NOT NULL,
  `email` varchar(40) NOT NULL,
  `points` int(6) NOT NULL,
  `info` varchar(200) NOT NULL,
  `list_1` varchar(800) DEFAULT NULL,
  `list_2` varchar(800) DEFAULT NULL,
  `list_3` varchar(800) DEFAULT NULL,
  `list_4` varchar(800) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `type`, `email`, `points`, `info`, `list_1`, `list_2`, `list_3`, `list_4`) VALUES
(1, 'brett84c', '80ccb50a3f1e9c4479d5cb734a5fd678', 'member', 'brett84c@yahoo.com', 0, '', '|0035000741196', '', '', '');
