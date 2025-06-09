import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdMic } from "react-icons/io";
import { FaBell, FaVideo } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { MdHome, MdSubscriptions, MdVideoLibrary, MdOutlineExplore, MdOutlineSlowMotionVideo } from "react-icons/md";
import CallingVideos from "./CallingVideos";
import Body from "./Body";
import Videodetail from "./Videodetail";
import { useParams } from "react-router-dom";

function Headerbody() {
    let {id} = useParams();
    let videoidnum = parseInt(id);

  let [searchText, setSearchText] = useState("");

  let respApi = CallingVideos();
  let [filterdata,setfilterdata] = useState(respApi);
  
    useEffect(()=>{
      if(respApi && respApi.length){
        setfilterdata(respApi)
      }
    } , [respApi]);


  function handleVideoSearch(searchText){
    let farr = respApi.filter((fv)=>fv.title.toLowerCase().includes(searchText.toLowerCase()))
    setfilterdata(farr);
  }


  function clearInput(){
    setSearchText("");
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
          <SidebarItem icon={<MdHome size={24} />} label="Home" isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={<MdOutlineSlowMotionVideo size={24} />} label="Shorts" isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={<MdSubscriptions size={24} />} label="Subscriptions" isSidebarOpen={isSidebarOpen} />
          <hr className="my-3 border-gray-300" />
          <SidebarItem icon={<MdOutlineExplore size={24} />} label="Explore" isSidebarOpen={isSidebarOpen} />
          <SidebarItem icon={<MdVideoLibrary size={24} />} label="Library" isSidebarOpen={isSidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 w-full ml-14 ${isSidebarOpen ? 'bg-black/30 backdrop-invert backdrop-opacity-8' : 'bg-white'}`}>
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
                        <button className="flex justify-center items-center w-10 h-10 hover:bg-gray-200 rounded-full">
                            <FaVideo className="w-5 h-5 text-gray-700 cursor-pointer " />
                        </button>
                        <button className="flex justify-center items-center w-10 h-10 hover:bg-gray-200 rounded-full">
                            <FaBell className="w-5 h-5 text-gray-700 cursor-pointer hover:bg-gray-200" />
                        </button>
                        <button className="flex justify-center items-center w-10 h-10 hover:bg-gray-200 rounded-full">
                            <CgProfile className="w-7 h-7 text-gray-700 cursor-pointer hover:bg-gray-200" />
                        </button>
                      </div>
                </div>
                    
          </div>

          

        </header>

        {/* Placeholder for main page content */}

      </div>
      <Videodetail filterdata={filterdata} videoidnum={videoidnum}/>
    </div>
  );
};

const SidebarItem = ({ icon, label, isSidebarOpen }) => (
  <div className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 cursor-pointer text-[15px] font-normal text-black">
    {icon}
    {isSidebarOpen && <span>{label}</span>}
  </div>
);

export default Headerbody;
