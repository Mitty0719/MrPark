export class Person{
  constructor(dom, stageWidth, stageHeight, personType){
    this.person = dom;
    this.x = 0;
    this.y = 0;
    this.width = personType.width;
    this.height = personType.height;
    this.speed = 2;
    this.direction = 1;
    this.reply = '';

    this.setPosition(stageWidth, stageHeight);
  }
  setPosition(stageWidth, stageHeight){
    this.x = -this.width;
    this.y = stageHeight / 2;

    this.person.style.top = `${this.y}px`;
  }
  move(){
    this.x += this.speed * this.direction;
    this.person.style.left = `${this.x}px`;
  }
  stop(){

  }
}