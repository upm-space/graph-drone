/**
 * Created by Itxaso on 21/03/2017.
 */
var lineReader = require("line-reader");
var fs = require("fs");
var myLog = "./Logs/2017-02-21 17-24-06.log";
var myObj = require('./JSON/2017-02-21_17-24-06-FMT.json');
var AHR2JSON = "./JSON/2017-02-21_17-24-06-AHR2.json";

// console.log(myObj.FMT[24].Columns);

// Esta funcion la uso para formatear strings como en java
if (!String.format) {
    String.format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

if(fs.existsSync(AHR2JSON)){
    fs.unlinkSync(AHR2JSON);
}

function formatoCOL(arraydeLinea){
    var result = '\t\t{\n';
    separ = "";
    for (var i = 1 ; i < arraydeLinea.length ; i++) {
        result += separ + String.format('\t\t\t"{0}" : "{1}"', myObj.FMT[24].Columns[i-1], arraydeLinea[i]);
        if(separ == ""){
            separ = ",\n";
        }
    }

    return result + "\n\t\t}";

}


fs.appendFileSync(AHR2JSON, '{\n\t"AHR2" : [\n');
var separ2 = "";


lineReader.eachLine(myLog, function(line,last) {

    var lineArr = line.split(", ");


    if(lineArr[0] == "AHR2"){

        fs.appendFileSync(AHR2JSON, separ2 + formatoCOL(lineArr));
        if(separ2 == ""){
            separ2 = ",\n";
        }
    }
    if(last) {
        fs.appendFileSync(AHR2JSON, "\n\t]\n}");
        console.log("THE_END");
    }
});