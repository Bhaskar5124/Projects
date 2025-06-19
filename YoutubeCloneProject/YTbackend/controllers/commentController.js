import {MongoClient} from 'mongodb';
import { MONGODB_URL } from '../config/server.js';
import comments from "../models/commentSchema.js";
import users from '../models/userSchema.js';

const mongoUrl = 'mongodb://127.0.0.1:27017/'; 
const dbName = 'youtubeapp'; 
const collectionName = 'comments'; 

export async function displayAllComments(req,res){
    // try{
    //     let allcomments = await comments.find();
    //     return res.status(200).json({comments:allcomments});
    // }
    // catch(err){
    //     return res.status(500).json({message:err.message});
    // }

       try {
         const client = new MongoClient(mongoUrl);
         await client.connect();
         const db = client.db(dbName);
         const collection = db.collection(collectionName);
         const data = await collection.find().toArray();
         res.json(data);
         client.close();
       } catch (error) {
         console.error('Error fetching data:', error);
         res.status(500).json({ error: 'Failed to fetch data' });
       }
}



export async function newComment(req,res){
    try{
        let {text,videoId,userId,commentedUserAvatar,commentedUserName,timestamp} = req.body;
        users.findOne({_id:userId})
        .then((data)=>{
            if(data){
                    comments.create({
                    text,
                    videoId,
                    userId,
                    commentedUserAvatar,
                    commentedUserName,
                    timestamp,
                })
              return res.status(201).json({message: `${commentedUserName} Commented`})
                
            }
            else{
              return res.status(409).json({message:"Please Login to Comment"});
            }
        })
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}