// const { ManagedBlockchain } = require("aws-sdk");

(function(){
    const galleryGround = document.querySelector('.galleryGround');
    const contentCon = document.querySelector('.contentCon');
    const closeBox = document.querySelector('.closeBox');

    const monaFrame = document.querySelector('.monaFrame');
    const filterCon = document.querySelector('.filterCon');

    const contentItem2 = document.querySelector('.contentItem2');
    const backImage = document.querySelector('.contentItem2 .backImage');
    const youtubeVideo = document.querySelector('.youtubeVideo video');
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
    let instaItemIndex = 0;
    let instaItemMaxIndex = document.querySelectorAll('.instaItem').length;
    let instaItemWidth = parseInt(window.getComputedStyle(instaItems).getPropertyValue('width'));

    const replyCon = document.querySelector('.replyCon');

    // window resize
    window.addEventListener('resize', function(e){
        instaItemWidth = parseInt(window.getComputedStyle(instaItems).getPropertyValue('width'));
    });

    // content 설정
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

        contentCon.dataset.state = 'open';
        contentCon.dataset.openIndex = elem.dataset.index;
        // console.log(elem.dataset.index)
    }
    function closeContent(e) {
        contentCon.dataset.state = 'close';
        // filterCon 닫기
        hideFilterCon();

        // youtube 댓글 초기화
        commentText.value = '';
        canSubmit = false;
        commentSubmit.classList.remove('activeSubmit');

        // ballList 초기화
        setTimeout(function(){
            ballList.length = 0;
        }, 1000);

        // instaItem Index 초기화
        resetInstaIndex();

        stopVideo(instaVideo);
        stopVideo(youtubeVideo);
    }
    function stopVideo(video){
        video.pause();
        video.currentTime = 0;
        video.load();
    }

    galleryGround.addEventListener( 'click', showContent );
    closeBox.addEventListener('click', closeContent)
    
    // Content 1 - HalfFilter
    // filterLeft.addEventListener('mouseover', setHalfFilter);
    // filterRight.addEventListener('mouseover', setHalfFilter);
    // function setRandomFilter (e) {
    //     const under100 = parseInt(Math.random() * 1000 % 100);
    //     const under200 = parseInt(Math.random() * 1000 % 300 + 50);
    //     const degree = parseInt(Math.random() * 1000 % 180);

    //     let contrast = 'contrast(' + under200 + '%) ';
    //     let hueRotate = 'hue-rotate(' + degree + 'deg) ';
    //     let invert = 'invert(' + under100 + '%) ';
    //     let saturate = 'saturate(' + under200 + '%) ';

    //     this.style.filter = contrast + hueRotate + saturate;
    // };

    monaFrame.addEventListener('click', showFilterCon);

    function showFilterCon (e) {
        filterCon.style.top = 0;
    }
    function hideFilterCon (e) {
        filterCon.style.top = -100 + 'vh';
    }

    // Content 2 - Youtube
    let youtubeX = 0, youtubeY = 0;
    let youtubeCurrentX = 0, youtubeCurrentY = 0;
    let youtubeSpeed = 0.005;
    function moveBackground (e) {
        youtubeX = e.clientX - window.innerWidth / 2;
        youtubeY = e.clientY - window.innerHeight / 2;
    }
    function moveBackgroundRaf () {
        youtubeCurrentX += (youtubeX - youtubeCurrentX) * youtubeSpeed;
        youtubeCurrentY += (youtubeY - youtubeCurrentY) * youtubeSpeed;
        backImage.style.transform = 'translate(' + - (youtubeCurrentX/20) + 'px, ' + -(youtubeCurrentY/20) + 'px)';
        window.requestAnimationFrame(moveBackgroundRaf); 
    }
    moveBackgroundRaf();
    
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

    }
    function cancelComment (e) {
        commentText.value = '';
        commentSubmit.classList.remove('activeSubmit');
    }

    contentItem2.addEventListener('mousemove', moveBackground);
    commentText.addEventListener('keyup', activeCommentSubmit);
    commentCancel.addEventListener('click', cancelComment);
    commentSubmit.addEventListener('click', submitComment);

    // Content 3 - FaceBall
    canvasBall.width = window.innerWidth;
    canvasBall.height = window.innerHeight;
    function makeBall (e) {
        ballList.push(new Ball(e.clientX, e.clientY, canvasBall, ctx))
    };

    function animateBall () { // 매 프레임마다 벌어지는 일들
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillRect(0, 0, canvasBall.width, canvasBall.height); // 캔버스 전체를 색칠해서 내용 지움
        ballList.forEach(function(ball){
            ball.update(); // ball1의 정보를 업데이트
            ball.draw(); // ball1 새로 그림
        })
        requestAnimationFrame(animateBall);
    };
    canvasBall.addEventListener('click', makeBall);
    animateBall();

    // Content 4 - Instagram
    // video 태그 drag 이벤트 안먹어서 click으로 수정
    // let mouseDownXPos;
    // let mouseUpXPos;
    // instaItemCon.addEventListener('dragstart', function(e){
    //     mouseDownXPos = e.pageX;
    // });
    // instaItems.addEventListener('drag', function(e){
    //     instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + (mouseDownXPos - e.pageX) + 'px';
    // });
    // instaItemCon.addEventListener('dragend', function(e){
    //     console.log(e.target);
    //     mouseUpXPos = e.pageX;
    //     if (mouseDownXPos > mouseUpXPos) {
    //         instaItemIndex++;
    //     }
    //     else if (mouseDownXPos < mouseUpXPos) {
    //         instaItemIndex--;
    //     }
    //     instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    // });
    let instaX = 0, instaY = 0;
    let instaCurrentX = 0, instaCurrentY = 0;
    let instaSpeed = 0.015;
    function rotateInstaCon (e) {
        instaX = e.clientX - window.innerWidth / 2;
        instaY = e.clientY - window.innerHeight / 2;
    }
    function rotateInstaConRaf () {
        instaCurrentX += (instaX - instaCurrentX) * instaSpeed;
        instaCurrentY += (instaY - instaCurrentY) * instaSpeed;
        instaBox.style.transform = 'rotateX(' + -(instaCurrentY / 20) + 'deg) rotateY(' + (instaCurrentX / 20) + 'deg)';
        window.requestAnimationFrame(rotateInstaConRaf);;
    }
    function moveInstaItem (e) {
        instaItemIndex++;
        if(instaItemIndex >= instaItemMaxIndex) {
            instaItemIndex = 0;
            stopVideo(instaVideo);
        }
        instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    };
    function resetInstaIndex () {
        instaItemIndex = 0;
        stopVideo(instaVideo);
        instaItems.style.left = '-' + (instaItemWidth * instaItemIndex) + 'px';
    };
    
    rotateInstaConRaf();
    contentItem4.addEventListener('mousemove', rotateInstaCon)
    instaItemCon.addEventListener('click', moveInstaItem);

    // Content5 - 지하철 광고판
    const replyList = ['오늘 누구 생일임?',
                       'ㅅㅊㅅㅊ',
                       '저 사람 누구임?',
                       '생일 축하함',
                       '박**님 1000원 후원 감사합니다',
                       '지하철 왜 안오냐',
                       '생일선물',
                       'Happyyy랄랄라',
                       'BirthDay',
                       '생일 축하',
                       'G-DRAGON',
                       '고생 ^오^',
                       '뿜샤카라카',
                       '와 전광판 보소'];
    const colorList = ['red', 'blue', 'crimson', 'orange', 'yellow', 'greenyellow']
    let replyCnt = 0;
    function createReply(){
        if(replyCon.childNodes.length > replyList.length){
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
    let replyConst = setInterval(createReply, 3000);
})()