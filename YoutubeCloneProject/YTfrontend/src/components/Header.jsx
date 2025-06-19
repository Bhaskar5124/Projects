import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { FaBell, FaVideo } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { AiTwotonePrinter } from "react-icons/ai";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { ImProfile } from "react-icons/im";
import { IoCloseOutline } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import Login from "./Login";
import { MdHome, MdSubscriptions, MdVideoLibrary, MdOutlineExplore, MdOutlineSlowMotionVideo } from "react-icons/md";
import CallingVideos from "./CallingVideos";
import Body from "./Body";
import { Link, useNavigate } from "react-router-dom";
import Channelform from "./Channelform";
import axios from "axios";


function Header() {
  let [activeCategory, setActiveCategory] = useState("All");
  let [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  let respApi = CallingVideos();
  let [filterdata,setfilterdata] = useState(respApi);
  let [isVisible, setIsVisible] = useState(false);
  let [showProfileMenu, setShowProfileMenu] = useState(false);
  let [showCreateMenu, setshowCreateMenu] = useState(false);
  let [createchannelclicked,setcreatechannelclicked] = useState(false);
  let token = localStorage.getItem("token")
  let useravatar = localStorage.getItem("useravatar");
  let userid = localStorage.getItem("userid");

  useEffect(()=>{
    if(respApi && respApi.length){
      setfilterdata(respApi)
    }
  } , [respApi]);

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


  function handlecreatechannel(){
    setcreatechannelclicked((prev)=>!prev);
    setshowCreateMenu(false);
  }
  
  function openModal() {
    setIsVisible(true);
    setShowProfileMenu(false);
  }

  function closeModal() {
    setIsVisible(false);
  }

  function handleVideoSearch(searchText){
    if (!searchText.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchText)}`);
  }

  function handleCategoryClick(cat){
    setActiveCategory(cat);
    if(cat==='All'){
      setfilterdata(respApi);
    }
    else{
      let fcat = respApi.filter((v)=>v.category.toLowerCase()==cat.toLowerCase());
      setfilterdata(fcat);
    }
  }

  function clearInput(){
    setSearchText("");
  }

  function handlehome(){
    navigate('/');
  }

  function handleProfilewindow(){
    setShowProfileMenu((prev) => !prev);
    setshowCreateMenu(false);
  }

  function handleCreateWindow(){
    setshowCreateMenu((prev) => !prev);
    setShowProfileMenu(false);
  }

  function handleprofileview(){
    if(fChannels.length!=0){
      navigate("/channel");
    }
    else{
      alert("Not Created Channel yet!")
    }
  }

  function handleLogout(){
    setShowProfileMenu(false);
    localStorage.removeItem("channelname");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("token")
    localStorage.removeItem("useravatar");
    navigate('/');
  }


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleClickOutside = (e) => {
    // if(showProfileMenu==true){setShowProfileMenu(false);}
    // if(showCreateMenu==true){setshowCreateMenu(false);}
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex min-h-screen w-vw bg-white font-[Roboto,Arial,sans-serif] relative">
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
          <SidebarItem icon={<MdHome size={24} onClick={handlehome}/>} label="Home" isSidebarOpen={isSidebarOpen} />
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
        <header className="h-26 w-full flex items-center justify-between px-0 py-2 bg-white sticky top-0 z-40">
          {/* Left: Menu & Logo */}
          <div className="flex flex-col w-full">
                <div className="h-14 w-full flex items-center justify-between px-4 py-2 bg-white sticky top-0 z-40">
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
                              className="h-10 w-8 flex justify-center items-center absolute top-2 left-200 text-gray-500 hover:text-black"
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
                              <button onClick={handlecreatechannel} className="h-10 w-40 m-2 flex justify-center items-center cursor-pointer hover:bg-gray-200">Create Channel</button></div>}
                              

                            <button className="flex justify-center items-center w-10 h-10 hover:bg-gray-200 rounded-full">
                                <FaBell className="w-5 h-5 text-gray-700 cursor-pointer hover:bg-gray-200" />
                            </button>
                            <button className="flex justify-center items-center w-10 h-10 hover:bg-gray-200 rounded-full">
                                <img src={useravatar} onClick={handleProfilewindow} className="w-7 h-7 rounded-full text-gray-700 cursor-pointer hover:bg-gray-200" />
                            </button>
                            {showProfileMenu && <div className="h-30 w-30 flex flex-col justify-start items-center  bg-gray-100 absolute top-14 right-4 rounded-2xl shadow">
                            <button onClick={handleLogout} className="h-10 w-30 m-2 flex justify-center items-center cursor-pointer hover:bg-gray-200"><LiaSignOutAltSolid className="w-7 h-7 text-gray-700 m-1" />SignOut</button>
                            <button onClick={handleprofileview} className="h-10 w-30 m-2 flex justify-center items-center cursor-pointer hover:bg-gray-200"><ImProfile className="w-7 h-7 text-gray-700 m-1" />Profile</button>
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

                <div className="h-12 w-full flex justify-start items-center px-4 sticky top-14">
                  {["All", "Cars", "Home", "Study", "Music", "Sports"].map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`h-8 w-auto px-4 ml-2 rounded-xl text-base ${
                        activeCategory === category
                          ? "bg-black text-white font-semibold"
                          : "bg-gray-100 text-black font-medium"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                    
          </div>

          

        </header>

        {/* Placeholder for main page content */}

      </div>
      <Body className={`${isSidebarOpen ? 'bg-black/30 backdrop-invert backdrop-opacity-8' : 'bg-white'}`} filterdata={filterdata}/>
      <Login isVisible={isVisible} onClose={closeModal} />
      {createchannelclicked && <Channelform/>}
    </div>
  );
};

const SidebarItem = ({ icon, label, isSidebarOpen }) => (
  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer text-[15px] font-normal text-black">
    {icon}
    {isSidebarOpen && <span>{label}</span>}
  </div>
);

export default Header;