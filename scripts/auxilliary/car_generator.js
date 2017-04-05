var carzz = [];

var idNum = 0;

var carGen = {
    cYear: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
    cColor: ['красный','зеленый','синий','черный','желтый','оранжевый'],
    cTransmission: ['механичекая','автоматческая'],
    cFuel: ['бензин','дизель'],
    cOwner: {
        cName: ['Петр','Иван','Георгий','Александр','Елена','Вячеслав','Иосиф', 'Павел'],
        cPhone: function () {
         return '+375(29)7' + (Math.floor(Math.random()*90)+10) + '-'  + (Math.floor(Math.random()*90)+10) + '-'   + (Math.floor(Math.random()*90)+10);
        },


        cEmail: 'info@mycar.com'
    }
}

var carSet = [
    {
        cBrand: 'Audi',
        cModel: ['A4','A6','Q7']
    },
    {
        cBrand: 'BMW',
        cModel: ['3 Series','5 Series','7 Series']
    },
    {
        cBrand: 'Toyota',
        cModel: ['Prius','Corolla','Camri']
    },

    {
        cBrand: 'Volkswagen',
        cModel: ['Golf','Passat','Toureg']
    },
    {
        cBrand: 'Mazda',
        cModel: ['3','6']
    }
];


var idNumz = {
    prefix: ['A','B','E','O','M','T','K','H','P','C','X'],
    region: [1,2,3,4,5,6,7]
}




function carGener() {
var theCar = carSet [Math.floor(Math.random()*carSet.length)];
var carGenerator = {
        id: (Math.floor(Math.random()*8999)+1000)+'-'+idNumz.prefix[Math.floor(Math.random()*idNumz.prefix.length)]+idNumz.prefix[Math.floor(Math.random()*idNumz.prefix.length)]+'-'+idNumz.region[Math.floor(Math.random()*idNumz.region.length)],
        brand: theCar.cBrand,
        model: theCar.cModel[Math.floor(Math.random()*theCar.cModel.length)],
        year: carGen.cYear[Math.floor(Math.random()*carGen.cYear.length)],
        mileage: (Math.floor(Math.random()*100)*1000+5000),
        color: carGen.cColor[Math.floor(Math.random()*carGen.cColor.length)],
        transmission: carGen.cTransmission[Math.floor(Math.random()*carGen.cTransmission.length)],
        fuel: carGen.cFuel[Math.floor(Math.random()*carGen.cFuel.length)],
        images: [],

        price: (Math.floor(Math.random()*15)*1000)+3000,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        owner: {
            name: carGen.cOwner.cName[Math.floor(Math.random()*carGen.cOwner.cName.length)],
            phone: carGen.cOwner.cPhone(),
            email: carGen.cOwner.cEmail
        }
    }
    if (carGenerator.model === 'A4')carGenerator.images = ['images/cars/audi/a4/pic1.jpg','images/cars/audi/a4/pic2.jpg','images/cars/audi/a4/pic3.jpg'];
    if (carGenerator.model === 'A6')carGenerator.images = ['images/cars/audi/a6/pic1.jpg','images/cars/audi/a6/pic2.jpg','images/cars/audi/a6/pic3.jpg'];
    if (carGenerator.model === 'Q7')carGenerator.images = ['images/cars/audi/q7/pic1.jpg','images/cars/audi/q7/pic2.jpg'];
    if (carGenerator.model === '3 Series')carGenerator.images = ['images/cars/bmw/3/pic1.jpg','images/cars/bmw/3/pic2.jpg','images/cars/bmw/3/pic3.jpg','images/cars/bmw/3/pic4.jpg'];
    if (carGenerator.model === '5 Series')carGenerator.images = ['images/cars/bmw/5/pic1.jpg','images/cars/bmw/5/pic2.jpg','images/cars/bmw/5/pic3.jpg','images/cars/bmw/5/pic4.jpg'];
    if (carGenerator.model === '7 Series')carGenerator.images = ['images/cars/bmw/7/pic1.jpg','images/cars/bmw/7/pic2.jpg','images/cars/bmw/7/pic3.jpg','images/cars/bmw/7/pic4.jpg','images/cars/bmw/7/pic5.jpg'];
    if (carGenerator.model === 'Prius')carGenerator.images = ['images/cars/toyota/prius/pic1.jpg','images/cars/toyota/prius/pic2.jpg','images/cars/toyota/prius/pic3.jpg','images/cars/toyota/prius/pic4.jpg'];
    if (carGenerator.model === 'Corolla')carGenerator.images = ['images/cars/toyota/corolla/pic1.jpg','images/cars/toyota/corolla/pic2.jpg','images/cars/toyota/corolla/pic3.jpg','images/cars/toyota/corolla/pic4.jpg'];
    if (carGenerator.model === 'Camri')carGenerator.images = ['images/cars/toyota/camri/pic1.jpg','images/cars/toyota/camri/pic2.jpg','images/cars/toyota/camri/pic3.jpg','images/cars/toyota/camri/pic4.jpg'];
    if (carGenerator.model === 'Golf')carGenerator.images = ['images/cars/vw/golf/pic1.jpg','images/cars/vw/golf/pic2.jpg','images/cars/vw/golf/pic3.jpg'];
    if (carGenerator.model === 'Passat')carGenerator.images =['images/cars/vw/passat/pic1.jpg','images/cars/vw/passat/pic2.jpg','images/cars/vw/passat/pic3.jpg','images/cars/vw/passat/pic4.jpg'];
    if (carGenerator.model === 'Toureg')carGenerator.images =['images/cars/vw/toureg/pic1.jpg','images/cars/vw/toureg/pic2.jpg','images/cars/vw/toureg/pic3.jpg','images/cars/vw/toureg/pic4.jpg']
    if (carGenerator.model === '3')carGenerator.images = ['images/cars/mazda/3/pic1.jpg','images/cars/mazda/3/pic2.jpg','images/cars/mazda/3/pic3.jpg','images/cars/mazda/3/pic4.jpg'];
    if (carGenerator.model === '6')carGenerator.images =['images/cars/mazda/6/pic1.jpg','images/cars/mazda/6/pic2.jpg','images/cars/mazda/6/pic3.jpg','images/cars/mazda/6/pic4.jpg','images/cars/mazda/6/pic5.jpg'];


    carzz.push(carGenerator);
}

for (var i = 0; i < 500; i++){
    carGener();

}

var converter = JSON.stringify(carzz);
console.log (converter);

