(function () {
    window.onhashchange = changeState;
    var carModal1 = document.querySelector('#car-modal'),
        filterModal = document.querySelector('#filter-modal'),
        statisticsModal = document.querySelector('#statistics-modal'),
        dashboardModal = document.querySelector('#dashboard-modal');

    function changeState() {
        var hash = window.location.hash;
        var cleanHash = hash.slice(1);

        switch (cleanHash){
            case "":
                closeModalsSpa();
                break;
            case "filter":
                closeModalsSpa();
                filterModal.style.display = 'block';
                break;
            case "statistics":
                closeModalsSpa();
                statisticsModal.style.display = 'block';
                break;
            case "dashboard":
                closeModalsSpa();
                dashboardModal.style.display = 'block';
                break;
            case "main":
                closeModalsSpa();
                break;
        }


    }

    function closeModalsSpa() {
        carModal1.style.display = 'none';
        filterModal.style.display = 'none';
        dashboardModal.style.display = 'none';
        statisticsModal.style.display = 'none';
    }
}());


