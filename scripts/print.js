(function () {
    var printBtn = document.getElementById('print');
    printBtn.addEventListener('click',printScheme);

    function printScheme() {
        window.print();
    }

}());


