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
		<td style="width: 50%; text-align: center;" align="center">
			<b>Responses URL:</b><br />
			<input type="text" id="text-url" value="" />
			<br />
			<p class="notification">Note: This app needs to <span style="color: #6f6;">anonymously</span> log your marks to be able to show your rank.<br />Click Submit only if you agree to logging.</p>
			<a href="#" id="form-submit" onclick="submitURL()">Submit</a>
		</td>
		<td style="width: 50%;" align="center">
			<table id="table-results" class="table-results">
				<!-- <tr><td></td><td></td><td></td><td></td></tr> -->
				<tr><th>Set</th><td id="set">x</td><th>Rank</th><td id="rank">x</td></tr>

				<tr class="table-top-header"><th></th><th>1 mark</th><th>2 mark</th><th>Total</th></tr>
				<tr>
					<th>Attempted</th>
					<td id="attempted-1-mark">x</td>
					<td id="attempted-2-mark">x</td>
					<td id="attempted-total">x</td>
				</tr>
				<tr>
					<th>Correct</th>
					<td id="correct-1-mark">x</td>
					<td id="correct-2-mark">x</td>
					<td id="correct-total">x</td>
				</tr>

				<tr class="table-top-header"><th></th><th>+ve</th><th>-ve</th><th>Total</th></tr>
				<tr>
					<th>Marks </th>
					<td id="marks-positive">x</td>
					<td id="marks-negative">x</td>
					<td id="marks-total">x</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</div>
<div id="responses"></div>
</body>
</html>