// Estas dos funciones siempre las defino cuando trabajo con JS Vanilla y tengo que hacer gastantes gets del html, me ayudan a no repetir tanto los metodos.
const $ = (elem) => document.getElementById(elem);
const $$ = (elem) => document.querySelector(elem);

addEventListener('DOMContentLoaded', () => {
    // A penas cargue todo el contenido del HTML, me defino las variables/constantes que voy a necesitar para trabajar en la recoleccion de datos.
    const formularioTransporte = $('formulario-Transporte');
    const formularioConsumo = $('formulario-consumo');
    const formularioVivienda = $('formulario-vivienda');
    const formularioAlimentacion = $('formulario-alimentacion');

    const viajesAvion = {
        noViajo: 0,
        de500a1000: 1500 / 2,
        de1000a2500: 3500 / 2,
        de2500a5000: 7500 / 2
    }

    const respuestasConsumoTransporte = {
        cantidadKmAutoPorDia: 0,
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

    const respuestasVivienda = {
        consumoElectrico: 0,
        tipoEnergia: null,
        consumoGas: 0,
        otrosCombustibles: "",
        tamanoVivienda: 0,
        personasHogar: 1
    }

    const respuestasAlimentacion = {
        dietaAnimal: null,
        alimentosLocales: null,
        gastoAlimentacion: 0,
        comidasCarne: 0
    }

    const factoresDeEmisionPromedios = {
        Transporte: {
            nafta: 0.192,
            gnc: 0.166,
            diesel: 0.171,
            electrico: 0.05
        },
        colectivo: 0.089,
        avion: 0.128,
        bicicleta: 0,
        electricidad: {
            renovable: 0.05,
            mixta: 0.15
        },
        gas: 2.0,
        ropa: 20,
        dispositivo: 200,
        carne: 27,
        pescado: 6,
        dietaAnimal: {
            alto: 3000,
            medio: 1500,
            bajo: 500
        }
    }

    // Defino las funciones que calculan el total de emisiones en base a los datos (devuelve las emisiones mensuales)
    function calcularTransporte() {
        let total = 0;
        // Si el tipo de combustible es !null se calcula el total dependiendo el tipo de combustible
        if (respuestasConsumoTransporte.tipoCombustible) {
            total += respuestasConsumoTransporte.cantidadKmAutoPorDia * factoresDeEmisionPromedios.Transporte[respuestasConsumoTransporte.tipoCombustible];
        }
        total += respuestasConsumoTransporte.cantidadKmColectivo * factoresDeEmisionPromedios.colectivo;
        total += respuestasConsumoTransporte.cantidadKmBicicleta * factoresDeEmisionPromedios.bicicleta;
        total += (respuestasConsumoTransporte.cantidadKmAvion * factoresDeEmisionPromedios.avion) / 365;
        return total * 30;
    }

    function calcularConsumo() {
        let total = 0;

        // Emisiones por ropa aproximados kg CO2e por cada $100 gastados
        if (respuestasConsumo.gastoRopa > 0) {
            total += (respuestasConsumo.gastoRopa / 100) * factoresDeEmisionPromedios.ropa;
        }

        // Emisiones por dispositivos electrónicos
        if (respuestasConsumo.cantidadDispositivos > 0) {
            total += respuestasConsumo.cantidadDispositivos * factoresDeEmisionPromedios.dispositivo;
        }

        // Ajuste por segunda mano (reduce impacto)
        if (respuestasConsumo.segundaMano === "si") {
            total *= 0.7; // reducimos un 30%
        }

        // Ajuste por reciclaje (reduce impacto)
        if (respuestasConsumo.recicla === "si") {
            total *= 0.9; // reducimos un 10%
        }

        return total;
    }

    function calcularVivienda() {
        let total = 0;

        if (respuestasVivienda.consumoElectrico > 0) {
            let factorElectrico = factoresDeEmisionPromedios.electricidad;
            // Ajuste según tipo de energía
            if (respuestasVivienda.tipoEnergia === 'Renovable') factorElectrico = factoresDeEmisionPromedios.electricidad.renovable;
            else if (respuestasVivienda.tipoEnergia === 'Mixta') factorElectrico = factoresDeEmisionPromedios.electricidad.mixta;
            total += respuestasVivienda.consumoElectrico * factorElectrico;
        }

        if (respuestasVivienda.consumoGas > 0) {
            total += respuestasVivienda.consumoGas * factoresDeEmisionPromedios.gas;
        }

        return total;
    }


    // Accedo al evento 'submit' de los formularios, y agrego la logica para recolectar los datos, luego los muestro por consola.

    formularioTransporte.addEventListener('submit', (e) => {
        e.preventDefault()
        respuestasConsumoTransporte.cantidadKmAutoPorDia = Number(formularioTransporte.elements['cantidad-km-auto'].value * 4);

        respuestasConsumoTransporte.tipoCombustible = formularioTransporte.elements['tipo-de-combustible'].value;

        respuestasConsumoTransporte.cantidadKmColectivo = Number(formularioTransporte.elements['cantidad-km-colectivo'].value * 31);
        respuestasConsumoTransporte.cantidadKmBicicleta = Number(formularioTransporte.elements['cantidad-km-bicleta'].value);

        let avion = $$("input[name = 'avion']:checked").value;

        switch (avion) {
            case 'no-viajo':
                respuestasConsumoTransporte.cantidadKmAvion = viajesAvion.noViajo;
                break;
            case 'poco':
                respuestasConsumoTransporte.cantidadKmAvion = viajesAvion.de500a1000;
                break;
            case 'medio':
                respuestasConsumoTransporte.cantidadKmAvion = viajesAvion.de1000a2500;
                break;
            case 'alto':
                respuestasConsumoTransporte.cantidadKmAvion = viajesAvion.de2500a5000;
                break;
            default:
                alert('Valor de vuelos no aceptado');
        }

        if (respuestasConsumoTransporte.tipoCombustible === null || respuestasConsumoTransporte.tipoCombustible === 'Seleccionar Tipo de Combustible') {
            alert('Debe seleccionar un tipo de combustible')
        } else {
            let botonSubmit = formularioTransporte.elements['boton-submit'];
            botonSubmit.textContent = 'Enviado!'
        }
        let total = calcularTransporte()
        console.log(respuestasConsumoTransporte, total);
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
            alert("Seleccionar una opción de reciclaje");
            return;
        }

        respuestasConsumo.cantidadDispositivos = Number(formularioConsumo.elements['cantidad-dispositivos'].value);
        respuestasConsumo.renovacionDispositivos = formularioConsumo.elements['renovacion-dispositivos'].value;

        let total = calcularConsumo()
        console.log(respuestasConsumo, total);
    })

    formularioVivienda.addEventListener('submit', (e) => {
        e.preventDefault();

        respuestasVivienda.consumoElectrico = Number(formularioVivienda.elements['consumo-electrico'].value);
        respuestasVivienda.tipoEnergia = formularioVivienda.elements['tipo-energia'].value;
        respuestasVivienda.consumoGas = Number(formularioVivienda.elements['consumo-gas'].value);
        respuestasVivienda.tamanoVivienda = Number(formularioVivienda.elements['tamano-vivienda'].value);
        respuestasVivienda.personasHogar = Number(formularioVivienda.elements['personas-hogar'].value);

        let total = calcularConsumo();
        console.log(respuestasVivienda, total);
    });

    formularioAlimentacion.addEventListener('submit', (e) => {
        e.preventDefault();

        respuestasAlimentacion.dietaAnimal = formularioAlimentacion.elements['dieta-animal'].value;

        let alimentosLocalesSeleccion = $$("input[name='alimentos-locales']:checked");
        if (alimentosLocalesSeleccion) {
            respuestasAlimentacion.alimentosLocales = alimentosLocalesSeleccion.value;
        } else {
            alert("Por favor selecciona si consumes alimentos locales");
            return;
        }

        respuestasAlimentacion.gastoAlimentacion = Number(formularioAlimentacion.elements['gasto-alimentacion'].value);
        respuestasAlimentacion.comidasCarne = Number(formularioAlimentacion.elements['comidas-carne'].value);


        console.log(respuestasAlimentacion);
    });
})