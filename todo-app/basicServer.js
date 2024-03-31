// const express = require('express');

import express from 'express';

const app = express();

const port = 3000;


//Middlewares
//fucntions that have access to the req and res objects
//end the req. res cycle or then call the next middleware

//inbuilt middlewares
app.use(express.json()); //parse the JSON bodies

app.use(express.urlencoded({extended:true})); //parse url-encoded bodies

//custom middlewares
//logging

// app.use(logger)


// console.log(app)

app.get('/', (req, res) => {
    res.send("hello world!")
});

//Routing

app.get('/about', (req, res) => {
    res.send('About page')
})

app.post('/api/users', (req, res) => {
    //handle the post request
})


app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`)
});






