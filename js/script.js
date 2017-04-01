function readyFn(){
	console.log( "ready!" );
	var test = 0;
	var selectedGroup = {all:true, complited:false, active:false};
	const inputField = $("#btn1");
	inputField.width('99%').focus();
	inputField.keypress(selectedGroup, function(event){
		if (event.which == 13){
			event.preventDefault();
			//addToList(event);
			var $enterButton = $(event.target);
			addToList($enterButton, selectedGroup);
		}
		
    });
	//$("#btn2").on('click', selectedGroup, addToList);
	$("#btn2").on('click', function(){
		var event = jQuery.Event( 'keypress', { which: 13 } );
		inputField.trigger(event);
		inputField.focus();
	});
	
	//$("#btn2").on('click', function(event){
	//	event.result);
	//});
	$('ul').on('click', 'input[type="checkbox"]', function(){
		selectedGroup = handleChkBox(selectedGroup, $(this));
		console.log(selectedGroup);
		});
	$('ul').on('click', 'input[type="checkbox"]', function(){
		test = foo(test);
		console.log(test);
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

function foo(x){
		return ++x;
	}

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
    console.log($("#number-items p").text());
    $('#number-items p').show();
}

function hideNumberItems(){
    console.log($("#number-items p").text());
    $('#number-items p').hide();
}

function showAllItems(){
    console.log("We are in the SHOW Function");
    showAllItemsNow();
	return {all: true, complited: false, active:false};
}

function showOnlyActive(){
	console.log("We are in the ACTIVE` Function");
    showAllItemsNow();
	$(':checked').map(function(){
	    $(this).parent().parent().hide();
	});
    hideNumberItems();
	return {all: false, complited:false, active:true};;
}

function showOnlyComplited(){
	console.log("We are in the Complited Function");
	showAllItemsNow();
	$('#user-list :checkbox').not(':checked').map(function(){
		$(this).parent().parent().hide();
	});
    hideNumberItems();
    return {complited: true, all: false, active:false};
}

function handleChkBox(selectedGroup, $target){
    countItems();
	console.log(selectedGroup);
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
	// How many checkboxes have been checked
	if (count === 0 ){
		$number.text("Not checked items");
	}
	else{
		$number.text(count + " item"+ (count === 1 ? "" : "s") + " checked");
	}
}

function addToList($enterButton, selectedGroup){	
	//var $enterButton = $(event.target);
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
	//console.log('In cross out func', selectedGroup);
	if (clickedChkBox.is(':checked')){
		item.css({
			'text-decoration':'line-through',
			'color':'grey'
		});
		//return activeBtnPresdEarly(selectedGroup);
	} else {
		item.css({
			'text-decoration':'none',
			'color':'black'
		});
		//return complitedBtnPresdEarly(selectedGroup);
   }
}

function activeBtnPresdEarly(selectedGroup){
	if (selectedGroup.active){
		return showOnlyActive();
	}
}

function complitedBtnPresdEarly(selectedGroup){
	if (selectedGroup.complited){
		return showOnlyComplited();
	}
}

$(document).ready(readyFn);
	//if (selectedGroup.all){}
    //changeDisplayItem(item, selectedGroup);

	//console.log("Hey baby! Moving!" + $(this).attr("id") + ' '+$(this).attr(':checked'));
	//var item = $('input[type=checkbox]:checked').closest('li');
    
/*!!!!!!!! first version 
	var item = $(this.closest('li'));
	//console.log(item.closest('ul').attr("id"));
	if ($(this).is(':checked')){
		item.remove();
		$('#complited').append(item);
	}else{
		item.remove()j;
		$('#not-complited').append(item);
	} */

/*
	if (item.closest('ul').attr("id") == 'not-complited'){
		item.remove();
		$('#complited').append(item);
	}
	else if (item.closest('ul').attr("id") == 'complited'){
		item.remove();
		$('#not-complited').append(item);
	}

function changeDisplayItem(item, selectedGroup){
	if (!selectedGroup.all){
		item.toggle();	
	}
}	
	*/

