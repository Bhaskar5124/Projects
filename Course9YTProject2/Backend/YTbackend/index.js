import express from 'express';
import mongoose from 'mongoose';
import { seedCommentDB, seedVideoDB } from './seedData.js';
import cors from 'cors';
import { videoRoutes } from './routes/videoRoutes.js';

//defining the app
const app = express();

//defining the port and sending the connected response
const PORT = 8050;
app.listen(PORT, ()=>{
    console.log(`Server Connected at PORT: ${PORT}`);
});


//'youtube' is the name of the database created in mongodb for your app and the IP address refers to your local machine aka your Laptop
//connect method returns you a promise
mongoose.connect('mongodb://127.0.0.1:27017/youtubeapp')
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("Error in DB Connection", err);
});


//Seeding Data to Databases
//seedVideoDB();
//seedCommentDB();

//middlewares
app.use(express.json());
app.use(cors());


//Routes Calling
videoRoutes(app);