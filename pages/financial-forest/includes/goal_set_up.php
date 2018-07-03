<?
    //Checking if user hit the submit goal button and actually entered information in the fields
	if(isset($_POST['submit_goal']) 
        && (!empty($_POST['goal_total'])) 
        && (!empty($_POST['goal_description']))
        && (preg_match("/^([0-9]+)$/", $_POST['goal_total']))) {

        $type_in_a_number = false;
        $fill_out_the_form = false;

        $goal_set_successful = true;

        //Setting up the user input into variables
		$user_id = $_SESSION['user_id'];
		$goal_type = $_POST['goal_type'];
		$goal_total = mysqli_real_escape_string($mysqli, htmlentities(trim($_POST['goal_total'])));
		$goal_description = mysqli_real_escape_string($mysqli, htmlentities(trim($_POST['goal_description'])));
		$goal_date = $_POST['goal_date'];
        $todays_date = date('m/d/Y');

        $goal_initial_balance = getBalance($_SESSION['bank_username'], $_SESSION['bank_password']);

            //Entering all of those variables into the user_goals table
            $insert_query_goals = "INSERT INTO user_goals(user_id, goal_type, goal_total, goal_date_created, goal_description, goal_date, goal_initial_balance)
            VALUES ('$user_id','$goal_type','$goal_total',NOW(),'$goal_description','$goal_date','$goal_initial_balance')";
            $insert_result_goals = $mysqli->query($insert_query_goals);
            if($mysqli->error) {
                print "Insert query failed: ".$mysqli->error;
            }

        // Return all info from table "users"
        $select_result = $mysqli->query("SELECT * FROM user_goals");

        //Setting a variable to check if the user has a goal already set up
        $goal_check = $_SESSION['user_id'];

        //Checking the user_goals table for the unique user id
        while($row = $select_result->fetch_object()) {

            //If the user already has a goal set up don't display the set new goal button
            //Else display the set new goal button
            if ($goal_check == $row->user_id) { 
                $_SESSION['goal_id'] = $row->goal_id;
            } else {
            }
        }

        if ($goal_set_successful == true) {
            ?>
            <script type='text/javascript'> window.location = "main_page.php#enterScreen" </script>
            <?
        }
	} else {
        $fill_out_the_form = true;
    }

    if(isset($_POST['submit_goal'])
        && (!preg_match("/^([0-9]+)$/", $_POST['goal_total']))) {
        $type_in_a_number = true;
    }
?>