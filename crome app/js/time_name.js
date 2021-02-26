"use strick";
const jsForm = document.querySelector(".js-form");
const input = jsForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");
const jsClock = document.querySelector(".js-clock");
const clock = jsClock.querySelector("h1");

const USER_NAME = "current user"
const SHOWING = "showing"
//1. 이름을 load하는 함수. 로컬스토리지에 저장된 이름이 있다면 유저를 greeting하는 함수,
//현재이름이 없다면 현재이름을 묻는 함수와 데이터가 로컬스토리지에 넘겨져 저장되는 함수 두개를 만들어야 함.
//2. 현재이름을 묻는 함수. input이 나오게 하고 이름을 입력하면 로컬스토리지에 데이터가 저장되어야 한다.
//3. 입력된 이름을 받아서 처리하는 함수. 이름을 입력하지 않으면 alert창이 띄어져야 함.
//이름을 입력하면 greeting함수가 실행되고 동시에 이름이 저장되는 함수가 실행된다.
//4. greeting 함수. 저장된 이름과 환영하는 문구가 나타나야 한다.

function saveName(user) {
    localStorage.setItem(USER_NAME, user);
}
function handleSubmit(event) {
    event.preventDefault();
    const user = input.value;
    if(user === "") {
        alert('Please put your name');
    } else {
        saveName(user);
        showGreeting(user);
    }   
}

function askForName() {
    jsForm.classList.add(SHOWING);
    jsForm.addEventListener("submit", handleSubmit);
}

function showGreeting(user) {
    const date = new Date();
    const hours = date.getHours();
    let greetingTXT = ""
    jsForm.classList.remove(SHOWING);
    greeting.classList.add(SHOWING);
    if(hours < 12) {
        greetingTXT = `Morning! ${user}`;
    } else if(hours > 12){
        greetingTXT = `Afternoon! ${user}`;
    }
    greeting.innerText = greetingTXT;

}

function loadName() {
    const currentUser = localStorage.getItem(USER_NAME);
    if(currentUser === null) {
        askForName();
    } else {
        showGreeting(currentUser);
    }
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clock.innerText =`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    
}

function init() {
    getTime();
    setInterval(getTime, 1000);
    loadName();
}

init();

