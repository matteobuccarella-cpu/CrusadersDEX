const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("search");
const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sort");
const statSort = document.getElementById("statSort");
const orderSort = document.getElementById("orderSort");
const startMessage = document.getElementById("startMessage");
const suggestionsBox = document.getElementById("suggestions");
const noResults = document.getElementById("noResults");

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

let compareList = [];


// 🔠 UTILS
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


// 🔥 POPOLA TIPI
function populateTypes() {
  const allTypes = [
    "normale","fuoco","acqua","erba","elettro","ghiaccio",
    "lotta","veleno","terra","volante","psico","coleottero",
    "roccia","spettro","drago","buio","acciaio","folletto"
  ];

  allTypes.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = capitalize(type);
    typeFilter.appendChild(option);
  });
}


// 🎨 RENDER
function renderPokemon(list, statValue = "") {
  pokedex.innerHTML = "";

  list.forEach(data => {
    const div = document.createElement("div");
    div.classList.add("card");

    const mainType = data.types[0];
    div.classList.add(typeMap[mainType] || mainType);

    const idLabel = document.createElement("div");
    idLabel.classList.add("pokemon-id");
    idLabel.textContent = "#" + String(data.id).padStart(3, "0");

    const mappedType = typeMap[mainType] || mainType;
    const darkTypes = ["dark", "ghost", "dragon"];
    if (darkTypes.includes(mappedType)) {
      idLabel.classList.add("gold-bright");
    } else {
      idLabel.classList.add("gold-metal");
    }

    const title = document.createElement("h3");
    title.textContent = capitalize(data.name);

    // 👉 CLICK NORMALE = DETTAGLIO
  div.addEventListener("click", () => {
    if (compareList.length === 1) {
      handleCompare(data, div); // 🔥 secondo click ovunque
    } else {
      window.location.href = `dettaglio.html#${data.id}`;
    }
  });

   const img = document.createElement("img");
    img.src = data.image;

   const types = document.createElement("div");
    data.types.forEach(type => {
      const span = document.createElement("span");
      span.textContent = capitalize(type);
      span.classList.add("type", typeMap[type] || type);
      types.appendChild(span);
    });

    // 🔁 BOTTONE CONFRONTO
    const compareBtn = document.createElement("button");
    compareBtn.textContent = "🔁";
    compareBtn.classList.add("compare-btn");

    compareBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // 🔥 evita apertura dettaglio
      handleCompare(data, div);
    });

    div.appendChild(compareBtn);
    div.appendChild(idLabel);
    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(types);

    // 🔥 MINI BARRA
    if (statValue) {
      let value;

      if (statValue === "overall") {
        value = Object.values(data.stats).reduce((a, b) => a + b, 0);
      } else {
        value = data.stats[statValue];
      }

      let percent = statValue === "overall"
        ? Math.min((value / 450) * 100, 100)
        : Math.min((value / 100) * 100, 100);

      const wrapper = document.createElement("div");
      wrapper.classList.add("stat-wrapper");

      const container = document.createElement("div");
      container.classList.add("stat-bar-container");

      const bar = document.createElement("div");
      bar.classList.add("stat-bar");

      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.width = percent + "%";
      }, 50);

      // 🎨 COLORI
      if (statValue === "overall") {
        if (value <= 300) bar.style.background = "#ff1635";
        else if (value <= 360) bar.style.background = "#f39c12";
        else if (value <= 420) bar.style.background = "#27ae60";
        else bar.style.background = "#3498db";
      } else {
        if (value < 40) bar.style.background = "#ff1635";
        else if (value < 70) bar.style.background = "#f39c12";
        else if (value < 100) bar.style.background = "#27ae60";
        else bar.style.background = "#3498db";
      }

      const number = document.createElement("span");
      number.classList.add("stat-number");
      number.textContent = value;

      container.appendChild(bar);
      wrapper.appendChild(container);
      wrapper.appendChild(number);

      div.appendChild(wrapper);
    }

    pokedex.appendChild(div);
  });
}


// 🔁 CONFRONTO
function handleCompare(pokemon, element) {

  // 🔥 se clicchi di nuovo lo stesso → reset
  if (compareList.length === 1 && compareList[0].id === pokemon.id) {
    removeComparison();
    return;
  }

  if (compareList.length === 2) {
    compareList = [];
    document.querySelectorAll(".card").forEach(c => c.classList.remove("selected"));
  }

  compareList.push(pokemon);
  element.classList.add("selected");

  // confronto
  if (compareList.length === 1) {
    document.body.classList.add("compare-mode");
  }

  if (compareList.length === 2) {
    showComparison(compareList[0], compareList[1]);
  }
}

