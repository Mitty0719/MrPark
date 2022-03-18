import { getRandomSign } from "../util.js";

export class Gallery01{
  constructor(stageWidth, stageHeight){
    this.frame = document.querySelector('.monaFrame');
    this.title = document.querySelector('.monaDesc h1');
    this.description = document.querySelector('.monaDesc p');
    this.geometryCon = document.querySelector('.geometryCon');
    this.geometryItems = [];
    this.resize(stageWidth, stageHeight);

    this.frameClickHandler = this.showGeometryCon.bind(this)
    this.geometryClickHandler = this.createGeometryItem.bind(this)

    this.frame.addEventListener('click', this.frameClickHandler);
  }

  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  showGeometryCon(){
    this.geometryCon.classList.add('activate');
    this.geometryCon.addEventListener('click', this.geometryClickHandler);
  }

  createGeometryItem(){
    const item = document.createElement('div');
    const img = document.createElement('img');
    img.src = `./images/geometry.svg?${new Date().getTime()}`;
    
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
  close(){
    this.geometryCon.innerHTML = ``;
    this.geometryCon.classList.remove('activate');
    this.geometryItems = [];
    this.frame.removeEventListener('click', this.frameClickHandler);
    this.geometryCon.removeEventListener('click', this.geometryClickHandler);
  }
}