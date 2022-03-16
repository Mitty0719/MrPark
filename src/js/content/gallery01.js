export class Gallery01{
  constructor(stageWidth, stageHeight){
    this.frame = document.querySelector('.monaFrame');
    this.title = document.querySelector('.monaDesc h1');
    this.description = document.querySelector('.monaDesc p');
    this.geometryCon = document.querySelector('.geometryCon');
    this.geometryItems = [];
    this.geometryScale = [];
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.frame.addEventListener('click', this.showGeometryCon.bind(this));
    document.addEventListener('mousemove', this.moveGeometryCon.bind(this));
  }

  showGeometryCon(){
    this.geometryCon.classList.add('activate');
    this.createGeometryItem(40);
  }

  createGeometryItem(index){
    for(let i = 1; i <= index; i++){
      const item = document.createElement('div');
      const img = document.createElement('img');
      img.src = './images/geometry.svg';
      const scale = 1.2 / i;

      img.classList.add('geometryImg');
      item.classList.add('geometryItem');
      item.style.transform = `scale(${scale})`;

      item.appendChild(img);
      this.geometryCon.appendChild(item);
      this.geometryItems.push(item);
      this.geometryScale.push(scale);
    }
  }
  moveGeometryCon(e){
    const x = e.clientX - (this.stageWidth / 2);
    const y = e.clientY - (this.stageHeight / 2);

    this.geometryItems.forEach((item, index) => {
      const moveX = -(x / 3);
      const moveY = -(y / 3);
      item.style.transform = `scale(${this.geometryScale[index]}) translate(${moveX}px, ${moveY}px)`;
    })
  }
}