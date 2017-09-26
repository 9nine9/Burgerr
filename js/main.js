
	var order = document.getElementById('order');
	reset();

	var itemList = [
					'item1',
					'item2',
					'item3',
					'item4'
					];

	var itemCount = 0;
	var source, target;

	function initEventHandler(parentID, childElement){
		var theParent = document.getElementById(parentID);
		var theChilds = theParent.querySelectorAll(childElement);
		for(var i = 0; i < theChilds.length; i++){
			theChilds[i].setAttribute('ondragstart', 'drag(event)');
			theChilds[i].setAttribute('onmouseover', 'scale(event)');
			theChilds[i].setAttribute('onmouseout', 'noScale(event)');
		}
	}
	
	initEventHandler('item', 'img');
	var theParent = document.querySelector("#control");
	theParent.addEventListener("dragover", allowDrop, false);	


	function scale(ev){
		document.getElementById(ev.target.id).className = "scale";
	}
	function noScale(ev){
		document.getElementById(ev.target.id).className = "no_scale";
	}
	
	function allowDrop(ev) {
   		ev.preventDefault();
	}

	function drag(ev) {
    	ev.dataTransfer.effectAllowed = "move";
    	source =ev.target;
    }

	function drop(ev) {
	    target = ev.target;
		
	    if(itemList.includes(source.id)){
		    var sourceCopy = document.getElementById(source.id).cloneNode(true);
	  		sourceCopy.id = source.id + '_' + itemCount;
	  		sourceCopy.className = "no_scale";
	  		order.appendChild(sourceCopy, order.firstChild);
		    itemCount++;
		}
		else if(target.id != "order"){
			if(!itemList.includes(source.id) && source.id != target.id){
				var A = source.cloneNode(true);
				var B = target.cloneNode(true);
				document.getElementById('order').replaceChild(A, target);
				document.getElementById('order').replaceChild(B, source);
			}
		}
	}

	function deleteItem(ev){
		if(!itemList.includes(source.id) && source.id != "order" && source.id != "item"){
			target = ev.target;
			target.appendChild(document.getElementById(source.id));
			var el = document.getElementById(source.id);
			el.parentNode.removeChild(el);
		}
	}

	function reset(){
		order.innerHTML = '';
	}

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
