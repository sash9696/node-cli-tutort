
//Real time chat app

//MERN
//websockets layer for real time case scenarios
//redux toolkit
//tailwind css

//Requirements/Features

//Real-time chat => users can send an recieve messages in real time
//User authentication: users can sign up, login, logout using jwt and also provide google auth
//Responsive design: website should be optimized for different screen and sizes
//Groups creation: users can create chat rooms and invite others to join
//Notifications: user will reciev notifications on new messages
//Emojis
//Profile page: users cn update their profile details like avatar , display name etc
//Users can create a room to chat with others
//Search functionality


import express from 'express';
import dotenv from 'dotenv/config';
import mongoDBConnect from './mongoDB/connections.js';
import userRoutes from './routes/user.js';
const app = express();

const PORT = process.env.PORT || 8000;
app.use(express.json());
//routes
//user routes
//chat routes
// message routes

mongoDBConnect();


app.use('/', userRoutes);
// app.use('/api/chat', chatRoutes);
// app.use('/api/message', messageRoutes);



app.listen(PORT, () => {
    console.log(`Server listening at port - ${PORT}`);
})