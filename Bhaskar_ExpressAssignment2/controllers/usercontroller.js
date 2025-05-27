import users from '../models/UserSchema.js'

//Fetch all users from the MongoDB collection.
export async function getallusers(req,res){
    try{
        let allusers = await users.find();
        return res.status(200).json({Users:allusers});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
}

//Fetch details of a specific user by MongoDB ObjectId.
export async function displayuser(req,res){
    try{
        let specificuserid = req.params.id;
        let specificuser = await users.findById(specificuserid);
        res.status(200).json({specificuser});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }

}

//Add a new user and save it in MongoDB.
export async function addnewuser(req,res){
    try{
        let {userName,firstName,lastName,hobby} = req.body;
        let newuser = await users.create({userName,firstName,lastName,hobby});
        return res.status(201).json({message:newuser});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }

}

//Update details of an existing user.
export async function updateuser(req,res){
    try{
        let updateuserid = req.params.id;
        let {firstName,lastName,hobby} = req.body;
        let updateduser = await users.findByIdAndUpdate(updateuserid, {firstName,lastName,hobby});
        res.status(200).json({message:`User updated succesfully with ID:${updateuserid}`});
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }

}

//Delete a user by MongoDB ObjectId.
export async function deleteuser(req,res){
    try{
        let deleteuserid = req.params.id;
        await users.findByIdAndDelete(deleteuserid);
        res.status(200).json({message:`User deleted successfully with ID:${deleteuserid}`});
    }
    catch(err){
        return res.status(404).json({message:err.message});
    }

}