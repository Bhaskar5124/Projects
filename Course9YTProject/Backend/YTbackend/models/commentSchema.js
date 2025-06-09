import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  text: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const commentModel = mongoose.model('comments',commentSchema);
export default commentModel;