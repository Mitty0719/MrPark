import { Word } from "./word.js";
import { Gallery01 } from "./content/gallery01.js";
import { Gallery02 } from "./content/gallery02.js";
import { Gallery03 } from "./content/gallery03.js";
import { Gallery04 } from "./content/gallery04.js";
import { Gallery05 } from "./content/gallery05.js";

class App{
  constructor(){
    this.rowSpace = document.querySelector('.rowSpace');
    this.rows = document.querySelectorAll('.row');
    this.galleryGround = document.querySelector('.galleryGround');
    this.contentCon = document.querySelector('.contentCon');
    this.closeBox = document.querySelector('.closeBox');
    this.rowStr = ['DancingMachine', 'WookeBox', 'BlueBlood', 'GunMulJu', 'Bbang', 'TensorFlow', 'GSP'];
    
    this.rowSpace.addEventListener('mouseover', this.moveWords.bind(this));
    this.galleryGround.addEventListener('click', this.showContent.bind(this));
    this.closeBox.addEventListener('click', this.closeContent.bind(this));

    this.resize();
    this.setRow();
  }
  resize(){
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;
  }
  showContent(e) {
    let elem = e.target;
    while(!elem.classList.contains('galleryImg')){
      if(elem.nodeName == 'BODY'){
        elem = null;
        return;
      }
      elem = elem.parentNode;
    }
    this.currentContentIndex = elem.dataset.index;

    this.contentCon.dataset.state = 'open';
    this.contentCon.dataset.openIndex = this.currentContentIndex;

    this.setContent();
  };
  closeContent() {
    this.contentCon.dataset.state = 'close';
    this.contentCon.dataset.openIndex = 0;
  };
  setContent(){
    switch(this.currentContentIndex){
      case '1':
        this.currentContent = new Gallery01(this.stageWidth, this.stageHeight);
        break;
      case '2':
        this.currentContent = new Gallery02();
        break;
      case '3':
        this.currentContent = new Gallery03(this.stageWidth, this.stageHeight);
        break;
      case '4':
        this.currentContent = new Gallery04(this.stageWidth, this.stageHeight);
        break;
      case '5':
        this.currentContent = new Gallery05(this.stageWidth, this.stageHeight);
        break;
    }
  }

  // word effect 설정
  moveWords (e) {
    let elem = e.target;
    if(elem.classList.contains('rowChar')){
        elem.classList.add('rowCharMove');
        setTimeout(() => { elem.classList.remove('rowCharMove'); }, 2000);
    };
  }

  setRow(){
    this.rows.forEach((row, index) => {
      if (!row.classList.contains('galleryRow')) {
        new Word(row, this.rowStr[index], index);
        
        if( index % 2 == 0 ) {
          row.classList.add( 'rowEven' );
        } else {
          row.classList.add( 'rowOdd' );
        }
      }
    });
  }
}

window.onload = () => {
  new App();
}