import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBtnClicked,setsearchBtnClicke] = useState(false);
  function clearInput(){
    setSearchText("");
  }

  const handleVideoSearch = async () => {
    setsearchBtnClicke(true);
    if (!searchText.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8050/videodata`); 
      setResults(response.data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-14 w-2xl bg-white">
        <div className="flex items-center flex-1 max-w-2xl mx-4">
            {/* Search Bar */}
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
                  className="h-16 w-16 absolute top-0 right-95 text-gray-500 hover:text-black"
                >
                  <IoCloseOutline className="h-10 w-10"/>
                </button>
              )}

              <button onClick={()=>{handleVideoSearch(searchText)}} className="px-4 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full flex items-center justify-center hover:bg-gray-200">
                <CiSearch className="w-6 h-6 text-black" />
              </button>
            </div>
        </div>
      

      {/* Results */}
      
      {searchBtnClicked && (loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="flex flex-col gap-4 absolute top-14 left-14">
          {results.map((video, index) => (
            <div key={index} className="flex gap-4 pb-4">
              <iframe
                src={video.videoUrl || "https://via.placeholder.com/240x135"}
                alt={video.title}
                className="w-128 h-72 rounded-lg object-cover"
              />
              <div className="h-72 w-160 flex flex-col border">
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-600">
                  {video.views} views • {video.uploadDate}
                </p>
                <p className="text-sm text-gray-800 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Search;
