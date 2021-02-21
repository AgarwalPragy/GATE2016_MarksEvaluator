function about() {
	var author = "Pragy Agarwal (agar.pragy@gmail.com)";
	var special_thanks = "Shyam Singh, Arjun Suresh";
	var source = "https://github.com/AgarwalPragy/GATE2016_MarksEvaluator";
	// For easily verifying currently cached version
	var version = "improve-estimate-rank";
}

function toggle_settings_box() {
	var collapsed = window._settings_box_collapsed;
	var left = -190;
	var transform = "rotate(0deg)";
	if (collapsed) {
		left = 10;
		$("#collapse-button").removeClass("collapsed");
		transform = "rotate(180deg)";
	}
	$("#collapse-button").css("transform", transform);
	$("#settings-box").animate({
		left: left + "px"
	});
	window._settings_box_collapsed = !window._settings_box_collapsed;
}

function set_cumulative() {
	$(".radio").blur();
	window.is_cumulative = false;
	if ($("#counts-cumulative").is(":checked")) {
		window.is_cumulative = true;
	}
	window.is_revcumulative = false;
	if ($("#counts-revcumulative").is(":checked")) {
		window.is_revcumulative = true;
	}

	var store_value = "individual";
	if (window.is_cumulative) {
		store_value = "cumulative";
	}
	if (window.is_revcumulative) {
		store_value = "revcumulative";
	}
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("is_cumulative", store_value);
	}
	draw_graphs();
}

function set_theme() {
	$(".radio").blur();
	var mytheme = "dark";
	if ($("#theme-light").is(":checked")) {
		mytheme = "light";
	}
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("theme", mytheme);
	}
	$("#dynamic-css").attr("href", "visualizeMarks-" + mytheme + ".css");
}

function change_interval(increase) {
	if (!("interval_width" in window)) window.interval_width = 5;
	var interval = window.interval_width;
	var divisors = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120];
	if (increase) {
		if (interval === 120) return;
		var index = divisors.indexOf(interval);
		window.interval_width = divisors[index + 1];
	} else {
		if (interval === 1) return;
		var index = divisors.indexOf(interval);
		window.interval_width = divisors[index - 1];
	}
	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("interval_width", window.interval_width);
	}
	$("#interval-width").html(window.interval_width);
	draw_graphs();
}

function calculate() {
	$(".radio").blur();
	var mymarks = $("#my-marks").val();
	if (isNaN(mymarks)) return;
	mymarks = parseFloat(mymarks);
	var set_num = 5;
	var set = window._set5;
	if ($("#radio2").is(":checked")) {
		set = window._set6;
		set_num = 6;
	}
	var norm_marks = normalize_marks(mymarks, set.TopAvg01, set.SumMeanStd);
	norm_marks = norm_marks.toFixed(2);
	$("#normalized-marks").html(norm_marks);

	var score = calculate_score(norm_marks);
	$("#score").html(score);
	$("#colleges").attr('href', 'ScoreToColleges.php?score=' + score);

	for (var i = 0; i < set.students.length; i++) {
		if (set.students[i].marks < mymarks) {
			if (i > 0 && set.students[i - 1].marks > mymarks) {
				$("#rank-set").html(i + 1);
			} else {
				$("#rank-set").html(i);
			}
			break;
		}
	}

	var rank_normalized = -1;

	for (var i = 0; i < window._all.students.length; i++) {
		if (window._all.students[i].normalized_marks < norm_marks) {
			rank_normalized = i;
			if (i > 0 && _all.students[i - 1].normalized_marks > norm_marks) {
				rank_normalized = i + 1;
			}
			$("#rank-normalized").html(rank_normalized + " / " + window._all.students.length);
			break;
		}
	}

	$("#rank-estimate").html(
		estimate_rank(norm_marks, rank_normalized)
	);
}

