document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchPokemon);
});

function searchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(pokemon => {
            // Update the elements directly
            document.querySelector('h1').textContent = `Pokémon Search - ${capitalizeFirstLetter(pokemon.name)}`;
            document.getElementById('height').textContent = `Height: ${pokemon.height}`;
            document.getElementById('weight').textContent = `Weight: ${pokemon.weight}`;
            document.getElementById('type').textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;
            
            // Update the image and show it
            const pokemonImage = document.getElementById('pokemonImage');
            pokemonImage.src = pokemon.sprites.front_default;
            pokemonImage.alt = pokemon.name;
            pokemonImage.style.display = 'block';
        })
        .catch(error => {
            // Reset to default state
            document.querySelector('h1').textContent = 'Pokémon Search';
            document.getElementById('height').textContent = 'Height:';
            document.getElementById('weight').textContent = 'Weight:';
            document.getElementById('type').textContent = 'Type:';
            
            // Hide the image
            const pokemonImage = document.getElementById('pokemonImage');
            pokemonImage.src = '';
            pokemonImage.alt = 'Pokémon Image';
            pokemonImage.style.display = 'none';
        });
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
