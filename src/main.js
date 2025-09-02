// Lógica del Dark Mode, elementos clave para gestionar el modo oscuro: raíz del documento, toggle de activación, indicador visual y texto del modo. 
    const html = document.documentElement;    // <html>
    const toggle = document.getElementById("darkToggle");
    const dot = document.getElementById("switchDot");
    const modeText = document.getElementById("mode_text");


// // Determina el tema inicial según la preferencia guardada en localStorage o la configuración del sistema (modo oscuro o claro).
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const saved = localStorage.getItem("theme"); 
const start = saved ?? (prefersDark ? "dark" : "light");

    applyTheme(start);

    // Escucha el evento de cambio en el toggle y actualiza el tema según su estado: "checked" activa el modo oscuro.
    toggle.addEventListener("change", () => {
        applyTheme(toggle.checked ? "dark" : "light");
    });

    // Función central para sincronizar el modo visual (claro/oscuro) con la interfaz: modifica clases CSS, estado del toggle, texto del modo y persistencia en localStorage.
    function applyTheme(mode) {
        const isDark = mode === "dark";
        html.classList.toggle("dark", isDark);
        toggle.checked = isDark;
        dot.classList.toggle("translate-x-5", isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
        modeText.textContent = isDark ? "Modo Oscuro" : "Modo Claro";
    }

// Estas dos funciones siempre las defino cuando trabajo con JS Vanilla y tengo que hacer gastantes gets del html, me ayudan a no repetir tanto los metodos.
const $ = (elem) => document.getElementById(elem);
const $$ = (elem) => document.querySelector(elem);

addEventListener('DOMContentLoaded', () => {
    // A penas cargue todo el contenido del HTML, me defino las variables/constantes que voy a necesitar para trabajar en la recoleccion de datos.

    const formularioTransporte = $('formulario-transporte');
    const formularioConsumo = $('formulario-consumo');
    const formularioVivienda = $('formulario-vivienda');
    const formularioAlimentacion = $('formulario-alimentacion');

    let totalEmisiones = 0;

    const viajesAvion = {
        noViajo: 0,
        de500a1000: 1500 / 2,
        de1000a2500: 3500 / 2,
        de2500a5000: 7500 / 2,
    };

    const respuestasTransporte = {
        cantidadKmAutoPorDia: 0,
        tipoCombustible: null,
        cantidadKmColectivo: 0,
        cantidadKmBicicleta: 0,
        cantidadKmAvion: 0,
    };

    const respuestasConsumo = {
        gastoRopa: 0,
        segundaMano: null,
        recicla: null,
        cantidadDispositivos: 0,
    };

    const respuestasVivienda = {
        consumoElectrico: 0,
        tipoEnergia: null,
        consumoGas: 0,
    };

    const respuestasAlimentacion = {
        dietaAnimal: null,
        alimentosLocales: null,
        gastoAlimentacion: 0,
        comidasCarne: 0,
    };

    const factoresDeEmisionPromedios = {
        Transporte: {
            nafta: 0.192,
            gnc: 0.166,
            diesel: 0.171,
            electrico: 0.05,
        },
        colectivo: 0.089,
        avion: 0.128,
        bicicleta: 0,
        electricidad: {
            renovable: 0.05,
            mixta: 0.15,
        },
        gas: 2.0,
        ropa: 20,
        dispositivo: 200,
        carne: 27,
        pescado: 6,
        dietaAnimal: {
            alto: 3000,
            medio: 1500,
            bajo: 500,
        },
    };

    // Defino las funciones que calculan el total de emisiones en base a los datos (devuelve las emisiones mensuales)

    function calcularTransporte() {
        let total = 0;
        // Si el tipo de combustible es !null se calcula el total dependiendo el tipo de combustible
        if (respuestasTransporte.tipoCombustible) {
            total +=
                respuestasTransporte.cantidadKmAutoPorDia *
                factoresDeEmisionPromedios.Transporte[
                respuestasTransporte.tipoCombustible
                ];
        }
        total +=
            respuestasTransporte.cantidadKmColectivo *
            factoresDeEmisionPromedios.colectivo;
        total +=
            respuestasTransporte.cantidadKmBicicleta *
            factoresDeEmisionPromedios.bicicleta;
        total +=
            (respuestasTransporte.cantidadKmAvion *
                factoresDeEmisionPromedios.avion) /
            365;
        total *= 30;
        totalEmisiones += total;
        return total;
    }

    function calcularConsumo() {
        let total = 0;

        if (respuestasConsumo.gastoRopa > 0) {
            total +=
                (respuestasConsumo.gastoRopa / 100) * factoresDeEmisionPromedios.ropa;
        }

        if (respuestasConsumo.cantidadDispositivos > 0) {
            total +=
                respuestasConsumo.cantidadDispositivos *
                factoresDeEmisionPromedios.dispositivo;
        }

        if (respuestasConsumo.segundaMano === 'si') {
            total *= 0.7; // reducimos un 30%
        }

        if (respuestasConsumo.recicla === 'si') {
            total *= 0.9;
        }
        totalEmisiones += total;
        return total;
    }

    function calcularVivienda() {
        let total = 0;

        if (respuestasVivienda.consumoElectrico > 0) {
            let factorElectrico = factoresDeEmisionPromedios.electricidad;
            if (respuestasVivienda.tipoEnergia === 'renovable')
                factorElectrico = factoresDeEmisionPromedios.electricidad.renovable;
            else if (respuestasVivienda.tipoEnergia === 'mixta')
                factorElectrico = factoresDeEmisionPromedios.electricidad.mixta;
            total += respuestasVivienda.consumoElectrico * factorElectrico;
        }

        if (respuestasVivienda.consumoGas > 0) {
            total += respuestasVivienda.consumoGas * factoresDeEmisionPromedios.gas;
        }
        totalEmisiones += total;
        return total;
    }

    function calcularAlimentacion() {
        let total = 0;

        if (respuestasAlimentacion.dietaAnimal) {
            total +=
                factoresDeEmisionPromedios.dietaAnimal[
                respuestasAlimentacion.dietaAnimal
                ];
        }

        if (respuestasAlimentacion.gastoAlimentacion > 0) {
            // suponemos que cada $100 de gasto promedio equivale a X kgCO2e
            total += (respuestasAlimentacion.gastoAlimentacion / 100) * 5;
        }

        if (respuestasAlimentacion.comidasCarne > 0) {
            total +=
                respuestasAlimentacion.comidasCarne * factoresDeEmisionPromedios.carne;
        }

        if (respuestasAlimentacion.alimentosLocales === 'si') {
            total *= 0.8;
        }
        totalEmisiones += total;
        return total;
    }

    // Accedo al evento 'submit' de los formularios, y agrego la logica para recolectar los datos, luego los muestro por consola.

    formularioTransporte.addEventListener('submit', (e) => {
        e.preventDefault();
        respuestasTransporte.cantidadKmAutoPorDia = Number(
            formularioTransporte.elements['cantidad-km-auto'].value * 4
        );

        respuestasTransporte.tipoCombustible =
            formularioTransporte.elements['tipo-de-combustible'].value;

        respuestasTransporte.cantidadKmColectivo = Number(
            formularioTransporte.elements['cantidad-km-colectivo'].value * 31
        );
        respuestasTransporte.cantidadKmBicicleta = Number(
            formularioTransporte.elements['cantidad-km-bicleta'].value
        );

        let avion = $$("input[name = 'avion']:checked").value;

        switch (avion) {
            case 'no-viajo':
                respuestasTransporte.cantidadKmAvion = viajesAvion.noViajo;
                break;
            case 'poco':
                respuestasTransporte.cantidadKmAvion = viajesAvion.de500a1000;
                break;
            case 'medio':
                respuestasTransporte.cantidadKmAvion = viajesAvion.de1000a2500;
                break;
            case 'alto':
                respuestasTransporte.cantidadKmAvion = viajesAvion.de2500a5000;
                break;
            default:
                alert('Valor de vuelos no aceptado');
                return;
        }

        if (
            respuestasTransporte.tipoCombustible === null ||
            respuestasTransporte.tipoCombustible === 'Seleccionar Tipo de Combustible'
        ) {
            alert('Debe seleccionar un tipo de combustible');
            return;
        } else {
            let botonSubmit = formularioTransporte.elements['boton-submit'];
            botonSubmit.textContent = 'Enviado!';
        }

        let totalTransporte = calcularTransporte();
        console.log(respuestasTransporte, totalTransporte);
    });

    formularioConsumo.addEventListener('submit', (e) => {
        e.preventDefault();

        // Guardar respuestas
        respuestasConsumo.gastoRopa = Number(
            formularioConsumo.elements['gasto-ropa'].value
        );
        respuestasConsumo.segundaMano =
            formularioConsumo.elements['segunda-mano'].value;

        let reciclaSeleccion = $$("input[name='recicla']:checked");
        if (reciclaSeleccion) {
            respuestasConsumo.recicla = reciclaSeleccion.value;
        } else {
            alert('Seleccionar una opción de reciclaje');
            return;
        }

        respuestasConsumo.cantidadDispositivos = Number(
            formularioConsumo.elements['cantidad-dispositivos'].value
        );

        let total = calcularConsumo();
        console.log(respuestasConsumo, total);
    });

    formularioVivienda.addEventListener('submit', (e) => {
        e.preventDefault();

        respuestasVivienda.consumoElectrico = Number(
            formularioVivienda.elements['consumo-electrico'].value
        );
        respuestasVivienda.tipoEnergia =
            formularioVivienda.elements['tipo-energia'].value;
        respuestasVivienda.consumoGas = Number(
            formularioVivienda.elements['consumo-gas'].value
        );

        if (respuestasVivienda.tipoEnergia !== 'Selecciona una opción') {
            let total = calcularVivienda();
            console.log(respuestasVivienda, total);
        } else {
            alert('Debe seleccionar un tipo de energia');
            return;
        }
    });

    formularioAlimentacion.addEventListener('submit', (e) => {
        e.preventDefault();

        respuestasAlimentacion.dietaAnimal =
            formularioAlimentacion.elements['dieta-animal'].value;
        respuestasAlimentacion.gastoAlimentacion = Number(
            formularioAlimentacion.elements['gasto-alimentacion'].value
        );
        respuestasAlimentacion.comidasCarne = Number(
            formularioAlimentacion.elements['comidas-carne'].value
        );

        let alimentosLocalesSeleccion = $$(
            "input[name='alimentos-locales']:checked"
        );
        if (
            alimentosLocalesSeleccion &&
            respuestasAlimentacion.dietaAnimal !== 'Selecciona una opción'
        ) {
            respuestasAlimentacion.alimentosLocales = alimentosLocalesSeleccion.value;
        } else {
            alert(
                'Seleccione si consume alimentos locales y el porcentaje de su dieta'
            );
            return;
        }

        let total = calcularAlimentacion();
        console.log(respuestasAlimentacion, total);
        console.log(totalEmisiones.toFixed(2))
    });
});
