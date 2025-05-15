import { configureStore } from "@reduxjs/toolkit";
import cartreducer from './cartslice';

const appstore = configureStore({
    reducer:{
        cart: cartreducer,
    }
});

export default appstore;