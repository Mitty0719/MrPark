export class Gallery02 {
  constructor(stageWidth, stageHeight) {
    this.contentItem = document.querySelector('.contentItem2');
    this.journalInfo = [
      {
        dom: document.querySelector('.journalSquare'),
        x: 0, y: 0, speed: -0.003
      },
      {
        dom: document.querySelector('.journalImage'),
        x: 0, y: 0, speed: -0.002
      }
    ];
    this.targetX = 0;
    this.targetY = 0;
    this.mouseLimit = 20;
    this.mouseMoveHandler = this.moveMouse.bind(this);

    this.resize(stageWidth, stageHeight);

    this.contentItem.addEventListener('mousemove', this.mouseMoveHandler);
    this.animateId = requestAnimationFrame(this.moveJournal.bind(this));
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  moveMouse(e){
    this.targetX = e.clientX - (this.stageWidth / 2);
    this.targetY = e.clientY - (this.stageHeight / 2);
  }

  moveJournal(){
    this.animateId = requestAnimationFrame(this.moveJournal.bind(this));

    for(let i = 0; i < this.journalInfo.length; i++){
      const journal = this.journalInfo[i];

      journal.x += (this.targetX - journal.x) * journal.speed;
      journal.y += (this.targetY - journal.y) * journal.speed;

      journal.dom.style.transform = `translate(${journal.x / this.mouseLimit}px, ${journal.y / this.mouseLimit}px)`;
    }
  }

  close(){
    cancelAnimationFrame(this.animateId);
    this.contentItem.removeEventListener('mousemove', this.mouseMoveHandler);
  }
}