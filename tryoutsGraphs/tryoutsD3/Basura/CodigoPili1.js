/**
 * Created by Itxaso on 21/03/2017.
 */
var lineReader = require("line-reader");
var fs = require("fs");
var myLog = "C:\\Users\\Itxaso\\Desktop\\Basura\\logs\\FIXED_WING\\1\\2017-02-21 17-24-06.log";
var MetadataJSON = "2017-02-21_17-24-06-FMT.json";

if(fs.existsSync(MetadataJSON)){
    fs.unlinkSync(MetadataJSON);
}

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

function formatoFMT(arraydeLinea){
    var result = ' \t\t{\n ';
    for (var i = 1 ; i < arraydeLinea.length ; i++) {
        if (i == 1){
            result += String.format('\t\t\t"Type" : "{0}",\n', arraydeLinea[i]);
        }
        else if(i == 2){
            result += String.format('\t\t\t"Length" : "{0}",\n', arraydeLinea[i]);
        }
        else if(i == 3){
            result += String.format('\t\t\t"Name" : "{0}",\n', arraydeLinea[i]);
        }
        else if(i == 4){
            result += String.format('\t\t\t"Format" : "{0}",\n', arraydeLinea[i]);
        }
        else if(i == 5){
            result += '\t\t\t"Columns" : [ ';
            var mycols = arraydeLinea[i].split(",");
            for(var j = 0; j < mycols.length; j++){
                if(j == mycols.length - 1){
                    result +=  String.format('"{0}" ]\n\t\t}', mycols[j]);
                    break
                }
                result +=  String.format('"{0}", ', mycols[j]);
            }
        }
    }

    return result;

}


fs.appendFileSync(MetadataJSON, '{\n\t"FMT" : [\n');
var separ1 = "";

lineReader.eachLine(myLog, function(line,last) {

    var lineArr = line.split(", ");

    if(lineArr[0] == "FMT"){
        fs.appendFile(MetadataJSON, separ1 + formatoFMT(lineArr), function(){});
        if(separ1 == ""){
            separ1 = ",\n";
        }
    }
    else{
        fs.appendFileSync(MetadataJSON, "\n\t]\n}");
        console.log("THE_END");
        return false
    }
});

