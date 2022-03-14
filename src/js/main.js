import { Word } from "./word.js";
import { Gallery01 } from "./gallery01/gallery01.js";
import { Gallery02 } from "./gallery02/gallery02.js";
import { Gallery03 } from "./gallery03/gallery03.js";
import { Gallery04 } from "./gallery04/gallery04.js";
import { Gallery05 } from "./gallery05/gallery05.js";

class App{
  constructor(){
    this.rowSpace = document.querySelector('.rowSpace');
    this.rows = document.querySelectorAll('.row');
    this.galleryGround = document.querySelector('.galleryGround');
    this.contentCon = document.querySelector('.contentCon');
    this.closeBox = document.querySelector('.closeBox');
    this.rowStr = ['DancingMachine', 'JukeBox', 'DataEngineer', 'GunMulJu', 'HYUNA', 'ArianaGrande', 'GSP'];
    
    this.rowSpace.addEventListener('mouseover', this.moveWords.bind(this));
    this.galleryGround.addEventListener('click', this.showContent.bind(this));
    this.closeBox.addEventListener('click', this.closeContent.bind(this));
    this.setRow();
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
  };
  setContent(){
    switch(this.currentContentIndex){
      case 1:
        this.currentContent = new Gallery01();
        break;
      case 2:
        this.currentContent = new Gallery02();
        break;
      case 3:
        this.currentContent = new Gallery03();
        break;
      case 4:
        this.currentContent = new Gallery04();
        break;
      case 5:
        this.currentContent = new Gallery05();
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