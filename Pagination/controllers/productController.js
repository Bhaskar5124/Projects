import Product from "../models/productSchema.js";

// 1. Skip-Limit Pagination
export async function skipLimit(req,res){
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5;
    const skipAmount = (page - 1) * pageSize;

    try {
        const products = await Product.find({})
            .sort({ price: 1 }) 
            .skip(skipAmount)
            .limit(pageSize);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 2. Keyset Pagination (Cursor-based with tie-breaker)
export async function keyset(req,res){
    const lastPrice = parseFloat(req.query.lastPrice);
    const lastId = parseInt(req.query.lastId);
    const pageSize = parseInt(req.query.pageSize) || 5;

    let findQuery = {};

    if (lastPrice && lastId) {
        findQuery = {
            $or: [
                { price: { $gt: lastPrice } },
                { price: lastPrice, _id: { $gt: lastId } }
            ]
        };
    }

    try {
        const products = await Product.find(findQuery)
            .sort({ price: 1, _id: 1 }) 
            .limit(pageSize);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// 3. Filter + Keyset Pagination
export async function filterKeyset(req,res){
    const { category, rating, lastPrice, lastId, pageSize: pageSizeParam } = req.query;
    const pageSize = parseInt(pageSizeParam) || 5;

    let baseFilter = {};
    let keysetFilter = {};
    
    // Build Base Filter
    if (category) {
        baseFilter.category = category;
    }
    if (rating) {
        baseFilter.rating = { $gte: parseFloat(rating) }; 
    }
    
    // Build Keyset Filter
    if (lastPrice && lastId) {
        const parsedLastPrice = parseFloat(lastPrice);
        const parsedLastId = parseInt(lastId);

        keysetFilter = {
            $or: [
                { price: { $gt: parsedLastPrice } },
                { price: parsedLastPrice, _id: { $gt: parsedLastId } }
            ]
        };
    }
    
    // Combine base filter AND keyset filter
    const finalQuery = { ...baseFilter, ...keysetFilter }; 

    try {
        const products = await Product.find(finalQuery)
            .sort({ price: 1, _id: 1 })
            .limit(pageSize);

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}