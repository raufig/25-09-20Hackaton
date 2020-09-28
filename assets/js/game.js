

const jugar = ()=>{
const imagen = document.getElementById("imagen");
const nombress = document.querySelectorAll('.btn-opcion');
const puntaje = document.getElementById('puntaje-span');


let imagenes = [0, 1, 2, 3].sort(function () { return Math.random() - 0.5 });
let iterador = 0;
imagen.src = `../img/${imagenes[iterador]}.png`;
let source = imagen.src.split('/')[10].split('.')[0]
localStorage.setItem('actual', source);
iterador++;


function siguiente() {
    imagen.style.filter = 'blur(10px)';
    if (iterador <= 3) {
        imagen.src = `../img/${imagenes[iterador]}.png`;
        let source = imagen.src.split('/')[10].split('.')[0]
        localStorage.setItem('actual', source);
        iterador++;
    }
    else {
        let nueva = [0, 1, 2, 3];
        let puntaje = JSON.parse(localStorage['puntajeActual']);
        
        let usuarioActual=localStorage['usuarioActual'];
        let puntajes = localStorage['puntajes'] ? JSON.parse(localStorage['puntajes']) : [];
        puntajes.push({usuario:usuarioActual,puntaje});
        localStorage.setItem('puntajes',JSON.stringify(puntajes));
        localStorage.removeItem('puntajeActual');
        imagenes = nueva.sort(function () { return Math.random() - 0.5 });
        iterador = 0;
        switch(puntaje){
            case 4:swal("Felicidades", `Puntaje perfecto ${puntaje}/4`, "success");break;
            case 3:swal("Muy bien", `Gran puntaje ${puntaje}/4`, "success");break;
            case 2:swal("Puedes mejorar", `Puntaje medio ${puntaje}/4`, "danger");break;
            case 1:swal("Eres malo", `Puntaje bajo ${puntaje}/4`, "success");break;
            case 0:swal("Dedicate a otra cosa", `Puntaje pésimo ${puntaje}/4`, "error");break;
            default: swal("DESASTROSO", `Puntaje pésimo ${puntaje}/4`, "error");break;       
        }
        setTimeout(()=>window.location='./creadores.html',1000);
        

    }
}
function comprobarImagen(e) {
    let intentos = localStorage['intentos'];
    let presionado = e.target.value;
    let actual = localStorage['actual'];

    if (!intentos) {
        if (presionado === actual) {
            imagen.style.filter = 'blur(0px)';
            puntaje.innerText = Number(puntaje.innerText)+1;
             let tiempo = 150-startTimer();
             localStorage.setItem('puntajeActual',puntaje.innerText);
             setTimeout(()=>siguiente(),1000);
           
        } else {
            imagen.style.filter = 'blur(3px)';
            localStorage.setItem('intentos', '1');
        }
    }
    if (intentos == '1') {
        if (presionado === actual) {
            imagen.style.filter = 'blur(0px)';
            puntaje.innerText = Number(puntaje.innerText)+1;
          
        } else {
            puntaje.innerText = Number(puntaje.innerText)-1;
        }
        localStorage.removeItem('intentos');
        let tiempo = 150-startTimer();
        localStorage.setItem('puntajeActual',puntaje.innerText);
        setTimeout(()=>{siguiente();startTimer();},1000);

    }
}

for (let i = 0; i < nombress.length; i++) {
    nombress[i].addEventListener('click', comprobarImagen);
}

/* FUNCION RAUL */
document.getElementById('tiempo').innerHTML =": " + 120; 
startTimer();

function startTimer() {
    let presentTime = document.getElementById('tiempo').innerHTML;
    let timeArray = presentTime.split(/[:]+/);
    let m = timeArray[0];
    let s = checkSecond((timeArray[1] - 1));
    if (s == 120) { m = m - 1 }
    if (m < 0) { swal("UPS!!", "Se te ha acabado el tiempo", "error");siguiente(); }
    //if(m<0){document.getElementById('puntaje-span').innertHTML = -1;}
    document.getElementById('tiempo').innerHTML =": " + s;
    setTimeout(startTimer, 1000);
    return s;
}
function checkSecond(sec) {
    if (sec < 10 && sec >= 0) { sec = "0" + sec };
    if (sec < 0) { sec = "30" };
    return sec;
}
};

const cambiar = document.getElementById("cambiar");
cambiar.addEventListener('click', jugar);

const reiniciarJuego = document.getElementById('reiniciar-juego');
reiniciarJuego.addEventListener('click',()=>{
    /* window.location.reload() */
    localStorage.removeItem('intentos');
    localStorage.removeItem('puntajeActual');
    document.getElementById('tiempo').innerHTML =": " + 120; 
    jugar(); 
   
    
});

