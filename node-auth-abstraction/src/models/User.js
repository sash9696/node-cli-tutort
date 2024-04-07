import  mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type:String, unique:true, required: true},
    password:  {type:String, required: true},
  });
  
  //create a model;
  
const User = mongoose.model("User", userSchema);

export default User;
  