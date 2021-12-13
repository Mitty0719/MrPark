const mouseCursor = document.querySelector('.mouseCursor');

function changeCursorPointer(elem){
    elem.addEventListener('mouseenter', function(e){
        mouseCursor.style.backgroundColor = 'rgba(0, 255, 0, 0.5)';
    });
    elem.addEventListener('mouseleave', function(e){
        mouseCursor.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
    });
}