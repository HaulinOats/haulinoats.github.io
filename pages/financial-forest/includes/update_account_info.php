<?
$user_id=$_POST['user_id'];
$first_name=$_POST['first_name'];
$last_name=$_POST['last_name'];
$email=$_POST['email'];
$carrier=$_POST['carrier'];
$cell_number=$_POST['cell_number'];
$text_opt=$_POST['text_opt'];
include 'db_connect.php';
$goalupdate=mysqli_query($mysqli,"UPDATE users SET first_name='$first_name',last_name='$last_name',email='$email', carrier='$carrier' ,cell_number='$cell_number',text_opt='$text_opt' WHERE user_id='$user_id'")or die('fail');
echo $user_id.":".$first_name.":".$last_name.":".$email.":".$carrier.":".$cell_number.":".$text_opt;
?>