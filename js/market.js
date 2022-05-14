// Fetch de API de precios Binance
let url = 'https://api.binance.com/api/v3/ticker/24hr'
fetch(url)
    .then( respuesta => respuesta.json() )
    .then( datos => mostrarData(datos))
    .catch( e => console.log(e))

const mostrarData = (data)=>{
    console.log(data)
    const filtroUSDT = data.filter((el) => el.symbol.endsWith("USDT") && parseFloat(el.lastPrice) > 0)
    console.log(filtroUSDT);
    let tabla = ''
    filtroUSDT.sort((el1, el2) => el1.volume*el1.lastPrice > el2.volume*el2.lastPrice ? -1 : el1.volume*el1.lastPrice < el2.volume*el2.lastPrice ? 1 : 0);
    filtroUSDT.forEach(el => {
        el.symbol = el.symbol.replace("USDT", "");
        el.priceChangePercent = parseFloat(el.priceChangePercent).toFixed(2);
        el.volume = parseFloat(el.volume);
        el.lastPrice = parseFloat(el.lastPrice);
        tabla += `<tr>
        <td id="${el.symbol}tic">${el.symbol}</td>
        <td id="${el.symbol}price">${el.lastPrice}</td>
        <td id="${el.symbol}%"><span id="${el.symbol}+-"></span>${el.priceChangePercent}%</td>
        <td>${el.volume.toLocaleString("en-US")}</td>
        <td>${(el.volume*el.lastPrice).toLocaleString("en-US")}</td>
        </tr>`
    })
    document.getElementById('data').innerHTML = tabla;
    document.getElementById('SVGcarga').remove();
    filtroUSDT.forEach(el => {
    document.getElementById(el.symbol + 'price').style.color = el.lastPrice > el.openPrice ? '#00FF00' : el.lastPrice == el.openPrice ? '' : '#FF0000';
    document.getElementById(el.symbol + '%').style.color = el.priceChangePercent > 0 ? '#00FF00' : el.priceChangePercent == 0 ? '' : '#FF0000';
    document.getElementById(el.symbol + "+-").innerText = el.priceChangePercent > 0 ? ` ▲ ` : el.priceChangePercent == 0 ? `` : ` ▼ `;
    })

}