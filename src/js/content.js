(function(){
    const galleryGround = document.querySelector('.galleryGround');
    const contentCon = document.querySelector('.contentCon');
    const closeBox = document.querySelector('.closeBox');

    const monaFrame = document.querySelector('.monaFrame');
    const monaDescHead = document.querySelector('.monaDesc h1');
    const monaDescComm = document.querySelector('.monaDesc p');
    const filterCon = document.querySelector('.filterCon');

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

    const canvasBall = document.querySelector('#canvasBall');
    const ctx = canvasBall.getContext('2d');
    const ballList = [];

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

    const replyCon = document.querySelector('.replyCon');

    let content2TimeId = 0, content3TimeId = 0, content4TimeId = -1;

    // window resize
    window.addEventListener('resize', function(e){
        instaItemWidth = parseInt(window.getComputedStyle(instaItems).getPropertyValue('width'));
    });

    // content 설정
    let selectedContentIndex = -1;
    const release = [releaseContent1, releaseContent2, releaseContent3, releaseContent4, releaseContent5];
    const unrelease = [unreleaseContent1, unreleaseContent2, unreleaseContent3, unreleaseContent4, unreleaseContent5];
    function showContent (e) {
        // contentCon.style.display = 'block';
        let elem = e.target;
        while(!elem.classList.contains('galleryImg')){
            if(elem.nodeName == 'BODY'){
                elem = null;
                return;
            }
            elem = elem.parentNode;
        }
        // contentCon.style.top = (parseInt(target.dataset.index)-1) * 20 + 'vh';
        selectedContentIndex = elem.dataset.index;

        contentCon.dataset.state = 'open';
        contentCon.dataset.openIndex = selectedContentIndex;

        release[selectedContentIndex-1]();
    };
    function closeContent(e) {
        contentCon.dataset.state = 'close';

        unrelease[selectedContentIndex-1]();
    };
    function stopVideo(video){
        video.pause();
        video.currentTime = 0;
        video.load();
    };

    galleryGround.addEventListener( 'click', showContent);
    closeBox.addEventListener('click', closeContent)
    
    // clickEvent 위치 mouseCurosr 색생변경
    changeCursorPointer(closeBox);
    changeCursorPointer(monaFrame);
    changeCursorPointer(subscribeBtn);
    changeCursorPointer(commentSubmit);
    changeCursorPointer(commentCancel);
    changeCursorPointer(instaItemCon);
    changeCursorPointer(youtubeVideo);
    changeCursorPointer(canvasBall);
    changeCursorPointer(positive);
    changeCursorPointer(instaHeart);
    
    function showFilterCon (e) {
        filterCon.style.top = 0;
        filterCon.style.opacity = 100 + '%';
    };
    function hideFilterCon (e) {
        filterCon.style.top = -100 + 'vh';
        filterCon.style.opacity = 0 + '%';

        monaDescHead.style.marginTop = '50px';
        monaDescHead.style.opacity = 0 + '%';

        monaDescComm.style.marginTop = 'calc(3vmax + 50px)';
        monaDescComm.style.opacity = 0 + '%';
    };
    function releaseContent1 () {
        setTimeout(function(){
            monaDescHead.style.marginTop = 0;
            monaDescHead.style.opacity = 100 + '%';
        }, 1000);
        setTimeout(function(){
            monaDescComm.style.marginTop = '3vmax';
            monaDescComm.style.opacity = 100 + '%';
        }, 2000);

        monaFrame.addEventListener('click', showFilterCon);
    };
    function unreleaseContent1 () {
        hideFilterCon();
        monaFrame.removeEventListener('click', showFilterCon);
    };

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

    // Content 3 - FaceBall
    let img = new Image;
    img.src = '/images/gugue.png';
    img.width = '100vw';
    img.htight = '100vh';
    function makeBall (e) {
        ballList.push(new Ball(e.clientX, e.clientY, canvasBall, ctx))
    };
    function animateBall () { // 매 프레임마다 벌어지는 일들
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(0, 0, canvasBall.width, canvasBall.height); // 캔버스 전체를 색칠해서 내용 지움
        ctx.drawImage(img, 0, 0, canvasBall.width, canvasBall.height);
        ballList.forEach(function(ball){
            ball.update(); // ball1의 정보를 업데이트
            ball.draw(); // ball1 새로 그림
        })
        content3TimeId = window.requestAnimationFrame(animateBall);
    };
    
    function releaseContent3 () {
        canvasBall.width = window.innerWidth;
        canvasBall.height = window.innerHeight;
        canvasBall.addEventListener('click', makeBall);
        animateBall();
        console.log(img);
    }
    function unreleaseContent3 () {
        window.cancelAnimationFrame(content3TimeId);
        canvasBall.removeEventListener('click', makeBall);

        // ballList 초기화
        setTimeout(function(){
            ballList.length = 0;
        }, 1000);
    }
    
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

    // Content5 - 지하철 광고판
    const replyList = ['누구 생일인가요?',
                       'ㅅㅊㅅㅊ',
                       '와 광고판 보소',
                       '생일 축하:D',
                       '박**님 1000원 후원 감사합니다',
                       '지하철 왜 안오냐',
                       '멸치액젓',
                       '12일 지났는데 왜 뒷북이냐',
                       'BirthDay:D',
                       '오늘 날씨 맑음',
                       '<<<٩(๑•̀ㅂ•́)و>>>',
                       '생각보다 잘만들어짐',
                       'ヽ(´▽`)ﾉヽ(´▽`)ﾉヽ(´▽`)ﾉ',
                       'QA: MinWooJung'];
    const colorList = ['red', 'blue', 'crimson', 'orange', 'yellow', 'greenyellow']
    let replyCnt = 0;
    let replyConst;
    function createReply(){
        if(replyCon.childNodes.length >= replyList.length){
            clearInterval(replyConst);
            return;
        }
        // const replyNum = parseInt(Math.random() * 1000) % replyList.length;
        const colorNum = parseInt(Math.random() * 1000) % colorList.length;
        const top = parseInt(Math.random() * 1000) % window.innerHeight;
        const elem = document.createElement('div');
        elem.classList.add('replyItem');
        elem.style.top = (top-30) + 'px';
        elem.style.color = colorList[colorNum];
        elem.innerText = replyList[replyCnt];
        replyCon.appendChild(elem);

        replyCnt++;
    }
    function releaseContent5 () {
        replyConst = setInterval(createReply, 3000);
    }

    function unreleaseContent5 () {
        clearInterval(replyConst);
        const replys = document.querySelectorAll('.replyItem');
        replys.forEach(reply => replyCon.removeChild(reply));
        replyCnt = 0;
    }

})()