import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required:true,
        min:5,
        max:30
    },
    email: {
        type: String,
        unique: true,
        required: true,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 10,
        max: 20
    }
})

//'users' model/collection/table name in vscode and in database for all products storage
const users = mongoose.model('users', userSchema);

export default users;