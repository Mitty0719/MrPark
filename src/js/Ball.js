class Ball{
    constructor(x, y, canvas, ctx){ // ball 기본속성
        this.x = x; // x좌표
        this.y = y; // y좌표
        this.c = 'red'; // 시작할 때 공의 색깔
        this.size = parseInt(Math.random() * 1000 % 120 + 30); // 공의 반지름
        this.power = 1; // 공의 움직임 세기
        this.gravity = this.power; // 공이 상하로 움직이는 값
        this.directionX = parseInt(Math.random() * 1000 % 40 - 20); // 공이 좌우로 움직이는 값
        this.img = new Image();
        this.img.src = '../images/ball00'+ parseInt(Math.random() * 1000 % 5 + 1)  +'.png';

        // 나중에 개선하기, 프로토타입에 옮길까??
        this.canvas = canvas;
        this.ctx = ctx;
    };

    update(){ // 프레임마다 속성을 변화시킴
        //y값 변동 계산
        this.y += this.gravity;
        this.gravity += 0.1; // 중력 값
        if(this.y + this.size >= this.canvas.height || this.y - this.size <= 0){ // 상하단 바운드
            // console.log(this.y);
            this.gravity *= -0.8; // 상하에 닿으면 방향을 전환
            this.y = this.canvas.height - this.size; // if문이 계속돌지 않게 y값 초기화
        }
        //y값 0 고정
        if(this.canvas.height - this.y  < Number.EPSILON){
            this.gravity = 0;
        }

        //x값 변동 계산
        this.x += this.directionX;
        this.directionX *= 0.998;
        // console.log(this.x);
        if(this.x + this.size > this.canvas.width || this.x - this.size < 0){
            this.directionX *= -1;
        }
    };

    draw(){ // 속성값을 바탕으로 캔버스에 원 그리기
        // this.ctx.fillStyle = this.c;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, true);
        this.ctx.closePath();
        this.ctx.drawImage(this.img, this.x - this.size, this.y - this.size, this.size*2, this.size*2);

        this.ctx.fill();
    };
}

Ball.prototype = {
    constructor: Ball,
}