import { loginuser, registeruser } from "../controllers/usercontroller.js";
import { verifytoken } from "../middlewares/verifytoken.js";

export function userroutes(app){

    //To register a new User
    app.post('/api/register', registeruser);

    //To login registered users only
    app.post('/api/login', loginuser);
}