(function(){
    const filterLeft = document.querySelector('.filterLeft');
    const filterRight = document.querySelector('.filterRight');

    filterLeft.addEventListener('mouseover', setHalfFilter);
    filterRight.addEventListener('mouseover', setHalfFilter);

    function setHalfFilter (e) {
        
        const under100 = parseInt(Math.random() * 1000 % 100);
        const under200 = parseInt(Math.random() * 1000 % 300 + 50);
        const degree = parseInt(Math.random() * 1000 % 180);

        let contrast = 'contrast(' + under200 + '%) ';
        let hueRotate = 'hue-rotate(' + degree + 'deg) ';
        let invert = 'invert(' + under100 + '%) ';
        let saturate = 'saturate(' + under200 + '%) ';

        this.style.filter = contrast + hueRotate + saturate;
    };
})()