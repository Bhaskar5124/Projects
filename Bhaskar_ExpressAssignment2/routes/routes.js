import { addnewuser, deleteuser, displayuser, getallusers, updateuser } from "../controllers/usercontroller.js";

export function routes(app){
    //Fetch all users from the MongoDB collection.
    app.get('/users',getallusers);

    //Fetch details of a specific user by MongoDB ObjectId.
    app.get('/users/:id',displayuser);

    //Add a new user and save it in MongoDB.
    app.post('/user',addnewuser);
    
    //Update details of an existing user.
    app.put('/user/:id',updateuser);

    //Delete a user by MongoDB ObjectId.
    app.delete('/user/:id',deleteuser);
}
