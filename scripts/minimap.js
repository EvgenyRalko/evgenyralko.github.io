(function () {
    var plusBtn = document.querySelector('#plus'),
        minusBtn = document.querySelector('#minus'),
        resetBtn = document.querySelector('#reset'),
        svgMap = document.querySelector('svg');

//canvas
    var canvasBackground = document.getElementById('minimap-background'),
        contextBackground = canvasBackground.getContext('2d');

    var canvasViewport = document.getElementById('minimap-viewport'),
        contextViewport = canvasViewport.getContext('2d');

//minimap coordinates
    var canvSvgQ = 3.2,
        canvX = 0,
        canvY = 0,
        canvHeight = 170,
        canvWidth = 300;


//map dragging
    var draggable = false,
        coordX = null,
        coordY = null;

//Minimap toggle
    var mapSwitch = document.getElementById('map_toggle');



//Event listenters
    plusBtn.addEventListener('click', zoom, false);
    minusBtn.addEventListener('click', zoom, false);
    resetBtn.addEventListener('click', zoom, false);
    svgMap.addEventListener('wheel',zoom,false);
    svgMap.addEventListener('mousedown', startDragging, false);
    svgMap.addEventListener('mousemove', dragging, false);
    svgMap.addEventListener('mouseup', stopDragging, false);
    mapSwitch.addEventListener('click', mapToggle, false);

//Program starts here
    minimapBackground();
    drawCanvasViewport(0,0,300,175);

//FUNCTIONS
    function zoom(event) {
        var target = event.target,
            zoomConst = 1.15;

        var viewBox = svgMap.getAttribute('viewBox'),
            viewBoxSplit = viewBox.split(' '),
            viewBoxX = Number(viewBoxSplit[2]),
            viewBoxY = Number(viewBoxSplit[3]);

        if (target.id === 'plus') {
            zoomIn();
        }

        if (target.id === 'minus') {
            zoomOut();
        }

        if (event.deltaY < 0) {
            event.preventDefault();
            zoomIn();
        }

        if (event.deltaY > 0) {
            event.preventDefault();
            zoomOut();
        }

        if (target.id === 'reset') {
            viewBoxSplit[0] = 0;
            viewBoxSplit[1] = 0;
            viewBoxSplit[2] = 960;
            viewBoxSplit[3] = 560;
            viewBoxJoined = viewBoxSplit.join(' ');
            svgMap.setAttribute('viewBox', viewBoxJoined);

            canvX = 0;
            canvY = 0;
            canvWidth = 300;
            canvHeight = 175;

            drawCanvasViewport(canvX,canvY,canvWidth,canvHeight);
        }

        function zoomOut() {
            if (viewBoxX > 959 || viewBoxY > 559)
                return;
            viewBoxSplit[2] = viewBoxX * zoomConst;
            viewBoxSplit[3] = viewBoxY * zoomConst;
            viewBoxJoined = viewBoxSplit.join(' ');
            svgMap.setAttribute('viewBox', viewBoxJoined);

            canvHeight = canvHeight * zoomConst;
            canvWidth = canvWidth * zoomConst;


            drawCanvasViewport(canvX,canvY,canvWidth,canvHeight);
        }

        function zoomIn() {
            if (viewBoxX < 500 || viewBoxY < 300)
                return;
            viewBoxSplit[2] = viewBoxX / zoomConst;
            viewBoxSplit[3] = viewBoxY / zoomConst;
            viewBoxJoined = viewBoxSplit.join(' ');
            svgMap.setAttribute('viewBox', viewBoxJoined);

            canvHeight = canvHeight / zoomConst;
            canvWidth = canvWidth / zoomConst;

            drawCanvasViewport(canvX,canvY,canvWidth,canvHeight);
        }
    }

//Minimap viewport builder

    function drawCanvasViewport(a,b,c,d) {

        contextViewport.clearRect(0,0,300,175);
        contextViewport.lineWidth = 3;
        contextViewport.strokeStyle = 'green';
        contextViewport.strokeRect(a, b, c, d);
    }

//Minimap background builder
    function minimapBackground() {
        var minimapImage = new Image();
        minimapImage.src = 'images/small-map_resized.jpg';
        minimapImage.onload = function () {
            contextBackground.save();
            contextBackground.globalAlpha = 0.5;
            contextBackground.drawImage(minimapImage, 0, 0);
            contextBackground.restore();
        }
    }

//Minimap and SVG-map dragging
    function startDragging (event) {
        draggable = true;
        coordX = event.pageX;
        coordY = event.pageY;
    }

    function dragging(event) {
        if (!draggable) return;

        var target = event.target,
            viewBox = svgMap.getAttribute('viewBox'),
            viewBoxSplit = viewBox.split(' '),
            viewBoxX = Number(viewBoxSplit[0]),
            viewBoxY = Number(viewBoxSplit[1]);

        viewBoxSplit[0] = viewBoxX + (coordX - event.pageX);
        viewBoxSplit[1] = viewBoxY + (coordY - event.pageY);
        viewBoxJoined = viewBoxSplit.join(' ');
        svgMap.setAttribute('viewBox', viewBoxJoined);
        coordX = event.pageX;
        coordY = event.pageY;
        canvX = viewBoxSplit[0]/canvSvgQ;
        canvY = viewBoxSplit[1]/canvSvgQ;

        drawCanvasViewport(canvX,canvY,canvWidth,canvHeight);
    }

    function stopDragging() {
        return draggable = false;
    }



//Hide&show the map
    function mapToggle (){

        if (mapSwitch.checked === true){
            canvasBackground.style.display = 'block';
            canvasViewport.style.display = 'block';
        } else {
            canvasBackground.style.display = 'none';
            canvasViewport.style.display = 'none';
        }

    }

}());

