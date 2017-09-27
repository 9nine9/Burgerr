	// ID items of burger
	var itemList = [
					'item1',
					'item2',
					'item3',
					'item4'
					];

	var order; 			// for order the burger
	var itemCount = 0; 	// count the items in the order
	var sourc; 			// source element when drag start
	var target;			// target element when drop the source element

	//execute it after 'main.html' is loaded
	window.onload = function(){
		order = document.getElementById('order');
		reset();

		// init event for images in the item
		initEventHandler('item', 'img');

		// init event for elements in the control
		var theParent = document.querySelector("#control");
		theParent.addEventListener("dragover", allowDrop, false);	

		document.body.ondrop = function(ev) {
    		ev.preventDefault();
    		ev.stopPropagation();
		}
	}

	// init event for item in the item's parent
	function initEventHandler(parentID, childElement){
		var theParent = document.getElementById(parentID);
		var theChilds = theParent.querySelectorAll(childElement);

		// each image 
		for(var i = 0; i < theChilds.length; i++){
			theChilds[i].setAttribute('ondragstart', 'drag(event)');
			theChilds[i].setAttribute('onmouseover', 'scale(event)');
			theChilds[i].setAttribute('onmouseout', 'noScale(event)');
		}
	}

	// highlight the item when mouse over on it 
	function scale(ev){
		document.getElementById(ev.target.id).className = "scale";
	}

	// normai condition for the item when mouse out on it
	function noScale(ev){
		document.getElementById(ev.target.id).className = "no_scale";
	}
	
	// allow drop
	function allowDrop(ev) {
   		ev.preventDefault();
	}

	// when item is dragged
	function drag(ev) {
    	ev.dataTransfer.effectAllowed = "move";
    	source =ev.target;
    }

    // when item is dropped
	function drop(ev) {
	    target = ev.target;
		
		// add item to order
	    if(itemList.includes(source.id)){
		    var sourceCopy = document.getElementById(source.id).cloneNode(true);
	  		sourceCopy.id = source.id + '_' + itemCount;
	  		sourceCopy.className = "no_scale";
	  		order.appendChild(sourceCopy, order.firstChild);
		    itemCount++;
		}
		// swap the item with other item
		else if(target.id != "order"){
			if(!itemList.includes(source.id) && source.id != target.id){
				var A = source.cloneNode(true);
				var B = target.cloneNode(true);
				document.getElementById('order').replaceChild(A, target);
				document.getElementById('order').replaceChild(B, source);
			}
		}

	}

	// delete item
	function deleteItem(ev){
		if(!itemList.includes(source.id) && source.id != "order" && source.id != "item"){
			target = ev.target;
			target.appendChild(document.getElementById(source.id));
			var el = document.getElementById(source.id);
			el.parentNode.removeChild(el);
		}
	}

	// reset order
	function reset(){
		order.innerHTML = '';
	}

	// submit order
	function submitOrder(){
		var orderChildID = [];
		for(var i = order.childNodes.length - 1; i >= 0; i--){
			var temp = order.childNodes[i].id.split('_', 1);
			orderChildID.push(temp[0]);
		}
		var result = '';
		for(var i = 0; i < orderChildID.length; i++){
			result += orderChildID[i] + '\n';
		}
		confirm(result);
	}