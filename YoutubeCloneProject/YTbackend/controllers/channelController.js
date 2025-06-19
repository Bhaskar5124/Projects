import channels from "../models/channelSchema.js";
import users from "../models/userSchema.js";
import cloudinary from '../config/cloudinaryconfig.js';
import {MongoClient} from 'mongodb';
import { MONGODB_URL } from '../config/server.js';


export async function createchannel(req,res){
    try{
        let {channelName,owner,userIdOwner,description,channelBanner,subscribers} = req.body;
        const result = await cloudinary.uploader.upload(channelBanner,{
            folder:"userChannelBanner",
             resource_type: 'image',
             chunk_size: 10 * 1024 * 1024, 
        });
        await users.findOne({userName:owner})
        .then((data)=>{
            if(data){
                channels.create({
                    channelName,
                    owner,
                    userIdOwner,
                    description,
                    channelBanner:result.secure_url,
                    subscribers,
                })
                return res.status(201).json({
                    message: `${owner} created Channel:${channelName}`,
                    channel:{
                        _id:           data._id,
                        channelName:   data.channelName,
                        owner:         data.owner,
                        userIdOwner:   data.userIdOwner,          
                        description:   data.description,
                        channelBanner: data.channelBanner,
                        subscribers:   data.subscribers,
                    },})
            }
        })
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}




const mongoUrl = MONGODB_URL; 
const dbName = 'youtubeapp'; 
const collectionName = 'channels'; 
export async function displayAllChannels(req,res){
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