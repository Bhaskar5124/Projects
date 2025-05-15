import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

//Calling Filtered API with clicked product id and exporting response to Productdetails component
function Callingfordetails() {
    const {id} = useParams();
    const api = `https://dummyjson.com/products/${id}`;
    let [parray,setparray] = useState([])

    useEffect(()=>{
        
        async function filterCalling() {
            let resp = await axios.get(api);
            console.log(resp.data);
            setparray(resp.data);
        }
        filterCalling();
    },[id])

  return parray;
}

export default Callingfordetails