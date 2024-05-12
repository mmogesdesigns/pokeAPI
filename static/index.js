async function fetchData(event) {
  event.preventDefault(); // Prevent the form from submitting 
  const pokeName = document
    .getElementById("pokeName")
    .value.toLowerCase()
    .trim();
  if (pokeName) {
    const pokemonData = await fetchPokemonData(pokeName);
    if (pokemonData) {
      displayPokemon(pokemonData);
    } else {
      alert("Failed to fetch Pokemon data.");
    }
  } else {
    alert("Please enter a Pokemon name.");
  }
}

async function fetchPokemonData(pokeName){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
    if (!response.ok){
        throw new Error('Failed to fetch data');
    }
    
    const pokemonData = await response.json();
    return pokemonData;
}

async function displayPokemon(pokeData){
    const html = `
    <div class="card">
            <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}">
                <div>
                    <h1>${pokeData.name}</h1>
                    <p>Abilities: ${pokeData.abilities.map(ability => ability.ability.name).join(', ')}
                        <br>Type:${pokeData.types.map(type => type.type.name).join(', ')}
                        <br>Stats: ${pokeData.stats.map(stat =>`${stat.stat.name}: ${stat.base_stat}`).join(', ')}
                    </p>

                    
                </div>
        
        </div>`;
        const div = document.getElementsByClassName("search-poke")[0]
        div.insertAdjacentHTML('beforeend', html)
}

// document.addEventListener("DOMContentLoaded", () => {
//   // Assuming there's a button with ID 'fetchButton' and an image element with ID 'pokeSprite'
//   const fetchButton = document.getElementById("fetchButton");
//   fetchButton.addEventListener("click", async () => {
//     const pokemonName = document
//       .getElementById("pokeName")
//       .value.toLowerCase()
//       .trim();
//     if (pokemonName) {
//       const pokemonData = await fetchPokemonData(pokemonName);
//       if (pokemonData) {
//         //  image source to show the Pokemon sprite and display it
//         const pokeSprite = document.getElementById("pokeSprite");
//         pokeSprite.src = pokemonData.sprites.front_default;
//         pokeSprite.style.display = "block";

//       } else {
//         // Handle the case where Pokemon data couldn't be fetched
//         alert("Failed to fetch Pokemon data.");
//       }
//     } else {
//       alert("Please enter a Pokemon name.");
//     }
//   });
// });

// async function fetchPokeData(query){
//     const response = await fetch(
//       `https://pokeapi.co/api/v2/pokemon/${query}`
//     );
//     console.log(response)
//     return await response.json()
// }
// async function fetchData(event){
//     event.preventDefault();
//     const search = event.target.elements.pokeName.value;
//     const result = await fetchPokeData(search)
//     console.log(result)
// }

// async function fetchData(event){
//     try{

//         const pokeName = document.getElementById("pokeName").value.toLowerCase();
//         const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
//         ;
//         console.log("Fetching URL:", url)
//         const response = await fetch(url)

//         if (!response.ok){
//             throw new Error("Could not fetch resource");
//         }
//         const data = await response.json();
//         console.log("Fetched data:", data)
//     }
//     catch(error){
//         console.log(error);
//     }
// }
