export class Gallery04{
  constructor(){
    const contentItem4 = document.querySelector('.contentItem4');
    const instaBox = document.querySelector('.instaBox');
    const instaItemCon = document.querySelector('.instaItemCon');
    const instaItems = document.querySelector('.instaItems');
    const instaItemList = document.querySelectorAll('.instaItem');
    const instaVideo = document.querySelector('.instaVideo');
    const instaHeart = document.querySelector('.instaHeart');
    const instaNumberList = document.querySelectorAll('.instaNumber');
    let instaItemIndex = 0;
    let instaItemMaxIndex = document.querySelectorAll('.instaItem').length;
    let instaItemWidth = parseInt(window.getComputedStyle(instaItems).getPropertyValue('width'));

    let instaX = 0, instaY = 0;
    let instaCurrentX = 0, instaCurrentY = 0;
    let instaSpeed = 0.015;

    function rotateInstaCon (e) {
        instaX = e.clientX - window.innerWidth / 2;
        instaY = e.clientY - window.innerHeight / 2;
    };
    function rotateInstaConRaf () {
        instaCurrentX += (instaX - instaCurrentX) * instaSpeed;
        instaCurrentY += (instaY - instaCurrentY) * instaSpeed;
        instaBox.style.transform = 'rotateX(' + -(instaCurrentY / 20) + 'deg) rotateY(' + (instaCurrentX / 20) + 'deg)';
        content4TimeId = window.requestAnimationFrame(rotateInstaConRaf);;
    }
    function moveInstaItemToRight () {
        if(instaItemIndex >= instaItemMaxIndex-1) {
            return;
        }
        instaNumberList[instaItemIndex].classList.remove('numberSelected');
        instaItemIndex++;
        instaNumberList[instaItemIndex].classList.add('numberSelected');

        instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    };
    function moveInstaItemToLeft () {
        if(instaItemIndex == instaItemMaxIndex-1){
            stopVideo(instaVideo);
        }
        if(instaItemIndex <= 0) {
            return;
        }
        instaNumberList[instaItemIndex].classList.remove('numberSelected');
        instaItemIndex--;
        instaNumberList[instaItemIndex].classList.add('numberSelected');
        instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    }
    function resetInstaIndex () {
        instaItemIndex = 0;
        stopVideo(instaVideo);
        instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    };
    let instaDragStartPoint = -1;
    let instaDragEndPoint = -1;
    function setInstaDragStartPoint (e) {
        instaDragStartPoint = e.clientX;
    }
    function setInstaDragEndPoint (e) {
        instaDragEndPoint = e.clientX;
        if(instaDragEndPoint < instaDragStartPoint){
            moveInstaItemToRight();
            return;
        }
        if(instaDragEndPoint > instaDragStartPoint){
            moveInstaItemToLeft();
            return;
        }
    }
    function changeHeartState () {
        if(this.src.includes('heart')) {
            this.src = 'images/insta_blank.png';
        } else {
            this.src = 'images/insta_heart.png';
        }
    }
    function releaseContent4 () {
        rotateInstaConRaf();
        contentItem4.addEventListener('mousemove', rotateInstaCon);
        // instaItemCon.addEventListener('click', moveInstaItem);
        instaItemCon.addEventListener('mousedown', setInstaDragStartPoint);
        instaItemCon.addEventListener('mouseup', setInstaDragEndPoint);
        instaHeart.addEventListener('click', changeHeartState);
        
    }
    function unreleaseContent4 () {
        window.cancelAnimationFrame(content4TimeId);
        contentItem4.removeEventListener('mousemove', rotateInstaCon);
        // instaItemCon.removeEventListener('click', moveInstaItem);
        instaItemCon.removeEventListener('mousedown', setInstaDragStartPoint);
        instaItemCon.removeEventListener('mouseup', setInstaDragEndPoint);
        instaHeart.removeEventListener('click', changeHeartState);

        // instaItem Index 초기화
        resetInstaIndex();
        stopVideo(instaVideo);
    }
    function stopVideo(video){
        video.pause();
        video.currentTime = 0;
        video.load();
    };
  }
}