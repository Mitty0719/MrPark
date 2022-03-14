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
    this.createGeometryItem(20);
  }

  createGeometryItem(index){
    let cnt = 0;
    const createId = setInterval(()=>{
      if(cnt++ < index){
        const item = document.createElement('div');
        const scale = 1.5 / cnt;

        item.classList.add('geometryItem');
        item.style.transform = `scale(${scale})`;
        this.geometryCon.appendChild(item);
        this.geometryItems.push(item);
        this.geometryScale.push(scale);
      } else {
        clearInterval(createId);
      }
    }, 200);
  }
  moveGeometryCon(e){
    const x = e.clientX - (this.stageWidth / 2);
    const y = e.clientY - (this.stageHeight / 2);

    this.geometryItems.forEach((item, index) => {
      const moveX = x / 2;
      const moveY = y / 2;
      item.style.transform = `scale(${this.geometryScale[index]}) translate(${moveX}px, ${moveY}px)`;
    })
  }
}