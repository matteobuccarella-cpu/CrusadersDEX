//  TIPI
const typeMap = {
  lotta: "fighting",
  fuoco: "fire",
  acqua: "water",
  erba: "grass",
  elettro: "electric",
  volante: "flying",
  buio: "dark",
  spettro: "ghost",
  psico: "psychic",
  ghiaccio: "ice",
  terra: "ground",
  roccia: "rock",
  drago: "dragon",
  coleottero: "bug",
  veleno: "poison",
  normale: "normal",
  folletto: "fairy",
  acciaio: "steel"
};

// 🧠 Parametri
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatStatName(stat) {
  const names = {
    hp: "HP",
    attack: "Attacco",
    defense: "Difesa",
    sp_attack: "Attacco Sp.",
    sp_defense: "Difesa Sp.",
    speed: "Velocità"
  };
  return names[stat] || stat;
}

function getStatColor(value) {
  if (value < 40) return "#ff4d4d";
  if (value < 70) return "#ffa500";
  if (value < 100) return "#4caf50";
  return "#4da6ff";
}

//  CARICAMENTO DINAMICO
function loadPokemon(id) {
  const data = allPokemon.find(p => p.id === id);
  if (!data) return;

  const card = document.querySelector(".card");

  const overall = Object.values(data.stats)
  .reduce((a, b) => a + b, 0);

  const ctx = document.getElementById("statsChart").getContext("2d");

  if (window.radarChart) {
  window.radarChart.destroy();
}

const isDark = data.types[0] === "buio";
const isFighting = data.types[0] === "lotta";
const isGhost = data.types[0] === "spettro";
const isWater = data.types[0] === "acqua";

const labelColor = (isDark || isGhost) ? "#fff" : "#333";
const gridColor = (isDark || isGhost)
  ? "rgba(255,255,255,0.2)"
  : "rgba(0,0,0,0.1)";const borderColor = isFighting ? "#000" : "#333";

const borderWidth = isFighting ? 3 : 1.5;

const textColor = (isGhost || isDark) ? "#fff" : "#000";
  
// descrizione
document.getElementById("description").style.color = textColor;
  
// titolo "Statistiche"
document.querySelector(".right h2").style.color = textColor;

window.radarChart = new Chart(ctx, {
  type: "radar",
  data: {
    labels: Object.keys(data.stats).map(formatStatName),
    datasets: [{
      label: "Stats",
      data: Object.values(data.stats),
      fill: true,

   backgroundColor: isWater 
    ? "rgba(0, 80, 200, 0.4)"   // 🔥 area blu visibile
    : undefined,
   borderColor: isWater 
    ? "#0050c8"                // 🔥 bordo blu scuro
    : undefined,

        pointRadius: 0,            // ❌ niente pallini
        pointHoverRadius: 0
    }]
  },
options: {
  plugins: {
    legend: {
      display: false // ❌ rimuove "Stats"
    }
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,

      ticks: {
        display: false // ❌ numeri (HP ecc)
      },

      grid: {
    color: gridColor 
  },

      pointLabels: {
        color: labelColor,
        font: {
          size: 12
        }
      }
    }
  }
}
});

  document.getElementById("overall").innerHTML =
  `<h3>Overall: ${overall}</h3>`;

