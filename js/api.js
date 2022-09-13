//Endpoint
const BASE_API = 'https://pokeapi.co/api/v2/'

export async function getPokemon(id){
    //obtener la respuesta del api con base al id
    // fetch es una promesa por tanto se le coloca el await
    const response = await fetch(`${BASE_API}pokemon/${id}/`)
    //Convertir esa respuesta en una json
    //Sigue siendo una promesa, await
    //TODO: Validar errores
    const pokemonData = await response.json()
    //Si está todo correcto, entonces regresamos esa data
    return pokemonData

}

export async function getSpecies(id){
    //obtener la respuesta del api con base al id
    // fetch es una promesa por tanto se le coloca el await
    const response = await fetch(`${BASE_API}pokemon-species/${id}/`)
    //Convertir esa respuesta en una json
    //Sigue siendo una promesa, await
    //TODO: Validar errores
    const pokemonData = await response.json()
    //Si está todo correcto, entonces regresamos esa data
    return pokemonData

}