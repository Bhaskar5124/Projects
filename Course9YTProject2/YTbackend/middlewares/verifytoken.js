import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/server.js';

export function verifytoken(req,res,next){
    if(req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] == "JWT"
    ){
        jwt.verify(
            req.headers.authorization.split(" ")[1],
            JWT_SECRET_KEY,
            (err,verifiedtoken)=>{
                if(err){
                    res.status(403).json({message:'Invalid token'});
                }
                console.log(verifiedtoken);
                req.user = verifiedtoken;
                next();
            }
        )
    }else{
        return res.status(409).json({message:'Token not found'});
    }
}