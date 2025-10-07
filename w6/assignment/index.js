const exprress = require('express');
const jwt = require('jsonwebtoken');

const app = exprress();
app.use(exprress.json());

const JWT_SECRET = 'somerandomsecrettext';

const users = [
    {
        id: 1,
        username: 'Shashikant',
        password: '123',
        todos: [
            {
                id: 1,
                text: 'Go to gym'
            }
        ]
    }
];

const authMiddleware = (req, res, next) => {
    const token = req.headers.token;
    if(!token){
        res.status(400).json({
            type: 'error',
            message: 'invalid token'
        })
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;
    const foundUser = users.find((user)=> user.username === username);

    if(foundUser){
        req.currentUser = foundUser;
        next();
    } else {
        res.status(404).json({
            type: 'error',
            message: 'user not found'
        })
    }
}

const getUniqueId = (array, key = 'id') => {
    const lastElementId = array.length ? array[array.length -1][key] : 0
    const arrayLength = array.length;
    return (Math.max(lastElementId, arrayLength)+1);
}

app.get('/', (_, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})

app.post('/signup', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        const id = getUniqueId(users);
        const user = { id, username, password }
        users.push(user);
        res.status(200).json({
            type: 'success',
            message: 'singup succesfull'
        })
    } else {
        res.status(400).json({
            type: 'error',
            message: 'invalid payload'
        })
    }
})

app.post('/signin', (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const foundUser = users.find(user => user.username === username && user.password === password);
    if(foundUser){
        if(!foundUser.todos){
            foundUser.todos = [];
        }
        const token = jwt.sign({
            username: foundUser.username
        }, JWT_SECRET);
        res.status(200).json({
            type: 'success',
            message: 'signin successful',
            token
        })
    } else {
        res.status(400).json({
            type: 'error',
            message: 'invalid username or password'
        })
    }
})

app.get('/todos', authMiddleware, (req, res)=>{
    const username = req.currentUser;
    res.status(200).json({
        type: 'success',
        message: 'user todos sent',
        todos: username.todos
    })
})

app.post('/todo', authMiddleware, (req, res)=>{
    const user = req.currentUser;
    const todoText = req.body.todo;
    const todoId = getUniqueId(user.todos)
    const todo = {
        text: todoText,
        id: todoId
    }
    if(user && todo){
        user.todos.push(todo);
        res.status(200).json({
            type: 'success',
            message: 'todo added',
            todo
        })
    }
})

app.patch('/todo', authMiddleware, (req, res)=>{
    const user = req.currentUser;
    const todoId = req.body.id;
    const todoText = req.body.todo;
    const foundTodo = user.todos.find(todo => todo.id === todoId)
    if(user && foundTodo){
        foundTodo.text = todoText;
        res.status(200).json({
            type: 'success',
            message: 'todo updated successfuly',
            todo: foundTodo
        })
    } else {
        res.status(400).json({
            type: 'error',
            message: 'invalid todo id or user'
        })
    }
})

app.delete('/todo', authMiddleware, (req, res)=>{
    const user = req.currentUser;
    const todoId = req.body.todoId;
    user.todos = user.todos.filter(todo => todo.id !== todoId);
    res.status(200).json({
        type: 'success',
        message: 'todo deleted successfully'
    })
})

app.listen(3000, ()=>{
    console.log('app started on port 3000')
})