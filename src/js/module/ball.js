export class Ball {
  constructor(x, y) { // ball 기본속성
    this.x = x;
    this.y = y;
    this.size = Math.floor(Math.random() * 120 + 30); // 공의 반지름
    this.power = 1; // 공의 움직임 세기
    this.gravity = this.power; // 공이 상하로 움직이는 값
    this.directionX = Math.floor(Math.random() * 40 - 20); // 공이 좌우로 움직이는 값
    this.img = new Image();
    this.img.src = './images/ball00' + Math.floor(Math.random() * 5 + 1) + '.png';
  };

  bounceWindow(stageWidth, stageHeight) {
    if (this.y + this.size >= stageHeight || this.y - this.size <= 0) { // 상하단 바운드
      // console.log(this.y);
      this.gravity *= -0.8; // 상하에 닿으면 방향을 전환
      this.y = stageHeight - this.size; // if문이 계속돌지 않게 y값 초기화
    }

    if (this.x + this.size > stageWidth || this.x - this.size < 0) {
      this.directionX *= -1;
    }
  };

  draw(ctx, stageWidth, stageHeight) {
    //y값 변동 계산
    this.y += this.gravity;
    this.gravity += 0.1; // 중력 값
    //x값 변동 계산
    this.x += this.directionX;
    this.directionX *= 0.998;

    this.bounceWindow(stageWidth, stageHeight);

    ctx.save();

    ctx.beginPath();
    // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.drawImage(this.img, this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
    ctx.fill();

    ctx.restore();
  };
}