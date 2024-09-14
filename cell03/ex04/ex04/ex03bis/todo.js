$(document).ready(function() {
    const ftList = $('#ft_list');
    const newTodoButton = $('#new_todo');

    // Get the highest existing ID from localStorage
    function getHighestId() {
        const highestId = localStorage.getItem('highestId');
        return highestId ? parseInt(highestId, 10) : 0; // make sure it's base 10 and if highestId not มีอยู่แล้ว return 0
    }

    // Set the highest existing ID in localStorage
    function setHighestId(id) {
        localStorage.setItem('highestId', id);
    }

    // Create a new to-do item with an incremented ID
    function createTodo(content) {
        // Get and increment the ID
        let currentId = getHighestId();
        const newId = currentId + 1;
        setHighestId(newId);

        // Create the to-do item with the new ID
        const todoDiv = $(`<div class="list" id="${newId}"></div>`).text(content);

        todoDiv.click(function() {
            if (confirm('Are you sure you want to delete this to-do?')) {
                todoDiv.remove();
                updateLocalStorage();
            }
        });

        ftList.prepend(todoDiv); // prepend คือการ insert from top
        updateLocalStorage();
    }

    // Get data from localStorage
    function getLocalStorageItem(key) {
        return localStorage.getItem(key);
    }

    // Set data to localStorage
    function setLocalStorageItem(key, value) {
        localStorage.setItem(key, value);
    }

    // Update localStorage with current to-do list
    function updateLocalStorage() {
        // Create an array of objects where each object contains an id and content
        const todos = ftList.children().map(function() {
            return {
                id: $(this).data('id'),
                content: $(this).text()
            };
        }).get(); //get to extract from map
        
        // save the array of todos to localStorage as a JSON string
        setLocalStorageItem('todos', JSON.stringify(todos)); // call the save to localStorage to re-save
    }
    
    // load and create todos from localStorage
    const storedTodos = JSON.parse(getLocalStorageItem('todos')) || [];

    // Loop through the storedTodos array in reverse order
    for (let i = storedTodos.length - 1; i >= 0; i--) {
        const todo = storedTodos[i];
        createTodoWithId('1', todo.content);
    }
    
    //create div tag
    function createTodoWithId(id, content) {
        const todoDiv = $(`<div class="list" id="${id}"></div>`).text(content);
        todoDiv.click(function() {
            if (confirm('Are you sure you want to delete this to-do?')) {
                todoDiv.remove();
                updateLocalStorage();
            }
        });
        ftList.prepend(todoDiv); // ใส่ html tag ตรงนี้
    }
    // if click it promt ask and create
    newTodoButton.click(function() {
        const newTodoContent = prompt('Enter a new to-do:');
        if (newTodoContent) {
            createTodo(newTodoContent);
        }
    });
});
