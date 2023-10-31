
const pokemonID = document.querySelector('.pokemon-id');
const pokemonName = document.querySelector('.pokemon-name');
const pokemonImage = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const pokemonSearch = document.querySelector('.pokemon-search');
const pokemonNext = document.querySelector('.button-next');
const pokemonPrevious = document.querySelector('.button-prev');

let searchResults = 1

async function fetchPokemon(pokemon){
    const APIResponde = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(APIResponde.status === 200){
        const data = await APIResponde.json()
        return data
    }
}

async function updatePokemon(pokemon){
    
    pokemonName.innerHTML = 'Carregando...'
    pokemonID.innerHTML = ''

    const data = await fetchPokemon(pokemon)
    
    if(data){
        pokemonID.innerHTML = data.id
        pokemonName.innerHTML = data.name
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    }else{
        pokemonID.innerHTML = ''
        pokemonName.innerHTML = 'Não encontrado'
        pokemonImage.src = 'https://icons.iconarchive.com/icons/iconoir-team/iconoir/256/emoji-sad-icon.png'
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault()
    updatePokemon(pokemonSearch.value.toLowerCase())
    // pokemonSearch.value = ''
})

pokemonNext.addEventListener('click', () => {
    
    if(!isNaN(parseInt(pokemonSearch.value))){
        searchResults= parseInt(pokemonSearch.value)
    }
    searchResults += 1
    pokemonSearch.value = searchResults
    updatePokemon(searchResults)
})

pokemonPrevious.addEventListener('click', () => {
    
    if(!isNaN(parseInt(pokemonSearch.value)) && parseInt(pokemonSearch.value) > 1){
        searchResults= parseInt(pokemonSearch.value)
        searchResults -= 1
        pokemonSearch.value = searchResults
        updatePokemon(searchResults)
    }
    
})
updatePokemon(searchResults)