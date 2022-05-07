//CLASES

class Listacriptos {
    constructor(criptos)
    {
        this.criptos=criptos;
    }

    agregarcripto(...cripto)
    {
        this.criptos.push(...cripto);
    }

    licriptos()
    {
        console.log(this.criptos);
    }
}

class cripto  {
    constructor(ticker,nombre,apy,img,tipocripto,streamTicker)
    {
        this.ticker=ticker;
        this.nombre=nombre;
        this.apy=apy;
        this.img=img;
        this.tipocripto=tipocripto;
        this.streamTicker=streamTicker;
    }
    calculoStaking(plazo,importe)
    {       
            console.log(plazo);
            console.log(importe);            
            if(plazo>=1 && plazo<=365 && !isNaN(importe) && importe>0)
            {
                let imp=importe;
                let recompensaTotal = 0;
                for(let i = 1; i<=plazo; i++)
                {
                let recompensa = importe*this.apy/365;
                recompensaTotal += recompensa;
                importe += recompensa;
                // console.log(`Dia ${i}: Recompensa estimada: ${recompensa.toFixed(10)} ${this.ticker.toUpperCase()} - Importe acumulado: ${importe.toFixed(10)} ${this.ticker.toUpperCase()}`);            
                }
                // alert(`Recompensa total estimada en ${plazo} dias: ${recompensaTotal.toFixed(10)} ${this.ticker.toUpperCase()} - Para ver staking diario ver consola.`)                
                const resultado = document.querySelector(`#res${this.ticker}`);
                resultado.innerHTML=`<li class="list-unstyled fs-5 mt-3">Plazo: ${plazo} Días</li>
                                      <li class="list-unstyled fs-5 mt-2">Inversion: ${imp} ${this.ticker}</li>
                                      <li id="recompensa${this.ticker}" class="list-unstyled fs-5 mt-2">Recompensa: ${recompensaTotal.toFixed(10)} ${this.ticker}</li>
                                      </div>`;
                toastOK(`Stake Calculado! 👍 Presiona aquí para ver mas`,'3000',`#recompensa${this.ticker}`);
            }
            else
            {
                toastError("Ingrese correctamente los datos");
                setTimeout(function(){
                    toastError("Recuerde que puede ingresar un plazo maximo de 365 dias");
                }, 500);
                
            }
    }
}

// Carga de datos en clase y en array
const listacriptos = new Listacriptos([]);
const tipocripto = ["Bitcoin","Altcoin","Stablecoin","Token"];
const [b,alt,sta,tok] = tipocripto;
const dirlogo = '../assets/images/logos/';
const btc = new cripto("BTC","Bitcoin",0.035,dirlogo+"bitcoin.svg",b,"BTCUSDT");
const eth = new cripto("ETH","Ethereum",0.04,dirlogo+"ethereum.svg",alt,"ETHUSDT");
const dai = new cripto("DAI","DAI",0.13,dirlogo+"dailogo.svg",sta,"USDTDAI");
const axs = new cripto("AXS","Axie Infinty",0.05,dirlogo+"axslogo.svg",tok,"AXSUSDT");
const sand = new cripto("SAND","The Sandbox",0.045,dirlogo+"sandlogo.svg",tok,"SANDUSDT");
const ust = new cripto("UST","Terra USD",0.1947,dirlogo+"ustlogo.png",sta,"USTUSDT");
listacriptos.agregarcripto(btc,eth,dai,axs,sand,ust);
console.log("Criptomonedas disponibles:",...listacriptos.criptos);
const contenedor = document.getElementById("cripto");

//Calculo de Apy Maximo
let apymax = Math.max(...listacriptos.criptos.map((i) => i.apy));
let criptoapymax = listacriptos.criptos.find(i => {
    return i.apy === apymax
  })
console.log(apymax);
console.log(criptoapymax);

//Uso de Funciones del DOM
mostrarCriptos();
botonStake();
databtnStake();
setTimeout(function(){
  MostrarApyMax();
}, 2000);

//Websocket Criptos Stake en vivo
let streams = [
    "btcusdt@ticker", "ethusdt@ticker", "usdtdai@ticker",
    "axsusdt@ticker", "sandusdt@ticker", "ustusdt@ticker",
  ];

let ws = new WebSocket("wss://stream.binance.com:9443/ws/" + streams.join('/'));

ws.onmessage = function(evento) {
    try {
      let msgs = JSON.parse(evento.data);
      if (Array.isArray(msgs)) {
        for (let msg of msgs) {
          mostrarStreams(msg);
        }
      } else {
        mostrarStreams(msgs)
      }
    } catch (e) {
      console.log('Unknown message: ' + evento.data, e);
    }
  }

