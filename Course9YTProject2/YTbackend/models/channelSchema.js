import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelName: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type:String,
      // type:mongoose.Schema.Types.ObjectId,
      // ref: 'users',
      // required: true
    },
    userIdOwner:{
      type:String,
    },
    description: {
      type: String,
    },
    channelBanner: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    // videos: {
    //   type:Array,
    //     //type:mongoose.Schema.Types.ObjectId,
    //     //ref:'videos' // here we set the reference to video collection.
    // }
});


const channels = mongoose.model('channels', channelSchema);

export default channels;