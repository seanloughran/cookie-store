var cookieStore = function(storeLocation, minCust, maxCust, avgSale, openHours) {
  this.storeLocation = storeLocation;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgSale = avgSale;
  this.openHours = openHours;
}

var pioneerSquare = new cookieStore("Pioneer Square", 17, 18, 5.2, 8);
var portlandAirport = new cookieStore("Portland Airport", 6, 24, 1.2, 8);
var washingtonSquare = new cookieStore("Washington Square", 11, 38, 1.9, 8);
var sellwood = new cookieStore("Sellwood", 20, 48, 3.3, 8);
var pearlDistrict = new cookieStore("Pearl District", 3, 24, 2.6, 8);










Location	Min / Cust	Max / Cust	Avg Cookie / Sale
Pioneer Square	17	88	5.2
Portland Airport	6	24	1.2
Washington Square	11	38	1.9
Sellwood	20	48	3.3
Pearl District	3	24	2.6
