// inmemory-crud-todo
const express = require('express');
const app = express();
app.use(express.json());

const allTodos = {
    todos: []
};

app.get('/', (req, res) => {
    res.send(JSON.stringify(allTodos));
})

app.post('/create', (req, res)=>{
    const todo = req.body.todo;
    if(todo){
        allTodos.todos.push(todo);
        res.send({
            success: `todo "${todo}" created successfully`,
            status: 200
        })
    } else {
        res.send({
            error: 'no todo found in body',
            status: 400
        })
    }
})

app.delete('/delete', (req, res)=>{
    const index = req.body.index;
    const lastIndex = allTodos.todos.length -1;
    if(index === undefined || index < 0 || index > lastIndex){
        res.send({
            error: 'invalid index',
            status: 400
        })
    } else {
        const todo = allTodos.todos.splice(index, 1);
        res.send({
            success: `todo "${todo}" deleted successfully`,
            status: 200
        })
    }
})

app.patch('/update', (req, res)=>{
    const index = req.body.index;
    const newTodo = req.body.todo;
    const lastIndex = allTodos.todos.length -1;
    if(index === undefined || index < 0 || index > lastIndex || !newTodo){
        res.send({
            error: 'invalid index or no todo found',
            status: 400
        })
    } else {
        const todo = allTodos.todos.splice(index, 1, newTodo);
        res.send({
            success: `todo "${todo}" updated to "${newTodo}" successfully`,
            status: 200
        })
    }
})

app.listen(3000)