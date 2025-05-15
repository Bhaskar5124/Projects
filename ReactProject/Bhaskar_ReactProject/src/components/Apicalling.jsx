import React, { useEffect, useState } from 'react'
import axios from 'axios'

//Calling Main API which has all the products and export its value to the body component
function Apicalling() {
    const api = "https://dummyjson.com/products";
    let [productarray,setproductarray] = useState([])

    useEffect(()=>{
        async function Calling() {
            let resp = await axios.get(api);
            setproductarray(resp.data.products);
            console.log(resp.data.products);
        }
        Calling();
    },[])

  return productarray;
}

export default Apicalling



