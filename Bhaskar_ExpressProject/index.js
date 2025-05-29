import express from 'express';
import mongoose from 'mongoose';
import { productsroutes } from './routes/productsroutes.js';
import { cartroutes } from './routes/cartroutes.js';
import { userroutes } from './routes/userroutes.js';
import { seedDB } from './seed.js';


//defining the app
const app = express();

//defining the port and sending the connected response
const PORT = 8050;
app.listen(PORT, ()=>{
    console.log(`Server Connected at PORT: ${PORT}`);
});

//'shoppyglobe' is the name of the database created in mongodb for your app and the IP address refers to your local machine aka your Laptop
//connect method returns you a promise
mongoose.connect('mongodb://127.0.0.1:27017/shoppyglobe')
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("Error in DB Connection", err);
});


//seeding data into products for once
//seedDB();

//middlewares
app.use(express.json());

//routes calling
productsroutes(app);
cartroutes(app);
userroutes(app);