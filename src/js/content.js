(function(){
    const galleryGround = document.querySelector('.galleryGround');
    const contentCon = document.querySelector('.contentCon');
    const closeBox = document.querySelector('.closeBox');

    const filterLeft = document.querySelector('.filterLeft');
    const filterRight = document.querySelector('.filterRight');

    const canvasBall = document.querySelector('#canvasBall');
    const ctx = canvasBall.getContext('2d');
    const ballList = [];

    const instaItems = document.querySelector('.instaItems');
    const instaItemList = document.querySelectorAll('.instaItem');
    let instaItemIndex = 0;
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
    let mouseDownXPos;
    let mouseUpXPos;

    instaItems.addEventListener('dragstart', function(e){
        mouseDownXPos = e.pageX;
        console.log(e.pageX);
    });
    // instaItems.addEventListener('drag', function(e){
    //     instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + (mouseDownXPos - e.pageX) + 'px';
    // });
    instaItems.addEventListener('dragend', function(e){
        mouseUpXPos = e.pageX;
        if (mouseDownXPos > mouseUpXPos) {
            instaItemIndex++;
        }
        else if (mouseDownXPos < mouseUpXPos) {
            instaItemIndex--;
        }
        instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    });
})()