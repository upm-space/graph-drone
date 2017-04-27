/**
 * Created by Itxaso on 15/03/2017.
 */
var lineReader = require('line-reader');
//var jsonfile = require('jsonfile');
var fs = require("fs");
var fileName= "C:\\Users\\Itxaso\\Desktop\\Basura\\logs\\FIXED_WING\\1\\2017-02-21 17-24-06.log";
var fileJson = "IMU.json";
//var obj = {name: 'imu',
            //array: [],
            //};

if(fs.existsSync(fileJson)) {
    fs.unlinkSync(fileJson);
}

lineReader.eachLine(fileName, function (line,last) {
    if (line.includes ('IMU,')) {
        var dato = line.split(", ");
        for (var i=0; i<dato.length; i++) {
            fs.appendFileSync(fileJson, dato[i] + ", ");
        }
        fs.appendFileSync(fileJson, "\n");
        // obj.array.push (dato);
        // escribirNumeroEnArchivo(obj);

    }

    //avísame de que ya ha terminado
    if (last) {
        console.log('FINAL');
    }
});

/*
//function escribirNumeroEnArchivo(obj){
    jsonfile.writeFileSync(fileJson, obj, {spaces: 1});
};*/
