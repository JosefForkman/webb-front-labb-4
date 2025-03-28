const pokemonContainer = document.querySelector(".pokemon-bord ul");
const pokemonButton = document.querySelector(".pokemon-bord button");

(async function () {
    const links = dashboardData.pokemonLinks.length > 0 ? dashboardData.pokemonLinks : await getPokemonLinksFormePokeAPI();
    const pokemons = await fetchPokemon(links);
    renderPokemonList(pokemons);
})();

pokemonButton.addEventListener("click", async () => {
    const links = await getPokemonLinksFormePokeAPI();
    const pokemons = await fetchPokemon(links);
    renderPokemonList(pokemons);
});

/**
 * Get random pokemon links from the PokeAPI
 * @param {number} size
 * @returns {Promise<string[]>}
 */
async function getPokemonLinksFormePokeAPI(size = 10) {
    const links = [];
    const responseCount = await fetch("https://pokeapi.co/api/v2/pokemon/");
    const count = (await responseCount.json()).count;

    if (!responseCount.ok) {
        return [];
    }

    const stat = randomNumberMinMax(1, count - size);

    for (let i = stat; i < stat + size; i++) {
        links.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }

    dashboardData.pokemonLinks = links;
    updateDashbordLocalStorge();

    return links;
}

/**
 * Fetches pokemon from the PokeAPI using the provided links
 * @param {string[]} links
 * @returns {Promise<Pokemon[]>}
 */
async function fetchPokemon(links) {
    const pokemons = links.map(async (link) => {
        const response = await fetch(link);

        if (!response.ok) {
            return;
        }

        const data = await response.json();

        const attack = data.stats.find((stat) => stat.stat.name === "attack");
        const hp = data.stats.find((stat) => stat.stat.name === "hp");

        return {
            name: data.name,
            image: data.sprites.front_default,
            attack,
            hp,
        };
    });

    return Promise.all(pokemons);
}

/**
 * Renders the list of pokemons to the DOM
 * @param {Pokemon[]} pokemons
 */
function renderPokemonList(pokemons) {
    pokemonContainer.innerHTML = "";
    pokemons.forEach((pokemon) => {
        const pokemonElement = document.createElement("li");
        pokemonElement.innerHTML = `
        <img
        src="${pokemon.image}"
        alt=${pokemon.name} />
        <p><b>${pokemon.name}</b></p>
        <span>Attack: ${pokemon.attack.base_stat}</span>
        <span>HP: ${pokemon.hp.base_stat}</span>
        `;
        pokemonContainer.appendChild(pokemonElement);
    });
}
