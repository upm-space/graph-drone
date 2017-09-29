'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log2JSON = exports.log2var = undefined;

var _lineReader = require('line-reader');

var lineReader = _interopRequireWildcard(_lineReader);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var log2var = exports.log2var = function log2var(myLogPath, callback) {
  var myLogVar = {};

  function parseFMT(lineArray) {
    var isFMTDefined = Object.prototype.hasOwnProperty.call(myLogVar, 'FMT');
    if (isFMTDefined) {
      myLogVar.FMT.push({});
    } else {
      myLogVar.FMT = [];
      myLogVar.FMT.push({});
    }
    var columns = ['Type', 'Length', 'Name', 'Format', 'Columns'];
    for (var i = 1; i < lineArray.length; i += 1) {
      if (i < 5) {
        myLogVar.FMT[myLogVar.FMT.length - 1][columns[i - 1]] = lineArray[i];
      } else if (i === 5) {
        myLogVar.FMT[myLogVar.FMT.length - 1][columns[i - 1]] = [];
        var mycols = lineArray[i].split(',');
        for (var j = 0; j < mycols.length; j += 1) {
          myLogVar.FMT[myLogVar.FMT.length - 1][columns[i - 1]].push(mycols[j]);
        }
      }
    }
  }

  function parseMSG(lineArray) {
    // Check if object exists and create one if it doesnt
    var dataName = lineArray[0];
    var isPropertyDefined = Object.prototype.hasOwnProperty.call(myLogVar, dataName);
    if (isPropertyDefined) {
      myLogVar[dataName].push({});
    } else {
      myLogVar[dataName] = [];
      myLogVar[dataName].push({});
    }

    // Search for the FMT value to get columns
    // TODO try to make this bisection search after a merge-sort of the FMT
    // array by name to make the search faster.
    var columns = [];
    var numberOfFMTMessages = myLogVar.FMT.length;
    for (var i = 0; i < numberOfFMTMessages; i += 1) {
      if (myLogVar.FMT[i].Name === dataName) {
        columns = myLogVar.FMT[i].Columns;
        break;
      }
    }
    // Parse the columns

    for (var _i = 1; _i < lineArray.length; _i += 1) {
      var lastIndexInDataArray = myLogVar[dataName].length - 1;
      var columnName = columns[_i - 1];
      if (Number.isNaN(Number(lineArray[_i]))) {
        myLogVar[dataName][lastIndexInDataArray][columnName] = lineArray[_i];
      } else {
        myLogVar[dataName][lastIndexInDataArray][columnName] = Number(lineArray[_i]);
      }
    }
  }

  lineReader.eachLine(myLogPath, function (line) {
    // eslint-disable-line
    var lineArr = line.split(', ');

    if (lineArr[0] === 'FMT') {
      parseFMT(lineArr);
    } else {
      // console.log('FMT END');
      return false;
    }
  });

  lineReader.eachLine(myLogPath, function (line, last) {
    var lineArr = line.split(', ');

    if (lineArr[0] !== 'FMT') {
      parseMSG(lineArr);
    }
    if (last) {
      // console.log('LOG END');
      callback(myLogVar);
    }
  });
};

var log2JSON = exports.log2JSON = function log2JSON(myLogPath) {
  log2var(myLogPath, function (myLogVar) {
    var myLogJSON = '{\n';
    var sep1 = '';
  });
};