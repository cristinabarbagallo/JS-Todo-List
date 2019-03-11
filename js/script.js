// Variables
var todoList = document.getElementById('todos');
var inputTodo = document.getElementById('task');
var addBtn = document.getElementById('add');
var dateDeadline = document.getElementById('duedate');
var newLi = document.getElementById('item');

// Hardcoded array of todos
var todos = [{
        'name': 'call Amanda',
        'deadline': '2019-03-12'
    },
    {
        'name': 'buy milk',
        'deadline': '2019-03-21'
    }
];

// Todo object
function Todo(name, deadline) {
    this.name = name;
    this.deadline = deadline;
}

// When the document loads for the first time, 
// check if the storage contains something. 
// If so print it to the screen, otherwise print the hardcoded array
function checkContentStorage() {
    var getTodosFromLocalStorage = JSON.parse(localStorage.getItem('todo'));

    if (getTodosFromLocalStorage === null) {
        localStorage.setItem("todo", JSON.stringify(todos));

        var listFromStorage = JSON.parse(localStorage.getItem('todo'));

        todoList.innerHTML = '';

        for (var i = 0; i < listFromStorage.length; i++) {
            document.getElementById("todos").innerHTML += '<li id="item" class="animated fadeIn"><input id="box" class="checkboxes" type="checkbox" style="text-decoration:none">' +
                listFromStorage[i].name + '<p id="deadlineDate">Deadline: ' + listFromStorage[i].deadline + '</p><i id="' + i + '" class="far fa-trash-alt"></i></li>';

        }
    } else {
        showTodos();
    }
    showPicture();
}


// Add new todo from input field by clicking the add button
addBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the page from refreshing 

    // Print on the page the created todo 
    var name = inputTodo.value;
    todoList.innerHTML = name;

    var deadline = dateDeadline.value;
    todoList.innerHTML = deadline;

    add(name, deadline);
    showTodos();
});


// Check if input field is empty, if not empty add a new todo
function add(name, deadline) {

    if (inputTodo.value.trim() === '') {
        alert('You should Add a task!');
    } else {
        var newItem = name;
        var newDate = deadline;

        inputTodo.value = '';

        var todoItem = new Todo();
        todoItem.name = newItem;
        todoItem.deadline = newDate;

        todos.push(todoItem);

        saveTodos();
        showTodos();
        showPicture();

        return false;
    };
}


//Retrieve todos item from local storage
function get_todos() {

    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}


//Update local storage
function saveTodos() {
    localStorage.setItem("todo", JSON.stringify(todos));
}


// Remove single todo from list
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);

    saveTodos();
    showTodos();
    showPicture();

    return false;
}


// Show to screen the created todos 
function showTodos() {

    var todos = get_todos();
    todoList.innerHTML = '';

    for (var i = 0; i < todos.length; i++) {
        todoList.innerHTML +=
            '<li id="item"><input id="box" class="checkboxes" type="checkbox" style="text-decoration:none">' +
            todos[i].name + '<p id="deadlineDate">Deadline: ' + todos[i].deadline + '</p><i id="' + i + '" class="far fa-trash-alt"></i></li>';
    };

    var deleteBtn = document.getElementsByClassName('fa-trash-alt');
    for (var i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', remove);
    };
}



// Sort array alphabetically with no distinction between lowercase and uppercase 
function sortTodosByName() {
    todos = get_todos();

    todos.sort(function (a, b) {
        var A = a.name.toLowerCase(),
            B = b.name.toLowerCase();

        if (A < B) {
            return -1;
        } else if (A > B) {
            return 1;
        }
        return 0
    });

    saveTodos();
    showTodos();
}


// Sort todos by date (deadline)
function sortTodosByDate() {
    todos = get_todos();

    todos.sort(function (a, b) {
        return new Date(a.deadline) - new Date(b.deadline);
    });

    saveTodos();
    showTodos();
}


// Add linethrought style on text when box is checked
function boxChecked(event) {
    var element = event.target;
    if (element.checked == true) {
        element.parentNode.className = "strike";
    } else {
        element.parentNode.classList.remove('strike');
    }
}


// Clear all todos 
function clearAllTodos() {
    todos = [];
    localStorage.clear();
    document.getElementById('todos').innerHTML = '';

    showPicture();

}

// Show image when array is empty
function showPicture() {
    todos = get_todos();

    if (!todos || !todos.length) {
        document.getElementById('todo-status').style.display = 'block';
    } else {
        document.getElementById('todo-status').style.display = 'none';
    }
}


// Get current date 
var date = new Date();
document.getElementById("date").innerHTML = date.toDateString()
// Get current date for input type date placeholder
document.querySelector("#duedate").valueAsDate = new Date();



//--- Call event listeners ---//

document.getElementById('todos').addEventListener('click', boxChecked);

document.getElementById('clearBtn').addEventListener('click', clearAllTodos);

document.getElementById('sortByNameBtn').addEventListener('click', sortTodosByName);

document.getElementById('sortByDateBtn').addEventListener('click', sortTodosByDate);