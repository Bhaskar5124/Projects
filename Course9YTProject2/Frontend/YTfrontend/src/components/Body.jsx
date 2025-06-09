
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import CallingVideos from "./CallingVideos";

function Body({filterdata}) {


  //function to format views as shown on site 
  function formatNumberWithKMB(number) {
    if (number >= 1000000000){
      return (number / 1000000000).toFixed(1) + 'B';
    }else if (number >= 1000000) {
         return (number / 1000000).toFixed(1) + 'M';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    } else {
        return number.toLocaleString();
    }
  }

  return (
    <main className="flex flex-wrap h-full/auto w-306/auto p-4 absolute top-24 left-14">
      <div className="flex flex-wrap justify-evenly items-center">
        {Array.isArray(filterdata) && filterdata.map((video,index)=>{
        return(
          <Link to={`/video/${index}`} key={index}>
            <div className="h-94/auto w-94 mx-1 mt-4 flex flex-col justify-start items-center border border-red-500">
              <div className="flex justify-center items-center my-2">
                <iframe className="h-50 w-92 rounded-xl" src={video.videoUrl} allow="autoplay"></iframe>
              </div>

              <div className="h-26 w-94 flex justify-between border">
                <div className="h-26 w-13 flex justify-start items-start border">
                  <img className="h-10 w-10 m-1 rounded-full" src={video.thumbnailUrl}/>
                </div>

                <div className="h-26 w-81 pr-2 pl-1 flex flex-col justify-start items-start flex-wrap border ">
                  <h1 className="text-left font-semibold">{video.title}</h1>
                  <h1 className="font-medium text-sm text-gray-600">{video.channelName}</h1>
                  <h1 className="font-medium text-sm text-gray-600">{formatNumberWithKMB(video.views)} views</h1>
                </div>

              </div>
              
            </div>
          </Link>
        )
      })}
      </div>

    </main>

  );
};

export default Body;
