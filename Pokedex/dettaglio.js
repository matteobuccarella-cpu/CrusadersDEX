const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

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
  coleottero: "bug",
  veleno: "poison",
  normale: "normal",
  folletto: "fairy",
  acciaio: "steel"
};


document.getElementById("name").textContent = data.name;
document.getElementById("id").textContent = "#" + data.id;
document.getElementById("img").src = data.image;

// tipi
const typesDiv = document.getElementById("types");
data.types.forEach(type => {
  const span = document.createElement("span");
  span.textContent = type; // italiano visibile
  span.classList.add("type", typeMap[type] || type);
  typesDiv.appendChild(span);
});

for (let stat in data.stats) {
  const value = data.stats[stat];

  const statEl = document.createElement("div");
  statEl.classList.add("stat");

  statEl.innerHTML = `
    <p>${formatStatName(stat)}: ${value}</p>
    <div class="bar">
      <div class="fill" style="width: ${value}%"></div>
    </div>
  `;

  statsDiv.appendChild(statEl);
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

// descrizione
document.getElementById("description").textContent = data.description;