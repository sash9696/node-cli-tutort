import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const authService = {

    async signup(username, password){
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser  = new User({username, password:hashedPassword});
        await newUser.save();
        return newUser;
    },

    async login(username, password){
        const user = await User.findOne({ username });
  
        if (!user) {
          throw new Error('Invalid credentials');
        }
    
        //check the password
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }
    
        //generate a jwt token
    
        const token = jwt.sign({username:user.username}, process.env.JWT_SECRET,{expiresIn:'1h'});
        console.log('token',token)
    
        return token;
    }

}

export default authService;