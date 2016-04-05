// Cookie Store object constructor
var cookieStore = function(storeLocation, minCustomer, maxCustomer, avgSale, locationID) {
  this.storeLocation = storeLocation;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgSale = avgSale;
  this.salesArray = [];
  this.locationID = locationID;
  this.total = 0;
}

// Generates random number of customer per hour
cookieStore.prototype.generateRandom = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate sales per hour
cookieStore.prototype.salesPerHour = function() {
  var cookieSales = Math.floor(this.generateRandom(this.minCustomer, this.maxCustomer) * this.avgSale);
  this.salesArray.push(cookieSales);
  return cookieSales;
}

// Generate daily sales total
cookieStore.prototype.dailySaleTotal = function() {
  var total = 0;

  for (var i=0; i < 8; i++) {
    total += this.salesPerHour();
  }
  this.total = total;
  return total;
}

cookieStore.prototype.addData = function() {
  this.dailySaleTotal();
  var total = this.total;

  var storeID = this.locationID; //stores store ID
  var tr = document.createElement('tr'); //creates row element
  tr.setAttribute('id', storeID); //Gives row specific store id
  tr.setAttribute('class', "table_row"); //Gives row table_row class
  document.getElementById("main_table").appendChild(tr); //add row to table

  var location = document.createTextNode(this.storeLocation); //stores store location name as text node.
  var td = document.createElement('td'); //creat table data element
  td.setAttribute('class', 'locationTD');
  td.appendChild(location); //Adds location name to td.
  document.getElementById(storeID).appendChild(td); //adds td to row

  for (i=0; i < this.salesArray.length; i++) { //This for loop goes through the generated
    var td = document.createElement('td'); // sales array and adds each to its own td
    td.setAttribute('class', 'hourlySales');
    var saleStat = this.salesArray[i]; // and adds that td to its specified row
    saleStat = document.createTextNode(saleStat);
    td.appendChild(saleStat);
    document.getElementById(storeID).appendChild(td);
  }

  var total = document.createTextNode(total); //This block creates a final td for the daily
  var tdtotal = document.createElement('td'); // sales total.
  tdtotal.setAttribute('class', 'storeTotal');
  tdtotal.appendChild(total);
  document.getElementById(storeID).appendChild(tdtotal);

  this.salesArray = [];



/*  var ul = document.createElement('ul'); //creates unordered list
  ul.setAttribute('id', storeID); //Gives list id which object assigned id
  ul.setAttribute('class', 'ulClass');
  ul.appendChild(location); //Add location property to display at top of list
  document.getElementById("dataDIV").appendChild(ul); //Adds unordered list to div on page*/


  /*for (i=0; i < this.salesArray.length; i++) {
    var hourArray = ["10am: ", "11am: ", "12pm: ", "1pm: ", "2pm: ", "3pm: ", "4pm: ", "5pm: "]; //Array created to house hours to display.
    var hr = hourArray[i];
    var hrsale = this.salesArray[i];
    var li = document.createElement("li"); //creates list item
    li.setAttribute('class', 'ulListItem');
    var stat = hr + hrsale; //puts together hour and sales amount
    stat = document.createTextNode(stat);
    li.appendChild(stat); //add stat to list item
    document.getElementById(storeID).appendChild(li); //adds list item to unordred list
  }

  var dailyTotal = this.total; //brings in daily sales total into this method.

  //This last section adds the last line in the list for the daily sales total
  var li = document.createElement("li");
  var sltotal = document.createTextNode("Total: " + dailyTotal);
  li.appendChild(sltotal);
  document.getElementById(storeID).appendChild(li);
  this.salesArray = [];*/
}


var pioneerSquare = new cookieStore("Pioneer Square", 17, 88, 5.2, "pioneer");
var portlandAirport = new cookieStore("Portland Airport", 6, 24, 1.2, "portland");
var washingtonSquare = new cookieStore("Washington Square", 11, 38, 1.9, "washington");
var sellwood = new cookieStore("Sellwood", 20, 48, 3.3, "sellwood");
var pearlDistrict = new cookieStore("Pearl District", 3, 24, 2.6, "pearl");

var storeArray = [pioneerSquare, portlandAirport, washingtonSquare, sellwood, pearlDistrict];

function addStore(formsubmit) {
  var formIsValid = true;

  if (formsubmit.location.value == "") {
    formsubmit.location.setAttribute('class', 'required');
    formIsValid = false;
  }
  if (formsubmit.minCustomers.value == "") {
    formsubmit.minCustomers.setAttribute('class', 'required');
    formIsValid = false;
  }
  if (formsubmit.maxCustomers.value == "") {
    formsubmit.maxCustomers.setAttribute('class', 'required');
    formIsValid = false;
  }
  if (formsubmit.averageSales.value == "") {
    formsubmit.averageSales.setAttribute('class', 'required');
    formIsValid = false;
  }
  if (formsubmit.storeID.value == "") {
    formsubmit.storeID.setAttribute('class', 'required');
    formIsValid = false;
  }

  var locationName = formsubmit.location.value;
  var minCustomer = parseFloat(formsubmit.minCustomers.value);
  var maxCustomer = parseFloat(formsubmit.maxCustomers.value);
  var averageSales = parseFloat(formsubmit.averageSales.value);
  var storeID = formsubmit.storeID.value;

  if (formIsValid) {
    var newStore = new cookieStore(locationName, minCustomer, maxCustomer, averageSales, storeID);
    storeArray.push(newStore);
    newStore.addData();

    formsubmit.location.value = "";
    formsubmit.minCustomers.value = "";
    formsubmit.maxCustomers.value = "";
    formsubmit.averageSales.value = "";
    formsubmit.storeID.value = "";
    formsubmit.location.setAttribute('class', 'blankback');
    formsubmit.minCustomers.setAttribute('class', 'blankback');
    formsubmit.maxCustomers.setAttribute('class', 'blankback');
    formsubmit.averageSales.setAttribute('class', 'blankback');
    formsubmit.storeID.setAttribute('class', 'blankback');
    newStore = "";
  }
}

function genSales() {
  var tableParent = document.getElementById("main_table");
  var x = document.getElementsByClassName("table_row");

  if (x.length > 0) {
    for (i=x.length-1; i>=0; i--) {
      tableParent.removeChild(x[i]);
    }
  }

  for (z=0; z<storeArray.length; z++) {
    storeArray[z].addData();
  }
}
