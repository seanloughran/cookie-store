console.log("test")

// Cookie Store object
var cookieStore = function(storeLocation, minCust, maxCust, avgSale, openHours) {
  this.storeLocation = storeLocation;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.openHours = openHours;
  this.salesArray = [];
}

// Generates random number of customer per hour
cookieStore.prototype.generateRandom = function(minCust, maxCust) {
  return Math.floor(Math.random() * (maxCust - minCust + 1)) + minCust;
}

// Generate sales per hour
cookieStore.prototype.salesPerHour = function() {
  var cookieSales = Math.floor(this.generateRandom(this.minCust, this.maxCust) * this.avgSale);
  this.salesArray.push(cookieSales);
  return cookieSales;
}

// Generate daily sales total
cookieStore.prototype.dailySaleTotal = function() {
  var total = 0;

  for (var i=0; i < this.openHours; i++) {
    total += this.salesPerHour();
  }
  return total;
}


var pioneerSquare = new cookieStore("Pioneer Square", 17, 18, 5.2, 8);
var portlandAirport = new cookieStore("Portland Airport", 6, 24, 1.2, 8);
var washingtonSquare = new cookieStore("Washington Square", 11, 38, 1.9, 8);
var sellwood = new cookieStore("Sellwood", 20, 48, 3.3, 8);
var pearlDistrict = new cookieStore("Pearl District", 3, 24, 2.6, 8);

console.log(pioneerSquare.dailySaleTotal());
console.log(pioneerSquare.salesArray);
