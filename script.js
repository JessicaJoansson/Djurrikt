let geojsonData = null;
console.log("geojsonData är nu satt", geojsonData);

// ------------------------------------------------------
// 1. Skapa kartan
// ------------------------------------------------------
const map = L.map('map').setView([62.0, 15.0], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);


// ------------------------------------------------------
// 2. Ladda GeoJSON (polygoner + popup)
// ------------------------------------------------------
fetch("lan_med_djur.json")
  .then(response => response.json())
  .then(data => {
    geojsonData = data;  

    L.geoJSON(data, {
      style: () => ({
        fillColor: "transparent",
        color: "transparent",
        weight: 0
      }),
      onEachFeature: EachFeature
    }).addTo(map);
  });
console.log("Efter fetch: geojsonData =", geojsonData);
    


// ------------------------------------------------------
// 3. Funktion för varje län (just nu bara osynlig polygon)
// ------------------------------------------------------
function EachFeature(feature, layer) {
  layer.setStyle({
    fillColor: "transparent",
    color: "transparent",
    weight: 0
  });
};


// ------------------------------------------------------
// 4. Djurdata (popup + markörer)
// ------------------------------------------------------
const animals = {
  vildsvin: {
    name: "Vildsvin",
    icons:["img/icon1.png","img/icon2.png","img/icon3.png","img/icon4.png"],
    text: `
      <strong>Storlek:</strong> Höjd 70–100 cm, längd ca 165 cm<br>
      <strong>Vikt:</strong> 50–150 kg<br>
      <strong>Livsmiljö:</strong> Skogar, jordbruksområden<br>
      <strong>Föda:</strong> Rötter, frukt, smådjur<br>
    `,
    image: "bilder/vildsvin.png",
    video: "https://www.youtube.com/watch?v=ZZgssUXFRSg"
  },

  alg: {
    name: "Älg",
    image: "bilder/alg.png",
    video: "https://www.youtube.com/watch?v=yyyy",
    text: "Älgen finns i hela Sverige."
  },

  fjallrav: {
    name: "Fjällräv",
    image: "bilder/rav.png",
    video: "https://www.youtube.com/watch?v=zzzz",
    text: "Räven är vanlig i hela landet."
  },

  bjorn: {
    name: "Björn",
    image: "bilder/bjorn.png",
    video: "https://www.youtube.com/watch?v=aaaa",
    text: "Björnen finns främst i de norra delarna av Sverige."
  },

  lo: {
    name: "Lo",
    image: "bilder/lo.png",
    video: "https://www.youtube.com/watch?v=bbbb",
    text: "Lodjuret finns i hela landet men är vanligast i de norra delarna."
  },

  jarv: {
    name: "Järv",
    image: "bilder/jarv.png",
    video: "https://www.youtube.com/watch?v=cccc",
    text: "Järven finns främst i de norra delarna av Sverige."
  },

  nabbmus: {
    name: "Nabbmus",
    image: "bilder/nabbmus.png",
    video: "https://www.youtube.com/watch?v=dddd",
    text: "Nabbmusen finns i hela landet."
  },

  gravling: {
    name: "Grävling",
    image: "bilder/gravling.png",
    video: "https://www.youtube.com/watch?v=eeee",
    text: "Grävlingen finns i hela landet."
  }
};


// ------------------------------------------------------
// 5. Visa djur på kartan när man klickar i sidomenyn
// ------------------------------------------------------
let animalMarkers = [];

function showAnimal(key) {
  if(!geojsonData){
    console.warn("GeoJSON inte läddad än.");
    return;}
  
  const info = animals[key];
  if (!info) return;

  // Ta bort gamla markörer
  animalMarkers.forEach(m => map.removeLayer(m));
  animalMarkers = [];

  let positions = [];

  geojsonData.features.forEach(feature => {
    if (feature.properties.animals &&
        feature.properties.animals.includes(key)) {

      // För polygoner: ta första punkten
      const coords = feature.geometry.coordinates[0][0];
      const latlng = [coords[1], coords[0]];
      console.log(feature.geometry.coordinates)

      positions.push(latlng);

      const marker = L.marker(latlng).addTo(map);
      animalMarkers.push(marker);

      const iconHtml = (info.icons || [])
        .map(src => `<img src="${src}">`)
        .join("");

      const popupHtml = `
        <div class="animal-popup">
          <div class="animal-top-images">${iconHtml}</div>
          <div class="animal-info">${info.text}</div>
          <div class="animal-main-image"><img src="${info.image}"></div>
          <div class="animal-video">
            <a href="${info.video}" target="_blank">Se video om ${info.name}</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);
    }
  });

  if (positions.length === 0) {
    alert("Djuret finns inte i något län i GeoJSON.");
    return;
  }

  map.fitBounds(L.latLngBounds(positions));
}
