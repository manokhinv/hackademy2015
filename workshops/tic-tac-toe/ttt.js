var TURN_STATE = "X";
var TILE_IDS = ["0_0", "0_1", "0_2",
				"1_0", "1_1", "1_2",
				"2_0", "2_1", "2_2"];

var solved = function(idx) {
	var state_class = TURN_STATE == "X" ? "ex" : "oh";
	
	var solved_vert = function() {
		var col = idx.split("_")[1];
		
		for (var i = 0; i < 3; i++) {
			var test_id = "#" + i.toString() + "_" + col;
			var $span = $($(test_id).children()[0]);
			if($span.attr("class") != state_class) {
				return false;
			}
		}
		
		return true;
	};
	
	var solved_hor = function() {
		var row = idx.split("_")[0];
		
		for (var i = 0; i < 3; i++) {
			var test_id = "#" + row + "_" + i.toString();
			var $span = $($(test_id).children()[0]);
			if($span.attr("class") != state_class) {
				return false;
			}
		}
		
		return true;
	};
	
	var solved_diag = function() {
		return false;
	};
	
	return solved_vert() || solved_hor() || solved_diag();
};

var reset_board = function() {
	TILE_IDS.forEach(function(idx) {
		var real_id = "#" + idx;
		var classes = ["ex","oh"];
		var $span = $($(real_id).children()[0]);
		$span.removeClass($span.attr("class"));
		$span.text("");
	});
};

$(document).ready(function() {
	TILE_IDS.forEach(function(idx) {
		var real_id = "#" + idx;
		var classes = ["ex", "oh"];
		$(document).on("click", real_id, function() {
			var $span = $($(real_id).children()[0]);
			$span.toggleClass("oh");
			$span.text(TURN_STATE);
			
			switch(TURN_STATE) {
				case "X":
					$span.toggleClass("ex");
					if(solved(idx)) {
						alert(TURN_STATE + " WON!");
					}					
					TURN_STATE = "O";
					break;
				default:	// case "0"
					$span.toggleClass("oh");
					if(solved(idx)) {
						alert(TURN_STATE + " WON!");
					}	
					TURN_STATE = "X";
					break;
			}
			$("#turn").text(TURN_STATE);
		});
	});
});