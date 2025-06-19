import { createchannel, displayAllChannels } from "../controllers/channelController.js";



export function channelRoutes(app){
    app.post('/createchannel',createchannel);
    app.get('/channels', displayAllChannels);
}