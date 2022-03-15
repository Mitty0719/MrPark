export class Gallery04 {
  constructor(stageWidth, stageHeight) {
    this.contentItem4 = document.querySelector('.contentItem4');
    this.instaBox = document.querySelector('.instaBox');
    this.instaItemCon = document.querySelector('.instaItemCon');
    this.instaItems = document.querySelector('.instaItems');
    this.instaItemList = document.querySelectorAll('.instaItem');
    this.instaVideo = document.querySelector('.instaVideo');
    this.instaHeart = document.querySelector('.instaHeart');
    this.instaNumbers = document.querySelectorAll('.instaNumber');

    this.currentIndex = 0;
    this.maxIndex = document.querySelectorAll('.instaItem').length;
    this.itemWidth = parseInt(window.getComputedStyle(this.instaItems).getPropertyValue('width'));

    this.x = 0;
    this.y = 0;
    this.currentX = 0
    this.currentY = 0;
    this.speed = 0.0000015;
    this.dragStartPoint = -1;
    this.dragEndPoint = -1;

    this.resize(stageWidth, stageHeight);

    window.addEventListener('mousemove', this.rotateInstaCon.bind(this));
    this.instaItemCon.addEventListener('mousedown', this.setInstaDragStartPoint.bind(this));
    this.instaItemCon.addEventListener('mouseup', this.setInstaDragEndPoint.bind(this));
    this.instaHeart.addEventListener('click', this.changeHeartState.bind(this));
  }

  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.rotateInstaConRaf();
  }

  rotateInstaCon(e) {
    this.x = e.clientX - this.stageWidth / 2;
    this.y = e.clientY - this.stageHeight / 2;
    this.rotateInstaConRaf();
  };

  rotateInstaConRaf() {
    window.requestAnimationFrame(this.rotateInstaConRaf.bind(this));

    this.currentX += (this.x - this.currentX) * this.speed;
    this.currentY += (this.y - this.currentY) * this.speed;
    this.instaBox.style.transform = 'rotateX(' + -(this.currentY) + 'deg) rotateY(' + (this.currentX) + 'deg)';
  }

  moveInstaItemToRight() {
    if (this.currentIndex >= this.maxIndex - 1) {
      return;
    }
    this.instaNumbers[this.currentIndex].classList.remove('numberSelected');
    this.currentIndex++;
    this.instaNumbers[this.currentIndex].classList.add('numberSelected');

    this.instaItems.style.left = '-' + (this.itemWidth * this.currentIndex) + 'px';
  };

  moveInstaItemToLeft() {
    if (this.currentIndex == this.maxIndex - 1) {
      this.stopVideo(this.instaVideo);
    }
    if (this.currentIndex <= 0) {
      return;
    }
    this.instaNumbers[this.currentIndex].classList.remove('numberSelected');
    this.currentIndex--;
    this.instaNumbers[this.currentIndex].classList.add('numberSelected');
    this.instaItems.style.left = '-' + (this.itemWidth * this.currentIndex) + 'px';
  }

  resetInstaIndex() {
    this.currentIndex = 0;
    this.stopVideo(this.instaVideo);
    this.instaItems.style.left = '-' + (this.itemWidth * this.currentIndex) + 'px';
  };

  setInstaDragStartPoint(e) {
    this.instaDragStartPoint = e.clientX;
  }

  setInstaDragEndPoint(e) {
    this.instaDragEndPoint = e.clientX;
    if (this.instaDragEndPoint < this.instaDragStartPoint) {
      this.moveInstaItemToRight();
      return;
    }
    if (this.instaDragEndPoint > this.instaDragStartPoint) {
      this.moveInstaItemToLeft();
      return;
    }
  }

  changeHeartState() {
    if (this.src.includes('heart')) {
      this.src = 'images/insta_blank.png';
    } else {
      this.src = 'images/insta_heart.png';
    }
  }

  stopVideo(video) {
    video.pause();
    video.currentTime = 0;
    video.load();
  };
}