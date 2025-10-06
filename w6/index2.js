const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
const JWT_SECRET = 'somerandomsecret'

const users = [];

const authMiddleware = function(req, res, next){
    const token = req.headers.token;
    try{
        const decodedData = jwt.verify(token, JWT_SECRET)
        const decodedUser = decodedData.username;
        const foundUser = users.find(user => user.username === decodedUser)
        if(foundUser){
            req.currentUser = foundUser;
            next();
        }
    } catch(error){
        res.status(400).json({
            message: 'Invalid token'
        });
        return;
    }
}

app.get('/users', (req, res)=>{
    res.status(200).json({
        users
    })
});

app.get('/me', authMiddleware, (req, res)=>{
    const foundUser = req.currentUser;
    if(typeof foundUser === 'object'){
        res.status(200).json({
            message: 'user details sent',
            ...foundUser
        })
    } else {
        res.status(400).json({
            message: 'Invalid token'
        })
    }
});

app.post('/signup', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    if(username && password){
        users.push({
            username,
            password
        })
        res.status(200).json({
            message: 'Signup successfuly'
        })  
    } else {
        res.status(400).json({
            message: 'Invalid payload'
        })
    }
});


app.post('/signin', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const foundUser = users.find(user => user.username === username && user.password === password)
    if(foundUser){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET)
        res.status(200).json({
            message: 'Signin successfuly',
            token
        })  
    } else {
        res.status(400).json({
            message: 'Invalid payload'
        })
    }
})


app.listen(3000, ()=>{
    console.log('app started on port 3000')
})