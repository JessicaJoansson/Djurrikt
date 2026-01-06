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
  .then(response => {
    console.log("Fetch status:", response.status);
    return response.json();
  })
  .then(data => {
    console.log("GeoJSON inläst:", data);

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


// ------------------------------------------------------
// 3. Funktion för varje län (osynliga polygoner)
// ------------------------------------------------------
function EachFeature(feature, layer) {
 layer.setStyle({
  fillColor: "#ffffff00", // genomskinlig men klickbar
  color: "#ffffff00",
  weight: 1
});
  layer.on("click", () => {
    showAnimalsInCounty(feature);
});
}


// ------------------------------------------------------
// 4. Djurdata
// ------------------------------------------------------
const animals = {
  vildsvin: {
    name: "Vildsvin",
    icons:["img/ettvildsvin.png","img/vildsvinsspår.png","img/Vildsvinsbajs.png","img/icon4.png"],
    text: `
      <strong>Storlek:</strong> Hanarna kan bli 1,8m långa och 1,1m höga<br>
      <strong>Vikt:</strong> Hanar ca 200kg, honorna är lite lättare.<br>
      <strong>Livsmiljö:</strong> Skogar, jordbruksområden<br>
      <strong>Föda:</strong> Rötter, frukt, smådjur<br>
      <strong>Rolig fakta:</strong> De lever i grupper som kallas "galtar". Den älsta suggan (honan) bestämmer över flocken.<br>
    `,
    image: "img/barnåvildsvinh2.png",
    video: "https://www.youtube.com/watch?v=QX4MIMJFwEQ",
    marker:"img/vildsvinskylt.png"
  },

  alg: {
    name: "Älg",
    icons:["img/realalg.png","img/icon2.png","img/icon3.png","img/icon4.png"],
    text: `
      <strong>Storlek:</strong> Mankhöjd upp till 200cm<br>
      <strong>Vikt:</strong> 200-700kg<br>
      <strong>Livsmiljö:</strong> Skogar<br>
      <strong>Föda:</strong> Blad, kvistar<br>
      <strong>Rolig fakta:</strong> Kan springa upp till 60km/h.<br>
    `,
    image: "img/barnåälg2.png",
    video: "https://www.youtube.com/watch?v=tZX4BmjZRUc",
    marker:"img/algskylt.png"
  },
  bjorn: {
  name: "Björn",
  icons:["img/realbjorn.png","img/icon2.png","img/icon3.png","img/icon4.png"],
  text: `
    <strong>Storlek:</strong> Höjd På alla 4:ca 135cm, på bakbenen 100-280cm <br>
    <strong>Vikt:</strong> Hona 60-100kg, hane: 100-340kg<br>
    <strong>Livsmiljö:</strong> Idet är ofta en grävd håla under rötter, stenar, myrstackar eller i en berghåla, där den sover vintersömnen från hösten till våren.<br>
    <strong>Föda:</strong>Blad, kvistar (särskilt från asp, rönn, sälg) och unga tallar<br>
    <strong>Rolig fakta:</strong> Björnar kan springa upp till 56-70 km/h och är mycket duktiga simmare. Den har ett fenomenalt luktsinne och skarp hörsel. De ställer sig ofta på bakbenen för  att ta reda på vad den har framför sig och få en bättre doftbild av närområdet. Detta är inte ett hotbeteende.<br>
  `,
  image: "img/barnbjörnm.png",
  video: "https://www.youtube.com/watch?v=1lJw7V77PhE",
  marker:"img/bjornskylt.png"
},
fjallrav: {
  name: "Fjällräv",
  icons:["img/realfjallrav.png","img/icon2.png","img/icon3.png","img/icon4.png"],
  text: `
    <strong>Storlek:</strong> Kroppen är 41-68cm lång och svansen 26-50cm.<br>
    <strong>Vikt:</strong> 1,5-8 kg<br>
    <strong>Livsmiljö:</strong> Skogar, jordbruksområden<br>
    <strong>Föda:</strong>Smådjur som lämlar och fåglar. På sommaren äter den även bär och på vintern är döda djur viktiga för att den ska överleva<br>
    <strong>Rolig fakta:</strong> Fjällräven är anpassad för att leva i kalla klimat och kan tack vare sin tjocka päls klara sig bra i kyla så kallt som till -40 grader.<br>
  `,
  image: "img/barnafrallravm.png",
  video: "https://www.youtube.com/watch?v=ORH9jlWugdc",
  marker:"img/fjallravskylt.png"
},
gravling: {
  name: "Grävling",
  icons:["img/realgravling.png","img/icon2.png","img/icon3.png","img/icon4.png"],
  text: `
    <strong>Storlek:</strong> Längd 60-90cm<br>
    <strong>Vikt:</strong> 7-15 kg<br>
    <strong>Livsmiljö:</strong> Gryt (hålor i marken som de gräver själva, ofta i skogar eller vid ängar).<br>
    <strong>Föda:</strong> Allätare, maskar, insekter, bär, frukt, grodor och ibland små gnagare.<br>
    <strong>Rolig fakta:</strong> Grävlingen är ett nattaktivt djur som är känd för sin starka kroppsbyggnad och sina kraftiga klor, vilka den använder för att gräva komplexa underjordiska bon. Den har en karakteristisk svartvit ansiktsmask och en tjock päls som skyddar den mot kyla.<br>
  `,
  image: "img/barnågrävlingmt.png",
  video: "https://www.youtube.com/watch?v=pvnMmznREWQ",
  marker:"img/gravlingskylt.png"
},
lo: {
  name: "Lo",
  icons:["img/reallodjur.png","img/icon2.png","img/icon3.png","img/icon4.png"],
  text: `
    <strong>Storlek:</strong>Längd: 70-115cm Höjd: 60-70cm<br>
    <strong>Vikt:</strong> 15-30 kg<br>
    <strong>Livsmiljö:</strong> Skogsområden, de har inget eget bo<br>
    <strong>Föda:</strong> Rådjur, harar, fåglar och ibland renar<br>
    <strong>Rolig fakta:</strong> Lodjuret är ett av de största kattdjuren i Europa. Det är ett skickligt rovdjur som främst jagar rådjur och harar. Lodjuret är känt för sina karakteristiska tofsar på öronen och sin korta svans med svart spets. Det är ett ensamt djur som är mest aktivt under skymning och gryning.<br>
  `,
  image: "img/barnalom.png",
  video: "https://www.youtube.com/watch?v=FfWjnuBFu_8",
  marker:"img/lodjurskylt.png"
},
nabbmus: {
  name: "Näbbmus",
  icons:["img/realnabbmus.png","img/icon2.png","img/icon3.png","img/icon4.png"],
  text: `
    <strong>Storlek:</strong> Kroppen är 5,4-8,7cm och svansen är 3,2-5,6cm (60-80% av näbbmusens längd)<br>
    <strong>Vikt:</strong> 50–150 kg<br>
    <strong>Livsmiljö:</strong> Bygger bo av mossa, gräs ochlöv. Ligger gömt under en stubbe eller på en annan trygg plats.<br>
    <strong>Föda:</strong> Insekter och deras larver, spindlar, gråsuggor och daggmaskar<br>
    <strong>Rolig fakta:</strong> Näbbmusen är ett av de vanligaste däggdjuren i Sverige. Varje dygn behöver den äta mer än vad den väger för att inte svälta ihjäl, den kan svälta ihjäl på två timmar.<br>
  `,
  image: "img/barnanabbmusm.png",
  video: "https://www.youtube.com/watch?v=KOMWE-f4eeU",
  marker:"img/musskylt.png"
},
jarv: {
  name: "Järv",
  icons:["img/realjarv.png","img/icon2.png","img/icon3.png","img/icon4.png"],
  text: `
    <strong>Storlek:</strong>Den är 35-45cm hög<br>
    <strong>Vikt:</strong> 50–150 kg<br>
    <strong>Livsmiljö:</strong>Lya i en sluttning med packad snö eller i skogen i rotvältor eller klippblock. I anslutning till lyan finns det ett flertal gångar med olika platser att ligga på och även en toalett<br>
    <strong>Föda:</strong> Den är asätare och lever på ren och älgkadaver som varg eller lodjur lämnat efter sig. Den kan fälla en ren själv om det är skare på snön<br>
    <strong>Rolig fakta:</strong> Den kan springa i 45kg/h och har platta tassar som fungerar som snöskor. Den är duktig på att klättra i träd och simma.
  `,
  image: "img/barnåjarvh2.png",
  video: "https://www.youtube.com/watch?v=BL-oBJVvRd0",
  marker:"img/jarvskylt.png"
},
};


// ------------------------------------------------------
// 5. Visa djur på kartan och i popup-panelen
// ------------------------------------------------------
let animalMarkers = [];

function showAnimal(key) {

  if (!geojsonData) return;

  const info = animals[key];
  if (!info) return;

  // Ta bort gamla markörer
  animalMarkers.forEach(m => map.removeLayer(m));
  animalMarkers = [];

  let positions = [];
  let lastMarker = null;

  // Skapa markör-ikon
  const animalIcon = L.icon({
    iconUrl: info.marker,
    iconSize: [60, 60],
    iconAnchor: [30, 60]
  });

  geojsonData.features.forEach(feature => {

    if (!feature.properties.animals ||
        !feature.properties.animals.includes(key)) return;

    let firstPoint = null;

    if (feature.geometry.type === "Polygon") {
      firstPoint = feature.geometry.coordinates[0][0];
    }

    if (feature.geometry.type === "MultiPolygon") {
      firstPoint = feature.geometry.coordinates[0][0][0];
    }

    if (!firstPoint) return;

    const latlng = [firstPoint[1], firstPoint[0]];
    positions.push(latlng);

    const marker = L.marker(latlng, { icon: animalIcon }).addTo(map);
    animalMarkers.push(marker);
    lastMarker = marker;

    // När man klickar på markören → visa i panelen
    marker.on("click", () => {
      showAnimalInPanel(info);
    });
  });

  if (positions.length === 0) {
    alert("Djuret finns inte i något län i GeoJSON.");
    return;
  }

  // Zooma in på rätt län
  map.fitBounds(L.latLngBounds(positions), {
  paddingTopLeft: [350, 120],
  maxZoom: 7,
  minZoom: 5   // hindrar överzoom utåt
});


  // Visa popup-panel direkt för första länet
  if (lastMarker) {
    showAnimalInPanel(info);
  }
}


// ------------------------------------------------------
// 6. Funktion: Visa popup-innehåll i vänster panel
// ------------------------------------------------------
function showAnimalInPanel(info) {

  const iconHtml = (info.icons || [])
    .map(src => `<img class="popup-icon" src="${src}">`)


    .join("");

  const html = `
    <div class="animal-popup">
      <h2>${info.name}</h2>
      <div class="animal-top-images">${iconHtml}</div>
      <div class="animal-info">${info.text}</div>
      <div class="animal-main-image"><img src="${info.image}"></div>
      <div class="animal-video">
        <a href="${info.video}" target="_blank">Se video om ${info.name}</a>
      </div>
    </div>
  `;

  document.getElementById("popup-panel").innerHTML = html;
}

function showAnimalsInCounty(feature) {

  const animalKeys = feature.properties.animals;

  if (!animalKeys || animalKeys.length === 0) {
    document.getElementById("popup-panel").innerHTML = `
      <h2>Inga djur registrerade</h2>
      <p>Det här länet har inga djur kopplade i GeoJSON-filen.</p>
    `;
    return;
  }

  // Bygg lista över djur
  let html = `
    <h2>Djur i ${feature.properties.name}</h2>
    <div class="county-animal-list">
  `;

  animalKeys.forEach(key => {
    const info = animals[key];
    if (!info) return;

    html += `
      <div class="county-animal-item" onclick="showAnimal('${key}')">
        <img src="${info.marker}" class="county-animal-icon">
        <span>${info.name}</span>
      </div>
    `;
  });

  html += `</div>`;

  document.getElementById("popup-panel").innerHTML = html;
}
