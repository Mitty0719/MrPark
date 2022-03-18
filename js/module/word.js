export class Word{
  constructor(row, str){
    this.directionSet = ['Top', 'Bottom', 'Left', 'Right'];
    this.direction = '';
    this.setDirection();
    let innerText = '<div class="rowText" data-direction="' + this.direction + '">';
    
    for (let i = 0; i < str.length; i++) {
        innerText += '<span class="rowChar">' + str.charAt(i) + '</span>'
    }
  
    innerText += '</div>'
  
    row.innerHTML = innerText;
  
    this.rowText = row.querySelector('.rowText');
    this.setStyle();
  }

  setDirection(){
    let directionNum = parseInt(Math.random() * 1000 % this.directionSet.length);
    this.direction = this.directionSet[directionNum];
  }
  setStyle(){
    // 텍스트 이동 에니메이션 시간 값
    this.rowText.style.animationDuration = ((Math.random() * 1000) % 10 + 8) + 's'; // % 범위 + 최소값
    
    if(this.direction == 'Left' || this.direction == 'Right'){
      // 상단으로 부터 위치
      let topRate = (Math.random() * 100) % 90;
      this.rowText.style.top = topRate + 'vh';
      // 폰트 사이즈 수정
      this.rowText.style.fontSize = '15vw';
    }
  }
}