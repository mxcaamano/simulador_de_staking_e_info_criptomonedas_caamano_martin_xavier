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
    filtroUSDT.forEach(el => {
        el.symbol = el.symbol.replace("USDT", "");
        el.priceChangePercent = parseFloat(el.priceChangePercent).toFixed(2);
        el.volume = parseFloat(el.volume);
        el.lastPrice = parseFloat(el.lastPrice);
        tabla += `<tr>
        <td id="${el.symbol}tic">${el.symbol}</td>
        <td id="${el.symbol}price">${el.lastPrice}</td>
        <td id="${el.symbol}%"><span id="${el.symbol}+-"></span>${el.priceChangePercent}%</td>
        <td>${el.volume.toFixed(2)}</td>
        <td>${(el.volume*el.lastPrice).toFixed(2)}</td>
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

// Funcion para ordenar tabla
function sortTable(tableClass, n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementsByClassName(tableClass)[0];
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.getElementsByTagName("TR");
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
                    var cmpX=isNaN(parseFloat(x.innerHTML))?x.innerHTML.toLowerCase():parseFloat(x.innerHTML);
                    var cmpY=isNaN(parseFloat(y.innerHTML))?y.innerHTML.toLowerCase():parseFloat(y.innerHTML);
                    cmpX=(cmpX=='-')?0:cmpX;
                    cmpY=(cmpY=='-')?0:cmpY;
            if (dir == "asc") {
                if (cmpX > cmpY) {
                    shouldSwitch= true;           
                    break;
                }
            } else if (dir == "desc") {
                if (cmpX < cmpY) {
                    shouldSwitch= true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount ++;      
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
    }