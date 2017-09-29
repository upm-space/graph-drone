import * as lineReader from 'line-reader';

export const log2var = (myLogPath, callback) => {
  const myLogVar = {};

  function parseFMT(lineArray) {
    const isFMTDefined = Object.prototype.hasOwnProperty.call(myLogVar, 'FMT');
    if (isFMTDefined) {
      myLogVar.FMT.push({});
    } else {
      myLogVar.FMT = [];
      myLogVar.FMT.push({});
    }
    const columns = ['Type', 'Length', 'Name', 'Format', 'Columns'];
    for (let i = 1; i < lineArray.length; i += 1) {
      if (i < 5) {
        myLogVar.FMT[myLogVar.FMT.length - 1][columns[i - 1]] = lineArray[i];
      } else if (i === 5) {
        myLogVar.FMT[myLogVar.FMT.length - 1][columns[i - 1]] = [];
        const mycols = lineArray[i].split(',');
        for (let j = 0; j < mycols.length; j += 1) {
          myLogVar.FMT[myLogVar.FMT.length - 1][columns[i - 1]].push(mycols[j]);
        }
      }
    }
  }

  function parseMSG(lineArray) {
  // Check if object exists and create one if it doesnt
    const dataName = lineArray[0];
    const isPropertyDefined = Object.prototype.hasOwnProperty.call(myLogVar, dataName);
    if (isPropertyDefined) {
      myLogVar[dataName].push({});
    } else {
      myLogVar[dataName] = [];
      myLogVar[dataName].push({});
    }

    // Search for the FMT value to get columns
    // TODO try to make this bisection search after a merge-sort of the FMT
    // array by name to make the search faster.
    let columns = [];
    const numberOfFMTMessages = myLogVar.FMT.length;
    for (let i = 0; i < numberOfFMTMessages; i += 1) {
      if (myLogVar.FMT[i].Name === dataName) {
        columns = myLogVar.FMT[i].Columns;
        break;
      }
    }
    // Parse the columns

    for (let i = 1; i < lineArray.length; i += 1) {
      const lastIndexInDataArray = myLogVar[dataName].length - 1;
      const columnName = columns[i - 1];
      if (Number.isNaN(Number(lineArray[i]))) {
        myLogVar[dataName][lastIndexInDataArray][columnName] = lineArray[i];
      } else {
        myLogVar[dataName][lastIndexInDataArray][columnName] = Number(lineArray[i]);
      }
    }
  }

  lineReader.eachLine(myLogPath, (line) => { // eslint-disable-line
    const lineArr = line.split(', ');

    if (lineArr[0] === 'FMT') {
      parseFMT(lineArr);
    } else {
      // console.log('FMT END');
      return false;
    }
  });


  lineReader.eachLine(myLogPath, (line, last) => {
    const lineArr = line.split(', ');

    if (lineArr[0] !== 'FMT') {
      parseMSG(lineArr);
    }
    if (last) {
      // console.log('LOG END');
      callback(myLogVar);
    }
  });
};

export const log2JSON = (myLogPath) => {
  log2var(myLogPath, (myLogVar) => {
    const myLogJSON = '{\n';
    const sep1 = '';
  });
};
