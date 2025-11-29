import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
// Import path updated to point to the model in the src folder
import { Product, IProduct, IReview } from './src/product.model';

// Load environment variables from .env file
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/productsDB';

// Define a type for the plain data objects used for insertion.
// This structure must match the properties of IProduct but without the Mongoose Document methods.
type ProductSeedData = {
  _id: number;
  name: string;
  category: 'Electronics' | 'Apparel' | 'Books';
  price: number;
  rating: number;
  tags?: string[];
  stock?: number;
  reviews?: IReview[];
  cost?: number;
};

// Initial dataset provided in the assignment
// FIX: Using the explicit ProductSeedData type to ensure _id is included and Mongoose methods are excluded.
const productData: ProductSeedData[] = [
  {"_id":1,"name":"Product 1","category":"Electronics","price":100,"rating":4.5,"tags":["new","hot"],"stock":50,"reviews":[{"user":"Alice","score":5},{"user":"Bob","score":4}]},
  {"_id":2,"name":"Product 2","category":"Apparel","price":150,"rating":3.8,"tags":["sale"],"stock":30,"reviews":[{"user":"Charlie","score":3}]},
  {"_id":3,"name":"Product 3","category":"Electronics","price":100,"rating":4.0,"stock":20,"reviews":[{"user":"David","score":4}]},
  {"_id":4,"name":"Product 4","category":"Books","price":80,"rating":4.2,"reviews":[{"user":"Eve","score":5}]},
  {"_id":5,"name":"Product 5","category":"Apparel","price":120,"rating":4.5,"tags":["popular"],"stock":15,"reviews":[{"user":"Frank","score":4},{"user":"Grace","score":5}]},
  {"_id":6,"name":"Product 6","category":"Electronics","price":100,"rating":4.0,"stock":10,"reviews":[{"user":"Heidi","score":4}]},
  {"_id":7,"name":"Product 7","category":"Books","price":90,"rating":3.9,"reviews":[{"user":"Ivan","score":3}]},
  {"_id":8,"name":"Product 8","category":"Electronics","price":150,"rating":4.8,"tags":["featured"],"stock":25,"reviews":[{"user":"Judy","score":5}]},
  {"_id":9,"name":"Product 9","category":"Apparel","price":120,"rating":4.2,"stock":18,"reviews":[{"user":"Mallory","score":4}]},
  {"_id":10,"name":"Product 10","category":"Books","price":70,"rating":4.0,"reviews":[{"user":"Niaj","score":3}]},
  {"_id":11,"name":"Product 11","category":"Electronics","price":100,"rating":4.5,"tags":["new"],"stock":12,"reviews":[{"user":"Oscar","score":5}]},
  {"_id":12,"name":"Product 12","category":"Apparel","price":130,"rating":3.8,"stock":8,"reviews":[{"user":"Peggy","score":3}]},
  {"_id":13,"name":"Product 13","category":"Books","price":80,"rating":4.5,"reviews":[{"user":"Quinn","score":5}]},
  {"_id":14,"name":"Product 14","category":"Electronics","price":150,"rating":4.2,"stock":30,"reviews":[{"user":"Rupert","score":4}]},
  {"_id":15,"name":"Product 15","category":"Apparel","price":120,"rating":4.0,"stock":22,"reviews":[{"user":"Sybil","score":4}]},
  {"_id":16,"name":"Product 16","category":"Books","price":90,"rating":3.7,"reviews":[{"user":"Trent","score":3}]},
  {"_id":17,"name":"Product 17","category":"Electronics","price":200,"rating":4.5,"stock":40,"reviews":[{"user":"Uma","score":5}]},
  {"_id":18,"name":"Product 18","category":"Apparel","price":120,"rating":4.0,"stock":10,"reviews":[{"user":"Victor","score":4}]},
  {"_id":19,"name":"Product 19","category":"Books","price":70,"rating":4.8,"reviews":[{"user":"Walter","score":5}]},
  {"_id":20,"name":"Product 20","category":"Electronics","price":150,"rating":4.2,"stock":5,"reviews":[{"user":"Xena","score":4}]},
  {"_id":21,"name":"Product 21","category":"Electronics","price":200,"rating":4.0,"tags":["premium"],"stock":10,"reviews":[{"user":"Yasmine","score":4}]},
  {"_id":22,"name":"Product 22","category":"Books","price":60,"rating":4.1,"reviews":[{"user":"Zack","score":3}]},
  {"_id":23,"name":"Product 23","category":"Apparel","price":140,"rating":3.9,"tags":["limited"],"stock":7,"reviews":[{"user":"Amy","score":4}]},
  {"_id":24,"name":"Product 24","category":"Electronics","price":120,"rating":4.3,"tags":["trending"],"stock":18,"reviews":[{"user":"Brian","score":5}]},
  {"_id":25,"name":"Product 25","category":"Books","price":70,"rating":3.9,"reviews":[{"user":"Cathy","score":3}]}
];

async function seedDatabase() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('Successfully connected to MongoDB.');

    // 2. Clear previous data
    await Product.deleteMany({});
    console.log('Existing products cleared.');

    // 3. Insert new data
    // The insertMany function accepts the array of plain objects.
    const result = await Product.insertMany(productData);
    console.log(`Successfully inserted ${result.length} products.`);

    // 4. Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB. Seeding complete.');
  } catch (error) {
    console.error('Database seeding failed:', error);
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

seedDatabase();