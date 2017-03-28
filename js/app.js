function readyFn(){
	console.log( "ready!" );
	var whereDoWe = {'all':false, 'active':false,'complited':false};
	console.log(whereDoWe['all']);
	const inputField = $("#btn1");
	inputField.width('99%');
	inputField.keypress(function(e){
		if (e.which == 13){
			e.preventDefault();
			addToList();
		}
	});
	$("#btn2").click(addToList);
	$('ul').on('click', 'input[type="checkbox"]', countItems);
	$("#all input[type='button']").click(showAllItems);
	$("#active input[type='button']").click(showOnlyActive);
	$("#complited input[type='button']").click(showOnlyComplited);
	//$("body").delegate('input[type="checkbox"]', 'change', removeToSide);
};

function showAllItems(){
	whereDoWe = {'all':true, 'active':false,'complited':false};
	console.log("We are in the SHOW Function");
	$('#user-list :checkbox').map(function(){
		$(this).parent().parent().show();
	});
}

function showOnlyActive(){
	console.log("We are in the ACTIVE` Function");
	whereDoWe = {'all':false, 'active':true,'complited':false};
	//showAllItems();
	$(':checked').map(function(){
	$(this).parent().parent().hide();
	});
}

function showOnlyComplited(){
	console.log("We are in the Complited Function");
	whereDoWe = {'all':false, 'active':false,'complited':true};
	//showAllItems();
	$('#user-list :checkbox').not(':checked').map(function(){
		$(this).parent().parent().hide();
		});
}

function countItems(){
	var checkBoxObj = $(this);
	var count = $("input:checked").length;
	var $number = $('#number-items');	
	crossOutItem(checkBoxObj);
	if (whereDoWe['active']){
		$('#number-items').hide();
		checkBoxObj.parent().parent().toggle();	
	}
	else if (whereDoWe['complited']){
		$('#number-items').hide();
		checkBoxObj.parent().parent().toggle();	
	}
	else if (whereDoWe['all']){
		$number.show();
		checkBoxObj.parent().parent().show();

	}
	/////// How many checkboxes have been checked
	if (count === 0 ){
		$number.text("Not checked items");
	}
	else{
		$('#number-items').text(count + " item"+ (count === 1 ? "" : "s") + " checked");
	}

}

function addToList(){	
	const $enterButton = $("#btn1");
	const userText = $enterButton.val()
	if (userText !== ''){
		$('#user-list').append("<li><label><input type='checkbox' id='checkboxes'>" + userText + "</label></li`>");
	}
	else{
		alert("Please enter correct task.");
	}
	$enterButton.val("");
}

function crossOutItem(objClickEvent){
	var item = objClickEvent.parent().parent();
	//console.log(item);
	if (objClickEvent.is(':checked')){
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

	//console.log("Hey baby! Moving!" + $(this).attr("id") + ' '+$(this).attr(':checked'));
	//var item = $('input[type=checkbox]:checked').closest('li');
    
/*!!!!!!!! first version 
	var item = $(this.closest('li'));
	//console.log(item.closest('ul').attr("id"));
	if ($(this).is(':checked')){
		item.remove();
		$('#complited').append(item);
	}else{
		item.remove();
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

$( document ).ready( readyFn );
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
