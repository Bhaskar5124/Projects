import users from "../models/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config/server.js';
import cloudinary from '../config/cloudinaryconfig.js';





//User registration
export async function register(req,res){
    try{
        let result = {};
        
        let {avatar,userName,email,password} = req.body;


        // Upload avatar to Cloudinary
          result = await cloudinary.uploader.upload(avatar,{folder:"userimages"});
        

        users.findOne({email})
        .then((data)=>{
            if(data){
                return res.status(409).json({message:"User already exists"})
            }
            else{
                users.create({
                    avatar: result.secure_url,
                    userName,
                    email,
                    password: bcrypt.hashSync(password, 10)
                })
                res.status(201).json({message: "User created successfully"})
            }
        })
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

// User login and generate token
export async function login(req,res){
    try{
        let {email,password} = req.body;
        users.findOne({email}).then((data)=>{
            if(!data){
                return res.status(403).json({message:"User doesn't exists"})
            }
            let validPassword = bcrypt.compareSync(password, data.password); 
            if(!validPassword){
                return res.status(403).json({message:"Wrong credentials"})
            }

            const token = jwt.sign({data}, JWT_SECRET_KEY , {expiresIn:'60m'});

            return res.status(200).json({
                message : `Welcome ${data.userName}`,
                user : {
                    _id: data._id,
                    avatar: data.avatar,
                    email: data.email,
                    username: data.userName
                },
                AccessToken: token,
                
            });
        })
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

