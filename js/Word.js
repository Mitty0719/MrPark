function Word (row, str) {
    this.directionSet = ['Top', 'Bottom', 'Left', 'Right'];
    this.direction = '';
    this.setDirection();

    row.innerHTML = ''
        + '<div class="rowText" data-direction="' + this.direction + '">'
        + str
        + '</div>';
    
    this.rowText = row.querySelector('.rowText');
}

Word.prototype = {
    constructor : Word,
    setDirection : function () {
        let directionNum = parseInt(Math.random() * 1000 % 4);
        this.direction = this.directionSet[directionNum];
    }
}