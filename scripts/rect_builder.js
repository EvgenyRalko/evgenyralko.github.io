(function () {
    var rectX = 25;
    var rectY = 18;
    var counter = 0;
    var rectNum = 0;
    var svg = document.querySelector('#layer1');

    function addRects() {
        if(rectX > 900) {
            counter++;
            if (counter === 8) {
                return;
            }
            if (counter % 2 === 0) {
                rectX = 25;
                rectY += 45;
            } else {
                if (counter == 1){
                    rectX = 25;
                    rectY += 82;
                }else {
                    rectX = 25;
                    rectY += 88;
                }
            }
        }
        var g = document.createElementNS('http://www.w3.org/2000/svg','g');
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.classList.add('rect-style');
        rect.classList.add('rect-elem');
        rect.setAttribute('x',rectX);
        rect.setAttribute('y',rectY);
        rect.setAttribute('height',40);
        rect.setAttribute('width',30);


        rectX += 35;

        var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.classList.add('num-style');
        text.textContent = rectNum + 1;

        if (rectNum < 9) {
            text.setAttribute('x', rectX-25);
            text.setAttribute('y', rectY+25);
        }

        if (rectNum >= 9 && rectNum < 99) {
            text.setAttribute('x', rectX-29);
            text.setAttribute('y', rectY+25);
        }

        if (rectNum >= 99) {
            text.setAttribute('x', rectX-32);
            text.setAttribute('y', rectY+25);
        }

        g.appendChild(rect);
        g.appendChild(text);
        g.classList.add('group-style');
        g.setAttribute('data-index',rectNum);
        g.setAttribute('ng-click','svgCtrl.carSelector('+rectNum+')');
        rectNum++;

        svg.appendChild(g);

        return addRects();
    }

    addRects(rectX, rectY);
}());
