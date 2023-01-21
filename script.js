class Credito{
    asignarCredito(usuario, correo, capital, tasa, plazo) {
        const infoCredito={
            usuario: usuario,
            correo: correo,
            capital: capital,
            tasa: tasa,
            plazo: plazo
        }
        this.guardarCredito(infoCredito);
    }

    guardarCredito(infoCredito){
        let nCredito;
        nCredito=this.obtenerCredito();
        nCredito.push(infoCredito);
        localStorage.setItem('nCredito', JSON.stringify(nCredito));
    }

    obtenerCredito(){
        let creditoLS;
        if (localStorage.getItem('nCredito')==null){
            creditoLS=[];
        }
        else {
            creditoLS=JSON.parse(localStorage.getItem('nCredito'));
        }
        return creditoLS;
    }

    calcularCuota(capital, tasa, plazo){
        let totalInteres = 0;
        let totalCapital = 0;
        let parte1 = (Math.pow(1+tasa/100, plazo)*tasa/100);
        let parte2 = (Math.pow(1+tasa/100, plazo)-1);
        let cuota = capital * parte1 / parte2;

        tblCalculos.hidden = false;
        while(tblCalculos.firstChild){
            tblCalculos.removeChild(tblCalculos.firstChild);
        }

        for(let desde = 1; desde <= plazo; desde++){
            totalInteres = parseFloat(capital*(tasa/100));
            totalCapital = cuota-totalInteres;
            capital = parseFloat(capital-totalCapital);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${desde}</td>
                <td>${cuota.toFixed(2)}</td>
                <td>${totalCapital.toFixed(2)}</td>
                <td>${totalInteres.toFixed(2)}</td>
                <td>${capital.toFixed(2)}</td>
            `;
            tblCalculos.appendChild(row)
        }
    }

    mostrarUsuarios(e){
        e.preventDefault();
        let creditoLS = JSON.parse(localStorage.getItem('nCredito'));
        if (creditoLS==null){
            Swal.fire('No hay datos cargados')
        }
        else {
            tblResultados.hidden = false;
            while(tblResultados.firstChild){
                tblResultados.removeChild(tblResultados.firstChild);
            }
            creditoLS.forEach(credito => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${credito.usuario}</td>
                <td>${credito.correo}</td>
                <td>${credito.capital}</td>
                <td>${credito.tasa}</td>
                <td>${credito.plazo}</td>
            `;
            tblResultados.appendChild(row);
            })
        }
        
    }

    limpiaCalculo(e){
        e.preventDefault();
        tblCalculos.hidden = true;
        while(tblCalculos.firstChild){
            tblCalculos.removeChild(tblCalculos.firstChild);
        }
        tblResultados.hidden = true;
        while(tblResultados.firstChild){
            tblResultados.removeChild(tblResultados.firstChild);
        }
        nombre.value = "";
        correo.value = "";
        capital.value = "";
        tasa.value = "";
        plazo.value = "";
    }

    verificar(e){
        e.preventDefault();
        let usuario = document.getElementById('nombre').value;
        let correo = document.getElementById('correo').value;
        let capital = document.getElementById('capital').value;
        let tasa = document.getElementById('tasa').value;
        let plazo = document.getElementById('plazo').value;
        if (usuario=='' || correo=='' || capital=='' || tasa=='' || plazo==''){
             Swal.fire('Por favor, ingresar todos los datos requeridos');
        }
        else {
            creditoNuevo.asignarCredito(usuario, correo, capital, tasa, plazo);
            creditoNuevo.calcularCuota(capital, tasa, plazo);
        }
    }
}

let creditoNuevo=new Credito();

let btnCalcular = document.getElementById('calcular').addEventListener('click',creditoNuevo.verificar);
let btnMostrar = document.getElementById('mostrar').addEventListener('click', creditoNuevo.mostrarUsuarios);
let btnLimpiar = document.getElementById('limpiar').addEventListener('click', creditoNuevo.limpiaCalculo);

let tblCalculo = document.querySelector('#tblCalculos tbody');
let tblCreditos = document.querySelector('#tblResultados tbody');