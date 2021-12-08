(function(){
    const filterLeft = document.querySelector('.filterLeft');
    const filterRight = document.querySelector('.filterRight');
    const canvasBall = document.querySelector('#canvasBall');

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
    const ctx = canvasBall.getContext('2d');
    const ballList = [];
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
})()