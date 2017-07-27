import { log2Var, printObj2JSON } from './Log2varF';

var myLogPath = "../sample-logs/SRM/47 11-07-2017 14-16-04.bin.log";

log2Var(myLogPath, function(tryVAr){

    console.log(tryVAr);

    var DataJSON = "./output-JSON/2017-02-21_17-24-06-DATA.json";
    if(fs.existsSync(DataJSON)){
        fs.unlinkSync(DataJSON);
    }
    fs.appendFileSync(DataJSON, printObj2JSON(tryVAr));

});
