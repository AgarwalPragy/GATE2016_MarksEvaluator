<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" name="viewport" content="IE=edge, width=device-width, initial-scale=1">
	<title>Which College can I get? | GATE 2016 | Gateoverflow.in</title>

	<link rel="stylesheet" href="bootstrap-custom-theme/dark/dark-min.css">
	<link rel="stylesheet" type="text/css" href="bootstrap-custom-theme/ring.css">

	<link rel="stylesheet" href="ScoreToColleges/ScoreToColleges-dark.css">
</head>

<body>

<div class="container" id="loading">
	<div class='uil-ring-css' style='transform:scale(0.6);'><div></div></div>
</div>

<div id="page" class="container hidden">

	<div id="header" class="row">
		<form class="form-inline">
			<div class="form-group col-md-4 col-sm-12">
				<input type="text" placeholder="Enter score here.." class="form-control" oninput="populate_contents()" id="my-score">
				<div id="popover-title" style="display: none">
					<h2 class='text-danger'>Invalid Score!</h2>
				</div>
				<div id="popover-content" style="display: none">
					<p class='text-info'>GATE Scores are out of 1000.</p>
					<a href="VisualizeMarks.php">(Click here to know your Score estimate)</a>
				</div>
				<span class="help-block">
					<a href="VisualizeMarks.php">(Click here to know your Score estimate)</a>
				</span>
			</div>
			<div class="form-group col-md-8 col-sm-12">
				<div class="btn-toolbar">
		        	<div class="btn-group btn-group-lg" data-toggle="buttons">
			            <label class="btn btn-primary"><input name="category-ph" type="checkbox" id="cat-ph"><span class="glyphicon glyphicon-ok-sign hidden" id="glyph-ph-checked"></span> PH</label>
		        	</div>
			        <div class="btn-group-vertical btn-group-lg" data-toggle="buttons" id="category-btn-group">
			            <label class="btn btn-primary"><input name="category" type="radio" id="cat-gen" checked><span class="glyphicon glyphicon-ok-sign" id="glyph-gen-checked"></span> Gen/OBC Creamy</label>
			            <label class="btn btn-primary"><input name="category" type="radio" id="cat-obc"><span class="glyphicon glyphicon-ok-sign hidden" id="glyph-obc-checked"></span> OBC Non-Creamy</label>
			            <label class="btn btn-primary"><input name="category" type="radio" id="cat-sc"><span class="glyphicon glyphicon-ok-sign hidden" id="glyph-sc-checked"></span> SC</label>
			            <label class="btn btn-primary"><input name="category" type="radio" id="cat-st"><span class="glyphicon glyphicon-ok-sign hidden" id="glyph-st-checked"></span> ST</label>
			        </div>
		        </div>
		    </div>
		</form>
	</div>

	<hr />



	<div id="main-content" class="row">		
		<div class="col-md-4 col-sm-12">
			<div class="panel panel-danger">
				<div class="panel-heading">
					<h2>What I won't get</h2>
					<h3 class="panel-title">Chances are pretty slim.</h3>
					<div class="text-warning hidden" id="ph-warning">
						<hr/>
						<h3 class="panel-title"><strong><span class="glyphicon glyphicon-exclamation-sign"></span> Due to unavailability of data, this list might be innacurate for the PH category</strong></h3>
					</div>
				</div>
				<div class="panel-body">
					<ul id="colleges-red" class="list-group"></ul>
				</div>
			</div>
		</div>
		<div class="col-md-4 col-sm-12">
			<div class="panel panel-info">
				<div class="panel-heading">
					<h2>What I might get</h2>
					<h3 class="panel-title">Definitely apply to all these.</h3>
				</div>
				<div class="panel-body">
					<div id="colleges-blue"></div>
				</div>
				<div id="remarks-container" class="panel-footer hidden">
					<ul id="remarks" class="list-group"></ul>
				</div>
			</div>
		</div>
		<div class="col-md-4 col-sm-12">
			<div class="panel panel-success">
				<div class="panel-heading">
					<h2>What I can get</h2>
					<h3 class="panel-title">You're very likely to get any of these.</h3>
					<h3 class="panel-title"><b>Also consider the <span style="color:#31708f;">blue list</span>, as it lists better colleges.</b></h3>
				</div>
				<div class="panel-body panel-success">
					<div id="colleges-green"></div>
				</div>
			</div>
		</div>
	</div>

	<hr />


	<div id="footer" class="row">
		<div id="credits-section" class="text-muted">
			<div class="col-sm-4 col-xs-12">
				<div><strong>Code</strong></div>
				<a href="https://github.com/AgarwalPragy/GATE2016_MarksEvaluator">[Github]</a>
			</div>
			<div class="col-sm-4 col-xs-12">
				<div><strong>Author: Pragy Agarwal</strong></div>
				<a href="https://www.facebook.com/profile.php?id=1644835049">[Facebook]</a>
				<a href="mailto:agar.pragy@gmail.com">[Email]</a>
			</div>
			<div class="col-sm-4 col-xs-12">
				<div><strong>Special Thanks:</strong></div>
				<div><strong>Arjun Suresh, Shyam Singh</strong></div>
			</div>
		</div>
	</div>

</div>


	<!-- For offline coding -->
	<!-- <script src="offline_coding/jquery.min.js"></script>
	<script src="offline_coding/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script> -->
	<!-- ################## -->

	 
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
	

	<!-- https://github.com/jsoma/tabletop -->
	<script src="ScoreToColleges/tabletop.js"></script>

	<script src="ScoreToColleges/ScoreToColleges.js"></script>
</body>
</html>