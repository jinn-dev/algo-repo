const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault(); //event를 막는 함수
    const currentVal = input.value;
    paintGreeting(currentVal);
    saveName(currentVal);
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);  //class 제거
  greeting.classList.add(SHOWING_CN); //class 추가
  greeting.innerText = `Have a nice day! ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);

  if(currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function init(){
  loadName();
}

init();
