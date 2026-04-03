const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("search");
const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sort");
const startMessage = document.getElementById("startMessage");
const statSort = document.getElementById("statSort");
const orderSort = document.getElementById("orderSort");
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

let hasInteracted = false;


// 🔥 TUTTI I TIPI
function populateTypes() {
  const allTypes = [
    "normale", "fuoco", "acqua", "erba", "elettro", "ghiaccio",
    "lotta", "veleno", "terra", "volante", "psico", "coleottero",
    "roccia", "spettro", "drago", "buio", "acciaio", "folletto"
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

    div.addEventListener("click", () => {
      window.location.href = `dettaglio.html#${data.id}`;
    });

    const img = document.createElement("img");
    img.src = data.image;

    const title = document.createElement("h3");
    title.textContent = capitalize(data.name);

    const types = document.createElement("div");

    data.types.forEach(type => {
      const span = document.createElement("span");
      span.textContent = capitalize(type);
      span.classList.add("type", typeMap[type] || type);
      types.appendChild(span);
    });

    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(types);

   // 🔥 MINI BARRA STAT
    if (statValue) {
      let value;

      if (statValue === "overall") {
        value = Object.values(data.stats)
          .reduce((a, b) => a + b, 0);
      } else {
        value = data.stats[statValue];
      }

      const wrapper = document.createElement("div");
      wrapper.classList.add("stat-wrapper");

      const barContainer = document.createElement("div");
      barContainer.classList.add("stat-bar-container");

      const bar = document.createElement("div");
      bar.classList.add("stat-bar");

      let percent;
       if (statValue === "overall") {
         percent = Math.min((value / 450) * 100, 100); //basta aumentare questo valore in futuro
       } else {
         percent = Math.min((value / 100) * 100, 100); //same shit af
       }
       bar.style.width = "0%";
       setTimeout(() => {
         bar.style.width = percent + "%";
       }, 50);

   // 🔥 COLORI
   if (statValue === "overall") {
      if (value <= 300) {
        bar.style.background = "#e74c3c";
      } else if (value <= 360) {
        bar.style.background = "#f39c12";
      } else if (value <= 420) {
        bar.style.background = "#27ae60";
      } else {
        bar.style.background = "#3498db";
      }
    } else {
      if (value < 40) {
        bar.style.background = "#e74c3c";
      } else if (value < 70) {
        bar.style.background = "#f39c12";
      } else if (value < 100) {
        bar.style.background = "#27ae60";
      } else {
        bar.style.background = "#3498db";
      }
    }

      const number = document.createElement("span");
      number.classList.add("stat-number");
      number.textContent = value;

      barContainer.appendChild(bar);
      wrapper.appendChild(barContainer);
      wrapper.appendChild(number);

      div.appendChild(wrapper);
    }

    pokedex.appendChild(div);
  });
}

// 🔍 FILTRI
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedType = typeFilter.value;
  const sortValue = sortSelect.value;
  const statValue = statSort.value;
  const order = orderSort.value; 

  const hasType = typeFilter.value !== "";
  const hasSearch = searchInput.value.trim() !== "";

  if (hasType || hasSearch) {
    startMessage.style.display = "none";
  } else {
    startMessage.style.display = "block";
  }

  let filtered = allPokemon.filter(p => {
    const matchesName = p.name.toLowerCase().includes(searchValue);
    const matchesType = selectedType === "" || p.types.includes(selectedType);
    return matchesName && matchesType;
  });

  if (filtered.length === 0) {
    pokedex.innerHTML = "";
    noResults.style.display = "block";
    return;
  } else {
    noResults.style.display = "none";
  }

  function applyOrder(a, b) {
  return order === "asc" ? a - b : b - a;
}

 if (statValue) {
  if (statValue === "overall") {
    filtered.sort((a, b) => {
      const totalA = Object.values(a.stats).reduce((x, y) => x + y, 0);
      const totalB = Object.values(b.stats).reduce((x, y) => x + y, 0);
      return applyOrder(totalA, totalB);
    });
  } else {
    filtered.sort((a, b) => {
      return applyOrder(a.stats[statValue], b.stats[statValue]);
    });
  }
} else {
  if (sortValue === "name") {
    filtered.sort((a, b) => {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  } else {
    filtered.sort((a, b) => {
      return applyOrder(a.id, b.id);
    });
  }
}

 renderPokemon(filtered, statSort.value);
}


// 🔠 UTILS
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// 🔎 AUTOCOMPLETE
function showSuggestions(value) {
  suggestionsBox.innerHTML = "";

  if (value.length < 2) return;

  const filtered = allPokemon.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  filtered.slice(0, 5).forEach(p => {
    const div = document.createElement("div");
    div.classList.add("suggestion-item");
    div.textContent = capitalize(p.name);

    div.addEventListener("click", () => {
      window.location.href = `dettaglio.html#${p.id}`;
    });

    suggestionsBox.appendChild(div);
  });
}


// 🎧 EVENTI
searchInput.addEventListener("input", () => {
  hasInteracted = true;
  const value = searchInput.value.toLowerCase();
  applyFilters();
  showSuggestions(value);
});

typeFilter.addEventListener("change", () => {
  hasInteracted = true;
  applyFilters();
});

sortSelect.addEventListener("change", () => {
  hasInteracted = true;
  applyFilters();
});

statSort.addEventListener("change", () => {
  sortSelect.value = "id"; // reset
  hasInteracted = true;
  applyFilters();
});

orderSort.addEventListener("change", () => {
  applyFilters();
});

// 🚀 AVVIO
populateTypes();
renderPokemon(allPokemon);

document.addEventListener("click", (e) => {
  if (!suggestionsBox.contains(e.target) && e.target !== searchInput) {
    suggestionsBox.innerHTML = "";
  }
});

// ALLINEAMENTO MESSAGGIO
function alignMessageToFilter() {
  const typeFilter = document.getElementById("typeFilter");
  const message = document.getElementById("startMessage");

  if (!typeFilter || !message) return;

  const filterRect = typeFilter.getBoundingClientRect();
  const messageRect = message.getBoundingClientRect();

  // centro del filtro
  const filterCenter = filterRect.left + filterRect.width / 2;

  // posizione della freccia (fine del messaggio)
  const arrowX = messageRect.right;

  // calcolo spostamento
  const shift = filterCenter - arrowX;

  // applico solo uno spostamento orizzontale
  message.style.transform = `translateX(${shift}px)`;

  // RICOMPARE, TA-DAAAAAAAAN
  message.style.opacity = "1"; 
}

// aggiorna posizione
window.addEventListener("load", alignMessageToFilter);
window.addEventListener("resize", alignMessageToFilter);
