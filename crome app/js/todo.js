const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';
const SCROLL_Y = 'scrollY'
let toDos = [];


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); //내가 클릭한 버튼의 id값을 제외하고 나머지를 return한다.
    });
    //밑에 코드들이 없으면 로컬스토리지에는 내가 입력한 LIST 즉 toDos의 정보들은 그대로 있음. colsole.log(cleanToDos);를 하면 내가 클릭한 정보만 없어지고 나머지만 보여주는데 한 번 더 클릭하면 그 전에 클릭했던 것이 없어지는 게 아니라 다시 나타남. 왜냐하면 내가 클릭했다고 해서 로컬스토리지에 없어진 것이 아니라는 뜻임.
    toDos = cleanToDos
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const imageX = new Image();
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    imageX.src = `img/x.png`;
    delBtn.appendChild(imageX);
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId; //클래스를 추가하고 싶으면 li.className = newId; 이렇게 작성
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId
    };
   if (toDoList.hasOwnProperty(li)){
       toDoList.classList.add(SCROLL_Y);
   } else {
       toDoList.classList.remove(SCROLL_Y);
   }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    if (currentValue === ""){
        alert("Please enter your to do list")
    } else {
        paintToDo(currentValue);
        toDoInput.value = "";
    }
    
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        }); 
    }
}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();