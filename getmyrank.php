<?php

if($_GET["marks"] && $_GET["id"]) {
 	$marks = $_GET["marks"];
 	$id = "ID_" . $_GET["id"];
 	$existed = 0;
	$myarr = getData("ranks.txt");
	// echo print_r($myarr, true);
	// echo "<br/>=================<br/>";
	if(array_key_exists($id, $myarr)){
		$existed = 1;
	}
	else {
		$myarr[$id] = $marks;
	}
	// echo print_r($myarr, true);
	// echo "<br/>=================<br/>";
	asort($myarr, SORT_NUMERIC);
	// echo print_r($myarr, true);
	// echo "<br/>=================<br/>";
	$rank = array_search($id, array_keys($myarr));
	$total = count($myarr);
	echo ($total - $rank) . " / " . $total;

	if($existed == 0){
		$logMarks = fopen("ranks.txt", "a") or die("Error code: 02");
		fwrite($logMarks, $id . ": " . $marks . "\n");
	}
	exit();
}

function getData($file) {
    $data = file($file);
    $returnArray = array();
    foreach($data as $line) {
        $explode = explode(": ", $line);
        $returnArray[$explode[0]] = $explode[1];
    }

    return $returnArray;
}


?>