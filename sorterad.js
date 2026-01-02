// Lägg till bakgrundskarta
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

function getColor(code) {
  switch(code) {
    case 1: return "#f44336"; // röd
    case 2: return "#2196f3"; // blå
    case 3: return "#4caf50"; // grön
    case 4: return "#ff9800"; // orange
    case 5: return "#9c27b0"; // lila
    default: return "#cccccc"; // grå fallback
  }
}

// Skapa kartan
var map = L.map('map').setView([62.0, 15.0], 5);


// Funktion som översätter color-kod till färg

function getColor(code) {
  switch(Number(code)) {
    case 1: return "#f44336"; // röd
    case 2: return "#2196f3"; // blå
    case 3: return "#4caf50"; // grön
    case 4: return "#ff9800"; // orange
    case 5: return "#9c27b0"; // lila
    default: return "#cccccc"; // grå fallback
 console.log("Unknown code:", code);
}

  }

// Ladda GeoJSON-filen (se.json)
fetch("se.json")
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      style: function(feature) {
        return {
          fillColor: getColor(feature.properties.color),
          weight: 1,
          color: "#ad8d8dff",
          fillOpacity: 0.7
        };
      },
      onEachFeature: function(feature, layer) {
        // Exempel på djurinfo per län
        let djurInfo = "";
        switch(feature.properties.name) {
          case "Norrbotten": djurInfo = "Björn, järv, ren"; break;
          case "Västerbotten": djurInfo = "Älg, räv"; break;
          case "Skåne": djurInfo = "Vildsvin, kronhjort"; break;
          case "Blekinge": djurInfo = "Rådjur, grävling"; break;
          default: djurInfo = "Olika arter beroende på habitat";
        }

        layer.bindPopup(`<b>${feature.properties.name}</b><br>Djur: ${djurInfo}`);
      }
    }).addTo(map);
  });

onEachFeature: function(feature, layer) {
  if (feature.properties.image) {
    let bounds = layer.getBounds();
    let img = L.imageOverlay(feature.properties.image, bounds).addTo(map);

    // Hover-effekt: visa bilden bara vid hover
    layer.on("mouseover", () => map.addLayer(img));
    layer.on("mouseout", () => map.removeLayer(img));
  }

  layer.bindPopup(`<b>${feature.properties.name}</b>`);
}

  