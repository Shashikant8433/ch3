const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('Calculator app')
});

app.get('/add', (req, res)=>{
    const a = req.query.a && parseInt(req.query.a);
    const b = req.query.b && parseInt(req.query.b);
    if(typeof a === 'number' && typeof b == 'number'){
        res.status(200).send({
            output: a + b
        })
    }
    res.status(400).send({
        error: 'Invalid operators'
    })
});

app.get('/subtract', (req, res)=>{
    const a = req.query.a && parseInt(req.query.a);
    const b = req.query.b && parseInt(req.query.b);
    if(typeof a === 'number' && typeof b == 'number'){
        res.status(200).send({
            output: a - b
        })
    }
    res.status(400).send({
        error: 'Invalid operators'
    })
})

app.get('/multiply', (req, res)=>{
    const a = req.query.a && parseInt(req.query.a);
    const b = req.query.b && parseInt(req.query.b);
    if(typeof a === 'number' && typeof b == 'number'){
        res.status(200).send({
            output: a * b
        })
    }
    res.status(400).send({
        error: 'Invalid operators'
    })
})

app.get('/divide', (req, res)=>{
    const a = req.query.a && parseInt(req.query.a);
    const b = req.query.b && parseInt(req.query.b);
    if(typeof a === 'number' && typeof b == 'number'){
        res.status(200).send({
            output: a / b
        })
    }
    res.status(400).send({
        error: 'Invalid operators'
    })
})

app.listen(3000, ()=>{
    console.info('app started on port 3000')
})