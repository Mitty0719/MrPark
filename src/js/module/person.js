const PERSON_TYPE = [
  {
    idx: 1,
    width: 250,
    height: 460,
    yRatio: 0.5,
    reply: ['오늘 저녁 뭐먹지', '저녁 먹고 뭐하지', '자기 전에 뭐하지', '자고 나서 뭐하지', '내일 뭐하지']
  },
  {
    idx: 2,
    width: 340,
    height: 440,
    yRatio: 0.5,
    reply: ['아, 출근하기 싫다', '집보내줘', '새나라의 새일꾼', '사랑찾아 인생찾아']
  },
  {
    idx: 3,
    width: 157,
    height: 160,
    yRatio: 0.8,
    reply: ['아, 버섯먹고 싶다', '잘가라, 쿠파 대마왕!', '피치 공쥬! 내가 간다능! 데헷~!(๑ゝڡ◕๑)']
  },
  {
    idx: 4,
    width: 720,
    height: 240,
    yRatio: 0.7,
    reply: ['멈출수가 없어!! 오히려 좋아..', '남자성기삽니다', '난... ㄱㅏ끔... 눈물을 흘린ㄷㅏ...', '뜀박질만이 나라에서 허락한 유일한 마약이니까, 이게 바로 지금의 나다']
  },
  {
    idx: 5,
    width: 24,
    height: 24,
    yRatio: 0.8,
    reply: ['돔황챠!!!!!!', '나만 왜 존나 작아', '안물안궁~ 어쩔티비~', '못잡겠쥬~ 못누르쥬~ ㅋㅋㄹㅃㅃ']
  },
  {
    idx: 6,
    width: 24,
    height: 24,
    yRatio: 0.8,
    reply: ['돔황챠!!!!!!', '공룡은 사람을 찢어!', '무야호~~~', '절레절레전래동화']
  }
]

export class Person{
  constructor(stageWidth, stageHeight){
    this.personType = PERSON_TYPE[Math.floor(Math.random() * PERSON_TYPE.length)];

    this.x = 0;
    this.y = 0;
    this.width = this.personType.width;
    this.height = this.personType.height;
    this.speed = Math.random() * 3 + 1;
    this.direction = 1;

    this.setPosition(stageWidth, stageHeight);
  }
  createPerson(){
    const person = document.createElement('div');
    const reply = document.createElement('div');

    person.className = `person person00${this.personType.idx} walking`;
    reply.className = `reply`;
    person.appendChild(reply);

    person.addEventListener('mouseover', this.overPerson.bind(this, reply));
    person.addEventListener('mouseout', this.outPerson.bind(this, reply));

    this.person = person;
    this.reply = reply;

    this.setReplyText();

    return person;
  }
  setPosition(stageWidth, stageHeight){
    this.x = -this.width;
    this.y = Math.floor(stageHeight * this.personType.yRatio + (Math.random() * 30));
    console.log(this.y);
  }

  move(){
    this.x += this.speed * this.direction;
    this.person.style.left = `${this.x}px`;
    this.person.style.top = `${this.y}px`;
  }
  stop(){

  }
  setReplyText(){
    this.reply.innerText = this.personType.reply[Math.floor(Math.random() * this.personType.reply.length)];
  }

  overPerson(reply){
    reply.classList.add('visible');
  }
  outPerson(reply){
    reply.classList.remove('visible');
  }
}