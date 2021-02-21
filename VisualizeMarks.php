<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Estimate GATE 2016 Rank | See How Others Performed | Gateoverflow.in</title>
    <!-- http://www.webgeekly.com/tutorials/jquery/how-to-switch-css-files-on-the-fly-using-jquery/ -->
    <link id="dynamic-css" rel="stylesheet" type="text/css" href="visualizeMarks-dark.css">
</head>
<body>
    <div align="center" id="top-float">
        <table width="80%">
            <tr>
            <td><table class="top-tables">
                <tr>
                    <th>My Marks</th>
                    <td>
                        <input type="text" style="width: 55%" id="my-marks" value="<?php if(isset($_GET["marks"])){echo $_GET["marks"];} ?>" oninput="calculate();">
                    </td> <br/>
                </tr>
                <tr><td colspan="2"><a href="index.php" class="top-float">(Click here to view your marks)</a></td></tr>
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
                    <th style="text-align: right;">Rank Estimate</th>
                    <th id="rank-estimate"></th>
                </tr>
                <tr>
                    <th style="text-align: right;">Rank Normalized</th>
                    <th id="rank-normalized"></th>
                </tr>
                <tr>
                    <th style="text-align: right;">Rank in Set</th>
                    <th id="rank-set"></th>
                </tr>
            </table></td>
            </tr>
        </table>
    </div><hr />
    <div align="center">
        <button id="subject-button" onclick="display_subjects()">Check subject-wise</button>
        <div id="subject-list" style="display:none">
        <div style="flex-basis:100%; margin:10px">
            <button id="update-button" onclick="update_subject_list()">Update</button>
            <button id="clear-button" onclick="clear_subject_list()">Clear</button>
        </div>
    </div>
        

    </div>
    <hr/>
    <div align="center">
        <a href="ScoreToColleges.php" id="colleges">Click to <b>View list of IITs and NITs. See which colleges you might get.</b></a>
    </div>
    <hr />
    <div id="settings-box-container">
        <div id="settings-box">
            <table>
            <tr>
                <td>
                    <h1 id="settings-box-heading">Settings</h1>
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
                        <input type="radio" name="counts" class="radio" id="counts-individual" onclick="set_cumulative()">
                        <label for="counts-individual">Individual</label>
                    </span><br/>
                    <span>
                        <input type="radio" name="counts" class="radio" id="counts-cumulative" onclick="set_cumulative()" checked>
                        <label for="counts-cumulative">Cumulative</label>
                    </span><br/>
                    <span>
                        <input type="radio" name="counts" class="radio" id="counts-revcumulative" onclick="set_cumulative()" checked>
                        <label for="counts-revcumulative">Rev. Cumulative</label>
                    </span>
                </td>
                <td><div id="collapse-button" onclick="toggle_settings_box()"></div></td>
            </tr>
            </table>
        </div>
    </div>
    <div id="charts" align="center">
        <div id="headings">
            <div class="tabular"><h1 class="underline">Set 1 <span  id="set5-total" class="total"></span></h1></div>
            <div class="tabular"><h1 class="underline">Set 2 <span  id="set6-total" class="total"></span></h1></div>
            <div class="tabular"><h1 class="underline">Overall <span id="all-total" class="total"></span></h1></div>
        </div>

        <!-- <h2 class="underline">Raw</h2> -->
        <div id="raw">
            <div class="tabular raw">
                <h2>Before Normalization</h2>
                <h3 id="set5-stats"></h3>
                <div id="set5-raw"></div>
            </div>
            <div class="tabular raw">
                <h2>Before Normalization</h2>
                <h3 id="set6-stats"></h3>
                <div id="set6-raw"></div>
            </div>
            <div class="tabular raw">
                <h2>Before Normalization</h2>
                <h3 id="all-stats"></h3>
                <div id="all-raw" ></div>
            </div>
        </div>

        <!-- <h2 class="underline">Normalized</h2> -->
        <div id="normalized">
            <div class="tabular normalized">
                <h2>After Normalization</h2>
                <div id="set5-normalized"></div>
            </div>
            <div class="tabular normalized">
                <h2>After Normalization</h2>
                <div id="set6-normalized"></div>
            </div>
            <div class="tabular normalized">
                <h2>After Normalization</h2>
                <div id="all-normalized" ></div>
            </div>
        </div>

        <div align="center" class="credits">
            <div class="tabular"><p>Code:<br/><a href="https://github.com/AgarwalPragy/GATE2016_MarksEvaluator">[Github]</a></p></div>
            <div class="tabular"><p>Author: Pragy Agarwal<br/><a href="https://www.facebook.com/profile.php?id=1644835049">[Facebook]</a> <a href="mailto:agar.pragy@gmail.com">[email]</a></p></div>
            <div class = "tabular"><p>Special Thanks to:<br/>Arjun Suresh, Shyam Singh</p></div>
        </div>
    </div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="VisualizeMarks.js"></script>
    <script src="raw_data.js"></script>
    <script>
        window.raw_data = window.raw_data.split(/\s+/);
        $("#radio<?php if(isset($_GET["set"])){echo $_GET["set"];}else{echo 1;}?>").prop("checked", true);
        do_initialize();
     </script>
</body>
</html>