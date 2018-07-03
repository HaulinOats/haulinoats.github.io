<?php
session_start();

unset($_SESSION['username']);

echo "<p>You've been logged out!</p>";

header('Location: home.php');
?>