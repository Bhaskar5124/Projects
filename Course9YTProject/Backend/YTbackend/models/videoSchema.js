import mongoose from "mongoose";
import commentModel from "./commentSchema.js";



const videoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  videoUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: true
  },
  description: {
    type:String,
  },
  channelName: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
    required: true
  },
  uploader: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  comments:{
    type:Array,
  },
});

const videoModel = mongoose.model('videos', videoSchema);

export default videoModel;