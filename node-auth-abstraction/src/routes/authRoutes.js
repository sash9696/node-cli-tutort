import express from 'express';
import authController from '../controllers/authController.js';


const router = express.Router();

//'/auth/signup'
router.post("/signup", authController.signup);
  
router.post("/login", authController.login);


export default router; 