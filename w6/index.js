const express = require('express')

const app = express()
app.use(express.json())

const users = [];

app.get('/users', (req, res)=>{
    res.status(200).json({
        success: '',
        users: users.map(user => ({
            username: user.username,
            password: user.password
        }))
    })
})

app.get('/me', (req, res) =>{
    const token = req.headers.token;
    console.log(token,'token');
    const foundUser = users.find(user => user.token === token)
    if(foundUser){
        res.status(200).json({
            message: '',
            user: {
                username: foundUser.username,
                password: foundUser.password
            }
        });
    } else {
        res.status(400).json({
            message: 'invalid token'
        })
    }
})

const singupHandler = (req, res)=>{ 
    const user = req.body.username;
    const pass = req.body.password;
    users.push({
        username: user,
        password: pass
    })
    res.status(200).json({
        message: 'You have signed up'
    });
}
app.post('/signup', singupHandler)

const generateToken = () => {
    return Math.random().toString();
}

const singinHandler = (req, res)=>{
    const user = req.body.username;
    const pass = req.body.password;
    const foundUser = users.find(savedUser => savedUser.username === user && savedUser.password === pass)

    if(foundUser){
        const token = generateToken();
        foundUser.token = token
        res.status(200).json({
            message: 'Signed in successfully',
            token,
        })
    } else {
        res.status(403).json({
            message: 'Invalid username and password'
        })
    }
}
app.post('/signin', singinHandler)

app.listen(3000, () => {
    console.log('app is listening on port 3000')
})