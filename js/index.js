//Importamos las funciones del módulo api
import { getPokemon, getSpecies } from "./api.js"

//Selector Formulario del cual capturaremos la id
const $form = document.querySelector('#form')

//Selector de la imagen donde se ubicará el pokemon
const $image= document.querySelector('#image')

//Selector del parrafo donde se ubicará la descripción del pokemon
const $info = document.querySelector('#pokedex-info')

//Función asyncrona, por ello el async
$form.addEventListener('submit', async (event) =>{
    //prevent previene el reinicio de pagina con el submit
    event.preventDefault()
    //Formateamos la data obtenida del input
    const form = new FormData($form)
    const id = form.get('id')
    //Obtenemos el pokemon y la especie
    const pokemon = await getPokemon(id)
    const species = await getSpecies(id)
    //Realizamos una función donde va a buscar dentro de flavor text
    //que language.name sea igual a es (español)
    const descripción = species.flavor_text_entries.find(flavor => flavor.language.name === 'es')
    $info.textContent = descripción.flavor_text
    $image.src = pokemon.sprites.front_default
    console.log(descripción) //Obtenemos lo escrito en el input
})