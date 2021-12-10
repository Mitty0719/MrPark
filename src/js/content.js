(function(){
    const galleryGround = document.querySelector('.galleryGround');
    const contentCon = document.querySelector('.contentCon');
    const closeBox = document.querySelector('.closeBox');

    const filterLeft = document.querySelector('.filterLeft');
    const filterRight = document.querySelector('.filterRight');

    const youtubeVideo = document.querySelector('.youtubeVideo video');

    const canvasBall = document.querySelector('#canvasBall');
    const ctx = canvasBall.getContext('2d');
    const ballList = [];

    const instaItemCon = document.querySelector('.instaItemCon');
    const instaItems = document.querySelector('.instaItems');
    const instaItemList = document.querySelectorAll('.instaItem');
    const instaVideo = document.querySelector('.instaVideo');
    let instaItemIndex = 0;
    let instaItemMaxIndex = document.querySelectorAll('.instaItem').length;
    let instaItemWidth = parseInt(window.getComputedStyle(instaItems).getPropertyValue('width'));

    // window resize
    window.addEventListener('resize', function(e){
        instaItemWidth = parseInt(window.getComputedStyle(instaItems).getPropertyValue('width'));
    });

    // content 설정
    function showContent (e) {
        // contentCon.style.display = 'block';
        let elem = e.target;
        while(!elem.classList.contains('galleryImg')){
            if(elem.nodeName == 'BODY'){
                elem = null;
                return;
            }
            elem = elem.parentNode;
        }
        // contentCon.style.top = (parseInt(target.dataset.index)-1) * 20 + 'vh';

        contentCon.dataset.state = 'open';
        contentCon.dataset.openIndex = elem.dataset.index;
        console.log(elem.dataset.index)
    }
    function closeContent(e) {
        contentCon.dataset.state = 'close';
        // ballList 초기화
        setTimeout(function(){
            ballList.length = 0;
        }, 1000);

        // instaItem Index 초기화
        resetInstaIndex();

        stopVideo(instaVideo);
        stopVideo(youtubeVideo);
    }
    function stopVideo(video){
        video.pause();
        video.currentTime = 0;
        video.load();
    }

    galleryGround.addEventListener( 'click', showContent );
    closeBox.addEventListener('click', closeContent)
    
    // Content 1 - HalfFilter
    filterLeft.addEventListener('mouseover', setHalfFilter);
    filterRight.addEventListener('mouseover', setHalfFilter);

    function setHalfFilter (e) {
        const under100 = parseInt(Math.random() * 1000 % 100);
        const under200 = parseInt(Math.random() * 1000 % 300 + 50);
        const degree = parseInt(Math.random() * 1000 % 180);

        let contrast = 'contrast(' + under200 + '%) ';
        let hueRotate = 'hue-rotate(' + degree + 'deg) ';
        let invert = 'invert(' + under100 + '%) ';
        let saturate = 'saturate(' + under200 + '%) ';

        this.style.filter = contrast + hueRotate + saturate;
    };

    // Content 3 - FaceBall
    canvasBall.width = window.innerWidth;
    canvasBall.height = window.innerHeight;
    function makeBall (e) {
        ballList.push(new Ball(e.clientX, e.clientY, canvasBall, ctx))
    };

    function animateBall () { // 매 프레임마다 벌어지는 일들
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(0, 0, canvasBall.width, canvasBall.height); // 캔버스 전체를 색칠해서 내용 지움
        ballList.forEach(function(ball){
            ball.update(); // ball1의 정보를 업데이트
            ball.draw(); // ball1 새로 그림
        })
        requestAnimationFrame(animateBall);
    };
    canvasBall.addEventListener('click', makeBall);
    animateBall();

    // Content 4 - Instagram
    // video 태그 drag 이벤트 안먹어서 click으로 수정
    // let mouseDownXPos;
    // let mouseUpXPos;
    // instaItemCon.addEventListener('dragstart', function(e){
    //     mouseDownXPos = e.pageX;
    // });
    // instaItems.addEventListener('drag', function(e){
    //     instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + (mouseDownXPos - e.pageX) + 'px';
    // });
    // instaItemCon.addEventListener('dragend', function(e){
    //     console.log(e.target);
    //     mouseUpXPos = e.pageX;
    //     if (mouseDownXPos > mouseUpXPos) {
    //         instaItemIndex++;
    //     }
    //     else if (mouseDownXPos < mouseUpXPos) {
    //         instaItemIndex--;
    //     }
    //     instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    // });
    instaItemCon.addEventListener('click', moveInstaItem);

    function moveInstaItem (e) {
        instaItemIndex++;
        if(instaItemIndex >= instaItemMaxIndex) {
            instaItemIndex = 0;
            stopVideo(instaVideo);
        }
        instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    }
    function resetInstaIndex () {
        instaItemIndex = 0;
        stopVideo(instaVideo);
        instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    }
})()