// Funciones del DOM
  function mostrarStreams(msg) {
    const stream = msg.s;
    document.getElementById('stream_' + stream).innerText = `${parseFloat(msg.c).toFixed(2)} USD`;
    document.getElementById('stream_%' + stream).style.color = msg.P > 0 ? '#00FF00' : msg.P == 0 ? '' : '#FF0000';
    document.getElementById('stream_%' + stream).style.transition = msg.P > 0 ? 'all 0.5s' : msg.P == 0 ? 'all 0.5s' : 'all 0.5s';
    document.getElementById('stream_%' + stream).innerText = msg.P > 0 ? ` ▲ ${parseFloat(msg.P).toFixed(2)}%` : msg.P == 0 ? `${parseFloat(msg.P).toFixed(2)}%` : ` ▼ ${parseFloat(msg.P).toFixed(2)}%`;
  }

  function mostrarCriptos()
  {
      const divcrypt = document.createElement("div");
  
      listacriptos.criptos.forEach((cripto)=>{
              
      divcrypt.innerHTML+=`<div id="${cripto.ticker}" class="col-sm-2 text-center my-4">
              <h3 class="mb-2">${cripto.nombre}</h3>
              <img id="${cripto.ticker}img" class="logo-crypto my-3" src=${cripto.img} width="100" height="100" alt=${cripto.nombre}>
              <li class="list-unstyled">Tipo: ${cripto.tipocripto}</li>
              <li id="stream_${cripto.streamTicker}" class="list-unstyled lead"> <img class="my-1" src="../assets/images/logos/spin.svg" width="25" height="25"> </li>
              <li id="stream_%${cripto.streamTicker}" class="list-unstyled lead"> <img src="../assets/images/logos/spin.svg" width="25" height="25"> </li>
              <li class="list-unstyled fs-4">Apy: ${(cripto.apy*100).toFixed(2)}%</li><br>
              <button id="${cripto.ticker}Stake" class="btn-stk" type="button" data-bs-toggle="collapse" data-bs-target="#datos${cripto.ticker}" aria-expanded="false" aria-controls="datos${cripto.ticker}">+</button>
              `
      });
      contenedor.appendChild(divcrypt);
  
  }
  
  function botonStake()
  {
      listacriptos.criptos.forEach((cripto)=>{
          
          const divcalc = document.getElementById(`${cripto.ticker}`);
                 
              divcalc.innerHTML+=`<div class="collapse" id="datos${cripto.ticker}">
              <div class="form-group my-4">
              <div class="col-sm-12">
              <input id="plazo${cripto.ticker}" name="name" type="number" placeholder="Plazo (Días)" class="form-control" min=1 max=365>
              </div>
              </div>
              <div class="form-group my-4">
              <div class="col-sm-12">
              <input id="importe${cripto.ticker}" name="name" type="number" placeholder="Importe" class="form-control" min=0>
              </div>
              </div>
              <button id="Simular${cripto.ticker}" class="btn-stk">Simular</button>
              <div id="res${cripto.ticker}"class="text-left"></div>
              </div>`
          contenedor.appendChild(divcalc);
      })   
  }
  
  function databtnStake()
  {
      listacriptos.criptos.forEach((cripto)=>{
          const imp = document.querySelector(`#importe${cripto.ticker}`);        
          imp.addEventListener("input", ()=>{
          let importe = imp.value;
          })
          const dias = document.querySelector(`#plazo${cripto.ticker}`);
          dias.addEventListener("input", ()=>{
          let plazo = dias.value;
          })
          const btncalc = document.querySelector(`#Simular${cripto.ticker}`);
          btncalc.addEventListener("click",()=>{
          cripto.calculoStaking(parseFloat(dias.value),parseFloat(imp.value));
          dias.value = null;
          imp.value = null;
          })
          const btncolaps = document.querySelector(`#${cripto.ticker}Stake`);
          function borrarStake(btncolaps,imp,dias){
              btncolaps.innerHTML = "+";
              imp.value=null; dias.value=null;
              document.getElementById(`res${cripto.ticker}`).innerHTML = "";
          }
          btncolaps.addEventListener("click", ()=>{
              btncolaps.innerHTML == "-" ? borrarStake(btncolaps,imp,dias) : btncolaps.innerHTML = "-";
              setTimeout(function(){
              document.getElementById(`plazo${cripto.ticker}`).focus();          
              }, 300);
          })
          
      })
  }
  
//Funcion Toastify Apy Maximo
function MostrarApyMax(){
 const toastApyMax = Toastify({
       text: `🤑 Hola, te recomendamos simular staking de ${criptoapymax.nombre} (${criptoapymax.ticker}) APY de ${(criptoapymax.apy*100).toFixed(2)}% Presiona aquí para ver mas 🤑`,
       duration: "-1",
       gravity: 'bottom',
       close: true,
       style: {
          background: "linear-gradient(to right, #2bf8bb, #4eaa93)",
          color: "black",
          boxShadow: '2px 2px 20px 2px #4eaa93',
          maxWidth: '70%'
       },
       onClick: ()=>{
          const btnapymax = document.getElementById(`${criptoapymax.ticker}Stake`);
          btnapymax.setAttribute("class","btn-stk");
          btnapymax.setAttribute("aria-expanded","false");
          btnapymax.innerText="-";
          const datosapymax = document.getElementById(`datos${criptoapymax.ticker}`);
          datosapymax.setAttribute("class","collapsing");
          setTimeout(function(){
             datosapymax.setAttribute("class","collapse show");
             document.getElementById(`plazo${criptoapymax.ticker}`).focus();         
             document.getElementById(`Simular${criptoapymax.ticker}`).scrollIntoView();   
        }, 100);
        toastApyMax.hideToast();
      },
    }).showToast();
 }