import cart from "../models/cartschema.js";
import products from "../models/productschema.js";

export async function addtocart(req,res){
    try{
        let additemid = req.params.id;
        let itemtoadd = await products.findById(additemid);
        if(!itemtoadd){
            return res.status(404).json({message:`Product with Id:${additemid} not found`});
        }

        let {quantity} = req.body;
        let palreadyincart = await cart.find({productId:additemid});

        if(palreadyincart.length!=0){
            await cart.updateOne({productId:additemid},{$inc: {quantity : req.body.quantity}})
            return res.status(200).json({message:`Product '${itemtoadd.name}' already in cart, updated quantity in cart`});
        }
        else{
            let newpincart = await cart.insertOne({
                productId:additemid,
                productName: itemtoadd.name,
                quantity:req.body.quantity,
            });
            return res.status(201).json({message:`New product '${itemtoadd.name}' added in cart`});
        }
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }

}

export async function updatecart(req,res){
    try{
        let updateproductid = req.params.id;
        let {quantity} = req.body;
        let uppdincart = await cart.findByIdAndUpdate(updateproductid, {quantity} , {new:true});
        return res.status(200).json({
            message:`Product quantity updated succesfully with cart item Id:${updateproductid}`,
            uppdincart
        });
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

export async function deletefromcart(req,res){
    try{
        let deleteproductid = req.params.id;
        let deletedproduct = await cart.findByIdAndDelete(deleteproductid);
        return res.status(204).json({message:`Product is removed from cart`});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }

}


export async function allcartitems(req,res){
    try{
        let allcartproducts = await cart.find();
        return res.status(200).json({CartProducts:allcartproducts});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}
