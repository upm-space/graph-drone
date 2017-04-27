/**
 * Created by Itxaso on 15/03/2017.
 */
var lineReader = require('line-reader');
var fileName = "C:\\Users\\Itxaso\\Desktop\\Basura\\logs\\FIXED_WING\\1\\2017-02-21 17-24-06.log";

lineReader.eachLine(fileName, function(line,last) {

    console.log(line);

    // do whatever with the line

    // Avisemese de que estoy en la ultima linea
    if(last){
        console.log("FINAL");
    }

});