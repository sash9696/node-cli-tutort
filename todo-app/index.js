//mongo db databse to store the todos
//create a todo app in backend

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = 3000;

app.use(express.json());

//mongoose 
//Step 1 connect to the database

mongoose.connect(process.env.DB_URL)
.then(() => console.log('Connected to MongoDb atlas'))
.catch((err) => console.error('Error connecting to MongoDB Atlas: ', err))


//Step 2 define todo schema

const todoSchema = new mongoose.Schema({
    task: String,
    completed:{
        type:Boolean,
        default:false
    }
});

const Todo = mongoose.model('Todo', todoSchema);
//model represnts a collection in the databse


//get all todos

app.get('/todos', async (req, res) => {

    try {

        const todos = await Todo.find();
        res.json(todos);
        
    } catch (error) {
        res.status(500).json({message: err.message});
    }
})
// curl http://localhost:3000/todos



//get a single todo

app.get('/todos/:id', async (req, res) => {

    try {
        const id = req.params.id;

        const todo = await Todo.findById(id);
    
        if(!todo){
            res.status(404).json({message: 'Todo not found'});
            return
    
        };
        res.json(todo);
        
    } catch (err) {

        res.status(500).json({message: err.message});
    }


    
})
// curl http://localhost:3000/todos/:id

//add a new todo

app.post('/todos', async (req, res) => {

    const task = req.body.task;

    const todo = new Todo({
        task
    });

    //interating the external mongo system

    try {
        console.log(todo);
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
        
    } catch (error) {
            res.status(400).json({message: err.message});
    }


})

// curl -X POST -H "Content-Type: application/json" -d '{"task": "New Todo"}' http://localhost:3000/todos


//update an existing todo
app.put('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;

        const todo = await Todo.findById(id);
        
        if(!todo){
            res.status(404).json({message: 'Todo not found'});
            return
        };
        todo.task  = req.body.task;
        todo.completed = req.body.completed;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);

    } catch (error) {
        res.status(400).json({message: err.message})
        
    }
    
})

//delete a todo

app.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if(!todo){
            res.status(404).json({message: 'Todo not found'});
            return
        };
        await todo.deleteOne();
        res.json({message: 'Todo deleted'});
    } catch (err) {
        
        res.status(500).json({message: err.message})
    }
  
})

// curl -X DELETE http://localhost:3000/todos/:id

app.listen(PORT, () => {
    console.log(`Server is listening at port: ${PORT}`)
})