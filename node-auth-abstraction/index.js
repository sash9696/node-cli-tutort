import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import authMiddleware from "./src/middlewares/authMiddleware.js";
dotenv.config();

//set up express
const app = express();
const PORT = process.env.PORT || 3000;


//connect to mongo db
connectDB();

//define user schema

//middleware to parse json bodies
app.use(express.json());

//api end points

//authentication

//Routes
app.use('/auth', authRoutes)


//protected route example

app.get('/protected',authMiddleware, (req,res) => {
    res.json({message: 'This is a protected route', user:req.user});
})

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
