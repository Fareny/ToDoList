const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const storageStr = function () {
    localStorage.setItem('key', JSON.stringify(toDoData)); //конвертируем в строку
};

const render = function () {
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach(function (item) {

        const li = document.createElement('li');

        li.classList.add('todo-item');

        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>';

        if (item.completed) {  //Если true то кидаем в готовые, а если нет то оставляем 
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        li.querySelector('.todo-complete').addEventListener('click', function () { //Галочки
            item.completed = !item.completed;
            storageStr();
            render();
        });

        li.querySelector('.todo-remove').addEventListener('click', function () { //Удаление
            let i = toDoData.indexOf(item);
            // console.log(i);
            toDoData.splice(i, 1);
            storageStr();
            render();
        });
    });
};

todoControl.addEventListener('submit', function (event) {
    event.preventDefault();

    const newToDO = {
        text: headerInput.value,
        completed: false
    };
    if (headerInput.value.trim() != '') { //Добавление нового элемента и проверочка
        toDoData.push(newToDO);
        storageStr();
    } else {
        alert('Поле планы не может быть пустым!');
    }
    headerInput.value = '';
    render();
});

const storageJSON = function () {
    toDoData = JSON.parse(localStorage.getItem('key')); //обратно в JSON
    // toDoData = localStorage.getItem(JSON.parse('key'));
    render();
};
if (localStorage.getItem('key')) { //Если есть ключ то подгружаем 
    storageJSON();
}
