window.onload = function(){
	var queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1);
	var queries = queryString.split("json=");
	var data = JSON.parse(queries[1]);

	var total = 0;
	document.getElementById('detail').innerHTML = '';
	for(var i = 0; i < data.length; i++){
		var itemID = data[i].id;
		var itemName = data[i].name;
		var itemCost = data[i].cost;
		
		total += itemCost;
		document.getElementById('detail').innerHTML += "<tr>" + 
															"<td>" + 
																itemName + 
															"</td>" +
															"<td>$" +
																itemCost +
															"</td>" +
														"</tr>";
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