import { Schema, model, Document } from 'mongoose';

// 1. Define the TypeScript Interface for a Review Subdocument
export interface IReview {
  user: string;
  score: number;
  verified?: boolean; // Added for Part 3 tasks
}

// 2. Define the TypeScript Interface for the main Product Document
// Document extends the interface to include Mongoose properties like _id, save(), etc.
export interface IProduct extends Document<number> {
  _id: number;
  name: string;
  category: 'Electronics' | 'Apparel' | 'Books'; // Use literal types for known categories
  price: number;
  rating: number;
  tags?: string[];
  stock?: number;
  reviews?: IReview[];
  cost?: number; // Added for $rename task
}

// 3. Define the Mongoose Schema for Reviews
const ReviewSchema = new Schema<IReview>({
  user: { type: String, required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  verified: { type: Boolean, required: false },
}, { _id: false }); // Reviews are embedded, so they don't need their own _id

// 4. Define the Mongoose Schema for Products
const ProductSchema = new Schema<IProduct>({
  _id: { type: Number, required: true }, // Using the provided _id for consistency
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Electronics', 'Apparel', 'Books'] },
  price: { type: Number, required: true, min: 0 },
  rating: { type: Number, required: true, min: 0, max: 5 },
  tags: { type: [String] },
  stock: { type: Number, min: 0 },
  reviews: { type: [ReviewSchema] },
  cost: { type: Number } // Field for $rename task
}, {
  timestamps: true,
  collection: 'products' // Explicitly name the collection
});

// 5. Create and Export the Mongoose Model
export const Product = model<IProduct>('Product', ProductSchema);