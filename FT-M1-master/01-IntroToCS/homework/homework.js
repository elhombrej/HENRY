'use strict'

function BinarioADecimal(num) {
  // tu codigo aca

  var resultadoFinal = 0;//resultado al final

  var arrayBinario = [];//arreglo resultante del bucle numero 1

  for (var indice = 0; indice < num.length; indice++){//bucle numero 1

    arrayBinario.push(num[indice]);//agrego el nuevo valor al arreglo binario
  }

  var reversa = arrayBinario.reverse();//revierto el arreglo arrayBinario y lo guardo en reversa

  for (var indice = 0; indice < reversa.length; indice++){//bucle numero 2 (me muevo sobre el arreglo reversa)

    resultadoFinal = resultadoFinal + ((Number(reversa[indice]))*2 ** indice);//cargo el calculo en e lcontador resultado final previamente convirtiendo el contenido del indice en un numero

  }

  return resultadoFinal;// devuelvo el resultado

}

function DecimalABinario(num) {
  // tu codigo aca

  var arrayBinario = [];

  while (num != 0){

    arrayBinario.unshift(num % 2);

    num = Math.floor(num / 2);

  }

  return arrayBinario.join("");

}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}