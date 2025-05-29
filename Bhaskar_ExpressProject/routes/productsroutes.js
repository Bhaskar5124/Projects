import { displayallproducts, displayspecificproduct } from "../controllers/productcontroller.js";

export function productsroutes(app){
    
    //To display all products
    app.get('/api/products', displayallproducts);

    //To display specific product found by given id
    app.get('/api/products/:id', displayspecificproduct);
}