function get_5Counts() {
	var all_set = window._all.students;
	window.five_counts = [0, 0, 0, 0, 0, 0, 0, 0];
	for (var i = 0; i < window._all.students.length; i++) {
		if (all_set[i].normalized_marks >= 60) {
			window.five_counts[7] += 1;
		}
		if (all_set[i].normalized_marks >= 55) {
			window.five_counts[6] += 1;
		}
		if (all_set[i].normalized_marks >= 50) {
			window.five_counts[5] += 1;
		}
		if (all_set[i].normalized_marks >= 45) {
			window.five_counts[4] += 1;
		}
		if (all_set[i].normalized_marks >= 40) {
			window.five_counts[3] += 1;
		}
		if (all_set[i].normalized_marks >= 35) {
			window.five_counts[2] += 1;
		}
		if (all_set[i].normalized_marks >= 30) {
			window.five_counts[1] += 1;
		}
		if (all_set[i].normalized_marks >= 25) {
			window.five_counts[0] += 1;
		}
	}
}

function estimate_rank(norm_marks, rank_normalized) {
	// https://docs.google.com/spreadsheets/d/1Ql6D0uD-ljPxielCzpxyXrhGvt3o4T4csYMzalPvTIk/edit#gid=1461821067
	var lower_estimate = rank_normalized;
	var upper_estimate = 20000;

	// Expecting more people with 60+ marks this year. Thus, 350 is used instead of 300
	if (norm_marks > 60) {
		lower_estimate = rank_normalized;
		upper_estimate = 350.0 / window.five_counts[7];
	} else if (norm_marks > 55) {
		lower_estimate = 300.0 / window.five_counts[7];
		upper_estimate = 600.0 / window.five_counts[6];
	} else if (norm_marks > 50) {
		lower_estimate = 600.0 / window.five_counts[6];
		upper_estimate = 1150.0 / window.five_counts[5];
	} else if (norm_marks > 45) {
		lower_estimate = 1150.0 / window.five_counts[5];
		upper_estimate = 1950.0 / window.five_counts[4];
	} else if (norm_marks > 40) {
		lower_estimate = 1950.0 / window.five_counts[4];
		upper_estimate = 3250.0 / window.five_counts[3];
	} else if (norm_marks > 35) {
		lower_estimate = 3250.0 / window.five_counts[3];
		upper_estimate = 5200.0 / window.five_counts[2];
	} else if (norm_marks > 30) {
		lower_estimate = 5200.0 / window.five_counts[2];
		upper_estimate = 8300.0 / window.five_counts[1];
	} else if (norm_marks > 25) {
		lower_estimate = 8300.0 / window.five_counts[1];
		upper_estimate = 13500.0 / window.five_counts[0];
	} else {
		return ">14000";
	}

	if (norm_marks <= 60) {
		lower_estimate *= rank_normalized;
	}
	upper_estimate *= rank_normalized;
	return lower_estimate.toFixed(0) + " - " + upper_estimate.toFixed(0);
}

function draw_graphs() {
	fillColumn(window._set5, "set5");
	fillColumn(window._set6, "set6");
	fillColumn(window._all, "all");
}

function fillColumn(_set, set_name) {
	students = _set.students;
	if (!("interval_width" in window)) window.interval_width = 5;
	var interval = window.interval_width;
	var num_buckets = parseInt(Math.ceil(120 / interval).toFixed(0));
	var raw_counts = [];
	var normalized_counts = [];
	for (var i = 0; i < num_buckets; i++) {
		raw_counts.push(0);
		normalized_counts.push(0);
	}
	var raw_bucket = -1;
	var normalized_bucket = -1;
	var raw_max = -1;
	var normalized_max = -1;
	for (var i = 0; i < students.length; i++) {
		raw_bucket = Math.floor((students[i].marks + 20) / interval);
		raw_counts[raw_bucket] += 1;

		normalized_bucket = Math.floor((students[i].normalized_marks + 20) / interval);
		normalized_counts[normalized_bucket] += 1;

		raw_max = (raw_max > raw_counts[raw_bucket]) ? raw_max : raw_counts[raw_bucket];
		normalized_max = (normalized_max > normalized_counts[normalized_bucket]) ? normalized_max : normalized_counts[normalized_bucket];
	}
	var total = students.length;

	var raw_code = "";
	var normalized_code = "";
	var raw_cumulative = 0;
	var normalized_cumulative = 0;
	for (var i = 0; i < raw_counts.length; i++) {
		var item = pad(i * interval - 20) + ' - ' + pad(i * interval - 20 + interval);
		raw_cumulative += raw_counts[i];
		normalized_cumulative += normalized_counts[i];
		raw_code = raw_code + "\n" + str_bar(item, raw_counts[i], total, raw_max, raw_cumulative);
		normalized_code = normalized_code + "\n" + str_bar(item, normalized_counts[i], total, normalized_max, normalized_cumulative);
	}
	$("#" + set_name + "-raw").html(raw_code);
	$("#" + set_name + "-normalized").html(normalized_code);
	$("#" + set_name + "-total").html("(" + total + ")");
	$("#" + set_name + "-stats").html(
		"Top 0.1% Avg: " + _set.TopAvg01.toFixed(2) + "<br />" +
		"Sum Mean Std: " + _set.SumMeanStd.toFixed(2)
	);
}

