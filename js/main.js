(function(){
    'use strict'
    const mouseCursor = document.querySelector('.mouseCursor');
    const rows = document.querySelectorAll('.row');
    const galleryGround = document.querySelector('.galleryGround');
    const contentCon = document.querySelector('.contentCon')
    const closeBox = document.querySelector('.closeBox');

    const rowStr = ['DancingMachine', 'JukeBox', 'DataEngineer', 'GunMulJu', 'HYUNA', 'ArianaGrande', 'GSP'];
    const imgSrc = [];
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

    // mouse focusing 설정
    window.addEventListener( 'mousemove', function (e) {
        // mouseCursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
        mouseCursor.style.top = (e.clientY - 25) + 'px';
        mouseCursor.style.left = (e.clientX - 25) + 'px';
    });

    // row설정
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

    // gallery 설정
    // function moveGallery () {
        // const galleryImgs = document.querySelectorAll('.galleryImg');
        // galleryImgs.forEach(function( img, index ){
            // console.log(window.getComputedStyle(img).getPropertyValue('height'));
            // console.log(index);
            // img.style.top = ( index * parseInt(window.getComputedStyle(img).getPropertyValue('height')) ) + 'px';
        // })

        // galleryImgBox.insertBefore(lastImg, firstImg);
    // };

    // content 설정
    function showContent () {
        // contentCon.style.display = 'block';
    }
    function closeContent() {
        // contentCon.style.display = 'none';
    }

    galleryGround.addEventListener('click', showContent);
    closeBox.addEventListener('click', closeContent)
})()