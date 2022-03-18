import { getRandomSign } from "../util.js";

export class Gallery01{
  constructor(stageWidth, stageHeight){
    this.frame = document.querySelector('.monaFrame');
    this.title = document.querySelector('.monaDesc h1');
    this.description = document.querySelector('.monaDesc p');
    this.geometryCon = document.querySelector('.geometryCon');
    this.geometryItems = [];
    this.resize(stageWidth, stageHeight);

    this.frame.addEventListener('click', this.showGeometryCon.bind(this));
  }

  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  showGeometryCon(){
    this.geometryCon.classList.add('activate');
    window.addEventListener('click', this.createGeometryItem.bind(this));
  }

  createGeometryItem(){
    const item = document.createElement('div');
    const img = document.createElement('img');
    img.src = './images/geometry.svg';
    let scale, x, y;

    if(this.geometryItems.length === 0){
      scale = 1;
      x = 0;
      y = 0;
    }else{
      scale = (Math.random() * 2);
      x = Math.random() * (this.stageWidth / 2) * getRandomSign();
      y = Math.random() * (this.stageHeight / 2) * getRandomSign();
    }

    img.classList.add('geometryImg');
    item.classList.add('geometryItem');
    item.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

    item.appendChild(img);
    this.geometryCon.appendChild(item);
    this.geometryItems.push(item);
  }
  // moveGeometryCon(e){
  //   const x = e.clientX - (this.stageWidth / 2);
  //   const y = e.clientY - (this.stageHeight / 2);

  //   this.geometryItems.forEach((item, index) => {
  //     const moveX = -(x / 3);
  //     const moveY = -(y / 3);
  //     item.style.transform = `scale(${this.geometryScale[index]}) translate(${moveX}px, ${moveY}px)`;
  //   })
  // }
}