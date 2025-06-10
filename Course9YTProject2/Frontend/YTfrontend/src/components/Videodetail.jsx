import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FaThumbsUp, FaThumbsDown, FaShare, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import Headerbody from './Headerbody';
import CallingVideos from './CallingVideos';

function Videodetail({videoidnum}) {
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

  //function to format timestamp
  function getTimeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diff = now - past;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30.44);
  const years = Math.floor(days / 365);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (weeks < 5) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${years} year${years > 1 ? "s" : ""} ago`;
  }

   const api = "http://localhost:8050/videodata";
   let [videodata,setvideosdata] = useState([])
   useEffect(()=>{
       async function Calling() {
           let resp = await axios.get(api);
           setvideosdata([resp.data[videoidnum]]);
       }
       Calling();
   },[])
 console.log(videodata);
  return (
    <Fragment>
	<main className="flex flex-wrap h-full/auto w-306/auto p-4 absolute top-14 left-14">
		{Array.isArray(videodata) && videodata.map((video,index)=>{
          return(
            <div className="flex flex-col md:flex-row p-4 gap-6 bg-white min-h-screen">
			{/* Main Video Section */}
      <div className="flex-1 max-w-[950px]">
        <div className="w-full rounded-xl overflow-hidden">
          <iframe
            className="w-full h-85"
            src={video.videoUrl}
            title="Video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-4">
          <h1 className="text-xl font-bold">
            {video.title}
          </h1>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4">
              <img
                className="h-10 w-10 rounded-full"
                src={video.thumbnailUrl}
                alt="channel avatar"
              />
              <div>
                <p className="font-semibold">{video.channelName} <span className="text-gray-500 text-sm ml-1">✔</span></p>
                <p className="text-sm text-gray-500">2.1M subscribers</p>
              </div>
              <button className="bg-black text-white font-semibold px-4 py-1 rounded-full ml-4">
                Subscribe
              </button>
              <button className="border px-4 py-1 ml-2 rounded-full font-medium">Join</button>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                <FaThumbsUp className="text-gray-700" /> 27K
              </button>
              <FaThumbsDown className="text-gray-600" />
              <button className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                <FaShare className="text-gray-700" /> Share
              </button>
            </div>
          </div>

          <div className="mt-4 text-gray-700 text-sm">
            <p>
              {formatNumberWithKMB(video.views)} views  •  {getTimeAgo(video.uploadDate)}  •  #maxamini #standupcomedy #convert
            </p>
            <p>
              {video.description}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar with recommendations */}
      <div className="w-full md:w-[420px]">
        <div className="bg-white rounded-xl p-4 mb-4 border">
          <p className="text-sm text-gray-700 font-semibold">Sponsored</p>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-sm mt-1">Become 10x Version Of Yourself</p>
              <p className="text-xs text-gray-600">be10x.in/aitools/workshop</p>
            </div>
            <button className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full font-semibold">Sign up</button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <button className="bg-black text-white text-sm px-3 py-1 rounded-full">All</button>
          <button className="bg-gray-200 text-sm px-3 py-1 rounded-full">From the series</button>
          <button className="bg-gray-200 text-sm px-3 py-1 rounded-full">From Max Amini</button>
          <button className="bg-gray-200 text-sm px-3 py-1 rounded-full">Comedy</button>
        </div>

        <div className="flex gap-3 mb-4">
          <img
            src="https://i.ytimg.com/vi/4N1iwQxiHrs/hqdefault.jpg"
            alt="recommended video"
            className="w-40 rounded-lg"
          />
          <div>
            <p className="font-semibold text-sm leading-snug">
              Hilarious London Moments | Max Amini | Stand Up Comedy
            </p>
            <p className="text-xs text-gray-500 mt-1">Max Amini</p>
            <p className="text-xs text-gray-500">1.5M views • 2 months ago</p>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">Shorts</h2>
        <div className="grid grid-cols-3 gap-2">
          <img src="https://i.ytimg.com/vi/OPf0YbXqDm0/hqdefault.jpg" className="rounded-lg" alt="Short 1" />
          <img src="https://i.ytimg.com/vi/sNPnbI1arSE/hqdefault.jpg" className="rounded-lg" alt="Short 2" />
          <img src="https://i.ytimg.com/vi/YqeW9_5kURI/hqdefault.jpg" className="rounded-lg" alt="Short 3" />
        </div>
      </div>
    </div>
          )
        })}
      </main>
      
      
    </Fragment>
  )
}

export default Videodetail