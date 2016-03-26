console.log("test")

// Cookie Store object
var cookieStore = function(storeLocation, minCustomer, maxCustomer, avgSale, openHours, locationID) {
  this.storeLocation = storeLocation;
  this.minCustomer = minCustomer;
  this.maxCustomer = maxCustomer;
  this.avgSale = avgSale;
  this.openHours = openHours;
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

  for (var i=0; i < this.openHours; i++) {
    total += this.salesPerHour();
  }
  this.total = total;
  return total;
}

cookieStore.prototype.addData = function() {
  this.dailySaleTotal();

  var storeID = this.locationID;
  var location = document.createTextNode(this.storeLocation);

  var ul = document.createElement('ul'); //creates unordered list
  ul.setAttribute('id', storeID); //Gives list id which object assigned id
  ul.appendChild(location); //Add location property to display at top of list
  document.getElementById("dataDIV").appendChild(ul); //Adds unordered list to div on page

  for (i=0; i < this.salesArray.length; i++) {
    var hourArray = ["10am: ", "11am: ", "12pm: ", "1pm: ", "2pm: ", "3pm: ", "4pm: ", "5pm: "]; //Array created to house hours to display.
    var hr = hourArray[i];
    var hrsale = this.salesArray[i];
    var li = document.createElement("li"); //creates list item
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

}


var pioneerSquare = new cookieStore("Pioneer Square", 17, 88, 5.2, 8, "pioneer");
var portlandAirport = new cookieStore("Portland Airport", 6, 24, 1.2, 8, "portland");
var washingtonSquare = new cookieStore("Washington Square", 11, 38, 1.9, 8, "washington");
var sellwood = new cookieStore("Sellwood", 20, 48, 3.3, 8, "sellwood");
var pearlDistrict = new cookieStore("Pearl District", 3, 24, 2.6, 8, "pearl");

pioneerSquare.addData();
portlandAirport.addData();
