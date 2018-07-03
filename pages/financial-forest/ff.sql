-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 13, 2013 at 06:57 AM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `financial_forest`
--

-- --------------------------------------------------------

--
-- Table structure for table `cushion_goals`
--

CREATE TABLE `cushion_goals` (
  `cushion_goal_id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(9) NOT NULL,
  `cushion_total` bigint(20) NOT NULL,
  `cushion_date_set` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cushion_days` mediumint(9) NOT NULL,
  `cushion_daily_savings` mediumint(9) NOT NULL,
  `cushion_with_savings` float NOT NULL,
  `initial_savings_balance` float NOT NULL,
  PRIMARY KEY (`cushion_goal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `n_date` datetime NOT NULL,
  `notification` varchar(300) NOT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `login` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(200) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `date_registered` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `account_type` varchar(20) NOT NULL,
  `cell_number` bigint(10) NOT NULL,
  `carrier` varchar(100) NOT NULL,
  `instructions` smallint(6) NOT NULL,
  `current_goal` mediumint(9) NOT NULL DEFAULT '0',
  `device_id` varchar(100) NOT NULL,
  `text_opt` tinyint(4) NOT NULL,
  `savings_balance` bigint(20) NOT NULL,
  `savings_cushion` bigint(20) NOT NULL,
  `deadline` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `login` (`login`),
  KEY `user_login_key` (`login`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;
