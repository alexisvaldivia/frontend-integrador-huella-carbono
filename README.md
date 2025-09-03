# Huella de Carbono 
Este Proyecto es una herramienta web simple para poder calcular el total de gases de efecto invernadero (**GEI**) que una persona, organización, evento o producto emite directa e indirectamente a la atmósfera. A esto se le llama **Huella de Carbono**.

---

## Características

* **Página de bienveinda:** Una interfaz inicial atractiva con el título de "Calcula tu Huella de Carbono", a la izquierda del mismo un logo del Dioxido de Carbono. Debajo una breve descripción e invitación a la página. Dos botones, uno para leer más información sobre la Huella de Carbono, y otro a la derecha para empezar a calcular la misma.
* **Formulario interactivo:** Un formulario paso a paso donde cada campo debe ser  completado, cada respuesta tiene un valor asignado. Para poder pasar al siguiente se debe presionar en "Enviar datos".
* **Cálculo de Huella de Carbono**: Al finalizar el formulario se suman los valores seleccionados o ingresdos para estimar la huella de carbono mensual del usuario. El resultado es mostrado en la consola.

---

## Códigos Importantes en este Proyecto

1. **Manipulación del DOM:** Estas funciones facilitan el acceso a elementos del DOM y evita la repetición de `document.getElementById` o de `querySelector`.

    const $ = (elem) => document.getElementById(elem);
    const $$ = (elem) => document.querySelector(elem);

2. **Estructura de datos y factores de emisión:** Este objeto centraliza los factores de emisión que utilizamos para cada cálculo, facilitandonos su mantenimiento y actualización.

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
  dietaAnimal: {
    alto: 3000,
    medio: 1500,
    bajo: 500,
  },
};

3. **Ejemplo de Función de cálculo:** Esta función calcula las emisiones mensuales por transporte y toma en cuenta los medios y tipos de combustible.

    function calcularTransporte() {
  let total = 0;
  if (respuestasTransporte.tipoCombustible) {
    total += respuestasTransporte.cantidadKmAutoPorDia *
      factoresDeEmisionPromedios.Transporte[respuestasTransporte.tipoCombustible];
  }
  total += respuestasTransporte.cantidadKmColectivo * factoresDeEmisionPromedios.colectivo;
  total += respuestasTransporte.cantidadKmBicicleta * factoresDeEmisionPromedios.bicicleta;
  total += (respuestasTransporte.cantidadKmAvion * factoresDeEmisionPromedios.avion) / 365;
  total *= 30;
  totalEmisiones += total;
  return total;
}

4. **Ejemplo de manejo de formularios:** recolección de datos del usuario y cálculo de la huella de carbono al enviar el formulario.

    formularioTransporte.addEventListener('submit', (e) => {
  e.preventDefault();
  respuestasTransporte.cantidadKmAutoPorDia = Number(
    formularioTransporte.elements['cantidad-km-auto'].value * 4
  );
  // ...recolección de datos y validaciones
  let totalTransporte = calcularTransporte();
  console.log(respuestasTransporte, totalTransporte);
});

---

## Estas son algunas imagenes de nuestra Calculadora

![Captura de pantalla vista mobile](assets/mobile-captura.jpg)
![Captura de pantalla vista del Formulario mobile](assets/mobile-captura-formulario.jpg)
![Captura de pantalla vista PC](assets/pc-captura.jpg)
![Captura de pantalla vista del Formulario](assets/pc-captura-formulario.jpg)

---

## Tecnologías Utilizadas

* `index.html`: Estructura principal de la página y el contenido del formulario.
* `style.css`: Para ajustes específicos.
* `main.js`: Para manejar la lógica del formulario, calcular la huella de carbono y mostrar el resultado en consola.
* `Tailwind CSS`: Para aplicar estilos, estilos responsivos y modernos con enfoque mobile-first.

---

## Instalación

1. Clona el repositorio en tu maquina local: git clone https://github.com/alexisvaldivia/frontend-integrador-huella-carbono.git 
2. Abrir el proyecto en el editor de código deseado.
3. Ejecutar el archivo index.html en el navegador para probar.

---

## Uso

Abre el archivo `index.html` en el navegador. Haz click en el botón **"Empezar a calcular**. Respondé las preguntas sobre tus hábitos y en la última pregunta haz click en "Enviar datos" para ver tu resultado.
Se mostrará tu huella de carbono estimada.

---

## Contribuciones

Las contribuciones son bienvenidas. Si quieres mejorar algo, encuentras algún error o incorporar nuevas ideas, por favor abre un "issue" o envía un "pull request". También puedes crear una rama con tu mejora, hacer los cambios que quieres y commitear con mensajes precisos y claros, envia un PR explicando tu aporte.

---

## Licencia

Este proyecto está bajo licencia **MIT**, esto significa que podés usarlo, modificarlo y distribuirlo libremente, pero manteniendo los créditos originales. Para más detalles, consulta el archivo `LICENSE.md` en el repositorio.
