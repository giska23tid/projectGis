import "./style.css";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Vector as VectorSource } from "ol/source.js";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON.js";
import { fromLonLat } from "ol/proj.js";
import { Icon, Style, Fill, Stroke, Text } from "ol/style.js";
import Overlay from "ol/Overlay.js";


// Untuk menampilkan polygon Riau dengan data.json
const riau = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: "data/polygon_riau.json",
  }),
});
// end.

// Untuk menampilkan titik banjir dan icon
const banjir = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: "data/genangan_banjir_geojson.json",
  }),
  style: new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "flaticon",
      anchorYUnits: "pixels",
      src: "icon/flood_1.png",
      width: 20,
      height: 20,
    }),
  }),
});

const container = document.getElementById('popup');
const content_element = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');
//Create overlay popup

const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});
//End.

// Untuk menampilkan polygon Pekanbaru dengan data/pekanbaru.json
const pekanbaru = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: "data/pekanbaru.json",
  }),
  visible: false, // Default hidden
});

// Style function for Rumbai districts
const rumbaiStyle = function (feature) {
  const name = feature.get("nm_kecamatan");
  let color = "rgba(128, 128, 128, 0.5)"; // Default gray

  switch (name) {
    case "Rumbai":
      color = "rgba(255, 0, 0, 0.5)"; // Merah
      break;
    case "Rumbai Barat":
      color = "rgba(0, 255, 0, 0.5)"; // Hijau
      break;
    case "Rumbai Timur":
      color = "rgba(0, 0, 255, 0.5)"; // Biru
      break;
  }

  return new Style({
    fill: new Fill({
      color: color,
    }),
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    text: new Text({
      text: name,
      font: "bold 12px Calibri,sans-serif",
      fill: new Fill({
        color: "#000",
      }),
      stroke: new Stroke({
        color: "#fff",
        width: 3,
      }),
    }),
  });
};

// Untuk menampilkan polygon Rumbai dengan data/kecamatan_rumbai.geojson
const rumbai = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: "data/kecamatan_rumbai.geojson",
  }),
  style: rumbaiStyle,
  visible: false, // Default hidden
});

// Style function for Kelurahan Rumbai
const kelurahanRumbaiStyle = function (feature) {
  // Property name identified from data/kelurahan_rumbai.geojson is 'nm_kelurahan'
  const name = feature.get("nm_kelurahan") || feature.get("NAMOBJ") || "Unknown";

  // Generate color based on name string to ensure consistency
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Use a wider range of hues and fixed saturation/lightness for better visibility
  const hue = Math.abs(hash % 360);
  const color = `hsla(${hue}, 70%, 50%, 0.6)`;

  return new Style({
    fill: new Fill({
      color: color,
    }),
    stroke: new Stroke({
      color: "white", // White border for contrast
      width: 2,
    }),
    text: new Text({
      text: name,
      font: "bold 12px Calibri,sans-serif",
      fill: new Fill({
        color: "#000", // Black text
      }),
      stroke: new Stroke({
        color: "#fff", // White halo
        width: 3,
      }),
      overflow: true,
    }),
  });
};

// Untuk menampilkan polygon Kelurahan Rumbai dengan data/kelurahan_rumbai.geojson
const kelurahanRumbai = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: "data/kelurahan_rumbai.geojson",
  }),
  style: kelurahanRumbaiStyle,
  visible: false, // Default hidden
});

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    riau, pekanbaru, rumbai, kelurahanRumbai, banjir
  ],
  overlays: [overlay],
  view: new View({
    center: fromLonLat([101.7068, 0.5071]), // Koordinat tengah Riau
    zoom: 7,
  }),
});

map.addOverlay(overlay); //untuk menambah overlay

// Button Logic
const btnRiau = document.getElementById('btn-riau');
const btnPekanbaru = document.getElementById('btn-pekanbaru');
const btnRumbai = document.getElementById('btn-rumbai');
const btnKelurahanRumbai = document.getElementById('btn-kelurahan-rumbai');

