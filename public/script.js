function setup() {
  	var button = select('#submit');
	button.mousePressed(submitRX);
}

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
    })

var tableContainer = document.getElementById("mainTable");

function appendData(data) {
	console.log(data);
  	for (var i = 0; i <= Object.keys(data).length - 1; i++) {
		var postID = Object.values(data)[i]._id;
		var scriptTableRow = document.createElement("tr");
		scriptTableRow.id = postID;
    	var name = document.createElement("td");
    	var ndc = document.createElement("td");
    	var lot = document.createElement("td");
		var ex = document.createElement("td");
		var removeButton = document.createElement("td");

    	name.innerHTML = Object.values(data)[i].name;
    	ndc.innerHTML = Object.values(data)[i].ndc;
    	lot.innerHTML = Object.values(data)[i].lot;
		ex.innerHTML = Object.values(data)[i].day + ' - ' + Object.values(data)[i].month + ' - ' + Object.values(data)[i].year;
		removeButton.innerHTML = "remove";
		removeButton.id = 'removeButton';

    	tableContainer.appendChild(scriptTableRow);
    	scriptTableRow.appendChild(name);
    	scriptTableRow.appendChild(ndc);
    	scriptTableRow.appendChild(lot);
		scriptTableRow.appendChild(ex);
		scriptTableRow.appendChild(removeButton);

		removeButton.onclick = function() {
			loadJSON('remove/' + this.parentElement.id);
			location.reload();
		}
  	}
}

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