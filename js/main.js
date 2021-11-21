(function(){
    "use strict"
    const cardSpace = document.querySelector(".cardSpace");
    const cards = document.querySelectorAll(".card");
    cardSpace.addEventListener("click", zoomCard);

    function zoomCard(e){
        const elem = e.target;
        
        while(!elem.parentNode.classList.contains("card")){
            if(elem.nodeName == "BODY"){
                elem = null;
                return;
            }
            elem.style.background = "red";
        }
    }
})()