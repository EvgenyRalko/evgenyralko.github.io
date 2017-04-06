(function () {
    var car3000 = [],
        car7000 = [],
        car10000 = [],
        car15000 = [],
        car15000plus = [];

    var car2000y = [],
        car2005y = [],
        car2010y = [],
        car2015y = [],
        car2015plusY = [];


//counter of unique cars
    var uniqueMakes = {},
        uniqueMakesArr = [],
        uniqueMakesTotal = [];

    var marketDbParsedStats = JSON.parse(localStorage.marketDb);

    for (var i = 0; i < marketDbParsedStats.length; i++) {
        if (!marketDbParsedStats[i]) {
            continue;
        }else{
            uniqueMakes[marketDbParsedStats[i].brand] = 1 + (uniqueMakes[marketDbParsedStats[i].brand] || 0);
            if(marketDbParsedStats[i].price <= 3000){ car3000.push(marketDbParsedStats[i].price)};
            if(marketDbParsedStats[i].price > 3000 && marketDbParsedStats[i].price <= 7000){car7000.push(marketDbParsedStats[i].price)};
            if(marketDbParsedStats[i].price > 7000 && marketDbParsedStats[i].price <= 10000){car10000.push(marketDbParsedStats[i].price)};
            if(marketDbParsedStats[i].price > 10000 && marketDbParsedStats[i].price <= 15000){car15000.push(marketDbParsedStats[i].price)};
            if(marketDbParsedStats[i].price > 15000){car15000plus.push(marketDbParsedStats[i].price)};

            if(marketDbParsedStats[i].year <= 2000){ car2000y.push(marketDbParsedStats[i].year)};
            if(marketDbParsedStats[i].year > 2000 && marketDbParsedStats[i].year <= 2005){car2005y.push(marketDbParsedStats[i].year)};
            if(marketDbParsedStats[i].year > 2005 && marketDbParsedStats[i].year <= 2010){car2010y.push(marketDbParsedStats[i].year)};
            if(marketDbParsedStats[i].year > 2010 && marketDbParsedStats[i].year <= 2015){car2015y.push(marketDbParsedStats[i].year)};
            if(marketDbParsedStats[i].year > 2015){car2015plusY.push(marketDbParsedStats[i].year)};
        }
    }

    for (var a in uniqueMakes){
        uniqueMakesArr.push(a);
    }


    var carsLabels = uniqueMakesArr.sort();

    carsLabels.forEach(numberOfCarsByMake);


    var carPriceLabels = ['до 3 000','3-7 тыс.','7-10 тыс.','10-15 тыс.','от 15 000.'];
    var carPriceValues = [car3000.length, car7000.length, car10000.length, car15000.length, car15000plus.length];

    var carYearLabels = ['до 2000','2001-2005','2006-2010','2011-2015','от 2015'];
    var carYearValues = [car2000y.length, car2005y.length,car2010y.length,car2015y.length,car2015plusY.length];

    var priceChart = document.getElementById('chart-bar1').getContext('2d');
    var yearChart = document.getElementById('chart-bar2').getContext('2d');
    var pieChart = document.getElementById('chart-pie').getContext('2d');

    var myChart1 = new Chart(priceChart, chartBuilder('bar',carPriceLabels,'Авто по стоимости',carPriceValues));
    var myChart2 = new Chart(yearChart, chartBuilder('bar',carYearLabels,'Авто по году выпуска',carYearValues));
    var myChart3 = new Chart(pieChart, chartBuilder('pie',carsLabels,'Количество авто по маркам',uniqueMakesTotal));

    addChartOptions(myChart1);
    addChartOptions(myChart2);


    function addChartOptions(chart) {
        chart.options.scales.yAxes[0].ticks.beginAtZero = true;
        chart.update();
    }

    function chartBuilder(type, labels, chartLabel, data) {
        return {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: chartLabel,
                    data: data,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ]
                }]
            }
        }
    }

    function numberOfCarsByMake(v) {
        var num = uniqueMakes[v];
        uniqueMakesTotal.push(num);
    }
}());


