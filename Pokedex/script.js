const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("search");
const typeFilter = document.getElementById("typeFilter");
const sortSelect = document.getElementById("sort");
const startMessage = document.getElementById("startMessage");
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
  insetto: "bug",
  veleno: "poison",
  normale: "normal",
  folletto: "fairy",
  acciaio: "steel"
};

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];


// 🔥 TUTTI I TIPI (fissi)
function populateTypes() {
  const allTypes = [
    "normale", "fuoco", "acqua", "erba", "elettro", "ghiaccio",
    "lotta", "veleno", "terra", "volante", "psico", "insetto",
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
function renderPokemon(list) {
  pokedex.innerHTML = "";

  list.forEach(data => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.addEventListener("click", () => {
      window.location.href = `dettaglio.html?id=${data.id}`;
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

    const favBtn = document.createElement("button");
    favBtn.textContent = "⭐";

    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (favorites.includes(data.id)) {
        favorites = favorites.filter(id => id !== data.id);
      } else {
        favorites.push(data.id);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
      updateFavStyle(favBtn, data.id);
    });

    updateFavStyle(favBtn, data.id);

    div.appendChild(title);
    div.appendChild(img);
    div.appendChild(types);
    div.appendChild(favBtn);

    pokedex.appendChild(div);
  });
}


// ⭐ PREFERITI
function updateFavStyle(btn, id) {
  btn.style.color = favorites.includes(id) ? "gold" : "gray";
}


// 🔍 FILTRI
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedType = typeFilter.value;
  const sortValue = sortSelect.value;

  if (searchValue === "" && selectedType === "") {
    pokedex.innerHTML = "";
    startMessage.style.display = "block";
    noResults.style.display = "none";
    return;
  }

  startMessage.style.display = "none";

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

  if (sortValue === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered.sort((a, b) => a.id - b.id);
  }

  renderPokemon(filtered);
}


// 🔠 UTILS
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}


// 🎧 EVENTI
searchInput.addEventListener("input", applyFilters);
typeFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);


// 🚀 AVVIO
populateTypes();
