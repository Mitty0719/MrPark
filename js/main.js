(function(){
    'use strict'
    const rows = document.querySelectorAll('.row');
    const rowStr = ['DancingMachine', 'JukeBox', 'DataEngineer', 'GunMulJu', 'HYUNA', 'ArianaGrande', 'GSP'];
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
            let rowText = new Word(row, rowStr[index], index);
            // row 색상 설정
            if( index % 2 == 0 ) {
                row.classList.add( 'rowEven' );
            } else {
                row.classList.add( 'rowOdd' );
            }
        }
    } );
})()