import {MongoClient} from 'mongodb';

const mongoUrl = 'mongodb://127.0.0.1:27017/'; 
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