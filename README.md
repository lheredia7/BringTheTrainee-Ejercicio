# BringTheTrainee-Ejercicio
Para resoler el ejercicio use apuntes que tengo de materias de la facultad junto con las presentaciones de las clases y chatGPT.

PENSAMIENTO DEL PROBLEMA:
Al problema lo interprete como un grafo siendo los planetas los nodos y los costos de viajar de planeta a planeta las aristas.
Usé apuntes de una materia (Matemática discreta) para ver distintas opciones de algoritmos para resolver el problema.
Primero pense que se podía resolver con el algoritmo de Kruskal ya que permite unir todos los nodos con el mínimo costo pero lo descarte porque termina formando una estructura de árbol y por lo tanto para visitar todos los planetas habría que pasar más de una vez por algunos de ellos.
Después pensé en el problema de los puentes de Euler pero también lo descarté porque un circuito Euleriano pasa por cada arista una vez y volvería a cometer el error de pasar por un nodo más de una vez.
Finalmente le pregunte a chatGPT y me respondió que necesitaba un circuito Hamiltoniano.

RESOLUCIÓN EN CÓDIGO:
Elegí programarlo en Javascript porque es el lenguaje que estoy usando en mi trabajo actual y también en una materia que estoy cursando actualmente.
Le pedí a chatGPT que me cree el código para hacer un grafo y que me permita agregarle nodos y aristas a partir de dos archivos csv (nodos.csv y aristas.csv) y también le pedí que agregue un método para que me de todos los circuitos hamiltonianos posibles que se pueden formar a partir de los nodos del grafo.
Una vez que tengo todas las rutas posibles tengo que usar la fuerza bruta (calcular el costo total de cada ruta) para calcular la ruta que tiene menor costo ya que no puede haber ninguna que tenga un costo menor.
