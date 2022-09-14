//Importamos las funciones del módulo api
import { setPokemon, setImage } from "./pokedex.js"


//Selector Formulario del cual capturaremos la id
const $form = document.querySelector('#form')
//Selector del icon de next pokemon
const $next = document.querySelector('#next-pokemon')
//Selector del icon de prev pokemon
const $prev = document.querySelector('#prev-pokemon')
const $input = document.querySelector('#input')
const $nextImage = document.querySelector('#next-image')
const $prevImage = document.querySelector('#prev-image')

const $pokedex = document.querySelector('#pokedex')


const $randomButton = document.querySelector('#random')

$form.addEventListener('submit', handleSubmit)
$next.addEventListener('click', handleNextPokemon)
$prev.addEventListener('click', handlePrevPokemon)
$randomButton.addEventListener('click', handleRandomPokemon)
$nextImage.addEventListener('click', handleNextImage)
$prevImage.addEventListener('click', handlePrevImage)


let activePokemon = null

//Función asyncrona, por ello el async
async function handleSubmit(event) {
    //prevent previene el reinicio de pagina con el submit
    event.preventDefault()
    $pokedex.classList.add('is-open')
    //Formateamos la data obtenida del input
    const form = new FormData($form)
    const id = form.get('id')
    activePokemon = await setPokemon(id);

}

async function handleNextPokemon(){
    const id = (activePokemon === null || activePokemon.id === 898) ? 1 : activePokemon.id +1 
    activePokemon = await setPokemon(id)
    $input.value = id
}

async function handlePrevPokemon(){
    const id = (activePokemon === null || activePokemon.id === 1) ? 898 : activePokemon.id -1 
    activePokemon = await setPokemon(id)
    $input.value = id
}

async function handleRandomPokemon(){
    let rand = Math.random() * 898;
    const rend = Math.floor(rand); // 99
    activePokemon = await setPokemon(rend)
    $input.value = rend
}

let activeSprite = 0

function handleNextImage() {
    if(activePokemon === null) return false
    if(activeSprite >= activePokemon.sprites.length - 1){
        activeSprite = 0
        return setImage(activePokemon.sprites[activeSprite])
    }
    activeSprite = activeSprite +1
    return setImage(activePokemon.sprites[activeSprite])
}


function handlePrevImage(){
    if(activePokemon === null) return false
    if(activeSprite <= 0){
        activeSprite = activePokemon.sprites.length - 1
        return setImage(activePokemon.sprites[activeSprite])

    }
    activeSprite = activeSprite -1
    return setImage(activePokemon.sprites[activeSprite])
}