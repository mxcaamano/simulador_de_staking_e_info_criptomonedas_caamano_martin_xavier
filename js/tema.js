estiloBtnClick();

//Boton Cambio de Tema
const btntema = document.querySelector(".btn-tema");
const temaactual = localStorage.getItem("tema");
temaactual == "oscuro" ? document.body.classList.add("deer-theme-dark") : tema = "default";
btntema.addEventListener("click", function () {
  document.body.classList.toggle("deer-theme-dark");
  let tema = "default";
  document.body.classList.contains("deer-theme-dark") ? tema = "oscuro" : tema = "default";
  localStorage.setItem("tema", tema);
})

//Estilo Click en Botones
function estiloBtnClick(){
  const botones = document.getElementsByTagName('button');
  for (const btn of Array.from(botones)) {
      btn.addEventListener("click", ()=>{
          btn.style.cssText = 'background-color: #2bf8bb; color: black; border-color: #24584d;';
          setTimeout(function(){
              btn.removeAttribute('style');          
              }, 150);
      })
      }
  }