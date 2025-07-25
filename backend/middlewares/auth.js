import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const JWT_SECRET =process.env.JWT_SECRET || 'abhishekkmalviya'; //here is my jwt secret

export default async function authMiddleware(req,res,next){
    // GRAB THE BEARER TOKEN FROM AUTHORIZATION HEADER
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401)
        .json({success:false,message:"Not Authorized,token Missing"});
    }

    const token = authHeader.split(' ')[1];

    //VERIFT AND ATTACH USER OBJECT
    try{
        const payload = jwt.verify(token,JWT_SECRET);
        const user= await User.findById(payload.id).select('-password');

        if(!user){
            return res.status(401).json({success:false,message:"user not found"});
        }
        req.user=user;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({success:false,message:"Token invalid or expired"});
    }
}
