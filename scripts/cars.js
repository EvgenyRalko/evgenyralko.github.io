(function () {
    $.ajax("json/cars.json",
        { type:'GET', dataType:'json', success:receiveData, error:errorHandler }
    );


    function receiveData(data) {
        localStorage.carsDb = JSON.stringify(data);
    }

    function errorHandler() {
        alert ('Данные не были получены. Проверьте соединение с интернет');
    }


    var carsDbParsed = JSON.parse(localStorage.carsDb);

    var marketArr = new Array(208);

    for (var i = 0; i < marketArr.length-50; i++){
        marketArr[i] = carsDbParsed[i];
    }

    localStorage.marketDb = JSON.stringify(marketArr);

}());




