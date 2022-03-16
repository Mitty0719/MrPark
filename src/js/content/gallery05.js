import { Person } from "../module/person.js";

export class Gallery05 {
  constructor(stageWidth, stageHeight) {
    this.personCon = document.querySelector('.personCon');
    this.maxPerson = 10;
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

    for(let i = 0; i < this.persons.length; i++){
      if(this.persons[i].x > this.stageWidth){
        this.persons.splice(i, 1);
      }
    }
    console.log(this.persons);
  }
  createPerson(){
    const person = new Person(this.stageWidth, this.stageHeight);
    const personDom = person.createPerson();
    this.personCon.appendChild(personDom);
    this.persons.push(person);
  }

  movePerson(){
    requestAnimationFrame(this.movePerson.bind(this));
    for(let i = 0; i < this.persons.length; i++){
      this.persons[i].move();
    }
  }

}