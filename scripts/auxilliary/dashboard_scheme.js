(function () {
    var rectX = 0;
    var rectY = 0;
    var counter = 0;
    var rows = 0;
    var svg = document.querySelector('#layer2');

    function addRects() {
        if(counter % 26 === 0) {
            rows++;
            if (rows === 9) return;

            rectX = 0;
            rectY += 23;
        }

        var g = document.createElementNS('http://www.w3.org/2000/svg','g');
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.classList.add('dashboard-rect');
        rect.setAttribute('x',rectX);
        rect.setAttribute('y',rectY);
        rect.setAttribute('height',18);
        rect.setAttribute('width',27);
        rect.setAttribute('ng-click','svgCtrl.selectDashRect($event)');
        rect.setAttribute('data-index', counter);


        rectX += 32;

        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.classList.add('num-style');
        text.style.fill = 'black';
        text.textContent = counter + 1;
        text.setAttribute('y', rectY+15);
        if (counter < 9) {
            text.setAttribute('x', rectX-22);
        }

        if (counter >= 9 && counter < 99) {
            text.setAttribute('x', rectX-24);
        }

        if (counter >= 99) {
            text.setAttribute('x', rectX-30);
        }


        g.appendChild(text);
        g.appendChild(rect);
        g.classList.add('db-group-style');
        g.setAttribute('data-index',counter);
        counter++;

        svg.appendChild(g);

        return addRects();
    }

    addRects(rectX, rectY);
}());
