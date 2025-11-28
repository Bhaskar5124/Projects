import express from 'express';
import mongoose from 'mongoose';
import { productRoutes } from './routes/productRoutes.js';
import { mongoURI, PORT } from './config/server.js';



const app = express();

// --- Mongoose Connection ---
mongoose.connect(mongoURI).then(() => {
    console.log('MongoDB connected successfully');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//Routes
productRoutes(app);