let body= document.querySelector("body");

function paintImage() {
    let image = new Image();
    image.src = `1.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function init() {
    paintImage();
}

init();