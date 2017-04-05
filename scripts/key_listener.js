var keyListener = {};

document.body.addEventListener('keydown',function (event) {
    event.preventDefault();
    keyListener [event.keyCode] = true;
    console.log (keyListener);
});
document.body.addEventListener('keyup', function (event) {
    event.preventDefault();
    delete keyListener [event.keyCode];
    console.log (keyListener);
});
document.body.addEventListener('keydown', moveViewBox, false);

function moveViewBox(event) {

    var viewBox = svgMap.getAttribute('viewBox'),
        viewBoxSplitted = viewBox.split(' '),
        viewBoxX = Number(viewBoxSplitted[0]),
        viewBoxY = Number(viewBoxSplitted[1]);

    if (keyListener[37]){

        viewBoxSplitted[0] = viewBoxX - 10;
        viewBoxJoined = viewBoxSplitted.join(' ');
        svgMap.setAttribute('viewBox', viewBoxJoined);
    }

    if (keyListener[38]){

        viewBoxSplitted[1] = viewBoxY - 10;
        viewBoxJoined = viewBoxSplitted.join(' ');
        svgMap.setAttribute('viewBox', viewBoxJoined);
    }

    if (keyListener[39]){

        viewBoxSplitted[0] = viewBoxX + 10;
        viewBoxJoined = viewBoxSplitted.join(' ');
        svgMap.setAttribute('viewBox', viewBoxJoined);
    }

    if (keyListener[40]){
        viewBoxSplitted[1] = viewBoxY + 10;
        viewBoxJoined = viewBoxSplitted.join(' ');
        svgMap.setAttribute('viewBox', viewBoxJoined);
    }
}



