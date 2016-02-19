<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Visualize Marks</title>
    <!-- http://www.webgeekly.com/tutorials/jquery/how-to-switch-css-files-on-the-fly-using-jquery/ -->
    <link id="dynamic-css" rel="stylesheet" type="text/css" href="VisualizeMarks.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="VisualizeMarks.js"></script>
</head>
<body>
    <div align="center" id="top-float">
        <a href="index.php" class="top-float">[Click here to view your marks]</a>
        <hr/>
        <table width="80%">
            <tr>
            <td><table class="top-tables">
                <tr>
                    <th>My Marks</th>
                    <td>
                        <input type="text" style="width: 55%" id="my-marks" value="<?php if(isset($_GET["marks"])){echo $_GET["marks"];} ?>" oninput="calculate();">
                    </td>
                </tr>
                <tr>
                    <th>My Set</th>
                    <td>
                        <span>
                            <input type="radio" name="my-set" class="radio" id="radio1" value="5" checked onclick="calculate();">
                            <label for="radio1">1</label>
                        </span><br />
                        <span>
                            <input type="radio" name="my-set" class="radio" id="radio2" value="6" onclick="calculate();">
                            <label for="radio2">2</label>
                        </span>
                    </td>
                </tr>
            </table></td>
            <td><table class="top-tables">
                <tr>
                    <th style="text-align: right;">Normalized marks</th>
                    <th id="normalized-marks"></th>
                </tr>
                <tr>
                    <th style="text-align: right;">Qualifying Marks</th>
                    <th id="qualifying-marks"></th>
                </tr>
                <tr>
                    <th style="text-align: right;">Score</th>
                    <th id="score"></th>
                </tr>
            </table></td>
            <td><table class="top-tables">
                <tr>
                    <th style="text-align: right;">Rank Normalized</th>
                    <th id="rank-normalized"></th>
                </tr>
                <tr>
                    <th style="text-align: right;">Rank in Set</th>
                    <th id="rank-set"></th>
                </tr>
                <tr>
                    <th style="text-align: right;">Rank Raw</th>
                    <th id="rank-raw"></th>
                </tr>
            </table></td>
            </tr>
        </table>
    </div><hr />

    <div id="settings-box">
        <h1>Settings</h1>
        <h2>Theme</h2>
        <span>
            <input type="radio" name="theme" class="radio" id="theme-dark" checked onclick="set_theme()">
            <label for="theme-dark">Dark</label>
        </span><br/>
        <span>
            <input type="radio" name="theme" class="radio" id="theme-light" onclick="set_theme()">
            <label for="theme-light">Light</label>
        </span>
        <h2>Interval Width</h2>
        <span id="interval-width">5</span> <a onclick="change_interval(true)" href="#">+</a> <a onclick="change_interval(false)" href="#">-</a>
        <h2>Counts</h2>
        <span>
            <input type="radio" name="counts" class="radio" id="counts-individual" value="5">
            <label for="counts-individual">Individual</label>
        </span><br/>
        <span>
            <input type="radio" name="counts" class="radio" id="counts-cumulative" value="6" checked>
            <label for="counts-cumulative">Cumulative</label>
        </span>
    </div>

    <div id="charts" align="center">
        <div id="headings">
            <div class="tabular"><h1 class="underline">Set 1 <span  id="set5-total" class="total"></span></h1></div>
            <div class="tabular"><h1 class="underline">Set 2 <span  id="set6-total" class="total"></span></h1></div>
            <div class="tabular"><h1 class="underline">Overall <span id="all-total" class="total"></span></h1></div>
        </div>

        <!-- <h2 class="underline">Raw</h2> -->
        <div id="raw">
            <div class="tabular raw"><h2>Before Normalization</h2><div id="set5-raw"></div></div>
            <div class="tabular raw"><h2>Before Normalization</h2><div id="set6-raw"></div></div>
            <div class="tabular raw"><h2>Before Normalization</h2><div id="all-raw" ></div></div>
        </div>

        <!-- <h2 class="underline">Normalized</h2> -->
        <div id="normalized">
            <div class="tabular normalized"><h2>After Normalization</h2><div id="set5-normalized"></div></div>
            <div class="tabular normalized"><h2>After Normalization</h2><div id="set6-normalized"></div></div>
            <div class="tabular normalized"><h2>After Normalization</h2><div id="all-normalized" ></div></div>
        </div>

        <!-- <h2 class="underline">Data</h2> -->
        <div id="data">
            <div id="set5-data" class="tabular data"></div>
            <div id="set6-data" class="tabular data"></div>
            <div id="all-data"  class="tabular data"></div>
        </div>
        <div align="center" class="credits">
            <div class="tabular"><p>Code:<br/><a href="https://github.com/AgarwalPragy/GATE2016_MarksEvaluator">[Github]</a></p></div>
            <div class="tabular"><p>Author: Pragy Agarwal<br/><a href="https://www.facebook.com/profile.php?id=1644835049">[Facebook]</a> <a href="mailto:agar.pragy@gmail.com">[email]</a></p></div>
            <div class = "tabular"><p>Special Thanks to:<br/>Arjun Suresh, Shyam Singh</p></div>
        </div>
    </div>
    <script>
        window.raw_data = "<?php 
            // $data = file_get_contents('ranks.txt');
            $data = "";
            require 'database.php';
            $std_data = readmarks();
            $len = count($std_data);
            for($i = 0; $i < $len; $i++){
                $id = "" . $std_data[$i]['id'];
                $marks = "" .$std_data[$i]['marks'];
                $data = $data . " " . $id . ": " . $marks . " ";
            }
            $patterns = array();    
            $replacements = array();
            
            $patterns[0] = "/ID_CS16S([56])\d{7}: (-?\d*(\.\d\d)?)\d*/";
            $replacements[0] = " ($1,$2) ";

            $patterns[1] = "/ID_(?!CS16S\d)\w*: .*/";
            $replacements[1] = "";

            $patterns[2] = "/\n+/";
            $replacements[2] = " ";

            echo preg_replace($patterns, $replacements, $data);
        ?>";
        window.raw_data = window.raw_data.split(/\s+/);
        $("#radio<?php if(isset($_GET["set"])){echo $_GET["set"];}else{echo 1;}?>").prop("checked", true);
        do_initialize();
     </script>
</body>
</html>