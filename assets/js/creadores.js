const puntajeCamilo= document.getElementById('puntaje-camilo');
const puntajeRaul= document.getElementById('puntaje-raul');
const puntajeJavier= document.getElementById('puntaje-javier');
const puntajeMichael= document.getElementById('puntaje-michael');
const usuarioActualLocal = localStorage['usuarioActual'];
const puntajesTodos = JSON.parse(localStorage['puntajes']);

const buscarPuntajeLocal = nombre=>{
    let puntaje = puntajesTodos.find(user=>user.usuario===nombre);
    return puntaje.puntaje;
 }

switch(usuarioActualLocal){
    case 'andres':puntajeCamilo.innerText='Puntaje: '+buscarPuntajeLocal('andres');break;
    case 'raul':puntajeRaul.innerText='Puntaje: '+buscarPuntajeLocal('raul');break;
    case 'javier':puntajeJavier.innerText='Puntaje: '+buscarPuntajeLocal('javier');break;
    case 'michael':puntajeMichael.innerText='Puntaje: '+buscarPuntajeLocal('michael');break;
}
let pc = puntajeCamilo.innerText.split(' ')[1];
let pr = puntajeRaul.innerText.split(' ')[1];
let pj = puntajeJavier.innerText.split(' ')[1];
let pm = puntajeMichael.innerText.split(' ')[1];

