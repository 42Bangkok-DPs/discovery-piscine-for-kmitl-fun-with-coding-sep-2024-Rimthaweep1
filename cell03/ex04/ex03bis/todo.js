$(document).ready(function() {
    const ftList = $('#ft_list');
    const newTodoButton = $('#new_todo');

    function createTodo(content) {
        const todoDiv = $('<div class="list"></div>').text(content);
        todoDiv.click(function() {
            if (confirm('Are you sure you want to delete this to-do?')) {
                todoDiv.remove();
                updateLocalStorage();
            }
        });
        ftList.prepend(todoDiv);
        updateLocalStorage();
    }

    function getLocalStorageItem(key) {
        return localStorage.getItem(key);
    }

    function setLocalStorageItem(key, value) {
        localStorage.setItem(key,   
value);
    }

    function updateLocalStorage() {
        const todos = ftList.children().map(function() {
            return $(this).text();
        }).get();
        setLocalStorageItem('todos', JSON.stringify(todos));
    }

    const storedTodos = JSON.parse(getLocalStorageItem('todos')) || [];
    storedTodos.forEach(createTodo);

    newTodoButton.click(function() {
        const newTodoContent = prompt('Enter a new to-do:');
        if (newTodoContent) {
            createTodo(newTodoContent);
        }
    });
});