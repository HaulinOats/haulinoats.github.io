<? 
require 'dpn_db_connect.php';
$name = $_POST['name'];
$type = $_POST['type'];
$notes = $_POST['notes'];
$notice_date = $_POST['notice_date'];
$query = "INSERT INTO users ( name , type , notes , notice_date ) VALUES ('$name', '$type', '$notes', '$notice_date')";
if($name != "" || $type != "" || $notes != "" || $notice_date != ""){
	mysqli_query($link, $query) or die('error: '.mysqli_error($link));
} 
?>