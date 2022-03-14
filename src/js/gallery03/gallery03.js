export class Gallery03{
  constructor(){
    const canvasBall = document.querySelector('#canvasBall');
    const ctx = canvasBall.getContext('2d');
    const ballList = [];
    // Content 3 - FaceBall
    let img = new Image;
    img.src = '/images/gugue.png';
    img.width = '100vw';
    img.htight = '100vh';
    function makeBall (e) {
        ballList.push(new Ball(e.clientX, e.clientY, canvasBall, ctx))
    };
    function animateBall () { // 매 프레임마다 벌어지는 일들
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(0, 0, canvasBall.width, canvasBall.height); // 캔버스 전체를 색칠해서 내용 지움
        ctx.drawImage(img, 0, 0, canvasBall.width, canvasBall.height);
        ballList.forEach(function(ball){
            ball.update(); // ball1의 정보를 업데이트
            ball.draw(); // ball1 새로 그림
        })
        content3TimeId = window.requestAnimationFrame(animateBall);
    };
    
    function releaseContent3 () {
        canvasBall.width = window.innerWidth;
        canvasBall.height = window.innerHeight;
        canvasBall.addEventListener('click', makeBall);
        animateBall();
        console.log(img);
    }
    function unreleaseContent3 () {
        window.cancelAnimationFrame(content3TimeId);
        canvasBall.removeEventListener('click', makeBall);

        // ballList 초기화
        setTimeout(function(){
            ballList.length = 0;
        }, 1000);
    }
  }
}