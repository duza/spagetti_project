function readyFn(){
	var selectedGroup = {all:true, complited:false, active:false};
	const inputField = $("#btn1");
	inputField.width('99%').focus();
	inputField.keypress(selectedGroup, function(event){
		if (event.which == 13){
			event.preventDefault();
			var $enterButton = $(event.target);
			addToList($enterButton, selectedGroup);
		}
		
    });
	$("#btn2").on('click', function(){
		var event = jQuery.Event( 'keypress', { which: 13 } );
		inputField.trigger(event);
		inputField.focus();
	});
	$('ul').on('click', 'input[type="checkbox"]', function(){
		selectedGroup = handleChkBox(selectedGroup, $(this));
		console.log(selectedGroup);
		});
	$("#all input[type='button']").on('click', function(){
		selectedGroup = showAllItems();
	});
	$("#active input[type='button']").on('click',  function(){
		selectedGroup = showOnlyActive();
	});
	$("#complited input[type='button']").on('click', function(){
		selectedGroup = showOnlyComplited();
	});
	//$("body").delegate('input[type="checkbox"]', 'change', removeToSide);
};

function whichKeyPressed(event){
    if (event.which == 13){
		event.preventDefault();
		addToList(event);
    }
}

function showAllItemsNow(){
	$('#user-list :checkbox').map(function(){
		$(this).parent().parent().show();
	});
	showNumberItems();
}

function showNumberItems(){
    $('#number-items p').show();
}

function hideNumberItems(){
    $('#number-items p').hide();
}

function showAllItems(){
    showAllItemsNow();
	return {all: true, complited: false, active:false};
}

function showOnlyActive(){
    showAllItemsNow();
	$(':checked').map(function(){
	    $(this).parent().parent().hide();
	});
    hideNumberItems();
	return {all: false, complited:false, active:true};;
}

function showOnlyComplited(){
	showAllItemsNow();
	$('#user-list :checkbox').not(':checked').map(function(){
		$(this).parent().parent().hide();
	});
    hideNumberItems();
    return {complited: true, all: false, active:false};
}

function handleChkBox(selectedGroup, $target){
    countItems();
	crossOutItem($target);
	/*if (selectedGroup.active) || (selectedGroup.complited){
		hideNumberItems();
	}*/
	if (selectedGroup.active){
		return showOnlyActive();
	}
	if (selectedGroup.complited){
		return showOnlyComplited();
	}
	return selectedGroup
}

function countItems(){
	var clickedChkBox = $(this);
	var count = $("input:checked").length;
	var $number = $('#number-items p');
	if (count === 0 ){
		$number.text("Not checked items");
	}
	else{
		$number.text(count + " item"+ (count === 1 ? "" : "s") + " checked");
	}
}

function addToList($enterButton, selectedGroup){
	var userText = $enterButton.val()
    var $userList = $('#user-list');
	if (userText !== ''){
		$userList.append("<li><label><input type='checkbox' id='checkboxes'>" + userText + "</label></li`>");
        if (selectedGroup.complited){
           $("li").last().toggle(); 
        }
    }
	else{
		alert("Please enter correct task.");
	}
	$enterButton.val("");
}

function crossOutItem($target){
	var clickedChkBox = $target; //$(event.target)
	var item = clickedChkBox.parent().parent();
	if (clickedChkBox.is(':checked')){
		item.css({
			'text-decoration':'line-through',
			'color':'grey'
		});
	} else {
		item.css({
			'text-decoration':'none',
			'color':'black'
		});
   }
}

$(document).ready(readyFn);