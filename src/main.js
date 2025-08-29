// Estas dos funciones siempre las defino cuando trabajo con JS Vanilla y tengo que hacer gastantes gets del html, me ayudan a no repetir tanto los metodos.
const $ = (elem) => document.getElementById(elem);
const $$ = (elem) => document.querySelector(elem);

addEventListener('DOMContentLoaded', () => {
    // A penas cargue todo el contenido del HTML, me defino las variables/constantes que voy a necesitar para trabajar en la recoleccion de datos.
    const tipoCombustible = {
        nafta: 'nafta',
        gnc: 'Gas Natural Comprimido',
        diesel: 'Diesel',
        electrico: 'Electrico'
    }

    const viajesAvion = {
        noViajo: 0,
        de500a1000: 1500 / 2,
        de1000a2500: 3500 / 2,
        de2500a5000: 7500 / 2
    }

    const respuestasConsumoVehiculo = {
        cantidadKmAutoPorSemana: 0,
        tipoCombustible: null,
        cantidadKmColectivo: 0,
        cantidadKmBicicleta: 0,
        cantidadKmAvion: 0
    }

    const respuestasConsumo = {
        gastoRopa: 0,
        segundaMano: null,
        recicla: null,
        cantidadDispositivos: 0,
        renovacionDispositivos: null
    }

    const formularioVehiculo = $('formulario-vehiculo');

    // Acceso al evento 'submit' del formulario, y agrego la logica para recolectar los datos y mostrarlos en la consola.
    formularioVehiculo.addEventListener('submit', (e) => {
        e.preventDefault()
        respuestasConsumoVehiculo.cantidadKmAutoPorSemana = Number(formularioVehiculo.elements['cantidad-km-auto'].value);
        respuestasConsumoVehiculo.tipoCombustible = formularioVehiculo.elements['tipo-de-combustible'].value;
        respuestasConsumoVehiculo.cantidadKmColectivo = Number(formularioVehiculo.elements['cantidad-km-colectivo'].value);
        respuestasConsumoVehiculo.cantidadKmBicicleta = Number(formularioVehiculo.elements['cantidad-km-bicleta'].value);

        let avion = $$("input[name = 'avion']:checked").value;

        switch (avion) {
            case 'no-viajo':
                respuestasConsumoVehiculo.cantidadKmAvion = viajesAvion.noViajo;
                break;
            case 'poco':
                respuestasConsumoVehiculo.cantidadKmAvion = viajesAvion.de500a1000;
                break;
            case 'medio':
                respuestasConsumoVehiculo.cantidadKmAvion = viajesAvion.de1000a2500;
                break;
            case 'alto':
                respuestasConsumoVehiculo.cantidadKmAvion = viajesAvion.de2500a5000;
                break;
            default:
                alert('Valor de vuelos no aceptado');
        }

        console.log(respuestasConsumoVehiculo);
    }
    )

    const formularioConsumo = $('formulario-consumo');

    formularioVehiculo.addEventListener('submit', (e) => {
        e.preventDefault()
        respuestasConsumoVehiculo.cantidadKmAutoPorSemana = Number(formularioVehiculo.elements['cantidad-km-auto'].value);
        respuestasConsumoVehiculo.tipoCombustible = formularioVehiculo.elements['tipo-de-combustible'].value;
        respuestasConsumoVehiculo.cantidadKmColectivo = Number(formularioVehiculo.elements['cantidad-km-colectivo'].value);
        respuestasConsumoVehiculo.cantidadKmBicicleta = Number(formularioVehiculo.elements['cantidad-km-bicleta'].value);

        let avion = $$("input[name = 'avion']:checked").value;

        switch (avion) {
            case 'no-viajo':
                respuestasConsumoVehiculo.cantidadKmAvion = viajesAvion.noViajo;
                break;
            case 'poco':
                respuestasConsumoVehiculo.cantidadKmAvion = viajesAvion.de500a1000;
                break;
            case 'medio':
                respuestasConsumoVehiculo.cantidadKmAvion = viajesAvion.de1000a2500;
                break;
            case 'alto':
                respuestasConsumoVehiculo.cantidadKmAvion = viajesAvion.de2500a5000;
                break;
            default:
                alert('Valor de vuelos no aceptado');
        }

        console.log(respuestasConsumoVehiculo);
    }
    )

    formularioConsumo.addEventListener('submit', (e) => {
        e.preventDefault();

        // Guardar respuestas
        respuestasConsumo.gastoRopa = Number(formularioConsumo.elements['gasto-ropa'].value);
        respuestasConsumo.segundaMano = formularioConsumo.elements['segunda-mano'].value;

        let reciclaSeleccion = $$("input[name='recicla']:checked");
        if (reciclaSeleccion) {
            respuestasConsumo.recicla = reciclaSeleccion.value;
        } else {
            alert("Por favor selecciona una opción de reciclaje");
            return;
        }

        respuestasConsumo.cantidadDispositivos = Number(formularioConsumo.elements['cantidad-dispositivos'].value);
        respuestasConsumo.renovacionDispositivos = formularioConsumo.elements['renovacion-dispositivos'].value;

        console.log(respuestasConsumo);
    })
})