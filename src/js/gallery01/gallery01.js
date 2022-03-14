export class Gallery01{
  constructor(){
    this.frame = document.querySelector('.monaFrame');
    this.title = document.querySelector('.monaDesc h1');
    this.description = document.querySelector('.monaDesc p');
    this.filterCon = document.querySelector('.filterCon');

    monaFrame.addEventListener('click', showFilterCon);
  }
  showFilterCon (e) {
    filterCon.style.top = 0;
    filterCon.style.opacity = 100 + '%';
  };
  hideFilterCon (e) {
    filterCon.style.top = -100 + 'vh';
    filterCon.style.opacity = 0 + '%';

    this.title.style.marginTop = '50px';
    this.title.style.opacity = 0 + '%';

    this.description.style.marginTop = 'calc(3vmax + 50px)';
    this.description.style.opacity = 0 + '%';
  };
}