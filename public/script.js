function setup() {
  	var button = select('#submit');
	button.mousePressed(submitRX);
}

//Get values of each textbox and send them to the server to be put into the database
function submitRX() {
  	var name = select('#name').value();
  	var ndc = select('#ndc').value();
  	var lot = select('#lot').value();
	var day = select('#exDay').value();
	var month = select('#exMonth').value();
	var year = select('#exYear').value();
    
	loadJSON('add/' + name + '/' + ndc + '/' + lot + '/' + day + '/' + month + '/' + year);
	location.reload();
}

//Get the database data from the server
fetch('/getdata', {method: 'GET'})
    .then(function (response) {
        if(response.ok) return response.json();
        throw new Error('Request failed...');
    })
    .then(function (data) {
        console.log("Getting data...");
        appendData(data);
    })
    .catch (function (error) {
        console.log(error);
    });

var tableContainer = document.getElementById("mainTable");

function appendData(data) {
	console.log(data);
	//For each object in the database, get the value and set it to an element in the table
  	for (const i of Object.keys(data)) {
		//Set the post ID as the object ID in the mongo database
		var postID = Object.values(data)[i]._id;
		//Create a row for each object
		var scriptTableRow = $('<tr></tr>', {
			//Set the rows ID as the postID
			'id' : postID
		}).appendTo(tableContainer);

		//Create a cell in the table for the name, NDC, LOT, ex date and remove button
		//Set the data from the object value
		//Append it to the row created
		var name = $('<td></td>')
		.append(innerHTML = Object.values(data)[i].name)
		.appendTo(scriptTableRow);

    	var ndc = $('<td></td>')
		.append(innerHTML = Object.values(data)[i].ndc)
		.appendTo(scriptTableRow);

    	var lot = $('<td></td>')
		.append(innerHTML = Object.values(data)[i].lot)
		.appendTo(scriptTableRow);

		var ex = $('<td></td>').append(innerHTML = Object.values(data)[i].day + ' - ' + Object.values(data)[i].month + ' - ' + Object.values(data)[i].year)
		.appendTo(scriptTableRow);
		
		var removeButton = $('<td></td>', {
			'id' : 'removeButton',
			'click' : function() {
				loadJSON('remove/' + this.parentElement.id);
				location.reload();	
			}
		}).append(innerHTML = 'remove').appendTo(scriptTableRow);
		
		//If expiration date is less than 3 months away, hightlight it red
		var date = new Date();
		//date.getMonth function starts at 0, so I add one to it just to make it easier to read
		var month = date.getMonth() + 1;
		if (data[i].year <= date.getFullYear()) {
			if (data[i].month <= month + 2) {
				if (data[i].day <= date.getDate()) {
					scriptTableRow[0].style.color = '#cc3333';
				}
			}
		}
  	}
}

//Basic search for name of drugs (should probably be improved in the future to search for NDCs too)
function search() {
	var input, filter, table, tr, td, i, txtValue;
	input = document.getElementById("search");
	filter = input.value.toUpperCase();
	table = document.getElementById("mainTable");
	tr = table.getElementsByTagName("tr");
	for (i = 0; i < tr.length; i++) {
	  	td = tr[i].getElementsByTagName("td")[0];
	  	if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
		  		tr[i].style.display = "";
			} else {
		  		tr[i].style.display = "none";
			}
	  	}       
	}
}