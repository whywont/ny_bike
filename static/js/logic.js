var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function.
function createMap(bikeStations){
  
  // Create the tile layer that will be the background of our map.
  var streetMapLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });



  // Create the map object with options.
  var myMap = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [streetMapLayer, bikeStations]
  });

  // Create a baseMaps object to hold the lightmap layer.
  var baseMap = {
    "Steet Map": streetMapLayer
  };

  // Create an overlayMaps object to hold the bikeStations layer.
  var stationsOverlayMap = {
    "Bike Stations": bikeStations
  };
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMap, stationsOverlayMap, {
    collapsed: false
  }).addTo(myMap);
  
};

// Create the createMarkers function.
function createStationsLayer(response){

  // Pull the "stations" property from response.data.
  var stations = response.data.stations;

  // Initialize an array to hold the bike markers.
  var stationMarkers = [];

  // Loop through the stations array.
  for (var i = 0; i < stations.length; i++){

    var station = stations[i];

    var stationMarker = L.marker([station.lat, station.lon]).bindPopup(`<h3>${station.name}</h3><hr><h4>Capacity: ${station.capacity}</h4>`);

    stationMarkers.push(stationMarker);
  };
  var stationsLayerGroup = L.layerGroup(stationMarkers);

  console.log(stationsLayerGroup);

  createMap(stationsLayerGroup); 
};

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
var url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(url).then(function(response){
  createStationsLayer(response);
});