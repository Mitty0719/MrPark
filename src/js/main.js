class App{
  constructor(){
    const rowSpace = document.querySelector('.rowSpace');
    const rows = document.querySelectorAll('.row');
    const galleryGround = document.querySelector('.galleryGround');
    this.rowStr = ['DancingMachine', 'JukeBox', 'DataEngineer', 'GunMulJu', 'HYUNA', 'ArianaGrande', 'GSP'];
    
    rowSpace.addEventListener( 'mouseover', this.moveWords );
    this.setRow(rows);
  }

  // word effect 설정
  moveWords (e) {
    let elem = e.target;
    if(elem.classList.contains('rowChar')){
        elem.classList.add('rowCharMove');
        setTimeout(() => { elem.classList.remove('rowCharMove'); }, 2000);
    };
  }

  setRow(rows){
    rows.forEach((row, index) => {
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