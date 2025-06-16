import React, { useState, useEffect, useRef, Fragment } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { FaBell, FaVideo } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { MdHome, MdSubscriptions, MdVideoLibrary, MdOutlineExplore, MdOutlineSlowMotionVideo } from "react-icons/md";
import CallingVideos from "./CallingVideos";
import Body from "./Body";
import { useNavigate, useParams } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { ImProfile } from "react-icons/im";
import { IoCloseOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import Login from "./Login";
import axios from "axios";
import Videouploadform from "./Videouploadform";

function Channel() {
    let {id} = useParams();
  let videoidnum = parseInt(id);
  const navigate = useNavigate();
  let [searchText, setSearchText] = useState("");
  let [uploadbuttonclick, setuploadbuttonclick] = useState(false);
    
    let [isVisible, setIsVisible] = useState(false);
    let [showProfileMenu, setShowProfileMenu] = useState(false);
    let [showCreateMenu, setshowCreateMenu] = useState(false);
    let token = localStorage.getItem("token")
    let useravatar = localStorage.getItem("useravatar");
    let username = localStorage.getItem("username");
    let userid = localStorage.getItem("userid");

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


                const apivideos = "http://localhost:8050/videodata";
        let [uservideos,setuservideos] = useState([])
        useEffect(()=>{
            async function Calling() {
                let resp = await axios.get(apivideos);
                setuservideos(resp.data);
            }
            Calling();
        },[])
        let fuservideos = uservideos.filter((video)=>video.videoId==userid);
        console.log("fChannels",fuservideos);


    function openModal() {
      setIsVisible(true);
      setShowProfileMenu(false);
    }

    function closeModal() {
      setIsVisible(false);
    }

    function handleProfilewindow(){
      setShowProfileMenu((prev) => !prev);
    }

    function handleCreateWindow(){
      setshowCreateMenu((prev) => !prev);
    }

    function handleLogout(){
      setShowProfileMenu(false);
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      localStorage.removeItem("token")
      localStorage.removeItem("useravatar");
      navigate('/');
    }



  function handleVideoSearch(searchText){
    if (!searchText.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
  }


  function clearInput(){
    setSearchText("");
  }

  function handlehome(){
    navigate("/");
  }

  function handleupload(){
    setuploadbuttonclick((prev)=>!prev);
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <Fragment>
            <div className="flex min-h-screen bg-white font-[Roboto,Arial,sans-serif] relative">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-50 bg-white shadow-md transition-all duration-300 ease-in-out overflow-y-auto border-r border-gray-200 ${
          isSidebarOpen ? "w-60" : "w-14"
        }`}
      >
        <div className="h-14 flex items-center px-4 border-b border-gray-200">
          {isSidebarOpen ? 
          (
            <div className="flex items-center gap-4">    
            <RxHamburgerMenu className="w-6 h-6 text-black cursor-pointer" onClick={toggleSidebar} />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube"
              className="h-5 w-auto"
            />
            </div>
          ) : 
          (
            <RxHamburgerMenu className="w-6 h-6 text-black cursor-pointer" onClick={toggleSidebar} />
          )}
        </div>
        <div className="pt-2 pb-4">
          <SidebarItem icon={<MdHome size={24} onClick={handlehome} />} label="Home" onClick={handlehome} isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={<MdOutlineSlowMotionVideo size={24} />} label="Shorts" isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={<MdSubscriptions size={24} />} label="Subscriptions" isSidebarOpen={isSidebarOpen} />
          <hr className="my-3 border-gray-300" />
          <SidebarItem icon={<MdOutlineExplore size={24} />} label="Explore" isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={<MdVideoLibrary size={24} />} label="Library" isSidebarOpen={isSidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 w-full ml-14 ${isSidebarOpen ? 'ml-36 bg-black/30 backdrop-invert backdrop-opacity-8' : 'bg-white'}`}>
        {/* Header */}
        <header className="h-14 w-full flex items-center justify-between px-0 py-0 bg-white sticky top-0 z-40">
          {/* Left: Menu & Logo */}
          <div className="flex flex-col w-full ">
                <div className="h-14 w-full flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-40 ">
                      <div className="flex items-center gap-4">

                        {!isSidebarOpen && (
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                            alt="YouTube"
                            className="h-5 w-auto"
                          />
                        )}
                      </div>
                    
                      {/* Center: Search Bar */}
                      <div className="flex items-center flex-1 max-w-2xl mx-4">
                        <div className="flex w-full">
                          <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e)=>setSearchText(e.target.value)}
                            className="w-full h-10 px-4 py-[6px] border border-gray-300 rounded-l-full focus:outline-blue-900 text-lg text-black"
                          />
                          {searchText && (
                            <button
                              onClick={clearInput}
                              className="h-16 w-16 absolute top-0 right-97 text-gray-500 hover:text-black"
                            >
                              <IoCloseOutline className="h-10 w-10"/>
                            </button>
                          )}
                          
                          <button onClick={()=>{handleVideoSearch(searchText)}} className="px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full flex items-center justify-center hover:bg-gray-200">
                            <CiSearch className="w-6 h-6 text-black" />
                          </button>
                        </div>
                        <button className="flex justify-center items-center w-11 h-10 ml-3 p-0 bg-gray-100 rounded-full hover:bg-gray-200">
                          <IoMdMic className="w-6 h-5 text-black rounded-full" />
                        </button>
                      </div>
                    
                      {/* Right: Icons */}
                      <div className="flex items-center gap-4">
                        { token ? 
                          <>
                            <button onClick={handleCreateWindow} className="flex justify-center items-center cursor-pointer w-26 h-10 bg-gray-100 hover:bg-gray-200 rounded-4xl">
                              <LuPlus className="mr-2"/> Create
                            </button>
                            {showCreateMenu && <div className="h-20 w-40 flex flex-col justify-start items-center bg-gray-100 absolute top-14 right-18 rounded-2xl shadow">
                              <button className="h-10 w-40 m-2 flex justify-center items-center cursor-pointer hover:bg-gray-200">Create Channel</button></div>}

                            <button className="flex justify-center items-center w-10 h-10 hover:bg-gray-200 rounded-full">
                                <FaBell className="w-5 h-5 text-gray-700 cursor-pointer hover:bg-gray-200" />
                            </button>
                            <button className="flex justify-center items-center w-10 h-10 hover:bg-gray-200 rounded-full">
                                <img src={useravatar} onClick={handleProfilewindow} className="w-7 h-7 rounded-full text-gray-700 cursor-pointer hover:bg-gray-200" />
                            </button>
                            {showProfileMenu && <div className="h-30 w-30 flex flex-col justify-start items-center  bg-gray-100 absolute top-14 right-4 rounded-2xl shadow">
                            <button onClick={handleLogout} className="h-10 w-30 m-2 flex justify-center items-center cursor-pointer hover:bg-gray-200"><LiaSignOutAltSolid className="w-7 h-7 text-gray-700 m-1" />SignOut</button>
                            <button className="h-10 w-30 m-2 flex justify-center items-center cursor-pointer hover:bg-gray-200"><ImProfile className="w-7 h-7 text-gray-700 m-1" />Profile</button>
                            </div>}

                          </>
                          :
                          <>
                            <button onClick={openModal} className="p-2 w-24 h-10 font-semibold text-sm text-blue-600 border border-gray-200 flex justify-center items-center hover:bg-blue-200 rounded-3xl">
                                <CgProfile className="m-1 w-5 h-5 cursor-pointer" /> Sign in
                            </button>
                          </>
                        }
                      </div>
                </div>
                    
          </div>

          

        </header>

        {/* Placeholder for main page content */}

      </div>
      <Login isVisible={isVisible} onClose={closeModal} />
    </div>

{/**------------------------------------------------------------------------------------------ */}
        <main className="flex flex-wrap h-full/auto w-306/auto p-4 absolute top-14 left-14">
        {fChannels.map((channel,index)=>{return(
            <div className="bg-white text-black min-h-screen w-290 mx-2">
      {/* Banner */}
      <div className="w-full h-40 md:h-40 rounded-b-xl overflow-hidden">
        <img
          src={channel.channelBanner}
          alt="Banner"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>

      {/* Channel Info */}
      <div className="flex flex-col md:flex-row items-start md:items-center px-6 py-4 gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={useravatar}
            alt="Profile"
            className="w-40 h-40 rounded-full border-4 border-white dark:border-[#0f0f0f] -mt-20 md:mt-0"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{channel.channelName}<span className="text-sm">✔</span></h1>
          <p className="text-black ">@{username} · {channel.subscribers} subscribers · 0 videos</p>
          <p className="mt-2 text-gray-700 ">
            {channel.description}...<span className="text-blue-500 cursor-pointer">more</span>
          </p>
          <p className="mt-2 text-blue-600 ">
            <a href="https://twitter.com/dennisivy11" target="_blank" rel="noopener noreferrer">
              twitter.com/{channel.owner}
            </a> and <span className="underline cursor-pointer">1 more link</span>
          </p>
        </div>

        {/* Subscribe Button */}
        <div className="mt-4 md:mt-0">
          <button className="px-6 py-2 rounded-full bg-black  text-white  font-semibold shadow-md">
            Subscribe
            </button>
        </div>
              

        
        </div>

              <div className="w-full flex justify-between items-center">
                <h1 className="text-lg font-semibold mx-5">Videos</h1>
                <button onClick={handleupload} className="text-blue-600 h-10 w-30 mx-5 my-2 rounded-4xl bg-gray-100 text-lg font-semibold hover:bg-gray-200">Upload</button>
              </div>

              <hr className="border-b border-gray-300 w-290"/>

{/*-----Upload Video Form-------------------------------------*/}

        {uploadbuttonclick && <Fragment><Videouploadform fChannels={fChannels}/>
                    <div className="h-full w-full flex flex-col gap-4 bg-white p-4">
                {fuservideos.map((video, index) => (
                  <div key={index} className="flex gap-4 pb-4">
                    <iframe
                      src={video.videoUrl || "https://via.placeholder.com/240x135"}
                      alt={video.title}
                      className="w-128 h-72 rounded-lg object-cover"
                    />
                    <div className="h-72 w-160 flex flex-col">
                      <h3 className="text-lg font-semibold">{video.title}</h3>
                      <p className="text-sm text-gray-600">
                        {formatNumberWithKMB(video.views)} views • {getTimeAgo(video.uploadDate)}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2 ">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            </Fragment>
        }

                    {!uploadbuttonclick && <div className="h-full w-full flex flex-col gap-4 bg-white p-4">
                {fuservideos.map((video, index) => (
                  <div key={index} className="flex gap-4 pb-4">
                    <iframe
                      src={video.videoUrl || "https://via.placeholder.com/240x135"}
                      alt={video.title}
                      className="w-128 h-72 rounded-lg object-cover"
                    />
                    <div className="h-72 w-160 flex flex-col">
                      <h3 className="text-lg font-semibold">{video.title}</h3>
                      <p className="text-sm text-gray-600">
                        {formatNumberWithKMB(video.views)} views • {getTimeAgo(video.uploadDate)}
                      </p>
                      <p className="text-sm text-gray-700 line-clamp-2 ">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
            </div>}
    </div>
        )})}


                
        </main>
    </Fragment>
  )
}

const SidebarItem = ({ icon, label, isSidebarOpen }) => (
  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer text-[15px] font-normal text-black">
    {icon}
    {isSidebarOpen && <span>{label}</span>}
  </div>
);

export default Channel