(function () {
    var
        color = document.querySelector ('#color'),
        transmission = document.querySelector ('#transmission'),
        mileage = document.querySelector ('#mileage'),
        yearFrom = document.querySelector ('#yearFrom'),
        yearTo = document.querySelector ('#yearTo'),
        priceFrom = document.querySelector ('#priceFrom'),
        priceTo = document.querySelector ('#priceTo'),
        engine = document.querySelector ('#engine'),
        brand = document.querySelector ('#brand'),
        modelField = document.querySelector('#model'),
        allCarLots = document.querySelectorAll('.rect-elem'),
        marketDbJsonParsed = JSON.parse(localStorage.marketDb),
        filterModal = document.querySelector('#filter-modal');

//Add model default empty option
    var opt = document.createElement('option');
    modelField.appendChild(opt);
//------------------------FILTER BUILDER - options are added to SELECT---------------------------------------------------

    var
        brandArr = [],
        colorArr = [],
        transmissionArr = [],
        fuelArr = [];

    for (var i = 0; i < marketDbJsonParsed.length; i++){
        if (marketDbJsonParsed[i]){
            brandArr.push(marketDbJsonParsed[i].brand);
            colorArr.push(marketDbJsonParsed[i].color);
            transmissionArr.push(marketDbJsonParsed[i].transmission);
            fuelArr.push(marketDbJsonParsed[i].fuel);
        }
    }

    var
        brandArrUnique = brandArr.filter (searchUnique).sort(),
        colorArrUnique = colorArr.filter (searchUnique).sort(),
        transmissionArrUnique = transmissionArr.filter(searchUnique).sort(),
        fuelArrUnique = fuelArr.filter (searchUnique).sort();

    function searchUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function addFilterOptions (array1, value) {
        var target = document.getElementById(value);
        for (var i = 0; i < array1.length; i++){
            var elem = document.createElement('option');
            var text = document.createTextNode(array1[i]);
            elem.value = value;
            elem.appendChild(text);
            target.appendChild(elem);

        }
    }

    addFilterOptions(brandArrUnique,'brand');
    addFilterOptions(colorArrUnique,'color');
    addFilterOptions(transmissionArrUnique,'transmission');
    addFilterOptions(fuelArrUnique,'engine');


    brand.addEventListener('change',appendModelOptions, false);

    //-----------ADD OPTIONS TO MODEL SELECTION-----------------------
    function appendModelOptions() {
        modelField.innerHTML = '';

        modelEmptyOption();


        var brandSelect = brand.options[brand.selectedIndex].text;
        var modelArr = [];

        switch (brandSelect){
            case 'Audi':
                modelArr = ['A4','A6','Q7'];
                break;
            case 'BMW':
                modelArr = ['3 Series','5 Series','7 Series'];
                break;
            case 'Toyota':
                modelArr = ['Prius','Corolla','Camri'];
                break;
            case 'Mazda':
                modelArr = ['3','6'];
                break;
            case 'Volkswagen':
                modelArr = ['Golf','Passat','Toureg'];
                break;
        }

        addFilterOptions(modelArr, 'model');
    }


//--------------------FILTERING CODE------------------------

    var compObject = {};
    var hashSize = 0;

    function compTemplate() {
        hashSize = 0;

        var brandSelect = brand.options[brand.selectedIndex].text,
            modelSelect = modelField.options[modelField.selectedIndex].text,
            colorSelect= color.options[color.selectedIndex].text,
            transmissionSelect = transmission.options[transmission.selectedIndex].text,
            mileageSelect = mileage.options[mileage.selectedIndex].text,
            yearFromSelect = yearFrom.options[yearFrom.selectedIndex].text,
            yearToSelect = yearTo.options[yearTo.selectedIndex].text,
            priceFromSelect = priceFrom.value,
            priceToSelect = priceTo.value,
            engineSelect = engine.options[engine.selectedIndex].text;

//EventListener to Brand Selection

        compObject = {};

        if (brandSelect) compObject['brand'] = brandSelect;
        if (modelSelect) compObject['model'] = modelSelect;
        if (colorSelect) compObject['color'] = colorSelect;
        if (transmissionSelect) compObject['transmission'] = transmissionSelect;
        if (engineSelect) compObject['fuel'] = engineSelect;
        if (mileageSelect) compObject['mileage'] = mileageSelect;

        if (yearFromSelect && yearToSelect) compObject['yearRange'] = {rangeFrom: yearFromSelect, rangeTo: yearToSelect};
        if (!yearFromSelect && yearToSelect) compObject['yearTo'] = yearToSelect;
        if (yearFromSelect && !yearToSelect) compObject['yearFrom'] = yearFromSelect;

        if (priceFromSelect && priceToSelect)compObject['priceRange'] = {rangeFrom: priceFromSelect, rangeTo: priceToSelect};
        if (!priceFromSelect && priceToSelect) compObject['priceTo'] = priceToSelect;
        if (priceFromSelect && !priceToSelect) compObject['priceFrom'] = priceFromSelect;

        console.log (compObject);

        for (var k in compObject) {
            if (compObject.hasOwnProperty(k)) {
                hashSize++;
            }
        }
    }

    function removeSelection() {
        for (var i = 0; i < allCarLots.length; i++) {
            if ($(allCarLots[i]).hasClass('selected')){
                allCarLots[i].classList.remove('selected');
                allCarLots[i].classList.add('rect-style');
            }


        }
    }

    function comparer () {
        if(hashSize == 0) return;
        for (var i = 0; i < marketDbJsonParsed.length; i++)  {
            var counter = 0;
            if (marketDbJsonParsed[i]) {
                if (marketDbJsonParsed[i].brand == compObject.brand) counter++;
                if (marketDbJsonParsed[i].model == compObject.model) counter++;
                if (marketDbJsonParsed[i].color == compObject.color) counter++;
                if (marketDbJsonParsed[i].transmission == compObject.transmission) counter++;
                if (marketDbJsonParsed[i].fuel == compObject.fuel) counter++;
                if (marketDbJsonParsed[i].mileage <= compObject.mileage) counter++;

                if(marketDbJsonParsed[i].year <= compObject.yearTo)counter++;
                if(marketDbJsonParsed[i].year >= compObject.yearFrom)counter++;
                if(compObject.yearRange){
                    if(marketDbJsonParsed[i].year >= compObject.yearRange.rangeFrom && marketDbJsonParsed[i].year <= compObject.yearRange.rangeTo)counter++;
                }

                if(marketDbJsonParsed[i].price <= compObject.priceTo)counter++;
                if(marketDbJsonParsed[i].price >= compObject.priceFrom)counter++;
                if(compObject.priceRange){
                    if(marketDbJsonParsed[i].price >= compObject.priceRange.rangeFrom && marketDbJsonParsed[i].price <= compObject.priceRange.rangeTo)counter++;
                }

            }
            if (counter == hashSize) {
                if ($(allCarLots[i]).hasClass('rect-style')){
                    allCarLots[i].classList.remove('rect-style');
                    allCarLots[i].classList.add('selected');
                }
            }
        }
    }

    function filtration (){
        removeSelection();
        compTemplate();
        comparer();
        printData();
        filterModal.style.display = 'none';
    }


    function resetFilter() {
        color.selectedIndex = 0;
        transmission.selectedIndex = 0;
        mileage.selectedIndex = 0;
        yearFrom.selectedIndex = 0;
        yearTo.selectedIndex = 0;
        priceFrom.value = '';
        priceTo.value = '';
        engine.selectedIndex = 0;
        brand.selectedIndex = 0;
        modelField.innerHTML = '';
        modelEmptyOption();
    }


    function modelEmptyOption (){
        var opt = document.createElement('option');
        modelField.appendChild(opt);
    }


    function printData() {
        var printText = document.getElementById('printable-data');
        printText.innerHTML = '';

        appendTxt('brand', 'Марка');
        appendTxt('model','Модель');
        appendTxt('fuel', 'Двигатель');
        appendTxt('color', 'Цвет');
        appendTxt('mileage', 'Макс.пробег');

        appendNums('priceRange','rangeFrom','rangeTo','Цена');
        appendNums('yearRange','rangeFrom','rangeTo','Год выпуска');

        function appendTxt(item, tag) {
            if(compObject[item]){printText.innerHTML += '<span class="print-data">' + tag + ': '+ compObject[item] + ' </span>'}
        }

        function appendNums(item,num1,num2, tag) {
            if(compObject[item]){
                if (compObject[item][num1] && compObject[item][num1]){
                    printText.innerHTML += '<span class="print-data">'  + tag + ': '+ compObject[item][num1] + '-' +compObject[item][num2] +' </span>';
                }
                if(compObject[item][num1]&& !compObject[item][num1]){
                    printText.innerHTML += '<span class="print-data">'  + tag + ' от' + ': '+ compObject[item][num1] + ' </span>';
                }
                if(compObject[item][num2] && !compObject[item][num1]){
                    printText.innerHTML += '<span class="print-data">' + tag + ' до' + ': '+ compObject[item][num2] + ' </span>';
                }
            }
        }
    }


    var filterButton = document.querySelector('#apply-filter');
    filterButton.addEventListener('click',filtration, false);

    var resetFilterButton = document.querySelector('#reset-filter');
    resetFilterButton.addEventListener('click',resetFilter, false);
}());