const ftList = document.getElementById('ft_list');
const newTodoButton = document.getElementById('new_todo');

// Function to create a new to-do element and append it to the list
function createTodo(content) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('list'); // Add the "list" class
    todoDiv.textContent = content;
    todoDiv.addEventListener('click', () => {
      const confirmDelete = window.confirm('Are you sure you want to delete this to-do?');
      if (confirmDelete) {
        todoDiv.remove();
        updateLocalStorage();
      }
    });
    ftList.insertBefore(todoDiv, ftList.firstChild);
    updateLocalStorage();
  }

// Function to get and set local storage
function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

function setLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

// Function to update local storage with the current to-do list
function updateLocalStorage() {
  const todos = Array.from(ftList.children).map(todo => todo.textContent);
  setLocalStorageItem('todos', JSON.stringify(todos));
}

// Load to-dos from local storage on page load
const storedTodos = JSON.parse(getLocalStorageItem('todos')) || [];
storedTodos.forEach(createTodo);

// Event listener for the new to-do button
newTodoButton.addEventListener('click', () => {
  const newTodoContent = prompt('Enter a new to-do:');
  if (newTodoContent) {
    createTodo(newTodoContent);
  }
});