function str_bar(item, count, total, max, count_cumulative) {
	var width = parseInt(((count * 95.0) / max).toFixed(0)) + 5;
	if (count === 0) width = 0;

	var display_value = count;
	if (window.is_cumulative) {
		display_value = count_cumulative;
	}
	if (window.is_revcumulative) {
		display_value = total - count_cumulative + count;
	}

	var bar = (
		item +
		'&nbsp;<progress value="' + width + '" max="100" class="myprogress"></progress>&nbsp;' +
		pad(display_value) + '<br />'
	);
	return bar;
}

function pad(num) {
	var num_str = '<span style="display: inline-block; width: 30px; text-align: right;">' + num + '</span>';
	return num_str;
}

/**
	Returns the average marks of top 1% candidates
	from the given array of students.
	Note, this should be 0.1%, but we don't have that many people.

	Update: We now have 5000+ candidates per set, and GATE will
	probably have ~50,000 candiates per set.
	That means top 0.1% = 50 (for sets) and 100 (overall) candidates 
	However, since we don't have all the top condidates using our
	application, we should probably limit it to 40 and 80 respectively.
	(because the average of actual top 0.1% will be more than the 
	overage of our 0.1% if there are some people who haven't used this app.)
	(ofcourse, I pulled the 40 and 80 out of my ass.)
*/
function top_avg(students) {
	var len = students.length;
	var top01 = 40;
	if (len > 10000) {
		top01 = 80;
	}
	var sum = 0.0;
	for (var i = 0; i < top01; i++) {
		sum += students[i].marks;
	}
	return sum / top01;
}

/**
	Returns the sum of mean and standard deviation of all candidates
	from the given array of students.
*/
function sum_mean_std(students) {
	var sum = 0.0;
	for (var i = 0; i < students.length; i++) {
		sum += students[i].marks;
	}
	var mean = sum / students.length;

	var net_variance = 0.0;
	var deviation = 0.0;
	for (var i = 0; i < students.length; i++) {
		deviation = students[i].marks - mean;
		net_variance += deviation * deviation;
	}
	var variance = net_variance / students.length;
	var std = Math.sqrt(variance);
	return mean + std;
}

function calculate_qualifyingmarks() {
	// http://www.gate.iisc.ernet.in/?page_id=1054

	// Our data is too little and biased for the actual formula
	// window.qualifying_marks = (window._all.SumMeanStd>25)?window._all.SumMeanStd:25;

	// We will just used 25 marks going by the past years pattern.
	window.qualifying_marks = 25.00;

	window.qualifying_marks = parseFloat(window.qualifying_marks.toFixed(2));
	$("#qualifying-marks").html(window.qualifying_marks);
}

function calculate_score(norm_marks) {
	// http://www.gate.iisc.ernet.in/?page_id=1054

	var score = 350.0 + ((900.0 - 350.0) * (norm_marks - window.qualifying_marks)) / (window._all.TopAvg01 - window.qualifying_marks);
	score = score > 1000 ? 1000 : score;
	score = score.toFixed(2);
	return score;
}

function normalize_marks(marks, topAvg01, sum_mean_std) {
	// http://www.gate.iisc.ernet.in/?page_id=1054
	return (
		(
			(window._all.TopAvg01 - window._all.SumMeanStd) /
			(topAvg01 - sum_mean_std)
		) *
		(marks - sum_mean_std) +
		window._all.SumMeanStd
	);
}

