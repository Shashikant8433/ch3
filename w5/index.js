const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('Calculator app')
});

app.get('/add', (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    console.log(a, b);
    res.send({
        output: parseInt(a) + parseInt(b)
    })
});

app.get('/subtract', (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    console.log(a, b);
    res.send({
        output: parseInt(a) - parseInt(b)
    })
})

app.get('/multiply', (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    console.log(a, b);
    res.send({
        output: parseInt(a) * parseInt(b)
    })
})

app.get('/divide', (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    console.log(a, b);
    res.send({
        output: parseInt(a) / parseInt(b)
    })
})

app.listen(3000, ()=>{
    console.info('app started on port 3000')
})