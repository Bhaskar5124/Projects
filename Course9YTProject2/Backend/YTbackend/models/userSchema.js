import mongoose from "mongoose";

const userSchema = new mongoose.schema({
    userId: {
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email: {
        type: String,
        format: email,
        unique: true,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        max: 20
    },
    avatar:{
        type:String
    },
    channel:{
        type:String
    }
});

const userModel = mongoose.model('users',userSchema);

export default userModel;