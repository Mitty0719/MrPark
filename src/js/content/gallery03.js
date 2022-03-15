import { Ball } from '../module/ball.js';

export class Gallery03 {
  constructor(stageWidth, stageHeight) {
    this.canvas = document.querySelector('#canvasBall');
    this.ctx = canvasBall.getContext('2d');
    this.ballList = [];
    this.resize(stageWidth, stageHeight);

    requestAnimationFrame(this.animate.bind(this));

    setTimeout(()=>{
      document.addEventListener('click', this.makeBall.bind(this));
    }, 1000);
  }

  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(1, 1);
  }

  makeBall(e) {
    this.ballList.push(new Ball(e.clientX, e.clientY));
  };

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ballList.forEach(ball => {
      ball.draw(this.ctx, this.stageWidth, this.stageHeight);
    })
  };
}