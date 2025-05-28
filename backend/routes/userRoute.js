import express from 'express'
import { getCurrentUser, loginUser, registerUser, updatePassword, updateProfile } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth.js';

const userRouter = express.Router();

//PUBLIC Links
userRouter.post('/register',registerUser);
userRouter.post('/login',loginUser);

//PRIVATE Links
//to make this links private we have to write protect links middleware
userRouter.get('/me',authMiddleware ,getCurrentUser);
userRouter.put('/profile',authMiddleware,updateProfile);
userRouter.put('/password',authMiddleware,updatePassword);


export default userRouter;