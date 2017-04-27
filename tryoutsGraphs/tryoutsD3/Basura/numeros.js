/**
 * Created by Itxaso on 15/03/2017.
 */
var chorrada = require('fs');
var filename = 'numeros.txt';

//chorrada.unlink(filename); //Esta linea borra el archivo numeros si existe

function escribirNumeroEnArchivo(numero){
    chorrada.appendFile(filename, numero + '\n');
}

for (var i = 0; i < 10; i++){
    escribirNumeroEnArchivo(i);
}