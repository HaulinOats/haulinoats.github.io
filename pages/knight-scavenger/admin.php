<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="EN" dir="ltr" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="content-type" content="text/xml; charset=utf-8" />
    <title>Admin Page</title>
<!-- Write Comments Here -->

		 <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
    
     <script src="js/admin.js" type="text/javascript"></script> 
  </head>
  
<!-- Write Comments Here -->

  <body>
  
  
  <?php
    $connection=mysql_connect("localhost","4104a","4104a")
    or print "connect failed because ".mysql_error();  
    
    mysql_select_db("4104a",$connection)
    or print "select failed because ".mysql_error();
    
		$act=$_POST['action'];

		//Change the ProductID to get info for a different product
		function showNames($connection){
			//!!! change this to 1 when we get things going!!!
			$myquery="SELECT nid FROM users WHERE progress=1";
			$result=mysql_query($myquery,$connection) 
				 or print "Showlist query '$myquery' failed because ".mysql_error();
	
			while ($row=mysql_fetch_array($result,MYSQL_ASSOC))
			{ 
				$nid=$row['nid']; 
				print "<option value=\"$nid\">$nid</option>";
			}		
		}	
	?>
	  
  	<div id="title">
  		<h1>ADMIN PAGE</h1>
    </div>
    
    <div id="approvedDeniedButtons">
    	<p><input type="button" id="approvedButton" value="Approved List" onclick="showApproved()" /></p>
      <p><input type="button" id="deniedButton" value="Denied List" onclick="showDenied()" /></p>
    </div>
    
    <div id="selector">
    	<p>
      	Select User: 
        <select name="selectUser" id="selectUser">
            <?php showNames($connection) ?>
        </select>
      </p>
      <p><input type="button" id="nid" value="Display Board" onclick="displayBoard()" /></p>
    </div>
    
    <div id="userBoard">
    </div>
   
  </body>
</html>
