(function(){
    'use strict'
    const rows = document.querySelectorAll('.row');
    const rowStr = ['DancingMachine', 'JukeBox', 'BlueBlood', 'GunMulJu', 'Text', 'Text', 'GSP'];
    // const direction = ['top', 'bottom', 'left', 'right'];
    
    // function setDirection (row, index) {
    //     let directionNum = parseInt(Math.random() * 1000 % 4);
    //     let children = row.childNodes;
    //     children.forEach(function(child, index){
    //         if(child.nodeName == 'DIV'){
    //             child.dataset.direction = direction[directionNum];
    //             console.log(direction[directionNum]);
    //         }
    //     });
    // };

    // rows.forEach(setDirection);
    rows.forEach( function (row, index) {
        if (!row.classList.contains('galleryRow')) {
            new Word(row, rowStr[index]);
        }
    } );
})()