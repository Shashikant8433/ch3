// file-DB-crud-todo 
const express = require('express');
const fs = require('fs');
const path = require('path');

const todosPath = path.join(__dirname, 'todos.json');

const app = express();
app.use(express.json());

const _getTodos = async () => {
    const allTodos = await fs.promises.readFile(todosPath, 'utf-8');
    return allTodos
};

const _updateTodosList = (data) => {
    return fs.promises.writeFile(todosPath, JSON.stringify(data), 'utf-8')
}

app.get('/', async (req, res) => {
    const todos = await _getTodos();
    const allTodos = JSON.parse(todos)
    res.send({
        todos: allTodos.todos,
        status: 200
    })
})

app.post('/create', async (req, res)=>{
    const todo = req.body.todo;
    if(todo){
        const todos = await _getTodos();
        const allOldTodos = JSON.parse(todos);
        allOldTodos.todos.push(todo);
        _updateTodosList(allOldTodos);
        res.send({
            success: `todo ${todo} created successfully`,
            status: 200
        })
    } else {
        res.send({
            error: 'no todo found in body',
            status: 400
        })
    }
})

app.delete('/delete', async (req, res)=>{
    const index = req.body.index;
    const todos = await _getTodos();
    const allTodos = JSON.parse(todos);
    const lastIndex = allTodos.todos.length -1;
    if(index === undefined || index < 0 || index > lastIndex){
        res.send({
            error: 'invalid index',
            status: 400
        })
    } else {
        const todo = allTodos.todos.splice(index, 1);
        _updateTodosList(allTodos)
        res.send({
            success: `todo "${todo}" deleted successfully`,
            status: 200
        })
    }
})

app.patch('/update', async (req, res)=>{
    const index = req.body.index;
    const newTodo = req.body.todo;
    const todos = await _getTodos();
    const allTodos = JSON.parse(todos);
    const lastIndex = allTodos.todos.length -1;
    if(index === undefined || index < 0 || index > lastIndex || !newTodo){
        res.send({
            error: 'invalid index or No todo found',
            status: 400
        })
    } else {
        const todo = allTodos.todos.splice(index, 1, newTodo);
        _updateTodosList(allTodos)
        res.send({
            success: `todo "${todo}" updated to "${newTodo}" successfully`,
            status: 200
        })
    }
})

app.listen(3000)