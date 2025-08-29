const $ = (elem) => document.getElementById(elem);
const $$ = (elem) => document.querySelector(elem);

addEventListener('DOMContentLoaded', () => {
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


    const formularioVehiculo = $('formulario-vehiculo');

})