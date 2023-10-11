const Grafo = require('./Grafo.js');


function main(){
    const grafo = new Grafo();

    // Se cargan los nodos (planetas) en el grafo
    grafo.cargarNodosDesdeCSV('nodos.csv');
    // Se cargan las aristas (costo de viajar a cada planeta) en el grafo
    grafo.cargarAristasDesdeCSV('aristas.csv');

    
    setTimeout(() => {
        // Se ejecuta el código para la obtención de la ruta con el menor costo
        const rutaMinima = grafo.obtenerRutaMinima();
        const ruta = rutaMinima['ruta'].join(', ');
        const costo = rutaMinima['costo'];
        console.log(`La ruta con menor costo es: ${ruta}\nCon un costo de: ${costo}`);
    }, 1000);

}

main();