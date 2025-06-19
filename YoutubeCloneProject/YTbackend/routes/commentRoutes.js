import { displayAllComments, newComment } from "../controllers/commentController.js";

export function commentsRoutes(app){
    app.post('/newcomment', newComment);
    app.get('/comments', displayAllComments);
}