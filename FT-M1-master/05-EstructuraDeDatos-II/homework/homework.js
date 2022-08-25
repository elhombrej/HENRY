"use strict";

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo newNode al final de la lista;
  - remove: elimina el último newNode de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo newNode
 y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. En el primer caso, buscamos un newNode cuyo valor coincida con lo buscado; en el segundo, buscamos un newNode cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un newNode cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un newNode cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/


function LinkedList() {

  this.head = null;

  this.size = 0;

}

function Node(value) {


  this.value = value;

  this.next = null;

}

LinkedList.prototype.add = function(data){

  let newNode = new Node(data);//agrego un nuevo nodo dentro de la funcion LinkedList

  let current = this.head;//declaro e inicializo current como el registro de el nodo principal Head

  if (!current){ //en esta condicion marcamos el primer nodo como Head (verifico si no hay head)

    this.head = newNode;//aplico el head por unica vez, tambien el current paso a ser newNode(aca hacemos referencia a la lista)
    
    this.size++//aumento el registro del tamaño de la lista (aca hacemos referencia a la lista)
    
    return newNode;

  }//si ya tiene un head solo nos queda recorrer la lista y verificar que no sea el unico
    
    while(current.next){//mientras current (que es ahora newNode) sea verdadero, osea que exista en la lista me muevo buscando el ultimo vacio con el valor current.next que sea igual a null
    
      current = current.next//como encontro un valor en current.next (ya que entro en el bucle) le agrego el valor de la propiedad current.next (que hace referenca a la ubicacion del siguiente nodo en la lista)
  
    }
  
    current.next = newNode;
  
    this.size++;

    return newNode;
  
};


LinkedList.prototype.remove = function(){

 let current = this.head;

 if (current === null) return null;

 if (current.next === null)  {

  let auxiliar = current.value;
  
  this.head = null;

  this.size--

  return auxiliar;

 }


 while (current.next.next) {

  current = current.next;
 
}

 const auxiliar = current.next.value;

 current.next = null;

 this.size--;

 return auxiliar;

};


LinkedList.prototype.search = function(parametro){

  let current = this.head;

  if (this.head === null) return null;

  while (current) {

    if (typeof parametro == "function"){
  
      if (parametro(current.value)) return current.value;
      
    }
  
    if (current.value === parametro) {
  
      return parametro;

    }
  
    current = current.next;

  }
  
  return null;

};


console.log((typeof 2) === "number")
const miLista = new LinkedList();

const pepito =function callBack(numero){

  numero = numero +1;

  return true

}



console.log(miLista.add(2));
console.log(miLista.add(4));
console.log(miLista.add(6));
console.log(miLista.add(8));
console.log(miLista.remove());
console.log(miLista.add(10));
console.log(miLista);
console.log(miLista.search(pepito(2)));



/*
Implementar la clase HashTable.

Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/

function HashTable() {}

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};
