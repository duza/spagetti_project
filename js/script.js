function readyFn(){

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
        var count = $("input:checked").length;
        var $number = $('#number-items p');
        if (count === 0 ){
            $number.text("Not checked items");
        }
        else{
            $number.text(count + " item"+ (count === 1 ? "" : "s") + " checked");
        }
    }

    function uniqueText(userText) {
        var listItems = JSON.parse(localStorage.listItems);
        //var matchedTextItems = listItems.map(function(item){return item.text;});
        for(var i=0; i<listItems.length; i++){
            if (listItems[i].text == userText){
                return false;
            }
        }
        //console.log(matchedTextItems);
        return true;
        /*if (userText in matchedTextItems) {
            return false;
        }
        else{
            return true;
        }*/
    }

    function addToList($enterButton, selectedGroup){
        var userText = $enterButton.val()
        var $userList = $('#user-list');
        counterCheckboxes++;
        localStorage.setItem("counterCheckboxes", JSON.stringify(counterCheckboxes));
        if (userText !== '') {
            if (uniqueText(userText.trim())) {
                var Obj = {
                    type: "checkbox",
                    id: "checkbox" + counterCheckboxes,
                    checked: false,
                    text: userText
                }
                //var addingHtml = objToHtml(Obj);
                var addingHtml = objToHtml(Obj);
                $userList.append(addingHtml);
                addToStoredItems(Obj);
                if (selectedGroup.complited) {
                    $("li").last().toggle();
                }
            }
            else {
                alert("Entered duplicate text. Please, enter another text.");
            }
        }
        else{
            alert("Please enter correct task.");
        }
        $enterButton.val("");
    }
	function objToHtml(objItem){
        var style = (objItem.checked ? " style='text-decoration:line-through;color:grey'" : "");
        var htmlText = "<li" + style + " ><label><input type=" + objItem.type + " id=" + objItem.id + " " +
            (objItem.checked ? "checked": "") + ">" + objItem.text + "</label><span>\u00D7</span></li>";
		return htmlText;
    }

    /*function renderObjToItem(objItem){
	    var $input = $("<input />").attr({
            "type": objItem.type,
            "id": objItem.id});
        $input.prop("checked", objItem.checked);

        var $label = $("<label />");
	    $label.html($input);
        console.log($label);
	    $label.text(objItem.text);
        var span = $("<span />").text("\u00D7");
        $label.append(span);
        var $li = $("<li />");
        //console.log($label);
        if (objItem.checked) {
            $li = crossOut($li);
        }
        $li.html($label);
        //console.log($li);
        return $li;
    }
    */
    function addToStoredItems(lastAddedItem){
        var listItems = JSON.parse(localStorage.listItems);
        listItems.push(lastAddedItem);
    	localStorage.setItem("listItems", JSON.stringify(listItems));
        //console.log(JSON.parse(localStorage.listItems));
        //$.extend(, myJSON);
    	//var listItems = JSON.parse(localStorage.listItems);
		//listItems.li
        //listItems.push();
        //localStorage.setItem("listItems", JSON.stringify(listItems));
        //console.log(typeof(listItems));

    }

    function crossOutItem($target){
		//localStorage.test = Number(localStorage.test) + 1;
    	//console.log(localStorage.test);

        var clickedChkBox = $target; //$(event.target)
        var listItems = JSON.parse(localStorage.listItems);
		var idTarget = $target.attr("id");
        var targetItem = $.grep(listItems, function(e){ return e.id == idTarget; });
        //console.log(targetItem);
        var item = clickedChkBox.parent().parent();
        if (clickedChkBox.is(':checked')){
           	crossOut(item);
            targetItem[0].checked = true;
        } else {
            removeCrossOut(item);
            targetItem[0].checked = false;
        }
        localStorage.setItem("listItems", JSON.stringify(listItems));
        //console.log(localStorage.listItems);
    }

    function crossOut(item) {
        item.css({
            'text-decoration':'line-through',
            'color':'grey'
        });
    }

    function removeCrossOut(item) {
        item.css({
            'text-decoration':'none',
            'color':'black'
        });
    }

    function displayStoredItems() {
        var listItems = JSON.parse(localStorage.listItems);
    	//console.log("Display", listItems);
		var uList = $('ul');
    	for (x in listItems) {
			//console.log(listItems[x]);
            uList.append(objToHtml(listItems[x]));
        }
		//$('ul').html(text);
		countItems();
		//console.log($(':checked'));
        // $('#user-list :checkbox:checked').map(function(){
         //    crossOut($(this).parent().parent());
        // });
    }

    function createStoredListItems(){
        if (typeof(Storage) !== "undefined") {
            if (localStorage.listItems) {
                console.log("Local Storage? It's possible.");

            } else{
                 localStorage.setItem("listItems", JSON.stringify([]));
                 localStorage.setItem("counterCheckboxes", JSON.stringify(0));
                 console.log(localStorage.listItems);
            }
        } else {
            console.log("Sorry! No Web Storage support..");
        }
	}

	function closeItem() {
        var $input = $(this).prev().children();

        var listItems = JSON.parse(localStorage.listItems);
        //var index = Number($input.attr("id").slice(8));
        var idTarget = $input.attr("id");
        console.log(idTarget);
        //var targetItem = $.grep(listItems, function(el){ return el.id == idTarget; });
        listItems = listItems.filter(function foo (item) { return item.id !== idTarget; });
        console.log(listItems);
        //listItems.splice(index,1);
        var $target = $(this).parent();
        $target.remove();
        //listItems.splice(index-1,1)

        localStorage.setItem("listItems", JSON.stringify(listItems));
        counterCheckboxes--;
        localStorage.setItem("counterCheckboxes", JSON.stringify(counterCheckboxes));
        countItems();
    }
	//localStorage.clear();
    createStoredListItems();
    var counterCheckboxes = JSON.parse(localStorage.counterCheckboxes);
    displayStoredItems();
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
		//console.log($(this).attr("id"));
		});
	$('ul').on('click', 'span', closeItem);
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


$(document).ready(readyFn);