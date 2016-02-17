<?php

if($_POST["marks"] && $_POST["id"]) {
 	$marks = $_POST["marks"];
 	$id = "ID_" . $_POST["id"];
	require 'database.php';
	$strings = array('id' => $id, 'marks' => $marks);
	insertmarks($strings);
	echo "Success. Inserted " . $marks . ", " . $id;
	exit();
}

?>
