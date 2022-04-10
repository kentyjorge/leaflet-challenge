//earth quakes with a legend to color code
//technonic plates pull in date d3.json and add to layers

var earthquakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var technoicplates_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

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

d3.json(earthquakes_url).then(createMarker)

function createMarker(data) {
  console.log(data)
  var earthquake = data.id;
  console.log(earthquake)

  earthquake_markers = [];
}
function markerradius(mag) {
  var r = (Math.exp(mag/1.01-0.13))*1000;
}
function markercolor(depth) {
  if (depth > 90) {
    return "darkblue";
  }
  if (depth > 80) {
    return "blue";
  }
  if (depth > 70) {
    return "lightblue";
  }
  if (depth > 60) {
    return "purple";
  }
  if (depth > 50) {
    return "lightpurple";
  }
  if (depth > 40) {
    return "orange";
  }
  if (depth > 30) {
    return "lightorange";
  }
  if (depth > 20) {
    return "yellow";
  }
  if (depth > 10) {
    return "lightyellow";
  } else {
    return "gray";
  }
}

function marketStyle(data) {
  return{
    color: markercolor(data.geometry.coordinates[2]),
    radius: markerradius(data.properties.mag)
  };
}

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
