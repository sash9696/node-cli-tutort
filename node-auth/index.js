import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

//set up express
const app = express();
const PORT = 3000;
const JWT_SECRET = "your_secret_key";

//connect to mongo db

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
connectDB();

//define user schema

//middleware to parse json bodies
app.use(express.json());

//api end points

app.post("/signup", async (req, res) => {
  try {
    console.log("body", req.body);

    const { username, password } = req.body;

    //check if user already exists

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    //encrypt the password, hashing of the password
    //hashing + Salt(unique random string)

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("hashedPassword", hashedPassword);

    //create a new user

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    //find the user in database

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    //check the password

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    //generate a jwt token

    const token = jwt.sign({username:user.username}, JWT_SECRET,{expiresIn:'1h'});



    return res.status(200).json({
        token
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


//protected route

app.get('/protected',verifyToken, (req,res) => {
    res.json({message: 'This is a protected route'});
})

//start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function verifyToken(req, res, next){

    const token = req.headers.authorization;

    // console.log('token',{token,headers:req.headers })

    const tokenArray = token.split(" ");
    if(!token){
        return res.status(401).json({message:'Access denied, token missing'});
    };

    try {
        const decoded = jwt.verify(tokenArray[1], JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({message:'Access denied, token missing'});

    }

}
