const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function filterFn(toDo) {
    return toDo.id === 1;
}

function deleteToDo(event) {
  //console.dir(event.target);
  //console.log(event.target.parentNode);
  const btn = event.target;
  const li = btn.parentNode;

  toDoList.removeChild(li);

  //각각의 item과 같이 실행이 되고 function return이 true인 item만 return
  const cleanToDos = toDos.filter(function(toDo) {
    //console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  //localStorage는 javaScript Data를 저장할 수 없고 String만 저장 가능
  //Object를 String으로 만들어야 함 -> JSON.stringify 사용
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
  const li = document.createElement("li");          // Create a <li> node
  const delBtn = document.createElement("button");  // Create a text node
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);

  span.innerText = text;

  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li); // Append the text to <li>

  const toDoObj = {
    text: text,
    id: newId
  }

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentVal = toDoInput.value;
    paintTodo(currentVal);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos); //String을 Object로 바꿈
    parsedToDos.forEach(function(toDo){
      paintTodo(toDo.text);
    }); //주어진 함수를 배열 요소 각각에 대해 실행 Array를 위한 function
  } else {

  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
