//earth quakes with a legend to color code
//technonic plates pull in date d3.json and add to layers
// git hub - https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json


var earthquakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
accessToken: API_KEY
});

let satellites = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
accessToken: API_KEY
});

let outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
accessToken: API_KEY
});

var baseMaps = {
    "Streets": streets,
    "Satellites": satellites,
    "Outdoors": outdoors
}

let earthquakes = new L.LayerGroup();
let techtonic_plates = new L.LayerGroup();

let overlayMaps = {
    "earthquakes": earthquakes,
    "technoic plates": techtonic_plates,
  };

var myMap = L.map("map", {
center: [45.52, -122.67],
zoom: 3,
layers: [streets]
});

L.control.layers(baseMaps, overlayMaps).addTo(myMap);
