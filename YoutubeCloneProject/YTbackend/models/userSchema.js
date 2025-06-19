import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    avatar:{
        type:String
    },
    userName:{
        type:String,
        required:true,
        unique: true
    },
	email: {
        type: String,
        required: true,
		unique: true,
        // validate: {
        //     validator: function(value) {
        //         return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.-]+$/.test(value);
        //     },
        //     message: "Please enter a valid email address ending with @gmail.com"
        // }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        max: 20
    },
    // channel: {
    //     type: mongoose.Schema.Types.ObjectId, // ObjectId type to reference another MongoDB document
    //     ref: 'channels' // Refers to the 'channels' model for population
    // }
});

const users = mongoose.model('users',userSchema);

export default users;