// MOSTRA CONFRONTO 
function showComparison(p1, p2) {
  removeComparison();

  const container = document.createElement("div");
  container.classList.add("compare-box");

  const overall1 = Object.values(p1.stats).reduce((a,b)=>a+b,0);
  const overall2 = Object.values(p2.stats).reduce((a,b)=>a+b,0);

  // COLORI NOMI
  let name1Class = "", name2Class = "";

   if (overall1 > overall2) {
    name1Class = "win";
    name2Class = "lose";
   } else if (overall2 > overall1) {
    name2Class = "win";
    name1Class = "lose";
   } else {
    name1Class = "draw-left";
    name2Class = "draw-right";
   }

  // COLORI STATISTICHE E OVERALL
  const allStats = [...Object.keys(p1.stats), "overall"];

   const statsHTML = allStats.map(stat => {

    const v1 = stat === "overall" ? overall1 : p1.stats[stat];
    const v2 = stat === "overall" ? overall2 : p2.stats[stat];

    let c1 = "", c2 = "";
    if (v1 > v2) {
      c1 = "win";
      c2 = "lose";
    } else if (v2 > v1) {
      c2 = "win";
      c1 = "lose";
    } else {
      c1 = "draw-left";
      c2 = "draw-right";
    }

    return `
      <div class="compare-row">
        <span class="${c1}">${v1}</span>
        <div class="compare-label">${stat === "overall" ? "Overall" : formatStatName(stat)}</div>
        <span class="${c2}">${v2}</span>
      </div>
    `;
  }).join("");

  //HEADER
  container.innerHTML = `
    <div class="compare-header">
      <h3 class="${name1Class}">${capitalize(p1.name)}</h3>
      <button id="closeCompare">✖</button>
      <h3 class="${name2Class}">${capitalize(p2.name)}</h3>
    </div>

    <div class="compare-body">
      ${statsHTML}
    </div>

    <canvas id="compareChart"></canvas>
  `;

  document.body.appendChild(container);
  document.getElementById("closeCompare").addEventListener("click", removeComparison);

  // 🔥 GRAFICO
  setTimeout(() => {
    const ctx = document.getElementById("compareChart");

    let color1, color2, bg1, bg2;

    if (overall1 > overall2) {
      color1="green"; bg1="rgba(0,200,0,0.2)";
      color2="red"; bg2="rgba(255,0,0,0.2)";
    } else if (overall2 > overall1) {
      color2="green"; bg2="rgba(0,200,0,0.2)";
      color1="red"; bg1="rgba(255,0,0,0.2)";
    } else {
      color1="#8fa3b8"; bg1="rgba(143,163,184,0.25)";
      color2="#5f5f5f"; bg2="rgba(95,95,95,0.25)";
    }

    new Chart(ctx, {
      type: "radar",
      data: {
        labels: Object.keys(p1.stats).map(s => formatStatName(s)),
        datasets: [
          {
            data: Object.values(p1.stats).map(v => Math.min(v,100)),
            borderColor: color1,
            backgroundColor: bg1,
            borderWidth: 2,
            borderDash: overall1===overall2 ? [0,0] : [], // SE VUOI TRATTEGGIATO, [5,5]
            pointRadius: 0
          },
          {
            data: Object.values(p2.stats).map(v => Math.min(v,100)),
            borderColor: color2,
            backgroundColor: bg2,
            borderWidth: 2,
            borderDash: overall1===overall2 ? [0,0] : [], // SE VUOI TRATTEGGIATO, [5,5]
            pointRadius: 0
          }
        ]
      },
      options: {
        plugins: { legend: { display: false }},
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: { display: false },
            grid: { color: "rgba(0,0,0,0.2)" },
            angleLines: { color: "rgba(0,0,0,0.2)" }
          }
        }
      }
    });
  }, 50);
}

// RIMUOVI CONFRONTO
function removeComparison() {
  const existing = document.querySelector(".compare-box");
  if (existing) existing.remove();

  compareList = [];
  document.body.classList.remove("compare-mode");

  document.querySelectorAll(".card").forEach(c =>
    c.classList.remove("selected")
  );
}


// 🔍 FILTRI
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedType = typeFilter.value;
  const sortValue = sortSelect.value;
  const statValue = statSort.value;
  const order = orderSort.value;

  const hasType = selectedType !== "";
  const hasSearch = searchValue.trim() !== "";

  startMessage.style.display = (hasType || hasSearch) ? "none" : "block";

  let filtered = allPokemon.filter(p => {
    const matchesName = p.name.toLowerCase().includes(searchValue);
    const matchesType = selectedType === "" || p.types.includes(selectedType);
    return matchesName && matchesType;
  });

  function applyOrder(a, b) {
    return order === "asc" ? a - b : b - a;
  }

  if (statValue) {
    if (statValue === "overall") {
      filtered.sort((a, b) => {
        const A = Object.values(a.stats).reduce((x, y) => x + y, 0);
        const B = Object.values(b.stats).reduce((x, y) => x + y, 0);
        return applyOrder(A, B);
      });
    } else {
      filtered.sort((a, b) => applyOrder(a.stats[statValue], b.stats[statValue]));
    }
  }

  renderPokemon(filtered, statValue);
}


// 🎧 EVENTI
searchInput.addEventListener("input", applyFilters);
typeFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);
statSort.addEventListener("change", applyFilters);
orderSort.addEventListener("change", applyFilters);


// 🚀 AVVIO
populateTypes();
renderPokemon(allPokemon);


// 🎯 ALLINEAMENTO MESSAGGIO
function alignMessageToFilter() {
  const filter = document.getElementById("typeFilter");
  const message = document.getElementById("startMessage");

  if (!filter || !message) return;

  const f = filter.getBoundingClientRect();
  const m = message.getBoundingClientRect();

  const shift = (f.left + f.width / 2) - m.right;

  message.style.transform = `translateX(${shift}px)`;
  message.style.opacity = "1";
}

window.addEventListener("load", alignMessageToFilter);
window.addEventListener("resize", alignMessageToFilter);
