import { login, register } from "../controllers/userController.js";


export function userRoutes(app){
    app.post('/register' , register);
    app.post('/login' , login);
}