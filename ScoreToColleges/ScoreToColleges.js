function about(){
	var author = "Pragy Agarwal (agar.pragy@gmail.com)";
	var special_thanks = "Shyam Singh, Arjun Suresh";
	var source = "https://github.com/AgarwalPragy/GATE2016_MarksEvaluator";
	// For easily verifying currently cached version
	var version = "add notices";
}

$(window).resize(set_buttons_style);

function set_buttons_style() {
	var is_xs = false;
	if ($(window).width() < 750)  { is_xs = true; }

	if (is_xs) {
		$('#category-btn-group').removeClass('btn-group');
		$('#category-btn-group').addClass('btn-group-vertical');
	} else {
		$('#category-btn-group').removeClass('btn-group-vertical');
		$('#category-btn-group').addClass('btn-group');
	}
}

function find_set(myscore, range){
	if(isWhitespace(range)) {
		return 'red';
	}
	var low  = 0,
		high = 0;
	var regex_range = /\s*(\d+)\s*-\s*(\d+)\s*/;
	found = range.match(regex_range);
	if(found && found.length >= 2) {
		low = parseInt(found[1]);
		high = parseInt(found[2]);
	}
	else {
		low = high = parseInt(range);
	}
	if(high < low){
		var temp = low;
		low = high;
		high = temp;
	}

	if(myscore < low) {
		return 'red';
	}
	else if(myscore < high) {
		return 'blue';
	}
	return 'green';
}

function show_invalidScore() {
	if(!window.still_typing) {
		setTimeout(function() {
			window.still_typing = false;
			var myscore = $('#my-score').val();
			myscore = (isNaN(myscore)||isWhitespace(myscore))?
							100 : parseFloat(myscore);

			if (myscore < 100 || myscore > 1000) {
				$('#my-score').popover('show');
			}
		}, 500);	
	}
	window.still_typing = true;
}

function populate_contents(blur) {
	if (typeof blur !== 'undefined' && blur) {
		$('#my-score').blur();
	}
	var data = window.college_data;
	var myscore = $('#my-score').val();
	myscore = (isNaN(myscore)||isWhitespace(myscore))?
					100 : parseFloat(myscore);

	if (myscore < 100 || myscore > 1000) {
		show_invalidScore();
	} else {
		$('#my-score').popover('hide');
	}

    // Increase score by 3% on Arjun sir's assesment.
	myscore = parseFloat((myscore * 1.03).toFixed(0));
	// Clear sets
	$('#colleges-red').html('');
	$('#colleges-blue').html('');
	$('#colleges-green').html('');
	$('#remarks').html('');
	$('#remarks-container').addClass('hidden');

	var remarks_arr = [];
	var notices_arr = [];

	for (var i = 0; i < data.length; i++) {
		var college = data[i];
		if(college['Published']!=='Yes') {
			continue;
		}
		var range = college[window.category_column_title];
		if(isWhitespace(range)) {
			range = college['Cutoff Score (Gen)'];
		}
		var set = find_set(myscore, range);
		if(set === 'blue') {
			var remark = college['Remark'];
			if(!isWhitespace(remark)) { // check if the remark is not empty
				if(remarks_arr.indexOf(remark)<0){ // don't add duplicates
					remarks_arr.push(remark);
				}
			}
		}
		var notice = college['Notice'];
		if(!isWhitespace(notice)) { // check if the notice is not empty
			if(notices_arr.indexOf(notice)<0){ // don't add duplicates
				notices_arr.push(notice);
			}
		}

		var college_bar = decorate_college(college);
		$('#colleges-' + set).append(college_bar);
	}
	if (remarks_arr.length > 0) {
		var remarks_html = '';
		for (var i = 0; i < remarks_arr.length; i++) {
			remarks_html += decorate_remark(remarks_arr[i]);
		}
		$('#remarks').html(remarks_html);
		$('#remarks-container').removeClass('hidden');
	}
	if (notices_arr.length > 0) {
		var notices_html = '';
		for (var i = 0; i < notices_arr.length; i++) {
			notices_html += decorate_remark(notices_arr[i]);
		}
		$('#notices').html(notices_html);
	}
}

function isWhitespace(str) {
	return (/^\s*$/.test(str));
}

function decorate_college(college) {
	var event_link = college['Event Links'];
	var link_html = '';
	if(!isWhitespace(event_link)) {
		link_html = '<span class="badge"><a target="_blank" href="' + event_link + '">Discuss <span class="glyphicon glyphicon-new-window"></span></a></span>';	
	}
	return '<li class="list-group-item">' + link_html + college['Display Text'] + '</li>';
}

function decorate_remark(remark) {
	return '<li class="list-group-item">' + remark + '</li>';
}

function get_college_data() {
	var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Vgtr932MXaDIrpCfrtZkmIFZzNhAoohApXqN3AtSLK0/pubhtml?gid=0&single=true';
	Tabletop.init({
		key: public_spreadsheet_url,
		callback: function(data, tabletop) {
			console.log(data);
			window.college_data = data;
			show_page();
		},
		simpleSheet: true
	});
}

function show_page() {
	$('#loading').addClass('hidden');
	$('#page').removeClass('hidden');
	set_buttons_style();
	$("#my-score").focus();
	var btns = $(".btn-toolbar .btn");
	btns.click(change_category);
	window.is_ph = false;

	window.still_typing = false;

	$('#my-score').popover({
		placement: 'bottom',
        html : true,
        content: function() {
          return $('#popover-content').html();
        },
        title: function() {
          return $('#popover-title').html();
        }
    });

    $('#my-score').click(function() {
        $(this).popover('hide');
    });

	$('#cat-gen').click();
}

function change_category() {
	var $this = $(this);
	var input = $this.find('input');
	var glyph = $this.find('.glyphicon');
	
	var cat_name = window.category_name;
	// Set active icon
	if(input.attr('id')==='cat-ph') {
		if (input.is(':checked')) {
			glyph.addClass('hidden');
			window.is_ph = false;
		} else {
			glyph.removeClass('hidden');
			window.is_ph = true;
		}
	} else {
		cat_name = input.attr('id');
		var radios = $('input[name=category]+.glyphicon');
		radios.addClass('hidden');
		glyph.removeClass('hidden');
	}

	// Set ph-warning
	var ph_warning = $("#ph-warning");
	if (window.is_ph) {
		ph_warning.removeClass('hidden');
	} else {
		ph_warning.addClass('hidden');
	}

	// Change window.category_column_title
	if (window.is_ph && cat_name==='cat-gen') {
		window.category_column_title = 'PH(Gen)';
	} else if (window.is_ph && cat_name==='cat-obc') {
		window.category_column_title = 'PH(OBC)';
	} else if (window.is_ph && cat_name==='cat-sc') {
		window.category_column_title = 'PH(SC)';
	} else if (window.is_ph && cat_name==='cat-st') {
		window.category_column_title = 'PH(ST)';
	} else if (cat_name==='cat-obc') {
		window.category_column_title = 'Cutoff Score (OBC)';
	} else if (cat_name==='cat-sc') {
		window.category_column_title = 'Cutoff Score (SC)';
	} else if (cat_name==='cat-st') {
		window.category_column_title = 'Cutoff Score (ST)';
	} else {
		window.category_column_title = 'Cutoff Score (Gen)';
	}
	window.category_name = cat_name;
	populate_contents();
}

$('body').ready(function() {
	get_college_data();
});
