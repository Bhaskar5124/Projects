import products from "../models/productschema.js";

export async function displayallproducts(req,res){
    try{
        let allproducts = await products.find();
        return res.status(200).json({Products:allproducts});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}


export async function displayspecificproduct(req,res){
    try{
        let specificproductid = req.params.id;
        let specificproduct = await products.findById(specificproductid);
        if(!specificproduct){
            return res.status(404).json({message: `Product not found with Id:${specificproductid}`});
        }
        return res.status(200).json({specificproduct});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}