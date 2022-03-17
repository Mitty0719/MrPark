
const KEYBOARD_INFO = {
  pc:{
    keys: [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', ['[', 'BracketLeft'], [']', 'BracketRight']],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', [';', 'Semicolon'], ['"', 'Quote']],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ['<', 'Comma'], ['>', 'Period'], ['?', 'Slash']]
    ],
    className: 'keyboardItemPC'
  },
  mobile:{
    keys: [
      ['1', '2', '3'],
      ['4', '5', '6'],
      ['7', '8', '9'],
      [['*', 'Asterisk'], '0', ['#', 'Sharp']]
    ],
    className: 'keyboardItemMobile'
  }
}
const KEYBOARD_IMAGES = [
  './images/keyboard001.png',
  './images/keyboard002.png',
  './images/keyboard003.png',
  './images/keyboard004.png',
  './images/keyboard005.png',
  './images/keyboard006.png',
  './images/keyboard007.png',
  './images/keyboard008.png',
  './images/keyboard009.png',
  './images/keyboard010.png',
]

export class Gallery03 {
  constructor(stateWidth, stateHeight) {
    this.keyboardCon = document.querySelector('.keyboardCon');
    this.keyState = {
      pc:{
        KeyQ: {isDown: false, state: 0},
        KeyW: {isDown: false, state: 0},
        KeyE: {isDown: false, state: 0},
        KeyR: {isDown: false, state: 0},
        KeyT: {isDown: false, state: 0},
        KeyY: {isDown: false, state: 0},
        KeyU: {isDown: false, state: 0},
        KeyI: {isDown: false, state: 0},
        KeyO: {isDown: false, state: 0},
        KeyP: {isDown: false, state: 0},
        BracketLeft: {isDown: false, state: 0},
        BracketRight: {isDown: false, state: 0},
        KeyA: {isDown: false, state: 0},
        KeyS: {isDown: false, state: 0},
        KeyD: {isDown: false, state: 0},
        KeyF: {isDown: false, state: 0},
        KeyG: {isDown: false, state: 0},
        KeyH: {isDown: false, state: 0},
        KeyJ: {isDown: false, state: 0},
        KeyK: {isDown: false, state: 0},
        KeyL: {isDown: false, state: 0},
        Semicolon: {isDown: false, state: 0},
        Quote: {isDown: false, state: 0},
        KeyZ: {isDown: false, state: 0},
        KeyX: {isDown: false, state: 0},
        KeyC: {isDown: false, state: 0},
        KeyV: {isDown: false, state: 0},
        KeyB: {isDown: false, state: 0},
        KeyN: {isDown: false, state: 0},
        KeyM: {isDown: false, state: 0},
        Comma: {isDown: false, state: 0},
        Period: {isDown: false, state: 0},
        Slash: {isDown: false, state: 0},
      },
      mobile:{
        Digit1: {isDown: false, state: 0},
        Digit2: {isDown: false, state: 0},
        Digit3: {isDown: false, state: 0},
        Digit4: {isDown: false, state: 0},
        Digit5: {isDown: false, state: 0},
        Digit6: {isDown: false, state: 0},
        Digit7: {isDown: false, state: 0},
        Digit8: {isDown: false, state: 0},
        Digit9: {isDown: false, state: 0},
        Digit0: {isDown: false, state: 0},
        Asterisk: {isDown: false, state: 0},
        Sharp: {isDown: false, state: 0},
      }
    }

    this.resize();

    setTimeout(()=>{
      this.keyboardCon.classList.add('visible');
    }, 1000);
    this.createKeys();


    window.addEventListener('keydown', this.downKey.bind(this));
    window.addEventListener('click', this.clickKey.bind(this));
  }

  resize(){
    if(window.innerWidth > 1200){
      this.type = 'pc';
      this.keyboard = KEYBOARD_INFO.pc;
    }else{
      this.type = 'mobile';
      this.keyboard = KEYBOARD_INFO.mobile;
    }
  }

  createKeys(){
    const keys = this.keyboard.keys;
    for(let i = 0; i < keys.length; i++){
      const keyRow = document.createElement('div');
      keyRow.classList.add('keyboardRow');
      for(let j = 0; j < keys[i].length; j++){
        const key = document.createElement('div');
        const keyText = document.createElement('div');
        key.classList.add('keyboardItem');
        key.classList.add(this.keyboard.className);
        keyText.classList.add('keyText');
        
        key.style.backgroundImage = `url(${KEYBOARD_IMAGES[Math.floor(Math.random() * KEYBOARD_IMAGES.length)]}`;
        
        if(keys[i][j].length === 2){
          keyText.innerText = keys[i][j][0];
          this.keyState[this.type][keys[i][j][1]].keyText = keyText;
          this.keyState[this.type][keys[i][j][1]].key = key;
        }else{
          keyText.innerText = keys[i][j];
          if(this.type === 'pc'){
            this.keyState[this.type][`Key${keys[i][j]}`].keyText = keyText;
            this.keyState[this.type][`Key${keys[i][j]}`].key = key;
          }else{
            this.keyState[this.type][`Digit${keys[i][j]}`].keyText = keyText;
            this.keyState[this.type][`Digit${keys[i][j]}`].key = key;
          }
        }


        key.appendChild(keyText);
        keyRow.appendChild(key);
      }
      this.keyboardCon.appendChild(keyRow);
    }
  }

  downKey(e){
    console.log(e.code);
    const keyState = this.keyState[this.type][e.code];
    if(keyState && !keyState.isDown){
      keyState.isDown = true;
      this.setKeyEffect(keyState, true);
      setTimeout(()=>{this.setKeyEffect(keyState, false)} , 2000);
    }
  }
  upKey(e){ // not use
    const keyState = this.keyState[this.type][e.code];
    if(keyState){
      keyState.isDown = false;
    }
  }
  clickKey(e){
    let target = e.target;

    while(!target.classList.contains('keyText')){
      if(target === document.body){
        return;
      }
      target = target.parentNode;
    }

    target.style.height = 0;
    setTimeout(()=>{ target.style.height = '100%' }, 2000);
  }

  setKeyEffect(keyState, isDown){
    if(isDown){
      keyState.state = 0;
    }else{
      keyState.state = 100;
      keyState.isDown = false;
    }
    keyState.keyText.style.height = `${keyState.state}%`;
  }
}