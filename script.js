// script.js
const paletteDiv = document.getElementById("palette");

const cssColors = [
  { name: "MistyRose", hex: "#FFE4E1" },
  { name: "LavenderBlush", hex: "#FFF0F5" },
  { name: "Thistle", hex: "#D8BFD8" },
  { name: "LightSteelBlue", hex: "#B0C4DE" },
  { name: "HoneyDew", hex: "#F0FFF0" },
  { name: "PeachPuff", hex: "#FFDAB9" },
  { name: "GhostWhite", hex: "#F8F8FF" },
  { name: "PowderBlue", hex: "#B0E0E6" },
  { name: "PaleTurquoise", hex: "#AFEEEE" },
  { name: "LemonChiffon", hex: "#FFFACD" },
];

function getMoodFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("mood") || "ethereal chaos";
}

function randomPalette() {
  const shuffled = cssColors.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 5);
}

function renderPalette(palette) {
  const mood = getMoodFromURL();
  const header = document.createElement("h2");
  header.textContent = `Mood: “${mood}”`;
  paletteDiv.appendChild(header);

  palette.forEach((color) => {
    const swatch = document.createElement("div");
    swatch.className = "swatch";

    const label = document.createElement("div");
    label.className = "color-label";

    const circle = document.createElement("span");
    circle.className = "color-circle";
    circle.style.backgroundColor = color.name;

    const name = document.createElement("span");
    name.textContent = color.name;
    name.style.marginLeft = "0.5rem";

    label.appendChild(circle);
    label.appendChild(name);

    const hex = document.createElement("div");
    hex.className = "color-hex";
    hex.textContent = color.hex;

    swatch.appendChild(label);
    swatch.appendChild(hex);

    paletteDiv.appendChild(swatch);
  });
}

const palette = randomPalette();
renderPalette(palette);
