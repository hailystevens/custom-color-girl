const paletteDiv = document.getElementById("palette");

function getMoodFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("mood") || "emotional static";
}

async function fetchPaletteFromGPT(mood) {
  const res = await fetch("/.netlify/functions/gptPalette", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood })
  });

  const palette = await res.json();
  return palette;
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
    circle.style.backgroundColor = color.hex;

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

(async () => {
  const mood = getMoodFromURL();
  const palette = await fetchPaletteFromGPT(mood);
  renderPalette(palette);
})();
