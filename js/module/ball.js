const PI2 = Math.PI * 2;

export class Ball{
  constructor(x, y, vx, vy, radius, color){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx){
    this.x += this.vx;
    this.y += this.vy;

    ctx.save();
    ctx.globalCompositeOperation = '';

    const g = ctx.createRadialGradient(this.x, this.y, this.radius * 0.01, this.x, this.y, this.radius);
    g.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 1)`);
    g.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`);

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, PI2);
    ctx.fill();

    ctx.restore();
  }

  bounceWindow(stageWidth, stageHeight){
    if(this.x > stageWidth || this.x < 0){
      this.vx *= -1;
    }
    if(this.y > stageHeight || this.y < 0){
      this.vy *= -1;
    }
  }
}