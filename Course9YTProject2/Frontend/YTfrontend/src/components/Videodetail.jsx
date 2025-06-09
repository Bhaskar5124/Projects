import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FaThumbsUp, FaThumbsDown, FaShare, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import Headerbody from './Headerbody';
import CallingVideos from './CallingVideos';

function Videodetail({filterdata,videoidnum}) {
  //const videosApiUrl = process.env.VIDEOS_API_URL;
  // let {id} = useParams();
  // let videoidnum = parseInt(id);

  // let respApi = CallingVideos();
  // let [filterdata,setfilterdata] = useState(respApi);
  
  //   useEffect(()=>{
  //     if(respApi && respApi.length){
  //       setfilterdata(respApi)
  //     }
  //   } , [respApi]);
  //   console.log(respApi[videoidnum]);

  // const api = "http://localhost:8050/videodata";
  // //let [videodata,setvideosdata] = useState([])
  // useEffect(()=>{
  //     async function Calling() {
  //         let resp = await axios.get(api);
  //         //setvideosdata(resp.data);
  //         console.log(resp.data[videoidnum]);
  //     }
  //     Calling();
  // },[])
 console.log(filterdata[videoidnum]);
  return (
    <Fragment>
      
      
      
    </Fragment>
  )
}

export default Videodetail