btnRiau.addEventListener('click', function () {
  riau.setVisible(true);
  pekanbaru.setVisible(false);
  rumbai.setVisible(false);
  kelurahanRumbai.setVisible(false);
  map.getView().animate({
    center: fromLonLat([101.7068, 0.5071]),
    zoom: 7,
    duration: 1000
  });
  btnRiau.classList.remove('btn-secondary');
  btnRiau.classList.add('btn-primary');
  btnPekanbaru.classList.remove('btn-primary');
  btnPekanbaru.classList.add('btn-secondary');
  btnRumbai.classList.remove('btn-primary');
  btnRumbai.classList.add('btn-secondary');
  btnKelurahanRumbai.classList.remove('btn-primary');
  btnKelurahanRumbai.classList.add('btn-secondary');
});

btnPekanbaru.addEventListener('click', function () {
  riau.setVisible(false);
  pekanbaru.setVisible(true);
  rumbai.setVisible(false);
  kelurahanRumbai.setVisible(false);
  map.getView().animate({
    center: fromLonLat([101.4478, 0.5071]),
    zoom: 11,
    duration: 1000
  });
  btnPekanbaru.classList.remove('btn-secondary');
  btnPekanbaru.classList.add('btn-primary');
  btnRiau.classList.remove('btn-primary');
  btnRiau.classList.add('btn-secondary');
  btnRumbai.classList.remove('btn-primary');
  btnRumbai.classList.add('btn-secondary');
  btnKelurahanRumbai.classList.remove('btn-primary');
  btnKelurahanRumbai.classList.add('btn-secondary');
});

btnRumbai.addEventListener('click', function () {
  riau.setVisible(false);
  pekanbaru.setVisible(false);
  rumbai.setVisible(true);
  kelurahanRumbai.setVisible(false);
  map.getView().animate({
    center: fromLonLat([101.42, 0.58]), // Koordinat Rumbai (approx)
    zoom: 12,
    duration: 1000
  });
  btnRumbai.classList.remove('btn-secondary');
  btnRumbai.classList.add('btn-primary');
  btnRiau.classList.remove('btn-primary');
  btnRiau.classList.add('btn-secondary');
  btnPekanbaru.classList.remove('btn-primary');
  btnPekanbaru.classList.add('btn-secondary');
  btnKelurahanRumbai.classList.remove('btn-primary');
  btnKelurahanRumbai.classList.add('btn-secondary');
});

btnKelurahanRumbai.addEventListener('click', function () {
  riau.setVisible(false);
  pekanbaru.setVisible(false);
  rumbai.setVisible(false);
  kelurahanRumbai.setVisible(true);
  map.getView().animate({
    center: fromLonLat([101.425, 0.585]), // Koordinat Kelurahan Rumbai (approx)
    zoom: 13, // Zoom lebih dekat
    duration: 1000
  });
  btnKelurahanRumbai.classList.remove('btn-secondary');
  btnKelurahanRumbai.classList.add('btn-primary');
  btnRiau.classList.remove('btn-primary');
  btnRiau.classList.add('btn-secondary');
  btnPekanbaru.classList.remove('btn-primary');
  btnPekanbaru.classList.add('btn-secondary');
  btnRumbai.classList.remove('btn-primary');
  btnRumbai.classList.add('btn-secondary');
});

// JS for click popup
map.on('singleclick', function (evt) {
  const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
    if (layer === banjir) {
      return feature;
    }
  });
  if (!feature) {
    overlay.setPosition(undefined); // Close popup if clicking on empty space
    closer.blur();
    return;
  }

  const coordinate = evt.coordinate;
  const content =
    "<h3>" + feature.get("Alamat_Dom") + "</h3>" +
    "<p><b>Kecamatan:</b> " + feature.get("Kecamatan") + "</p>" +
    "<p><b>Frekuensi Genangan:</b> " + feature.get("Frekuensi") + "</p>" +
    "<p><b>Ketinggian Air:</b> " + feature.get("Ketinggian") + "</p>" +
    "<p><b>Durasi Surut:</b> " + feature.get("Durasi_Sur") + "</p>" +
    "<p><b>Faktor Penyebab:</b> " + feature.get("Faktor_Pen") + "</p>" +
    "<p><b>Skor Total:</b> " + feature.get("Skor_Total") + "</p>" +
    "<p><b>Status Kerawanan:</b> <span style='color: red; font-weight: bold;'>" + feature.get("Status_Tot") + "</span></p>";

  content_element.innerHTML = content;
  overlay.setPosition(coordinate);
});

//Click handler to hide popup
closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};