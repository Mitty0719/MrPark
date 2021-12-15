(function(){
    'use strict'
    const loadCon = document.querySelector('.loadCon');
    const progressList = document.querySelectorAll('.progress');
    const closeLoad = document.querySelector('.closeLoad');

    const rowSpace = document.querySelector('.rowSpace');
    const rows = document.querySelectorAll('.row');
    const galleryGround = document.querySelector('.galleryGround');

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

    window.addEventListener('mousemove', function (e) {
        // mouseCursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
        mouseCursorRound(e);
    });

    // mouse focusing 설정
    function mouseCursorRound (e) {
        mouseCursor.style.top = (e.clientY - 25) + 'px';
        mouseCursor.style.left = (e.clientX - 25) + 'px';
    }

    // mouse 색상변경
    changeCursorPointer(galleryGround);
    changeCursorPointer(closeLoad);

    // row설정
    rows.forEach(function (row, index) {
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

    // word effect 설정
    function moveWords (e) {
        let elem = e.target;
        if(elem.classList.contains('rowChar')){
            elem.classList.add('rowCharMove');
            setTimeout(function(){ elem.classList.remove('rowCharMove'); }, 2000);
        };
    }

    rowSpace.addEventListener( 'mouseover', moveWords );

    // loadCon 설정
    progressList.forEach( function(progress, index){
        setTimeout( () => progress.style.width = '100%', 1000*index);
    });
    closeLoad.addEventListener('click', function(){
        loadCon.style.opacity = '0%';
        setTimeout( () => loadCon.style.display = 'none', 2000);
    });
})()