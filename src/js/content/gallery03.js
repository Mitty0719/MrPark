
const keyboardInfo = {
  pc:{
    keys: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '"'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?']
    ],
    className: 'keyboardItemPC'
  },
  mobile:{
    keys: [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      ['*', '0', '#']
    ],
    className: 'keyboardItemMobile'
  }
}

export class Gallery03 {
  constructor(stageWidth, stageHeight) {
    this.keyboardCon = document.querySelector('.keyboardCon');

    if(true){
      this.keyboard = keyboardInfo.pc;
    }else{
      this.keyboard = keyboardInfo.mobile;
    }
    this.createKeys();
  }

  createKeys(){
    const keys = this.keyboard.keys;
    for(let i = 0; i < keys.length; i++){
      const keyRow = document.createElement('div');
      keyRow.classList.add('keyboardRow');
      for(let j = 0; j < keys[i].length; j++){
        const key = document.createElement('div');
        key.classList.add('keyboardItem');
        key.classList.add(this.keyboard.className);
        key.innerText = keys[i][j];

        keyRow.appendChild(key);
      }
      this.keyboardCon.appendChild(keyRow);
    }
  }
}