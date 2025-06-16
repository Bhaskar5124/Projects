import express from 'express';
import mongoose from 'mongoose';
import { seedCommentDB, seedUserDB, seedVideoDB } from './seedData.js';
import cors from 'cors';
import { videoRoutes } from './routes/videoRoutes.js';
import { userRoutes } from './routes/userRoutes.js';
import { PORT } from './config/server.js';
import { commentsRoutes } from './routes/commentRoutes.js';
import { channelRoutes } from './routes/channelRoutes.js';

//defining the app
const app = express();

//defining the port and sending the connected response

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
//seedUserDB();

//middlewares
app.use(express.json({ limit: '50mb' }));
app.use(cors());


//Routes Calling
videoRoutes(app);
userRoutes(app);
commentsRoutes(app);
channelRoutes(app);