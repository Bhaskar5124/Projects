import { createVideo, displayAllVideos } from "../controllers/videoController.js";


export function videoRoutes(app){
    app.get('/videodata', displayAllVideos);
    app.post('/videoupload', createVideo);
}