<?php
session_start();

unset($_SESSION['nid']);

echo "<p>You've been logged out!</p>";

header('Location: http://jonfriskics.com/~4104a/login.html');
?>