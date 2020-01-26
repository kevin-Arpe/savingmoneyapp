let body= document.querySelector("body");
let IMG_NUMBER = 5;

function getRandom() {
    let num = Math.floor(Math.random() * IMG_NUMBER);
    return num;
}

function paintImage(num) {
    let image = new Image();
    image.src = `${num + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function init() {
    let randomNum = getRandom();
    paintImage(randomNum);
}

init();