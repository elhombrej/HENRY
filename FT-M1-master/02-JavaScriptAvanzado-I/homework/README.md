
# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

```javascript
x = 1;//asigna 1 a la variable x en global
var a = 5; //inicializa y asigna 5 a la nueva variable a en global
var b = 10;//inicializa y asigna 10 a la nueva variable b en global
var c = function(a, b, c) { // la primer c es una variable de nombre "c" ,el valor por parametro de la function(a,b,c) no tiene relacion al nombre de la variable c contenedora de una funcion
  var x = 10;
  console.log(x);//10
  console.log(a);//8
 /* var f = function(a, b, c) {
    b = a;
    console.log(b);//8
    b = c;
    var x = 5;
  }*/
  f(a,b,c);
  console.log(b);//9(valor de variable local ya que el scoope actual es c)
}
c(8,9,10);
console.log(b);//10 (por mas que se haya trabajado con las variables internas en el proceso "c" no se retorno nada y los valores no se vieron afectados en el global)
console.log(x);//1 (x jamas fue declarada pero en ec6 es 1)
```

```javascript
console.log(bar);//no se declaro variable
console.log(baz);//no se declaro variable
foo();//"Hola!"
function foo() { console.log('Hola!'); }
var bar = 1;
baz = 2;
```

```javascript
var instructor = "Tony";
if(true) {
    var instructor = "Franco";
}
console.log(instructor);//"Franco"
```

```javascript
var instructor = "Tony";
console.log(instructor);//"Tony"
(function() {
   if(true) {
      var instructor = "Franco";
      console.log(instructor);//Franco (en estos casos la funcion esta declarada pero nunca se podra ejecutar, console.log si imprime la operacion realizada aunque nunca se va a usar)
   }
})();
console.log(instructor);//"Tony"
```

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
    var instructor = "The Flash";
    let pm = "Reverse Flash";
    console.log(instructor);//The Flash
    console.log(pm);//"Reverse Flash"
}
console.log(instructor);//The Flash
console.log(pm);//Franco
```
### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3" = 2;
"2" * "3" = 6;
4 + 5 + "px" = "9px";
"$" + 4 + 5 = "$45";
"4" - 2 = 2;
"4px" - 2 = NaN;
7 / 0 = Infinity;
{}[0] = [0];//?
parseInt("09") = 9;//?
5 && 2 = 2;//evaluo ambas por ser and
2 && 5 = 5;//evaluo ambas por ser and
5 || 0 = 5;//evaluo hasta la verdadera por ser or
0 || 5 = 5;//evaluo hasta la verdadera por ser or
[3]+[3]-[10] = 23; //transforma el 3 y el 3 en string ,ese string es transformado en numero para restarle 10, la suma es concatenacion, la resta es operador numerico.
3>2>1 = false;//?
[] == ![] = false;//[]contiene el valor de verdad true, es un arreglo vacio pero el vacio no es 0 por lo tanto es algo
```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).


### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:

//undefined (la variable a debe estar definida previo al llamado de console.log)
//2 (foo() al ser una funcion permite que el proceso de hoisting llame a la funcion previo al desarrollo de la misma )

```javascript
function test() {
   console.log(a);//undefined
   console.log(foo());//2

   var a = 1;
   function foo() {
      return 2;
   }
}

test();
```

Y el de este código? :

Undefined (la variable snack dentro de la funcion getFood solo se inicializa si el valor por parametro es true, en este caso no se inicializa y devuelve undefined dentro de las funcion)

```javascript
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack;
}

getFood(false);
```


### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:

el primer console log ingresa al objeto prop y extrae el fullname de ese objeto "Aurelio De Rosa", el segundo console.log imprime lo que se asigna a la variable test que es la funcion del objeto prop y lo usa para retornar el valor de la variable fullname del objeto global.

```javascript
var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname;
      }
   }
};

console.log(obj.prop.getFullname()); //"Aurelio De Rosa"

var test = obj.prop.getFullname;

console.log(test());//"juan Perez"
```

### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?

el orden en consola es: 

1
4
3
2

porque  serTimerout espero 1000 milisegundos hasta realizar console.log(2) en cambio console.log(3) lo realizo en 0 milisegundos lo cual tarda mas que otra instruccion console.log regular.

```javascript
function printing() {
   console.log(1);
   setTimeout(function() { console.log(2); }, 1000);
   setTimeout(function() { console.log(3); }, 0);
   console.log(4);
}

printing();
```
