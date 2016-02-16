function submitURL(){
    var responses = $('#responses');
    responses.html('<div style="text-align: center;"><h1>Loading...</h1></div>');
    var url = $('#text-url').val();
    $.ajax({
		url: "geturl.php?url="+url,
		success: function(data){
			responses.html(data);
			window.set = {};
			window.uid = "";
			window.final_marks = -1;
			process();
		}
	});
	$('#text-url').val("");
}

function get_set(){
	var strongs = $("#responses").find('strong');
	var set_regex = /GATE \dth Feb 2016 Shift (\d)/;
	for (var i = strongs.length - 1; i >= 0; i--) {
		var text = $(strongs[i]).text();
		var found = text.match(set_regex);
		if(found && found.length >= 2){
			window.set = parseInt(found[1]);
			break;
		}
	}
	$("#set").html(window.set);
}

function get_uid(){
	var trs = $(".main-info-pnl").find('tr');
	var uid_regex = /Participant Roll No:.*(CS\w+)/;
	for (var i = trs.length - 1; i >= 0; i--) {
		var text = $(trs[i]).text();
		if(text!=""){
			console.log(text);
		}
		var found = text.match(uid_regex);
		if(found && found.length >= 2){
			window.uid = found[1];
			break;
		}
	}
}

function getRank(){
	var rank = $('#rank');
    rank.html('Ranking...');
    $.ajax({
		url: "getmyrank.php?id=" + window.uid + "&marks=" + window.final_marks,
		success: function(data){
			rank.html(data);
		}
	});
}

function process(){
	get_set();
	get_uid();
	var questions = $('#responses').find('.questionRowTbl');
	console.log(questions);
	
	var givenAnswers = {};
	var qcount = 0;

	var img_regex = /_(g|c)[a|s]\d_q(\d\d)\.jpg$/;
	var q_regex = /^Question ID :(\d{9})(C|G)(?:hosen Option|iven Answer) :(.*)$/;

	for (var i = questions.length - 1; i >= 0; i--) {
		var q = $(questions[i]);

		var q_type, q_no, q_short_id, q_long_id, q_isneg, given_answer;

		var img_name = q.find('img').attr('name');
		var found_img = img_name.match(img_regex);
		var table_text = q.find('.menu-tbl').text();
		var found_ttext = table_text.match(q_regex);
		if(found_img && found_img.length >= 3
					&& found_ttext && found_ttext.length >= 4){

		 	q_type = found_img[1];
			q_no = found_img[2];
			q_short_id = q_type + '' + q_no;
			q_no = parseInt(q_no);
			q_long_id = parseInt(found_ttext[1]);
			q_isneg = (found_ttext[2] === "C")?-1.0:0.0;
			given_answer = found_ttext[3];
			if(given_answer.charCodeAt(0) === 46){ given_answer = "0" + given_answer; }
			if(given_answer.charCodeAt(0) === 45 && given_answer.charCodeAt(1) === 46){
				given_answer = "-0." + given_answer.substr(2);
			}
			if(given_answer === " -- ") { given_answer = -9999; }
			given_answer = parseFloat(given_answer);
			qcount += 1;
			givenAnswers[q_short_id] = {
				"answer": given_answer,
				"type": q_type,
				"no": q_no,
				"short_id": q_short_id,
				"long_id": q_long_id,
				"is_neg": q_isneg,
				"node": $(q.find('.menu-tbl'))
			};
		}
	}

	console.log(givenAnswers);
	console.log(qcount);
	if(qcount != 65){
		alert('Error!\nExpecting questions: 65\nFound:' + qcount);
	}

	var attempted_1 = 0, attempted_2 = 0, attempted_total = 0;
	var correct_1 = 0, correct_2 = 0, correct_total = 0;
	var marks_positive = 0.0, marks_negative = 0.0, marks_total = 0.0;
	var myset = window["set" + window.set];
	console.log(myset);
	for(var qsid in givenAnswers) {
		if(givenAnswers.hasOwnProperty(qsid)){
			var q = givenAnswers[qsid]
			if(q.answer > -9000){
				var marks = (q.type === "g")?
								((q.no <= 5)?1.0:2.0):
								((q.no <= 25)?1.0:2.0);

				attempted_total += 1;
				if (marks===1.0) attempted_1 += 1;
				else attempted_2 += 1;

				var is_neg = q.is_neg;
				var neg_marks = (marks * is_neg)/3.0;

				var kq = myset[qsid]
				if(!kq){
					// alert(gsid);
				}
				if(kq[0] === "A" || kq[0] === "B" || kq[0] === "C" || kq[0] === "D"){
					if(is_neg === 0){
						// alert("Question " + qsid + " expected to be multi-choice.\nDiscrepancy detected!");
						console.log("Question " + qsid + " expected to be multi-choice.\nDiscrepancy detected!");
					}
					kq[0] = kq[0].charCodeAt(0) - 64;
				}
				else{
					if(is_neg === -1.0){
						console.log("Question " + qsid + " expected to be numerical type.\nDiscrepancy detected!");
						// alert("Question " + qsid + " expected to be numerical type.\nDiscrepancy detected!");
					}
				}
				if(q.answer === kq[0]){
					correct_total += 1;
					if(marks === 1.0) correct_1 += 1;
					else correct_2 += 1;
					marks_positive += marks;
					q.node.find('tr:last').after('<tr style="color: green;"><td align="right">✔</td><td class="bold">+' + marks.toFixed(2) + '</td></tr><tr><td colspan="2" align="center"><a href="' + kq[1] + '">Discuss on GATEoverflow</a></td></tr>');
				}
				else{
					marks_negative += neg_marks;
					q.node.find('tr:last').after('<tr style="color: red;"><td align="right">✗</td><td class="bold">' + neg_marks.toFixed(2) + '</td></tr><tr><td align="right">Correct Answer:</td><td class="bold">'+kq[0].toFixed(2)+'</td></tr><tr><td colspan="2" align="center"><a href="' + kq[1] + '">Discuss on GATEoverflow</a></td></tr>');
				}
			}
			else{
				// alert(q.long_id);
				console.log(q.long_id);
				q.node.find('tr:last').after('<tr><td colspan="2" align="center"><a href="' + kq[1] + '">Discuss on GATEoverflow</a></td></tr>');
			}
		}
	}
	marks_total = marks_positive + marks_negative;
	window.final_marks = marks_total;
	$('#attempted-total').text(attempted_total.toFixed(2));
	$('#attempted-1-mark').text(attempted_1.toFixed(2));
	$('#attempted-2-mark').text(attempted_2.toFixed(2));

	$('#correct-1-mark').text(correct_1.toFixed(2));
	$('#correct-2-mark').text(correct_2.toFixed(2));
	$('#correct-total').text(correct_total.toFixed(2));

	$('#marks-positive').text(marks_positive.toFixed(2));
	$('#marks-negative').text(marks_negative.toFixed(2));
	$('#marks-total').text(marks_total.toFixed(2));
	getRank();
}
