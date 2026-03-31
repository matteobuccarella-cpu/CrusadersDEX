const pokedex = document.getElementById("pokedex");
const searchInput = document.getElementById("search");
const typeFilter = document.getElementById("typeFilter");
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
const sortSelect = document.getElementById("sort");

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

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
    title.textContent = data.name;

    const types = document.createElement("div");
    data.types.forEach(type => {
      const span = document.createElement("span");
      span.textContent = type; // italiano visibile
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

function updateFavStyle(btn, id) {
  btn.style.color = favorites.includes(id) ? "gold" : "gray";
}

function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedType = typeFilter.value;
  const sortValue = sortSelect.value;

  let filtered = allPokemon.filter(p => {
    const matchesName = p.name.includes(searchValue);
    const matchesType = selectedType === "" ||
      p.types.includes(selectedType);

    return matchesName && matchesType;
  });

  if (sortValue === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filtered.sort((a, b) => a.id - b.id);
  }

  renderPokemon(filtered);
}

searchInput.addEventListener("input", applyFilters);
typeFilter.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

// AVVIO
renderPokemon(allPokemon);
