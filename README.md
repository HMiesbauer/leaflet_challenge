Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.



Source code:
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
