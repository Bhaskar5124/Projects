import { filterKeyset, keyset, skipLimit } from "../controllers/productController.js";

export function productRoutes(app){
    app.get('/products/skip-limit', skipLimit);
    app.get('/products/keyset', keyset);
    app.get('/products/filter', filterKeyset);
}