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

  var storeID = this.locationID;
  var tr = document.createElement('tr');
  tr.setAttribute('id', storeID);
  document.getElementById("main_table").appendChild(tr);

  var location = document.createTextNode(this.storeLocation);
  var td = document.createElement('td');
  td.appendChild(location);
  document.getElementById(storeID).appendChild(td);

  for (i=0; i < this.salesArray.length; i++) {
    var td = document.createElement('td');
    var saleStat = this.salesArray[i];
    saleStat = document.createTextNode(saleStat);
    td.appendChild(saleStat);
    document.getElementById(storeID).appendChild(td);
  }



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

function genSales() {
  document.getElementById('dataDIV').innerHTML = " ";
  pioneerSquare.addData();
  portlandAirport.addData();
  washingtonSquare.addData();
  sellwood.addData();
  pearlDistrict.addData();
}
