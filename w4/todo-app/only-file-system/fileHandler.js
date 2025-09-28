// only-file-based-todo

const fs = require('fs');
const path = require('path')

const todosPath = path.join(__dirname, 'todos.json');

const _getTodos = async () => {
    const allTodos = await fs.promises.readFile(todosPath, 'utf-8');
    return allTodos
};

const _updateTodosList = (data) => {
    return fs.promises.writeFile(todosPath, JSON.stringify(data), 'utf-8')
}

const readTodos = () => {
    _getTodos().then((todos)=> {
        const allTodos = JSON.parse(todos)
        console.table(allTodos.todos.map(todo => todo))
    })
}

const addTodos = async (data) => {
    const todos = await _getTodos();
    const allOldTodos = JSON.parse(todos);
    allOldTodos.todos.push(data)
    return _updateTodosList(allOldTodos)
}

const removeTodo = async(index) => {
    const todos = await _getTodos();
    const allOldTodos = JSON.parse(todos);
    if(index){
        allOldTodos.todos.splice(index, 1);
    } else {
        const lastTodoIndex = allOldTodos.todos.length -1;
        allOldTodos.todos.splice(lastTodoIndex, 1);
    }
    return _updateTodosList(allOldTodos)
}

const updateTodo = async(newTodo, index) => {
    if(index === undefined){
        console.error('provide index to uptate the todo');
        return;
    }
    const todos = await _getTodos();
    const allOldTodos = JSON.parse(todos);
    const lastTodoIndex = allOldTodos.todos.length -1;
    if(index > lastTodoIndex || index < 0){
        console.error('provide valid index to update');
        return
    }
    allOldTodos.todos.splice(index, 1, newTodo);
    return _updateTodosList(allOldTodos)
}



const computeTodos = async () => {
    readTodos()
    console.log('CREATE')
    await addTodos('todo 2')
    await addTodos('todo 2')
    readTodos()
    console.log('DELETE')
    await removeTodo(2)
    readTodos()
    console.log('UPDATE')
    await updateTodo('go to gym', 1)
    readTodos()
    await removeTodo(1)
    readTodos()
}
computeTodos()