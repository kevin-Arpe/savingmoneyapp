let todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

let TODO_LS = "todos";
let todos = [];

function saveToDos() {
    localStorage.setItem(TODO_LS, JSON.stringify(todos));
}

function paintToDos(text) {
    let li = document.createElement("li");
    let delBtn = document.createElement("button");
    delBtn.innerText = "DELETE";
    delBtn.classList.add("btn_style");
    let span = document.createElement("span");
    span.innerText = text;
    let newId = todos.length + 1;
    li.id = newId;

    li.appendChild(delBtn);
    li.appendChild(span);
    todoList.appendChild(li);

    let todoObj = {
        text: text,
        id: newId
    }
    todos.push(todoObj);
    saveToDos();

    delBtn.addEventListener("click", function(event) {
        let target_li = event.target.parentNode;
        todoList.removeChild(target_li);

        let cleanTodos = todos.filter(function(todo) {
            return parseInt(todo.id) !== parseInt(target_li.id);
        })
        todos = cleanTodos;
        saveToDos();
    })
}

function loadToDos() {
    let loadedToDos = localStorage.getItem(TODO_LS);
    if (loadedToDos !== null) {
        let parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(todo) {
            paintToDos(todo.text);
        })
    } else {

    }
}

function handleSubmit(event) {
    event.preventDefault();
    let newTodo = todoInput.value;
    paintToDos(newTodo);
    todoInput.value = "";
}

function init() {
    loadToDos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();