import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Channelform() {
    let [channelName,setchannelName] = useState("");
    let [channelBanner,setchannelBanner] = useState("");
    let [description,setdescription] = useState("");
    const navigate = useNavigate();


    let owner = localStorage.getItem("username");
    let userIdOwner = localStorage.getItem('userid');

    function handleimage(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
        setchannelBanner(reader.result);
    }}



   async function handleSubmit(e) {
    e.preventDefault();
    try{
      const response = fetch("http://localhost:8050/createchannel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channelName,
        owner:owner,
        userIdOwner:userIdOwner,
        description,
        channelBanner,
        subscribers:0,
      })
    })
    const res = response.then( (data)=> data.json() )
    res.then((data)=>{
        console.log("data",data)
        alert(data.message);
        localStorage.setItem("channelname",data.channel.channelName);
        setchannelName("");
        setchannelBanner("");
        setdescription("");
        navigate("/channel");
    })
    }
    catch (error) {
    console.error("Error creating channel:", error);
    // Handle error (e.g., show error message)
   }

    
    // await axios.post("http://localhost:8050/createchannel",formData)
    // .then((resp)=>console.log("success", resp.message,resp.channel));
    // e.preventDefault();
    // console.log('Form Data Submitted:', formData);
    // Add your form submission logic here
    
  }


  return (
<div className="flex justify-center items-center min-h-screen bg-gray-100 text-black z-100">
      <form
      onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create Channel
        </h2>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600"
          >
            Channel Name
          </label>
          <input
            type="text"
            id="channelName"
            name="channelName"
            value={channelName}
            onChange={(e)=>setchannelName(e.target.value)}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600"
          >
            ChannelBanner
          </label>
          <input
            type="file"
            accept="image/*"
            id="channelBanner"
            name="channelBanner"
            onChange={handleimage}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e)=>setdescription(e.target.value)}
            rows="4"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type='submit'
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Channel
        </button>
      </form>
    </div>
  )
}

export default Channelform