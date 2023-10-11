const fs = require('fs');
const csv = require('csv-parser');

class Grafo {
  constructor() {
    this.vertices = [];
    this.aristas = [];
  }

  agregarVertice(vertice) {
    // Se agrega el vértice al arreglo de vértices del grafo
    this.vertices.push(vertice);
  }

  agregarArista(vertice1, vertice2, peso) {
    // Se agrega la arista al arreglo de aristas del grafo
    this.aristas.push({ vertice1, vertice2, peso });
  }

  // Función para cargar los nodos (planetas) desde un archivo csv
  cargarNodosDesdeCSV(archivo) {
    fs.createReadStream(archivo)
      .pipe(csv())
      .on('data', (row) => {
        this.agregarVertice(row.nodo);
      })
      .on('end', () => {
        console.log('Nodos cargados desde el archivo CSV.');
      });
  }

  // Función para cargar las aristas (costos) desde un archivo csv
  cargarAristasDesdeCSV(archivo) {
    fs.createReadStream(archivo)
      .pipe(csv())
      .on('data', (row) => {
        this.agregarArista(row.vertice1, row.vertice2, parseFloat(row.peso));
      })
      .on('end', () => {
        console.log('Aristas cargadas desde el archivo CSV.');
      });
  }

  // Funcion para encontrar todas las rutas posibles que puede hacer la nave y que recorren cada planeta una sola vez
  encontrarRutasHamiltonianas() {
    const nodos = this.vertices;
    const rutas = [];

    const esRutaValida = (ruta) => {
      if (ruta.length !== nodos.length) {
        return false; 
      }
      for (let i = 0; i < ruta.length - 1; i++) {
        const arista = this.aristas.find(
          (a) =>
            (a.vertice1 === ruta[i] && a.vertice2 === ruta[i + 1]) ||
            (a.vertice1 === ruta[i + 1] && a.vertice2 === ruta[i])
        );
        if (!arista) {
          return false; 
        }
      }
      return this.aristas.some(
        (a) =>
          (a.vertice1 === ruta[ruta.length - 1] && a.vertice2 === ruta[0]) ||
          (a.vertice1 === ruta[0] && a.vertice2 === ruta[ruta.length - 1])
      );
    };

    function permutarNodos(nodosActuales, rutaParcial) {
      if (nodosActuales.length === 0) {
        if (esRutaValida(rutaParcial)) {
          rutas.push(rutaParcial);
        }
      } else {
        for (let i = 0; i < nodosActuales.length; i++) {
          const nodoActual = nodosActuales[i];
          const nuevosNodos = nodosActuales.filter((n) => n !== nodoActual);
          permutarNodos(nuevosNodos, [...rutaParcial, nodoActual]);
        }
      }
    }
    permutarNodos(nodos, []);
    return rutas;
  }

  obtenerCostoEntreNodos(nodoOrigen, nodoDestino) {
    const resultado = this.aristas.find(
      arista => (arista.vertice1 === nodoOrigen && arista.vertice2 === nodoDestino) ||
          (arista.vertice1 === nodoDestino && arista.vertice2 === nodoOrigen)
      );
    return resultado.peso;
  }

  // Función para obtener el costo total de una ruta dada
  obtenerCostoRuta(ruta){
    const costoTotal = ruta.slice(0, -1).reduce((acumulador, nodoActual, indice) => {
      const nodoSiguiente = ruta[indice + 1];
      return acumulador + this.obtenerCostoEntreNodos(nodoActual, nodoSiguiente);
    }, 0);
    return costoTotal;
  }

  // Función para obtener la ruta con menor costo
  obtenerRutaMinima(){
    const rutas = this.encontrarRutasHamiltonianas();
    let rutaMinima = undefined;
      
    rutas.forEach(ruta => {
      ruta.push(ruta[0]);
      const distanciaRuta = this.obtenerCostoRuta(ruta);
      if(rutaMinima === undefined || rutaMinima['costo'] > distanciaRuta){
        rutaMinima = {'ruta': ruta, 'costo':distanciaRuta};
      }
    });
    return rutaMinima;
  }
}
module.exports = Grafo;
