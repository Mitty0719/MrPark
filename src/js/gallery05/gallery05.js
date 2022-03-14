export class Gallery05{
  constructor(){
    const replyCon = document.querySelector('.replyCon');

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
  }
}