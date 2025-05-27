//Main File

import express from 'express';
import mongoose from 'mongoose';
import {routes} from './routes/routes.js';

const app = express();

//'userapp' is the name of the database created in mongodb for your app and the IP address refers to your local machine aka your Laptop
//connect method returns you a promise
mongoose.connect('mongodb://127.0.0.1:27017/userapp')
.then(()=>{
    console.log('DB Connected');
})
.catch((err)=>{
    console.log('Error in DB connection',err)
});


//app.use Middleware
app.use(express.json()); //req.body parsing middleware
routes(app);

const PORT = 8050;
app.listen(PORT,()=>{
    console.log(`Server Connected at PORT:${PORT}`);
})