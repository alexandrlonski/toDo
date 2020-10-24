'use stricts'

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

const todoData =  localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [] ; 


const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

  todoData.forEach(function(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                   '<div class="todo-buttons">' +
                      '<button class="todo-remove"></button>' +
                      '<button class="todo-complete"></button>' +
                   '</div>';
      
          if(item.completed){
             todoCompleted.append(li);
              localStorage.setItem('todo', JSON.stringify(todoData));
           } else {
             todoList.append(li);
              localStorage.setItem('todo', JSON.stringify(todoData));
          }
    

     const btnTodoComplete = li.querySelector('.todo-complete');
     btnTodoComplete.addEventListener('click', function() {
       item.completed = !item.completed ;
       render();
     });
     const btnTodoDelete = li.querySelector('.todo-remove');
     btnTodoDelete.addEventListener('click', function() {
      li.remove(li);
      let index = todoData.indexOf(item);
      if (index > -1) {
        todoData.splice(index, 1);
      }
      localStorage.clear();
      render();
     });

                   
                   
  });

};
todoControl.addEventListener('submit', function(event) {
  event.preventDefault();
      
if(headerInput.value.trim() !== '') {
  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  todoData.push(newTodo);
  
  headerInput.value = '';
  render();
 }
 
} );

 render();
