export class Gallery02{
  constructor(){
    const contentItem2 = document.querySelector('.contentItem2');
    const backImage = document.querySelector('.contentItem2 .backImage');
    const youtubeVideo = document.querySelector('.youtubeVideo video');
    const positive = document.querySelector('.positive');
    const negative = document.querySelector('.negative');
    const subscribeBtn = document.querySelector('.subscribeBtn');
    const commentList = document.querySelector('.commentList');
    const commentText = document.querySelector('.commentText');
    const commentSubmit = document.querySelector('.commentSubmit');
    const commentCancel = document.querySelector('.commentCancel');
    let canSubmit = false;
    // Content 2 - Youtube
    let youtubeX = 0, youtubeY = 0;
    let youtubeCurrentX = 0, youtubeCurrentY = 0;
    let youtubeSpeed = 0.005;

    function moveBackground (e) {
        youtubeX = e.clientX - window.innerWidth / 2;
        youtubeY = e.clientY - window.innerHeight / 2;
    };
    function changePositiveState (e) {
        if(this.classList.contains('positive')){
            negative.children[0].src = 'images/youtube_like.png';
        } else {
            positive.children[0].src = 'images/youtube_like.png';
        }
        let likeImg = this.children[0];
        if(likeImg.src.includes('active')){
            likeImg.src = 'images/youtube_like.png';
        } else {
            likeImg.src = 'images/youtube_like_active.png';
        }
    }
    function changeSubscribeState (e) {
        if(this.classList.contains('subscriber')) {
            this.classList.remove('subscriber');
            this.innerText = '구독';
        } else {
            this.classList.add('subscriber');
            this.innerText = '구독중';
        }
    };
    function submitComment (e) {
        const text = commentText.value;

        canSubmit = false;
        commentSubmit.classList.remove('activeSubmit');
        commentText.value = '';

        const commentItemHtml = ''
        // + '<li class="commentItem">'
        + '    <div class="commentImageCon">'
        + '        <img src="images/youtube000.png" alt=""/>'
        + '    </div>'
        + '    <div class="commentWordCon">'
        + '        <div class="nickname"><span id="commnetName">Park</span> 방금 전</div>'
        + '        <div class="commentWord">'+ text +'</div>'
        + '    </div>'
        // + '</li>';
        // commentList.innerHTML = commentList.innerHTML + commentItem; -- 추가한 이후로 이벤트가 먹통이됨, 개체 만들어 append로 추가
        const commentItem = document.createElement('li');
        commentItem.classList.add('commentItem');
        commentItem.innerHTML = commentItemHtml;
        commentList.append(commentItem);
    };
    function cancelComment (e) {
        commentText.value = '';
        commentSubmit.classList.remove('activeSubmit');
    };
    function activeCommentSubmit (e) {
        if(commentText.value.trim() != ''){
            canSubmit = true;
            commentSubmit.classList.add('activeSubmit');
        }
        else {
            canSubmit = false;
            commentSubmit.classList.remove('activeSubmit');
        }
    };
    function moveBackgroundRaf () {
        youtubeCurrentX += (youtubeX - youtubeCurrentX) * youtubeSpeed;
        youtubeCurrentY += (youtubeY - youtubeCurrentY) * youtubeSpeed;
        backImage.style.transform = 'translate(' + - (youtubeCurrentX/20) + 'px, ' + -(youtubeCurrentY/20) + 'px)';
        content2TimeId = window.requestAnimationFrame(moveBackgroundRaf); 
    };
    function releaseContent2 () {
        moveBackgroundRaf();
        
        contentItem2.addEventListener('mousemove', moveBackground);
        positive.addEventListener('click', changePositiveState);
        negative.addEventListener('click', changePositiveState);
        subscribeBtn.addEventListener('click', changeSubscribeState);
        commentText.addEventListener('keyup', activeCommentSubmit);
        commentCancel.addEventListener('click', cancelComment);
        commentSubmit.addEventListener('click', submitComment);
    };
    function unreleaseContent2 () {
        window.cancelAnimationFrame(content2TimeId);

        contentItem2.removeEventListener('mousemove', moveBackground);
        positive.removeEventListener('click', changePositiveState);
        negative.removeEventListener('click', changePositiveState);
        subscribeBtn.removeEventListener('click', changeSubscribeState);
        commentText.removeEventListener('keyup', activeCommentSubmit);
        commentCancel.removeEventListener('click', cancelComment);
        commentSubmit.removeEventListener('click', submitComment);

        // youtube 댓글입력창 초기화
        commentText.value = '';
        canSubmit = false;
        commentSubmit.classList.remove('activeSubmit');
        stopVideo(youtubeVideo);
    };
  }
}