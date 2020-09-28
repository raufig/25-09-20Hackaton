const formulario = document.getElementById("formulario");
const btnIngresar = document.getElementById("btn-ingresar");
const loginIngresarctual = document.getElementById("login-ingresar"),
  main = document.getElementById("main");
const sexo = document.getElementById("select-sexo");
const i1 = document.getElementById("iconombre"),
  i2 = document.getElementById("icoapellido"),
  i3 = document.getElementById("icoemail"),
  i4 = document.getElementById("iconocontraseña"),
  i5 = document.getElementById("iconosubir"),
  i6 = document.getElementById("hom"),
  i7 = document.getElementById("muj");

let e1 = document.getElementById("nombre"),
  e2 = document.getElementById("apellido"),
  e3 = document.getElementById("email"),
  e4 = document.getElementById("contraseña"),
  e5 = document.getElementById("contraseña2");


function subir(label) {
  let etiqueta = document.getElementById(label);
  etiqueta.style.top = "-20px";
}
function bajar(label, input, icon) {
  let etiqueta = document.getElementById(label);
  let inputC = document.getElementById(input);
  let icono = document.getElementById(icon);
  if (inputC.value === "") {
    etiqueta.style.top = "4px";
    inputC.style.borderBottomColor = "rgb(194, 7, 7)"; //color: rgb(158, 4, 4);
    etiqueta.style.color = "rgb(194, 7, 7)";
    icono.style.color = "rgb(194, 7, 7)";
  }
  if (inputC.value !== "") {
    icono.style.color = "#05618f";
    inputC.style.borderBottomColor = "#d1d1b477";
    etiqueta.style.color = "#000";
  }
}

function selectg(s, ic, hom, muj) {
  let select = document.getElementById(s);
  let icono = document.getElementById(ic);
  let hombre = document.getElementById(hom);
  let mujer = document.getElementById(muj);

  if (select.value === "") {
    select.style.borderBottomColor = "#cc0000";
    icono.style.display = "block";
    icono.style.color = "#cc0000";
    select.style.color = "#cc0000";
    hombre.style.display = "none";
    mujer.style.display = "none";
  } else {
    if (select.value === "masculino") {
      select.style.borderBottomColor = "#d1d1b477";
      select.style.color = "#000";
      icono.style.display = "none";
      mujer.style.display = "none";
      hombre.style.display = "block";
    }
    if (select.value === "femenino") {
      select.style.borderBottomColor = "#d1d1b477";
      select.style.color = "#000";
      icono.style.display = "none";
      mujer.style.display = "block";
      hombre.style.display = "none";
    }
  }
}

function bajarIconos() {
  e1.style.top = "4px";
  e2.style.top = "4px";
  e3.style.top = "4px";
  e4.style.top = "4px";
  e5.style.top = "4px";
}
function colorearIconos() {
  i1.style.color = "#000";
  i2.style.color = "#000";
  i3.style.color = "#000";
  i4.style.color = "#000";
  i5.style.color = "#000";
  i6.style.color = "#000";
  i7.style.color = "#000";
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  let nombre = document.getElementById("inombre");
  let usuario = document.getElementById("iapellido");
  let email = document.getElementById("iemail");
  let contraseña = document.getElementById("icontraseña");
  let repeticionContraseña = document.getElementById("icontraseña2");
  let sexo = document.getElementById("select-sexo");
  let error = document.getElementById("error");
  let errorc = document.getElementById("errorContra");
  let spinner = document.getElementById("spinner");
  let msjExito = document.getElementById("exito");
  if (
    nombre.value === "" ||
    usuario.value === "" ||
    email.value === "" ||
    contraseña.value === "" ||
    repeticionContraseña.value === "" ||
    sexo.value === ""
  ) {
    error.style.display = "block";
    let errorc = document.getElementById("errorContra");
    errorc.style.display = "none";
  } else {
    if (contraseña.value === repeticionContraseña.value) {
  
      let usuarios = localStorage['usuarios'] ? JSON.parse(localStorage['usuarios']) :[];
      usuarios.push({usuario:usuario.value,contraseña:contraseña.value});
      localStorage.setItem('usuarios',JSON.stringify(usuarios));
    
      let error = document.getElementById("error");
      bajarIconos();
      colorearIconos();
      error.style.display = "none";
      errorc.style.display = "none";
      spinner.style.display = "block";
      formulario.reset();

      setTimeout(() => {
        spinner.style.display = "none";
      }, 4000);
      setTimeout(() => {
        msjExito.style.display = "block";
      }, 4001);
      setTimeout(() => {
        msjExito.style.display = "none";
      }, 6000);
    } else {
      let errorc = document.getElementById("errorContra");
      errorc.style.display = "block";
      error.style.display = "none";
    }
  }
});

const faltanCampos = document.getElementById("faltan");
const datosIncorrectos = document.getElementById("contra-mala");
btnIngresar.addEventListener("click", () => {
  loginIngresarctual.style.top = "150px";
});
main.addEventListener("click", () => {
  loginIngresarctual.style.top = "-450px";
  setTimeout(() => loginIngresarctual.reset(), 1000);
});


loginIngresarctual.addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = document.getElementById("usuario-ingreso").value;
  const contraseña = document.getElementById("contraseña-ingreso").value;

  
  if (!usuario || !contraseña) {
    faltanCampos.style.display = "block";
  } else {

          let usuarios = JSON.parse(localStorage['usuarios']);
         let usuarioActual= usuarios.find(user=>user.usuario===usuario && user.contraseña===contraseña);

          if(!usuarioActual){
            datosIncorrectos.style.display='block';
            faltanCampos.style.display = "none";
          }else{
               localStorage.setItem('usuarioActual',usuarioActual.usuario);

           swal("Correcto!", `Bienvenido ${usuarioActual.usuario}!`, "success");
             loginIngresarctual.reset();
            setTimeout(()=>{
            window.location='./assets/pages/game.html';
          },2000) 
          }
     
  }
});