function populate_normalized_marks(students, topAvg01, sum_mean_std) {
	for (var i = students.length - 1; i >= 0; i--) {
		/**
			Formula: http://www.gate.iisc.ernet.in/?page_id=1054
		*/
		students[i].normalized_marks = normalize_marks(students[i].marks, topAvg01, sum_mean_std);
		students[i].normalized_marks = parseFloat(students[i].normalized_marks.toFixed(2));
	}
}

function process_marks() {
	// Process the raw_data and populate all.students array
	window._all = {};
	window._set5 = {};
	window._set6 = {};
	window._all.students = [];
	var regex = /\((5|6),([\d\-.]+)\)/;
	for (var i = window.raw_data.length - 1; i >= 0; i--) {
		var set = 0;
		var marks = 0;
		var found = window.raw_data[i].match(regex);
		if (found && found.length >= 2) {
			set = parseInt(found[1]);
			if (!(set === 5 || set === 6)) continue;
			marks = parseFloat(found[2]);
			window._all.students.push({
				set: set,
				marks: marks,
				normalized_marks: 0,
				rank: -1,
				normalized_rank: -1
			});
		}
	}
	// Sort descending. Makes it easy to process later.
	window._all.students.sort(function (a, b) {
		return b.marks - a.marks;
	})
	// console.log(window._all.students);

	// We have the array for all.students.
	// Sieve this into an array for each set.
	// Both these arrays will automatically be sorted in descending order.
	window._set5.students = [];
	window._set6.students = [];
	for (var i = 0; i < window._all.students.length; i++) {
		if (window._all.students[i].set === 5)
			window._set5.students.push(window._all.students[i]);
		else
			window._set6.students.push(window._all.students[i]);
	}
	// The following is needed for normalization
	window._all.TopAvg01 = top_avg(window._all.students);
	window._set5.TopAvg01 = top_avg(window._set5.students);
	window._set6.TopAvg01 = top_avg(window._set6.students);

	window._all.SumMeanStd = sum_mean_std(window._all.students);
	window._set5.SumMeanStd = sum_mean_std(window._set5.students);
	window._set6.SumMeanStd = sum_mean_std(window._set6.students);

	// Calculate normalized marks for each candate
	populate_normalized_marks(window._set5.students, window._set5.TopAvg01, window._set5.SumMeanStd);
	populate_normalized_marks(window._set6.students, window._set6.TopAvg01, window._set6.SumMeanStd);

	// Sort descending by normalized marks.
	window._all.students.sort(function (a, b) {
		return b.normalized_marks - a.normalized_marks;
	})

	// Make some sexy graphs
	draw_graphs();

	// Calculate qualifying marks
	calculate_qualifyingmarks();

	// Fill counts array for calculating rank estimate
	get_5Counts();
}

function do_initialize() {
	process_marks();
	calculate();
	if (typeof (Storage) !== "undefined") {
		var theme = localStorage.getItem("theme");
		$("#theme-" + theme).prop("checked", true);
		set_theme();
	}
	if (typeof (Storage) !== "undefined") {
		var cumulative = localStorage.getItem("is_cumulative");
		$("#counts-" + cumulative).prop("checked", true);
		set_cumulative();
	}
	if (typeof (Storage) !== "undefined") {
		var interval = localStorage.getItem("interval_width");
		var divisors = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24, 30, 40, 60, 120];
		if ((!isNaN(interval)) && divisors.indexOf(parseInt(interval)) >= 0) {
			interval = parseInt(interval)
		} else {
			interval = 5;
		}
		window.interval_width = interval;
		change_interval(true);
		change_interval(false);
	}
	window._settings_box_collapsed = false;
	toggle_settings_box();
	append_subjects();

}

function append_subjects() {
	$.getJSON("./subjects.json", function (data) {
		console.log(data);
		var items = [];
		$.each(data, function (key, val) {
			items.push(`<div class="subject-item"><input type="checkbox" id="${val["id"]}" name="subjects" value="${val["id"]}">
			<label for="${val["name"]}">${val["name"]}</label></div>`);
		});

		$('#subject-list').prepend(items.join(""));
	})
}

function display_subjects() {
	$("#subject-list").toggle();
}

function update_subject_list() {
	arr = [];
	$(".subject-item input:checkbox:checked").each(function () {
		arr.push($(this).val());
	});
	console.log(arr);
	return arr;
}

function clear_subject_list() {
	$(".subject-item input:checkbox").removeAttr('checked');
	return [];
}