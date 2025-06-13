import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    videoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'videos',  // or whatever your videos collection is named
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,// storing ObjectId referencing User document
        ref: 'users', // reference to users collection for population
        required:true
    },
    timestamp:{
        type:Date,
        default: Date.now // sets default timestamp to current time
    }
});

const comments = mongoose.model('comments',commentSchema);
export default comments;