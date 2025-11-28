import mongoose from 'mongoose';
import { mongoURI } from './config/server.js';
import Product from './models/productSchema.js';

// 1. DATA 
const productData = 
[
{"_id":1,"name":"Product 1","category":"Electronics","price":100,"rating":4.5},
{"_id":2,"name":"Product 2","category":"Apparel","price":150,"rating":3.8},
{"_id":3,"name":"Product 3","category":"Electronics","price":100,"rating":4.0},
{"_id":4,"name":"Product 4","category":"Books","price":80,"rating":4.2},
{"_id":5,"name":"Product 5","category":"Apparel","price":120,"rating":4.5},
{"_id":6,"name":"Product 6","category":"Electronics","price":100,"rating":4.0},
{"_id":7,"name":"Product 7","category":"Books","price":90,"rating":3.9},
{"_id":8,"name":"Product 8","category":"Electronics","price":150,"rating":4.8},
{"_id":9,"name":"Product 9","category":"Apparel","price":120,"rating":4.2},
{"_id":10,"name":"Product 10","category":"Books","price":70,"rating":4.0},
{"_id":11,"name":"Product 11","category":"Electronics","price":100,"rating":4.5},
{"_id":12,"name":"Product 12","category":"Apparel","price":130,"rating":3.8},
{"_id":13,"name":"Product 13","category":"Books","price":80,"rating":4.5},
{"_id":14,"name":"Product 14","category":"Electronics","price":150,"rating":4.2},
{"_id":15,"name":"Product 15","category":"Apparel","price":120,"rating":4.0},
{"_id":16,"name":"Product 16","category":"Books","price":90,"rating":3.7},
{"_id":17,"name":"Product 17","category":"Electronics","price":200,"rating":4.5},
{"_id":18,"name":"Product 18","category":"Apparel","price":120,"rating":4.0},
{"_id":19,"name":"Product 19","category":"Books","price":70,"rating":4.8},
{"_id":20,"name":"Product 20","category":"Electronics","price":150,"rating":4.2}
]

// --- Seeding Function ---
const seedDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(mongoURI);

        console.log('Inserting new products...');
        // Insert the new data
        await Product.insertMany(productData);

        console.log(`Successfully inserted ${productData.length} products.`);

        // --- Create Indexes ---
        console.log('Creating necessary indexes...');
        await Product.collection.createIndex({ price: 1, _id: 1 });
        await Product.collection.createIndex({ category: 1, rating: 1, price: 1, _id: 1 });
        console.log('Indexes created successfully.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log('MongoDB connection closed.');
    }
};

seedDB();