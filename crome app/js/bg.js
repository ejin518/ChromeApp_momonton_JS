const wrap = document.querySelector(".wrap");
const info = document.querySelector(".info");
const IMG_NUMBER = 3;

const one = "The Moon was created when a rock the size of Mars slammed into Earth, shortly after the solar system began forming about 4.5 billion years ago.",
    two = "Earth is the third planet from the sun in our solar system. Its name comes from the the old English and Germanic words meaning ‘the ground’.",
      three = "Every star you see in the night sky is bigger and brighter than our sun."

function paintImage(imgNumber){
    //const image = new Image(); 이미지를 백그라운드가 아닌 img로 넣을 때
    const p = document.createElement("p");
    const randomP = imgNumber + 1;
    wrap.style.background = `url(img/${imgNumber + 1}.jpg)`;
    wrap.style.backgroundSize = "cover";
    wrap.style.backgroundPosition = "center center";
    //image.src = `img/${imgNumber + 1}.jpg`;
    //image.classList.add("bgImage");
    //wrap.appendChild(image);
    info.appendChild(p);
    if (randomP === 1){
        p.innerText = one
    } else if (randomP === 2){
        p.innerText = two
    } else if (randomP === 3) {
        p.innerText = three
    }
    
}


function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
    
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}
    
init();