import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
    channelName: {
      type: String,
      required: true,
      trim: true
    },
    owner: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    description: {
      type: String,
    },
    channelBanner: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0
    },
    videos: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'videos' // here we set the reference to video collection.
    }
});


const channels = mongoose.model('channels', channelSchema);

export default channels;