function Word (row, str) {
    this.directionSet = ['top', 'bottom', 'left', 'right'];
    this.direction = '';
    this.setDirection();

    row.innerHTML = '' +
        '<div class="rowText">' +
        str +
        '</div>';
}

Word.prototype = {
    constructor : Word,
    setDirection : function () {
        let directionNum = parseInt(Math.random() * 1000 % 4);
        this.direction = this.directionSet[directionNum];
    }
}