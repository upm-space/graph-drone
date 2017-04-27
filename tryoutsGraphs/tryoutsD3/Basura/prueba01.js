/**
 * Created by Itxaso on 10/03/2017.
 */
var fs = require('fs');
var filename = 'numbers.txt';


function escribirNumeros(text){
    fs.appendFile(filename, text, function(){});
}

function escribirNumerosSync(text){
    fs.appendFileSync(filename, text);
}

function getTime(){
    var time = new Date();
    var min = time.getMinutes();
    var sec = time.getSeconds();
    var mil = time.getMilliseconds();
    return min.toString() + ":" + sec.toString() + ":" + mil.toString();
}

// Cometar la linea que no estes usando
console.log("Tiempo Sincrono")
//console.log("Tiempo Asincrono")

console.log(getTime());

for(var i=0;i<100000;i++){
    escribirNumerosSync(i.toString() +  '\n'); // Aqui cambio a Escribir numeros Syncrono o Asyncrono
}

console.log(getTime());
