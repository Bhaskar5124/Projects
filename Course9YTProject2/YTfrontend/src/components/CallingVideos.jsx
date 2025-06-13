import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CallingVideos() {
    const api = "http://localhost:8050/videodata";
    let [videodata,setvideosdata] = useState([])

    useEffect(()=>{
        async function Calling() {
            let resp = await axios.get(api);
            setvideosdata(resp.data);
            console.log(resp.data);
        }
        Calling();
    },[])
  return videodata;
}

export default CallingVideos;