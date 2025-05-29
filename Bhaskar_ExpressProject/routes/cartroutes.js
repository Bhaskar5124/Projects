import { addtocart, allcartitems, deletefromcart, updatecart } from "../controllers/cartcontroller.js"
import { verifytoken } from "../middlewares/verifytoken.js";

export function cartroutes(app){

    //To add product to cart
    app.post('/api/cart/:id', verifytoken, addtocart);

    //To update quantity of product in cart
    app.put('/api/cart/:id', verifytoken, updatecart);

    //To delete product in cart
    app.delete('/api/cart/:id', verifytoken, deletefromcart);

    //To Show all cart items
    app.get('/api/carts', verifytoken, allcartitems);
}