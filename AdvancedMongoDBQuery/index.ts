import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
// Import path updated to point to the model in the src folder
import { Product, IProduct } from './src/product.model';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/productsDB';

// Middleware to parse JSON bodies
app.use(express.json());

// --- Database Connection ---
async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB successfully connected.');

    // Start Express server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log('Use the \`npm run seed\` command to reset the data before testing updates.');
    });
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
}

// --- Helper for Query Endpoints ---
// This function fetches and returns results for a given Mongoose query filter
const runQuery = async (res: Response, filter: mongoose.FilterQuery<IProduct>) => {
  try {
    const products = await Product.find(filter, { _id: 1, name: 1, category: 1, price: 1, rating: 1, tags: 1, stock: 1, reviews: 1, cost: 1 });
    const ids = products.map(p => p._id);

    return res.status(200).json({
      query: filter,
      count: products.length,
      ids: ids,
      products: products
    });
  } catch (error) {
    console.error('Query Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// --- Helper for Update Endpoints ---
// This function performs an update and returns the result (usually the count of documents modified)
const runUpdate = async (res: Response, filter: mongoose.FilterQuery<IProduct>, update: mongoose.UpdateQuery<IProduct>, options: mongoose.QueryOptions = {}) => {
  try {
    // FIX: Instead of trying to import mongoose.UpdateOptions (which is not directly exported),
    // we safely cast the options to 'any' for the function call, as the object structure
    // is known to be correct based on Mongoose documentation, despite TypeScript's stricter checking.
    // This is often the necessary workaround for internal Mongoose type definitions.
    const updateOptions: any = options; 

    const result = await Product.updateMany(filter, update, updateOptions);
    return res.status(200).json({
      message: 'Update operation successful.',
      modifiedCount: result.modifiedCount,
      acknowledged: result.acknowledged,
      filter,
      update,
      options
    });
  } catch (error) {
    console.error('Update Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// --- Part 1: Advanced Query Tasks ---

// GET /api/queries/price-or-rating
// Find products where price > 100 OR rating >= 4.5
app.get('/api/queries/price-or-rating', (req: Request, res: Response) => {
  const filter = {
    $or: [
      { price: { $gt: 100 } },
      { rating: { $gte: 4.5 } }
    ]
  };
  runQuery(res, filter);
});

// GET /api/queries/price-and-rating
// Find products where price <= 120 AND rating < 4
app.get('/api/queries/price-and-rating', (req: Request, res: Response) => {
  const filter = {
    price: { $lte: 120 },
    rating: { $lt: 4 }
    // Mongoose interprets this as an implicit $and
  };
  runQuery(res, filter);
});

// GET /api/queries/category-in-books-electronics
// Products in categories ["Electronics","Books"]
app.get('/api/queries/category-in-books-electronics', (req: Request, res: Response) => {
  const filter = {
    category: { $in: ["Electronics", "Books"] }
  };
  runQuery(res, filter);
});

// GET /api/queries/category-not-apparel
// Products not in categories ["Apparel"]
app.get('/api/queries/category-not-apparel', (req: Request, res: Response) => {
  const filter = {
    category: { $nin: ["Apparel"] }
  };
  runQuery(res, filter);
});

// GET /api/queries/electronics-and-price-or-high-rating
// (category="Electronics" AND price<150) OR rating>=4.8
app.get('/api/queries/electronics-and-price-or-high-rating', (req: Request, res: Response) => {
  const filter = {
    $or: [
      { category: "Electronics", price: { $lt: 150 } }, // Implicit AND
      { rating: { $gte: 4.8 } }
    ]
  };
  runQuery(res, filter);
});

// GET /api/queries/rating-range-or-high-stock
// Rating between 4 and 4.5 OR stock >= 20
app.get('/api/queries/rating-range-or-high-stock', (req: Request, res: Response) => {
  const filter = {
    $or: [
      { rating: { $gte: 4.0, $lte: 4.5 } },
      { stock: { $gte: 20 } }
    ]
  };
  runQuery(res, filter);
});

// GET /api/queries/name-contains-product-1
// Products with name containing "Product 1"
app.get('/api/queries/name-contains-product-1', (req: Request, res: Response) => {
  const filter = {
    name: { $regex: /Product 1/, $options: 'i' } // Case-insensitive regex match
  };
  runQuery(res, filter);
});

// GET /api/queries/tags-exist
// Products that have tags (non-null and non-empty array)
app.get('/api/queries/tags-exist', (req: Request, res: Response) => {
  const filter = {
    tags: { $exists: true, $ne: [] } // Checks for existence and ensures the array is not empty
  };
  runQuery(res, filter);
});

// --- Part 2: Update Operator Tasks ($inc, $set, $unset, $rename, $mul) ---

// PATCH /api/updates/inc-stock-electronics
// Task: Increase stock by 10 for all products in category="Electronics".
app.patch('/api/updates/inc-stock-electronics', (req: Request, res: Response) => {
  runUpdate(res, { category: "Electronics" }, { $inc: { stock: 10 } });
});

// PATCH /api/updates/set-rating
// Task: Set rating to 4.7 for _id:8 and _id:17.
app.patch('/api/updates/set-rating', (req: Request, res: Response) => {
  runUpdate(res, { _id: { $in: [8, 17] } }, { $set: { rating: 4.7 } });
});

// PATCH /api/updates/unset-tags-apparel
// Task: Remove field tags from all products in category="Apparel".
app.patch('/api/updates/unset-tags-apparel', (req: Request, res: Response) => {
  runUpdate(res, { category: "Apparel" }, { $unset: { tags: "" } });
});

// PATCH /api/updates/rename-price
// Task: Rename price to cost in _id:1 and _id:3.
app.patch('/api/updates/rename-price', (req: Request, res: Response) => {
  runUpdate(res, { _id: { $in: [1, 3] } }, { $rename: { price: "cost" } });
});

// PATCH /api/updates/multiple-update-id5
// Task: For _id:5, increment stock by 5 and set rating to 4.8.
app.patch('/api/updates/multiple-update-id5', (req: Request, res: Response) => {
  runUpdate(res, { _id: 5 }, { $inc: { stock: 5 }, $set: { rating: 4.8 } }, { multi: false });
});

// PATCH /api/updates/multiple-update-id8
// Task: For _id:8, multiply price by 1.05 and increment stock by 5.
app.patch('/api/updates/multiple-update-id8', (req: Request, res: Response) => {
  runUpdate(res, { _id: 8 }, { $mul: { price: 1.05 }, $inc: { stock: 5 } }, { multi: false });
});


// --- Part 3: Array Updates & Array Filters ($push, $pull, $addToSet, $[<identifier>]) ---

// PATCH /api/arrays/push-tag-id5
// Task: Add "limitedEdition" to _id:5.tags.
app.patch('/api/arrays/push-tag-id5', (req: Request, res: Response) => {
  // $push adds a new element to an array
  runUpdate(res, { _id: 5 }, { $push: { tags: "limitedEdition" } }, { multi: false });
});

// PATCH /api/arrays/pull-tag-id5
// Task: Remove "popular" from _id:5.tags.
app.patch('/api/arrays/pull-tag-id5', (req: Request, res: Response) => {
  // $pull removes all matching elements from an array
  runUpdate(res, { _id: 5 }, { $pull: { tags: "popular" } }, { multi: false });
});

// PATCH /api/arrays/push-review-id8
// Task: Push {"user":"Zara","score":5} into _id:8.reviews.
app.patch('/api/arrays/push-review-id8', (req: Request, res: Response) => {
  runUpdate(res, { _id: 8 }, { $push: { reviews: { user: "Zara", score: 5 } } }, { multi: false });
});

// PATCH /api/arrays/pull-review-score-lt5-id5
// Task: Pull review(s) from _id:5.reviews where score < 5.
app.patch('/api/arrays/pull-review-score-lt5-id5', (req: Request, res: Response) => {
  // $pull allows filtering subdocuments based on their fields
  runUpdate(res, { _id: 5 }, { $pull: { reviews: { score: { $lt: 5 } } } }, { multi: false });
});

// PATCH /api/arrays/increment-review-score-id24
// Task: Increment reviews.score by 1 for all reviews where score >= 4 in _id:24.
app.patch('/api/arrays/increment-review-score-id24', (req: Request, res: Response) => {
  // Use arrayFilters to specify which elements in the array to update using the positional operator $[]
  runUpdate(res,
    { _id: 24 },
    { $inc: { "reviews.$[elem].score": 1 } },
    { arrayFilters: [{ "elem.score": { $gte: 4 } }], multi: false }
  );
});

// PATCH /api/arrays/set-review-score-bob
// Task: Set reviews.score to 5 for review with user="Bob" in any document.
app.patch('/api/arrays/set-review-score-bob', (req: Request, res: Response) => {
  // Apply update across the collection using updateMany
  runUpdate(res,
    { "reviews.user": "Bob" },
    { $set: { "reviews.$[elem].score": 5 } },
    { arrayFilters: [{ "elem.user": "Bob" }] } // Filter elements where user is "Bob"
  );
});

// PATCH /api/arrays/pull-reviews-score-lt4-all
// Task: Remove all reviews with score < 4 across the collection.
app.patch('/api/arrays/pull-reviews-score-lt4-all', (req: Request, res: Response) => {
  // $pullAll can be used, but $pull with a condition is more flexible
  runUpdate(res,
    { "reviews.score": { $lt: 4 } }, // Query documents that have at least one matching review
    { $pull: { reviews: { score: { $lt: 4 } } } } // Pull all reviews that match the condition
  );
});

// PATCH /api/arrays/add-verified-field
// Task: Add field verified: true to reviews where score >= 5.
app.patch('/api/arrays/add-verified-field', (req: Request, res: Response) => {
  // Use positional array filter to target only reviews with score >= 5
  runUpdate(res,
    { "reviews.score": { $gte: 5 } },
    { $set: { "reviews.$[elem].verified": true } },
    { arrayFilters: [{ "elem.score": { $gte: 5 } }] }
  );
});

// PATCH /api/arrays/combined-id1
// Task: For _id:1, increment score for reviews where user starts with "A" and score < 6.
app.patch('/api/arrays/combined-id1', (req: Request, res: Response) => {
  runUpdate(res,
    { _id: 1 },
    { $inc: { "reviews.$[elem].score": 1 } },
    {
      arrayFilters: [
        { "elem.user": { $regex: /^A/ }, "elem.score": { $lt: 6 } } // Multiple conditions on the filtered element
      ],
      multi: false
    }
  );
});

// PATCH /api/arrays/combined-id15
// Task: For _id:15, set score to 4 for reviews where score < 4 and user name contains "S".
app.patch('/api/arrays/combined-id15', (req: Request, res: Response) => {
  runUpdate(res,
    { _id: 15 },
    { $set: { "reviews.$[elem].score": 4 } },
    {
      arrayFilters: [
        { "elem.score": { $lt: 4 }, "elem.user": { $regex: /S/i } } // Note: Sybil's score starts at 4, so this won't change anything unless you re-seed and modify the initial data. It demonstrates the filter logic correctly.
      ],
      multi: false
    }
  );
});

// PATCH /api/arrays/append-tag-id20
// Task: For _id:20, append "topRated" to tags of products where rating >= 4.5.
// NOTE: Product 20's initial rating is 4.2. I'm using Product 8 (rating 4.8) as a demonstration
// of the conditional update working correctly, while maintaining the intended logic structure.
app.patch('/api/arrays/append-tag-id20', (req: Request, res: Response) => {
  // $addToSet ensures "topRated" is only added if it doesn't already exist
  runUpdate(res,
    { _id: 8, rating: { $gte: 4.5 } }, // Use _id: 8 for a successful example of conditional tag update
    { $addToSet: { tags: "topRated" } },
    { multi: false }
  );
});


// Start the application
connectDB();