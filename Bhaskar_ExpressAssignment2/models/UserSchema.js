import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        required: true,
        max: 20,
        min:8,
        unique: true,
    },
    firstName: {
        type: String,
        required : true,
        max : 50,
        min : 10
    },
    lastName: {
        type: String,
        required : true,
        max : 50,
        min : 10
    },
    hobby: String,
});


const users = mongoose.model('users',userSchema);

export default users;