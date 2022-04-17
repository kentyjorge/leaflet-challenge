//earth quakes with a legend to color code
//technonic plates pull in date d3.json and add to layers

var earthquakes_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var tectonicplates_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

//mapbox styles
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

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

d3.json(earthquakes_url).then(function (data) {
  createFeatures(data.features);
});

var techtonic_plates = new L.LayerGroup();

d3.json(tectonicplates_url).then(function (tectonicplatedata){
  L.geoJSON(tectonicplatedata).addTo(techtonic_plates);
  techtonic_plates.addTo(myMap)
});

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    style: markerStyle,
    pointToLayer: marker,
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  var baseMaps = {
    "Streets": streets,
    "Satellites": satellites,
    "Outdoors": outdoors,
    "dark": dark,
    //"Topo": top,
  }

  let overlayMaps = {
    Earthquakes: earthquakes,
    "tectonic plates": techtonic_plates,
  };

  var myMap = L.map("map", {
    center: [30, -5],
    zoom: 4,
    layers: [streets, earthquakes]
  });

  let legend = L.control({ position: "bottomright" });

  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");
    const magnitudes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const colors = [
      "lightgray",
      "lightyellow",
      "yellow",
      "lightorange",
      "orange",
      "lightpurple",
      "purple",
      "lightblue",
      "blue",
      "darkblue"
    ];
    
    div.innerHTML = "<h1>legend</h1>"
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML += "<li style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+"); "></li> "
      
    }

    return div;

  };

  legend.addTo(myMap);

  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

}

function marker(feature, layer) {

  //console.log(layer)
  return L.circleMarker(layer);
}


function markerradius(mag) {
  var r = (Math.exp(mag / 1.01 - 0.13)) * 1000;
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
    return "lightgray";
  }
}

function markerStyle(data) {
  return {
    color: markercolor(data.geometry.coordinates[2]),
    radius: markerradius(data.properties.mag),
    fillOpacity: 1,
  };
};
