// create map object
let myMap = L.map("map", {
    center: [39.8283, -98.5995],
    zoom: 2
  });

// Adding a tile layer (the background map image) to our map:

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// read in API & set function for earthquake magnitude
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson").then(function(data) {
console.log("hi")
function getRadius(magnitude) {
    return Math.sqrt(magnitude) * 5;
    
};

// loop through earthquakes 

for (let i = 0; i < data.features.length; i++) {
    let feature = data.features[i];
    let coordinates = feature.geometry.coordinates;
    let magnitude = feature.properties.mag;
    let depth = feature.geometry.coordinates[2];

// create earthquake markers
let earthquakeMarker = L.circleMarker([coordinates[1], coordinates[0]], {

    radius: Math.sqrt(magnitude) * 5,
    fillColor: markerColor(depth),
    color: "black",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8

});


// set popups for additional information when marker is clicked
earthquakeMarker.bindPopup(`<hi>Magnitude: ${magnitude}</h1>`);

// add to map
earthquakeMarker.addTo(myMap);

}
});

function markerColor(depth){

if (depth >= 90) {
    return "#d53e4f";
} else if (depth >= 70){
    return "#FF4500";
    } else if (depth >= 50){
        return "#FFA500";
    } else if (depth >= 30){
        return "#FFD700";
    } else if (depth >= 10){
        return "#FFEA00";
    } else {
    return "#00FF00"; 
}
};



// set legend

let legend = L.control({position: 'bottomright'});

// HTML legend function (Chatgpt, personal communication, March 29, 2024)
legend.onAdd = function(map){
let div = L.DomUtil.create('div', 'info legend');
let depths = [90, 70, 50, 30, 10, -10];

   // Apply CSS styling for white background/box (Chatgpt, personal communication, March 29, 2024)
   div.style.backgroundColor = 'white';
   div.style.padding = '10px';
   div.style.border = '1px solid #ccc';
   div.style.borderRadius = '5px';


// loop for legend (Chatgpt, personal communication, March 29, 2024)
for (let i = depths.length - 1; i >= 0; i--) {
    let from = depths[i];
    let to = depths[i - 1];
    let color = markerColor(from + 1);

// Create HTML for legend item with color swatch (Chatgpt, personal communication, March 29, 2024)
let legendItem = `<span style="background-color:${color}; width: 20px; height: 10px; display: inline-block;"></span> ${to ? `${from}&ndash;${to}` : `${from}+`}`;
div.innerHTML += legendItem + '<br>';
}

return div;
};

// add to map
legend.addTo(myMap);








