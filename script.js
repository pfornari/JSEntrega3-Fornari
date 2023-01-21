let usuario = document.getElementById('nombre').value;
let correo = document.getElementById('emailAddress').value;
let capital = document.getElementById('capital').value;
let tasa = document.getElementById('tasa').value;
let plazo = document.getElementById('plazo').value;

let btnCalcular = document.getElementById('calcular');
let btnMostrar = document.getElementById('mostrar');

let tblCalculo = document.querySelector('#lista-tabla tbody');

class Credito{
    nuevoCredito(usu, cor, cap, tas, pla) {
        const datosCredito={
            usuario: usu,
            correo: cor,
            capital: cap,
            tasa: tas,
            plazo: pla
        }
        this.guardarCredito(datosCredito);
    }

    guardarCredito(valoresCredito){
        let newCredito;
        newCredito=this.cargarCredito();
        newCredito.push(valoresCredito);
        localStorage.setItem('nCredito', JSON.stringify(valoresCredito));
    }

    cargarCredito(){
        let inicioCredito;
        if (localStorage.getItem('nCredito')==null){
            inicioCredito=[];
        }
        else {
            inicioCredito=JSON.parse(localStorage.getItem('nCredito'));
        }
        return inicioCredito;
    }
}

let nCredito=new Credito(usuario, correo, capital, tasa, plazo);

cargaEventos();

function cargaEventos() {
    btnCalcular=addEventListener('click', calcular);
    btnMostrar=addEventListener('click', (e) => {nCredito.cargarCredito(e)});
}

function calcular(e){
    e.preventDefault();
    calculoCuota(nCredito.capital, nCredito.tasa, nCredito.plazo);
    nCredito.guardarCredito();
}

function calculoCuota(c, t, p){
    let totalInteres=0
    let totalCapital = 0
    let parte1 = (Math.pow(1+t/100, p)*t/100);
    let parte2 = (Math.pow(1+t/100, p)-1);
    let cuota = c * parte1 / parte2;

    while(tblCalculo.firstChild){
        tblCalculo.removeChild(tblCalculo.firstChild);
    }

    for(let desde = 1; desde <= plazo; desde++){
        totalInteres = parseFloat(cuota*(tasa/100));
        totalCapital = cuota - totalInteres;
        valorCuota = parseFloat(cuota-totalCapital);
    
        console.log(desde);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${desde}</td>
            <td>${totalInteres.toFixed(2)}</td>
            <td>${totalCapital.toFixed(2)}</td>
            <td>${valorCuota.toFixed(2)}</td>
        `;
        tblCalculo.appendChild(row)
    }
}