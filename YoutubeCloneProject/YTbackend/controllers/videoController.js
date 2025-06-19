import {MongoClient} from 'mongodb';
import { MONGODB_URL } from '../config/server.js';
import channels from "../models/channelSchema.js";
import users from "../models/userSchema.js";
import cloudinary from '../config/cloudinaryconfig.js';
import videos from '../models/videoSchema.js';

const mongoUrl = MONGODB_URL; 
const dbName = 'youtubeapp'; 
const collectionName = 'videos'; 
export async function displayAllVideos(req,res){
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




export async function createVideo(req,res){
    try{
        let {              
              videoId,
              title,
              category,
              videoUrl,
              thumbnailUrl,
              description,
              channelName,
              channelId,
              uploader,
              views,
              likes,
              dislikes,
              uploadDate,} = req.body;
              //console.log(req.body);
        const result = await cloudinary.uploader.upload(videoUrl,{
          folder:"userChannelVideos",
          resource_type: 'video',
          chunk_size: 50 * 1024 * 1024, 
        });
        //console.log("result.secure_url",result.secure_url);
        await users.findOne({_id:videoId})
        .then((data)=>{
            if(data){
                let newvideo = videos.create({
                  videoId,
                  title,
                  category,
                  videoUrl:result.secure_url,
                  thumbnailUrl,
                  description,
                  channelName,
                  channelId,
                  uploader,
                  views,
                  likes,
                  dislikes,
                  uploadDate,
                })
                return res.status(201).json({
                    message: `${uploader} with Channel:${channelName} uploaded a Video`,
                    videodata:newvideo,
                  })
            }
        })
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}