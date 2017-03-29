function readyFn(){
	console.log( "ready!" );
	var selectedGroup = {all:true, complited:false};
	const inputField = $("#btn1");
	inputField.width('99%').focus();
	inputField.on('keypress', selectedGroup, whichKeyPressed); /* function (event){
    if (event.which == 13){
       //event.preventDefault();
       addToList(event);
    }
    });*/
	$("#btn2").on('click', selectedGroup, addToList);
	$('ul').on('click', 'input[type="checkbox"]', selectedGroup, countItems);
    console.log(selectedGroup);
	$("#all input[type='button']").on('click', selectedGroup, showAllItems);
	$("#active input[type='button']").on('click', selectedGroup, showOnlyActive);
	$("#complited input[type='button']").on('click', selectedGroup, showOnlyComplited);
	//$("body").delegate('input[type="checkbox"]', 'change', removeToSide);
};
function whichKeyPressed(event){
    //selectedGroup = event.data;
	if (event.which == 13){
		//event.preventDefault();
		addToList(event);
    }
}
function showAllItems(event){
    selectedGroup = event.data;
	console.log("We are in the SHOW Function");
    showAllItemsNow();
	selectedGroup = {all: true, complited: false};
}
function showAllItemsNow(){
	$('#user-list :checkbox').map(function(){
		$(this).parent().parent().show();
	});
}
function hideNumberItems(){
    console.log($("#number-items p").text());
    $('#number-items p').hide();
}
function showOnlyActive(event){
	console.log("We are in the ACTIVE` Function");
    selectedGroup = event.data;
    showAllItemsNow();
	$(':checked').map(function(){
	    $(this).parent().parent().hide();
	});
    hideNumberItems();
	selectedGroup = {all: false, complited:false};
}

function showOnlyComplited(event){
	console.log("We are in the Complited Function");
    selectedGroup = event.data;
	showAllItems(event);
	$('#user-list :checkbox').not(':checked').map(function(){
		$(this).parent().parent().hide();
	});
    hideNumberItems();
    selectedGroup = {complited: true, all: false};
}

function countItems(event){
	var clickedChkBox = $(this);
	var count = $("input:checked").length;
	var $number = $('#number-items p');	
    selectedGroup = event.data;
	/////// How many checkboxes have been checked
	if (count === 0 ){
		$number.text("Not checked items");
	}
	else{
		$number.text(count + " item"+ (count === 1 ? "" : "s") + " checked");
	}
	crossOutItem(clickedChkBox, selectedGroup);
}

function addToList(event){	
	const $enterButton = $("#btn1");
	const userText = $enterButton.val()
    var $userList = $('#user-list');
    selectedGroup = event.data;
	if (userText !== ''){
		$userList.append("<li><label><input type='checkbox' id='checkboxes'>" + userText + "</label></li`>");
        if (selectedGroup.complited){
           $userList.last().toggle(); 
        }
    }
	else{
		alert("Please enter correct task.");
	}
	$enterButton.val("");
}

function crossOutItem(clickedChkBox, selectedGroup){
	var item = clickedChkBox.parent().parent();
	console.log('In cross out func item =', item, ' this = ', $(this));
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
    changeDisplayItem(item, selectedGroup);

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
*/
}
function changeDisplayItem(item, selectedGroup){
	if (!selectedGroup.all){
		item.toggle();	
	}
}

$(document).ready(readyFn);
/*
$('#CheckBoxList1').on('click', ':checkbox', function() {
    if ($(this).is(':checked')) {
        // handle checkbox check
        alert($(this).val());
    } else {
        // checkbox is unchecked
        alert('unchecked')
    }
});*/
