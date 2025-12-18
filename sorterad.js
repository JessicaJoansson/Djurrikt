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