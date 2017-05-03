/**
 * Created by Itxaso on 21/03/2017.
 */
var lineReader = require("line-reader");
var fs = require("fs");
var archivoJson = "IMU2.json";
var fileName= "C:\\Users\\Itxaso\\Desktop\\Basura\\logs\\FIXED_WING\\1\\2017-02-21 17-24-06.log";

if(fs.existsSync(archivoJson)) {
    fs.unlinkSync(archivoJson);
}

    lineReader.eachLine(fileName, function(line,last) {
    var dato = line.split (", ");
    if (dato[0] == "IMU") {
        for (var i=0; i<dato.length; i++) {
            fs.appendFileSync(archivoJson, dato[i] + ", ");
        }
        fs.appendFileSync(archivoJson,"\n");
    }


});