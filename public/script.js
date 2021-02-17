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
  	for (var i = 0; i <= Object.keys(data).length - 1; i++) {
		//Set the post ID as the object ID in the mongo database
		var postID = Object.values(data)[i]._id;
		//Create a row for each object
		var scriptTableRow = document.createElement("tr");
		//Set the row ID the same as the post ID
		scriptTableRow.id = postID;
    	var name = document.createElement("td");
    	var ndc = document.createElement("td");
    	var lot = document.createElement("td");
		var ex = document.createElement("td");
		var removeButton = document.createElement("td");

		//Set element values
    	name.innerHTML = Object.values(data)[i].name;
    	ndc.innerHTML = Object.values(data)[i].ndc;
    	lot.innerHTML = Object.values(data)[i].lot;
		ex.innerHTML = Object.values(data)[i].day + ' - ' + Object.values(data)[i].month + ' - ' + Object.values(data)[i].year;
		removeButton.innerHTML = "remove";
		removeButton.id = 'removeButton';

		//Putting everything together
    	tableContainer.appendChild(scriptTableRow);
    	scriptTableRow.appendChild(name);
    	scriptTableRow.appendChild(ndc);
    	scriptTableRow.appendChild(lot);
		scriptTableRow.appendChild(ex);
		scriptTableRow.appendChild(removeButton);

		//Send post ID to server so it can remove it from database
		removeButton.onclick = function() {
			loadJSON('remove/' + this.parentElement.id);
			location.reload();
		}

		//If expiration date is less than 3 months away, hightlight it red
		var date = new Date();
		//date.getMonth function starts at 0, so I add one to it just to make it easier to read
		var month = date.getMonth() + 1;
		if (data[i].year <= date.getFullYear()) {
			if (data[i].month <= month + 2) {
				if (data[i].day <= date.getDate()) {
					scriptTableRow.style.color = '#cc3333';
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