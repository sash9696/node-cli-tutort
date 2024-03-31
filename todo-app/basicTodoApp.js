//create a todo app in backend

import express from 'express';

const app = express();

const PORT = 3000;

app.use(express.json());

//data

let todos = [];

//get all todos

app.get('/todos', (req, res) => {
    res.json(todos);
})
// curl http://localhost:3000/todos



//get a single todo

app.get('/todos/:id', (req, res) => {

    console.log(req.params);
    const id = parseInt(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    if(!todo){
        res.status(404).send('Todo not found');
        return;
    };

    res.json(todo);
    
})
// curl http://localhost:3000/todos/:id

//add a new todo

app.post('/todos', (req, res) => {

    const newTodo = req.body;
    // console.log(newTodo)
    newTodo.id = Date.now();
    todos.push(newTodo);
    res.status(201).json(newTodo);
})

// curl -X POST -H "Content-Type: application/json" -d '{"task": "New Todo"}' http://localhost:3000/todos


//update an existing todo
app.put('/todos/:id', (req, res) => {

    //homwwork
})

//delete a todo

app.delete('/todos/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.sendStatus(204);
})


app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})