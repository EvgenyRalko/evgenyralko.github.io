//Paste the code when using for the first time
/*

var carsDbParsed = JSON.parse(localStorage.carsDb);

var newArr = shuffleAll(carsDbParsed);
var marketArr = new Array(208);

function shuffleAll(array) {
    var m = array.length, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}

for (var i = 0; i < 350; i++){
    marketArr[i] = newArr[i];
}

localStorage.marketDb = JSON.stringify(marketArr);
  */