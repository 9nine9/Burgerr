	var order; 			// for order the burger
	var itemCount = 0; 	// count the items in the order
	var sourc; 			// source element when drag start
	var target;			// target element when drop the source element
	var itemOrder;
	var total = 0;
	var detail;
	var slides;
	var slideIndex;

	//execute it after 'main.html' is loaded
	window.onload = function(){
		detail = document.getElementById('detail');
		order = document.getElementById('order');
		reset();

		// init event for images in the item
		initEventHandler('item', 'div img');

		// init event for elements in the control
		var theParent = document.querySelector("#control");
		theParent.addEventListener("dragover", allowDrop, false);	

		document.body.ondrop = function(ev) {
    		ev.preventDefault();
    		ev.stopPropagation();
		}

		slideIndex = 0;
		slides = document.getElementsByClassName("slide");

		showSlides(slideIndex);
	}

	// init event for item in the item's parent
	function initEventHandler(parentID, childElement){
		var theParent = document.getElementById(parentID);
		var theChilds = theParent.querySelectorAll(childElement);

		// each image 
		for(var i = 0; i < theChilds.length; i++){
			theChilds[i].setAttribute('ondragstart', 'drag(event)');
			theChilds[i].className = "scale";
		}
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
	    if(indexList(itemList, source.id) != -1){
		    var sourceCopy = document.getElementById(source.id).cloneNode(true);
	  		sourceCopy.id = source.id + '_' + itemCount;
	  		order.insertBefore(sourceCopy, order.children[order.childNodes.length - 1]);
		    itemCount++;
		}
		// swap the item with other item
		else if(target.id != "order" && target.id != "0" && target.id != "1"){
			if(indexList(itemList, source.id) == -1 && source.id != target.id){
				var A = source.cloneNode(true);
				var B = target.cloneNode(true);
				document.getElementById('order').replaceChild(A, target);
				document.getElementById('order').replaceChild(B, source);
			}
		}
		costOrder();
	}

	// delete item
	function deleteItem(ev){
		if(indexList(itemList, source.id) == -1 && source.id != "order" && source.id != "item" && source.id != "0" && source.id != "1"){
			target = ev.target;
			target.appendChild(document.getElementById(source.id));
			var el = document.getElementById(source.id);
			el.parentNode.removeChild(el);
			costOrder();
		}
	}

	// reset order
	function reset(){
		var topBread = '<img src="img/bread-top.png" id="1" draggable="false">';
		var bottomBread = '<img src="img/bread-bottom.png" id="0" draggable="false">';
		order.innerHTML = bottomBread + topBread;
		costOrder();
	}

	// submit order
	function submitOrder(){	
	   	var confirmText = "Do you want order that burger?";
		var pageOrder = "order.html";

		if(confirm(confirmText)){
			var str = JSON.stringify(itemOrder);
			var queryString = "?json=" + str;
			window.location = pageOrder + queryString;
		}
		
	}
	
	function costOrder(){
		itemOrder = [];
		detail.innerHTML = '';
		total = 0;

		for(var i = order.childNodes.length - 1; i >= 0; i--){
			var temp = order.childNodes[i].id.split('_', 1);
			var indexItem = parseInt(temp[0]);
			indexItem = indexList(itemList, temp[0]);
			if(indexItem != -1){
				var itemID = itemList[indexItem].id;
				var itemName = itemList[indexItem].name;
				var itemCost = itemList[indexItem].cost;
				itemOrder.push(new item (itemID, itemName, itemCost));

				total += itemCost;
				detail.innerHTML += "<tr>" + 
										"<td>" + 
											itemName + 
										"</td>" +
										"<td>$" +
											itemCost +
										"</td>" +
									"</tr>";
			}
		}
		document.getElementById('total').innerHTML = "<tr>" + 
															"<td>" + 
																"TOTAL" + 
															"</td>" +
															"<td>$" +
																total +
															"</td>" +
														"</tr>";
	}


	function showSlides(n) {
	  	if (n >= slides.length) {
	  		slideIndex = 0;
	  	} 
	  	else if (n < 0) {
	  		slideIndex = slides.length - 1;
	  	}
	  	
		for (i = 0; i < slides.length; i++) {
	      slides[i].style.display = "none"; 
	  	}
	  	slides[slideIndex].style.display = "block"; 
	}

	function plusSlides(n) {
  		showSlides(slideIndex += n);
	}

	function currentSlide(n) {
  		showSlides(slideIndex -= n);
	}

	function indexList(list, value) {
	    var i;
	    for (i = 0; i < list.length; i++) {
	        if (list[i].id === value) {
	            return i;
        	}
    	}
    	return -1;
	}

	function orderan (id, name, cost) {
	 	this.id = id;
		this.name = name;
		this.cost = cost;
	}
