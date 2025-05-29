import users from "../models/userschema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function registeruser(req,res){
    try{
        let {fullName,email,password} = req.body;
        users.findOne({email})
        .then((data)=>{
            if(data){
                return res.status(409).json({message:'User with this email already exists'});
            }
            else{
                users.create({
                    fullName,
                    email,
                    password: bcrypt.hashSync(password,10)
                });

                res.status(201).json({message:`New User created`});
            }
        })
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

export async function loginuser(req,res){
    try{
        let {email, password} = req.body;
        users.findOne({email})
        .then((data)=>{
            if(!data){
                return res.status(403).json({message:'User does not exist, Please register'});
            }
            let validpassword = bcrypt.compareSync(password,data.password);
            if(!validpassword){
                return res.status(403).json({message:'Wrong Credentials'});
            }

            const token = jwt.sign({data}, 'Secretkey',{expiresIn:'1h'});
            //console.log("token:",token);

            return res.status(200).json({message:`Welcome, ${data.fullName}`,Accesstoken: token});
        })
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}