"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(value) {

  this.value = value;

  this.right = null;

  this.left = null;

}

BinarySearchTree.prototype.insert = function(value){

  if (value < this.value) {//si el valor ingresado es mayor al valor actual evaluo

    if (this.left){//si el conector izqwuierdo tiene algo

      this.left.insert(value);//contenedor izquierdo ejecuta la recursividad de la funcion insert

    } else {//si no 

      this.left = new BinarySearchTree(value);// se crea en el conector izquierdo un nuevo nodo BinarySearchTree con el valor nuevo de value

      return value; //retorna el valor a el arbol

    }

  }
  
  if (value > this.value) {

    if (this.right) {

      this.right.insert(value);

    } else {

      this.right = new BinarySearchTree(value);

      return value;

    }

  }

  return false;

}


/*

tengoizquierda?
  si tengo izquierda analizo
  es el valor?
  si es el valor retorno true
  no es el valor me muevo a izquierda(recursividad(valor))

tengo derecha?
  si tengo derecha analizo
  es el valor
  si es el valor retorno true
  no es el valor me muevo a la derecha(recursividad(valor)) 
*/ 

BinarySearchTree.prototype.contains = function(value){

  if (this.value === value) { return true};

  if (this.left) {
  
    if (this.left.value === value) {
  
      return value;
  
    } else {
  
      this.left.contains(value);
  
    }
  } else {
  
    if (this.right){
  
      if (this.value === value){
  
        return value;
  
      } else {
  
        this.right.contains(value);
  
      }
  
    }
  
    return false;
  
  }

}

BinarySearchTree.prototype.depthFirstForEach = function(value){


  
}

BinarySearchTree.prototype.breadthFirstForEach = function(value){


  
}

BinarySearchTree.prototype.size = function(value){


  
}



const miArbol = new BinarySearchTree(3)

miArbol.insert(21);
miArbol.insert(22);
miArbol.insert(9);
miArbol.insert(4);

console.log(miArbol.contains(22))

console.log(miArbol)

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
}
