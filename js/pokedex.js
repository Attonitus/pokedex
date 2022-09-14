//Importamos las funciones del módulo api
import { getPokemon, getSpecies } from "./api.js"
import { createChart } from "./charts.js";
    
//Selector de la imagen donde se ubicará el pokemon
const $image= document.querySelector('#image')

//Función que cambia el url de la imagen en la pokedex
export function setImage(image){
    $image.src = image;
}

//Selector del parrafo donde se ubicará la descripción del pokemon
const $info = document.querySelector('#pokedex-info')

//Función que cambia la descripción de la pokedex
function setDescription(text){
    $info.textContent = text
}


const $light = document.querySelector('#light')

function speech(text){
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es'
    speechSynthesis.speak(utterance);
    $light.classList.add('is-animated')

    utterance.addEventListener('end', () => {
        $light.classList.remove('is-animated')

    })
}


export async function findPokemon(id) {
    //Obtenemos el pokemon y la especie
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    //Realizamos una función donde va a buscar dentro de flavor text
    //que language.name sea igual a es (español)
    const descripción = species.flavor_text_entries.find(flavor => flavor.language.name === 'es')
    const sprites = [pokemon.sprites.front_default]

    const stats = pokemon.stats.map(item => item.base_stat)
    //Iteracción para obtener todas las imagenes
    //Obtendriamos todas las imagenes del pokemon
    for(const item in pokemon.sprites){
        //Validamos en el array que las propiedades tengan imagenes, que la imagen default
        //no se repita y que las propiedades other y versions queden fuera
        //para solamente dejar las imagenes
        if(item !== 'front_default' && item !== 'other'&& item!=='versions' &&pokemon.sprites[item]){
            sprites.push(pokemon.sprites[item])
        }
    }
    return {
        sprites,
        descripción: descripción.flavor_text,
        id: pokemon.id,
        name: pokemon.name,
        stats,
    }

}

const $screen = document.querySelector('#screen')

function loader(isLoading = false) {
    const img = isLoading ? 'url(./img/loading.gif)' : ''
    $screen.style.backgroundImage = img
}

let activeChart = null
export async function setPokemon(id) {
    //Encender loader
    loader(true)
    const pokemon = await findPokemon(id)
    //Apagar loader
    loader(false)

    setImage(pokemon.sprites[0])
    setDescription(pokemon.descripción)
    speech(`${pokemon.name}. ${pokemon.descripción}`)
    if(activeChart instanceof Chart) {
        activeChart.destroy()
    }
    activeChart= createChart(pokemon.stats)
    return pokemon
}