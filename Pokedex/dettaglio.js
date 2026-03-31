const id = parseInt(window.location.hash.replace("#", ""));
console.log("ID:", id);
console.log("Pokemon trovati:", allPokemon);

const data = allPokemon.find(p => p.id === id);
const statsDiv = document.getElementById("stats");

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
  insetto: "bug",
  veleno: "poison",
  normale: "normal",
  folletto: "fairy",
  acciaio: "steel"
};


// 🧠 UTILS
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


// 🧾 DATI BASE
document.getElementById("name").textContent = capitalize(data.name);
document.getElementById("id").textContent = "#" + data.id;
document.getElementById("img").src = data.image;


// 🎨 TIPI
const typesDiv = document.getElementById("types");

data.types.forEach(type => {
  const span = document.createElement("span");
  span.textContent = capitalize(type);
  span.classList.add("type", typeMap[type] || type);
  typesDiv.appendChild(span);
});


// 📊 STATS
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
  return names[stat] || stat;
}

// descrizione
document.getElementById("description").textContent = data.description;
