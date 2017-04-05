 var carModal1 = document.querySelector('#car-modal'),
    filterModal = document.querySelector('#filter-modal'),
    statisticsModal = document.querySelector('#statistics-modal'),
    dashboardModal = document.querySelector('#dashboard-modal');

document.body.addEventListener('click', openModals, false);
document.body.addEventListener('click', closeModal, false);


function openModals(event) {
    var target = event.target;
    if(target.getAttribute('href') == '#filter') {
        filterModal.style.display = 'block';
    }

    if(target.getAttribute('href') == '#dashboard') {
        dashboardModal.style.display = 'block';
    }

    if(target.getAttribute('href') == '#statistics') {
        statisticsModal.style.display = 'block';
    }
}


//REVIEW

function closeModal(event) {
    var target = event.target;
    if (target.className == 'close'){
        carModal1.style.display = 'none';
        filterModal.style.display = 'none';
        dashboardModal.style.display = 'none';
        statisticsModal.style.display = 'none';
        window.history.pushState(null,null,"#main");
    }
};


