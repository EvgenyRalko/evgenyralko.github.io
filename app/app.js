(function () {
    var app = angular.module('marketApp',[]);

    app.controller('SvgController', function ($scope) {

        this.carSelector = function (num) {
            if (allCars[num]){$scope.theCar = allCars[num];
                $scope.lotNum = num+1;
                $scope.carImg = allCars[num].images[0];

                var carModalApp = document.querySelector('#car-modal');
                carModalApp.style.display = 'block';
            }else{
                alert ('Место свободно');
            }
        }


        this.selectDashRect = function ($event) {
            var target = $event.target;
            $scope.theCar = allCars[target.getAttribute('data-index')];

            if ($('.dashRectSelected')){
                $('.dashRectSelected').removeClass('dashRectSelected')
                    .addClass('dashboard-rect');
            }
            $(target).removeClass('dashboard-rect')
                .addClass('dashRectSelected');

            $scope.selectedItem = Number(target.getAttribute('data-index'));

        }



        this.carCounter = function () {
            $scope.cCounter = 0;
            for (var i = 0; i < allCars.length; i++) {
                if (allCars[i]) $scope.cCounter++;
            }
        }
    });


    app.directive ('carModal', function () {
        return{
            require: 'E',
            templateUrl: 'app/car-info.template.html',
            controller:  function ($scope) {
                $scope.theCar = {};
                $scope.lotNum = 0;


                this.previousImg = function () {
                    console.log ($scope.theCar);
                    if ($scope.carImg === $scope.theCar.images[0]){
                        $scope.carImg = $scope.theCar.images[$scope.theCar.images.length-1];
                    } else {
                        $scope.carImg = $scope.theCar.images[$scope.theCar.images.indexOf($scope.carImg) - 1];
                    }
                }

                this.nextImg = function () {
                    if ($scope.carImg === $scope.theCar.images[$scope.theCar.images.length-1]){
                        $scope.carImg = $scope.theCar.images[0];
                    } else {
                        $scope.carImg = $scope.theCar.images[$scope.theCar.images.indexOf($scope.carImg) + 1];
                    }
                }

            },
            controllerAs: 'modalCtrl'
        }
    });


    app.directive ('dashboardDirective', function () {
        return {
            require: 'E',
            templateUrl: 'app/dashboard.template.html',
            controller: function ($scope) {
                this.allVehicles = allCarsDb;
                $scope.theCar = {};
                this.clearLot = function () {
                    if($scope.selectedItem){
                        allCars[$scope.selectedItem] = null;
                        localStorage.marketDb = JSON.stringify(allCars);
                    }
                }

            },
            controllerAs: 'dash'
        }
    })

    var allCars = JSON.parse(localStorage.marketDb);
    var allCarsDb = JSON.parse(localStorage.carsDb);

}());