//  ANIMAZIONE FADE OUT
  card.style.opacity = "0";

  setTimeout(() => {
    // RESET CLASSI
    card.className = "card";

    const mainType = data.types[0];
    card.classList.add(typeMap[mainType] || mainType);

// 🧾 DATI BASE
document.getElementById("name").textContent = capitalize(data.name);

// 🆔 ID FIX COMPLETO
const idEl = document.getElementById("id");
idEl.textContent = "#" + String(data.id).padStart(3, "0");

// reset classi
idEl.classList.remove("gold-metal", "gold-bright");

// colori come index
const darkTypes = ["dark", "ghost", "dragon", "buio", "spettro", "drago"];

if (darkTypes.includes(data.types[0])) {
  idEl.classList.add("gold-bright");
} else {
  idEl.classList.add("gold-metal");
}

document.getElementById("img").src = data.image;;

// 🎨 TIPI
    const typesDiv = document.getElementById("types");
    typesDiv.innerHTML = "";

    data.types.forEach(type => {
      const span = document.createElement("span");
      span.textContent = capitalize(type);
      span.classList.add("type", typeMap[type] || type);

      span.style.cursor = "pointer";
      span.addEventListener("click", () => {
        window.location.href = `index.html?type=${type}`;
      });

      typesDiv.appendChild(span);
    });

// 📊 STATS
    const statsDiv = document.getElementById("stats");
    statsDiv.innerHTML = "";

    for (let stat in data.stats) {
      const value = data.stats[stat];

      const statEl = document.createElement("div");
      statEl.classList.add("stat");

      statEl.innerHTML = `
        <p>${formatStatName(stat)}: ${value}</p>
        <div class="bar">
          <div class="fill" style="width: 0%; background: ${getStatColor(value)}"></div>
        </div>
      `;

      statsDiv.appendChild(statEl);
    }

// ⚡ ANIMAZIONE BARRE
    setTimeout(() => {
      const fills = document.querySelectorAll(".fill");

      fills.forEach((fill, index) => {
        const value = Object.values(data.stats)[index];

        setTimeout(() => {
          fill.style.width = value + "%";
        }, index * 120);
      });
    }, 100);

    // 📝 DESCRIZIONE
    document.getElementById("description").textContent = data.description;

    // 🔁 URL SENZA RELOAD
    window.location.hash = data.id;

    // 🔘 BOTTONI
    updateNavButtons(data.id);

    // 💥 FADE IN
    card.style.opacity = "1";

  }, 150);
}

// 🔘 BOTTONI NAVIGAZIONE
function updateNavButtons(currentId) {
  const currentIndex = allPokemon.findIndex(p => p.id === currentId);

  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  prevBtn.onclick = null;
  nextBtn.onclick = null;

  if (currentIndex > 0) {
    prevBtn.style.opacity = "1";
    prevBtn.onclick = () => loadPokemon(allPokemon[currentIndex - 1].id);
  } else {
    prevBtn.style.opacity = "0.3";
  }

  if (currentIndex < allPokemon.length - 1) {
    nextBtn.style.opacity = "1";
    nextBtn.onclick = () => loadPokemon(allPokemon[currentIndex + 1].id);
  } else {
    nextBtn.style.opacity = "0.3";
  }
}

// 📱 SWIPE
let startX = 0;
let endX = 0;

document.addEventListener("touchstart", (e) => {
  startX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const diff = startX - endX;
  if (Math.abs(diff) < 50) return;

  const currentId = parseInt(window.location.hash.replace("#", ""));
  const currentIndex = allPokemon.findIndex(p => p.id === currentId);

  if (diff > 0 && currentIndex < allPokemon.length - 1) {
    loadPokemon(allPokemon[currentIndex + 1].id);
  }

  if (diff < 0 && currentIndex > 0) {
    loadPokemon(allPokemon[currentIndex - 1].id);
  }
}

// ⌨️ TASTIERA
document.addEventListener("keydown", (e) => {
  const currentId = parseInt(window.location.hash.replace("#", ""));
  const currentIndex = allPokemon.findIndex(p => p.id === currentId);

  if (e.key === "ArrowRight" && currentIndex < allPokemon.length - 1) {
    loadPokemon(allPokemon[currentIndex + 1].id);
  }

  if (e.key === "ArrowLeft" && currentIndex > 0) {
    loadPokemon(allPokemon[currentIndex - 1].id);
  }
});

// 🚀 AVVIO
const initialId = parseInt(window.location.hash.replace("#", ""));
loadPokemon(initialId);
