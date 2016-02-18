<!DOCTYPE html>
<meta charset="UTF-8">
<html>
<head>
	<title>GATE 2016 Marks and Rank Evaluator</title>
	<link rel="stylesheet" type="text/css" href="gatestyles.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="process.js"></script>
	<script src="keys.js"></script>
</head>
<body>
<div id="my-header">
<table style="width: 100%;">
	<tr>
		<td id="input-prompt" style="width: 50%; text-align: center;" align="center">
			<div align="center">
				<h1>Instructions:</h1>
				<nav>
				    <li>Login on <a target="_blank" href="http://appsgate.iisc.ernet.in/">[this page].</a></li>
				    <li>Click on <img src="view-response-button.png" alt="view-response-button.png"></li>
				    <li>Copy the URL from the address bar</li>
				    <li>Paste it in the box below</li>
				</nav>
			</div>
			<br />
			<input type="url" class="has-tooltip" id="text-url" value = "" placeholder="Enter your responses URL here..." onpaste="setTimeout( function(){submitURL();}, 100);" />
			<br />
			<p class="notification">Note: This app needs to <span style="color: #6d6;">anonymously</span> log your marks to be able to show your rank.<br />Click Submit only if you agree to logging.</p>
			<a href="#" id="form-submit" onclick="submitURL()">Submit</a>
		</td>
		<td style="width: 50%;" align="center">
			<table id="table-results" class="table-results">
				<!-- <tr><td></td><td></td><td></td><td></td></tr> -->
				<tr><th>Set</th><td id="set">-</td><th colspan="2"><a id="rank-link" href="VisualizeMarks.php">Click here for Rank</a></th></tr>

				<tr class="table-top-header"><th></th><th>1 mark</th><th>2 mark</th><th>Total</th></tr>
				<tr>
					<th>Attempted</th>
					<td id="attempted-1-mark">-</td>
					<td id="attempted-2-mark">-</td>
					<td id="attempted-total">-</td>
				</tr>
				<tr>
					<th>Correct</th>
					<td id="correct-1-mark">-</td>
					<td id="correct-2-mark">-</td>
					<td id="correct-total">-</td>
				</tr>

				<tr class="table-top-header"><th></th><th>+ve</th><th>-ve</th><th>Total</th></tr>
				<tr>
					<th>Marks </th>
					<td id="marks-positive">-</td>
					<td id="marks-negative">-</td>
					<td id="marks-total">-</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</div>
<div id="responses"></div>
<div align="center" class="credits">
    <div class="tabular"><p>Code:<br/><a href="https://github.com/AgarwalPragy/GATE2016_MarksEvaluator">[Github]</a></p></div>
    <div class="tabular"><p>Author: Pragy Agarwal<br/><a href="https://www.facebook.com/profile.php?id=1644835049">[Facebook]</a> <a href="mailto:agar.pragy@gmail.com">[email]</a></p></div>
    <div class = "tabular"><p>Special Thanks to:<br/>Arjun Suresh, Shyam Singh</p></div>
</div>
</body>
</html>