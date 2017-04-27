/**
 * Created by Itxaso on 16/03/2017.
 */
var lineReader = require('line-reader');
var jsonfile = require('jsonfile')
var fileName= "C:\\Users\\Itxaso\\Desktop\\Basura\\logs\\FIXED_WING\\1\\2017-02-21 17-24-06.log";
var fileJson = "AHR2.json";
var obj = {
    name : "ahr",
    array: [],
};


lineReader.eachLine(fileName, function (line,last) {
    if (line.includes ('AHR2')) {
        console.log(line);

         var dato = line.split(", ");
        obj.array.push(dato);
        escribirNumeroEnJson(obj.array);



    }

    //avísame de que ya ha terminado
    if (last) {
        console.log('FINAL');
    }
});
function escribirNumeroEnJson(obj){
    jsonfile.writeFileSync(fileJson, obj);
};