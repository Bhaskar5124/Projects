import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FaThumbsUp, FaThumbsDown, FaShare, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import Headerbody from './Headerbody';
import CallingVideos from './CallingVideos';
import { CgProfile } from "react-icons/cg";
import { MdDelete,MdEdit } from "react-icons/md";

function Videodetail({videoidnum}) {

let useravatar = localStorage.getItem("useravatar");
let username = localStorage.getItem("username");
let userid = localStorage.getItem("userid");


let [loginUserComment, setloginUserComment] = useState("");

        const apichannels = "http://localhost:8050/channels";
        let [channeldata,setchanneldata] = useState([])
        useEffect(()=>{
            async function Calling() {
                let resp = await axios.get(apichannels);
                setchanneldata(resp.data);
            }
            Calling();
        },[])
        let fChannels = channeldata.filter((channel)=>channel.userIdOwner==userid);
        console.log("fChannels",fChannels);

   const apivideo = "http://localhost:8050/videodata";
   let [videodata,setvideosdata] = useState([])
   useEffect(()=>{
       async function Calling() {
           let resp = await axios.get(apivideo);
           setvideosdata([resp.data[videoidnum]]);
       }
       Calling();
   },[])
 console.log("ClickedVideodata",videodata);

   const apicomment = "http://localhost:8050/comments";
   let [commentdata,setcommentdata] = useState([])
   useEffect(()=>{
       async function Calling() {
           let resp = await axios.get(apicomment);
           setcommentdata(resp.data);
       }
       Calling();
   },[])
   let fCommentsofVideo = commentdata.filter((comment)=>comment.videoId==videodata[0]._id)
   console.log("fcd",fCommentsofVideo);

   function handleDeleteComment(){

   }

function handleLogoutComment(loginUserComment){
  if (!loginUserComment.trim()){return;}
  else{alert("Login Needed to Comment");}
}



function handleComment(loginUserComment,setloginUserComment,username,userid){
  setloginUserComment("");
  if (!loginUserComment.trim()){return;}
      const response = fetch("http://localhost:8050/newcomment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text:loginUserComment,
        videoId:videodata[0]._id,
        userId:userid,
        commentedUserAvatar:useravatar,
        commentedUserName:username,
        timestamp: Date.now,
      })
    })
    const result = response.then( (data)=> data.json() )
    result.then((data)=>{
        console.log(data, "data")
      alert("Comment Added succesfully");
      window.location.reload();

    })
}

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


  return (
    <Fragment>
	<main className="flex flex-wrap h-full/auto w-306/auto p-4 absolute top-14 left-14">
		{Array.isArray(videodata) && videodata.map((video,index)=>{
          return(
            <div className="flex flex-col md:flex-row p-4 gap-6 bg-white min-h-screen">
			{/* Main Video Section */}
      <div className="flex-1 w-170 border border-red-500">

        <div className="w-full rounded-xl overflow-hidden">
          <iframe
            className="w-full h-95"
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
                {fChannels.length!=0 ?fChannels.map((channel)=>{return(
                  <p className="text-sm text-gray-500">{channel.subscribers} subscribers</p>
                )}): 
                  <p className="text-sm text-gray-500">221K subscribers</p>}
                      
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

          <div className="mt-4 text-gray-700 text-sm bg-gray-200 rounded-2xl p-4">
            <p>
              {formatNumberWithKMB(video.views)} views  •  {getTimeAgo(video.uploadDate)}  •  #maxamini #standupcomedy #convert
            </p>
            <p>
              {video.description}
            </p>
          </div>
        </div>

        <div className='m-4 flex flex-col'>
          <h1 className='text-xl font-bold'>{fCommentsofVideo.length} Comments</h1>
          <div className='h-16 w-full flex justify-between items-center'>
            {useravatar ? <img className='h-12 w-12 rounded-full mr-2' src={useravatar} />: <CgProfile  className='h-12 w-12 rounded-full mr-2'/>}
            <input 
              type="text" 
              placeholder='Add a comment'
              value={loginUserComment}
              onChange={(e)=>setloginUserComment(e.target.value)}
              className='h-12 w-110 border-b border-gray-300 focus:border-b'/>
              
            {useravatar ?
             <button onClick={()=>handleComment(loginUserComment,setloginUserComment,username,userid)} className='m-1 h-8 w-20 font-semibold text-sm rounded-xl bg-gray-100 hover:border-r-gray-200'>Comment</button>:
             <button onClick={()=>handleLogoutComment(loginUserComment)} className='m-1 h-8 w-20 font-semibold text-sm rounded-xl bg-gray-100 hover:border-r-gray-200'>Comment</button>}
          </div>
          {fCommentsofVideo.map((comment,index)=>{
            return(
            <div className='h-16 w-full flex justify-between items-center'>
              <div className='flex'>
                <img className='h-12 w-12 rounded-full mr-2' src={comment.commentedUserAvatar}></img>
                <div className='flex flex-col'>
                  <div className='flex'>
                    <h1 className='font-bold text-sm'>@{comment.commentedUserName}</h1>
                    <h1 className='font-medium text-sm text-gray-600 ml-3'>{getTimeAgo(comment.timestamp)}</h1>
                  </div>
                  <p>{comment.text}</p>
                </div>
              </div>

              <div className='h-16 w-8 flex flex-col'>
                <button onClick={()=>handleDeleteComment()} className='h-8 w-8 rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-200'><MdDelete/></button>
                <button className='h-8 w-8 rounded-full flex justify-center items-center bg-gray-100 hover:bg-gray-200'><MdEdit/></button>
              </div>
            </div>
            )
          })}

          <div>
            <img/>
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