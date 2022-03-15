import { Person } from "../module/person.js";

const PERSON_TYPE = [
  {
    width: 250,
    height: 460
  },
  {
    width: 170,
    height: 220
  },
  {
    width: 157,
    height: 160
  }
]

export class Gallery05 {
  constructor(stageWidth, stageHeight) {
    this.personCon = document.querySelector('.personCon');
    this.maxPerson = 5;
    this.persons = [];

    this.resize(stageWidth, stageHeight);

    this.createPerson();
    this.movePerson();

    setInterval(this.checkPerson.bind(this), 3000);
  }
  
  resize(stageWidth, stageHeight){
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }

  checkPerson(){
    if(this.persons.length < this.maxPerson){
      this.createPerson();
    }
  }
  createPerson(){
    const personType = Math.floor(Math.random() * PERSON_TYPE.length);
    const personDom = document.createElement('div');
    const reply = document.createElement('div');

    personDom.className = `person person00${personType + 1} walking`;
    reply.className = `reply`;
    personDom.appendChild(reply);
    this.personCon.appendChild(personDom);
    personDom.addEventListener('mouseover', this.overPerson.bind(this, reply));
    personDom.addEventListener('mouseout', this.outPerson.bind(this, reply));

    const person = new Person(personDom, this.stageWidth, this.stageHeight, PERSON_TYPE[personType]);
    this.persons.push(person);
  }

  movePerson(){
    requestAnimationFrame(this.movePerson.bind(this));
    for(let i = 0; i < this.persons.length; i++){
      this.persons[i].move();
    }
  }

  overPerson(reply){
    reply.classList.add('visible');
  }
  outPerson(reply){
    reply.classList.remove('visible');
  }
}