import axios from 'axios';
import React, { Fragment, useState, useEffect } from 'react'

function Videouploadform({fChannels}) {
    let userid = localStorage.getItem("userid");
    let username = localStorage.getItem("username");
    let useravatar = localStorage.getItem("useravatar");
    let [title,settitle] = useState("");
    let [category,setcategory] = useState("");
    let [description,setdescription] = useState("");
    let [videoUrl,setvideoUrl] = useState(null);
    let [uploading,setuploading] = useState(false);
        // const apichannels = "http://localhost:8050/channels";
        // let [channeldata,setchanneldata] = useState([])
        // useEffect(()=>{
        //     async function Calling() {
        //         let resp = await axios.get(apichannels);
        //         setchanneldata(resp.data);
        //     }
        //     Calling();
        // },[])
        // let fChannels = channeldata.filter((channel)=>channel.userIdOwner==userid);
        // console.log("fChannels",fChannels);


    


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setvideoUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid video file');
    }
  };
    
   async function handleSubmit(e) {
    e.preventDefault();
    setuploading(true);
    try{
      const response = fetch("http://localhost:8050/videoupload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
                videoId: userid,
                title,
                category,
                videoUrl,
                thumbnailUrl: useravatar,
                description,
                channelName: fChannels[0].channelName,
                channelId: fChannels[0]._id,
                uploader: username,
                views: 0,
                likes: 0,
                dislikes: 0,
                uploadDate: Date.now,
      })
    })
    
    const res = response.then( (data)=> data.json() )
    res.then((data)=>{
        console.log("data",data)
        alert(data.message);
        setuploading(false);
        window.location.reload();
    })
    }
    catch (error) {
    alert(error);
    // Handle error (e.g., show error message)
    
   }}
  return (
    <Fragment>
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-3xl font-semibold text-center mb-6">Upload Video Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">


                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-600">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(e)=>settitle(e.target.value)}
                      required
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                      Category
                    </label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={category}
                      onChange={(e)=>setcategory(e.target.value)}
                      required
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                <div>
                    <label htmlFor="video" className="block text-sm font-medium text-gray-600">
                      Video File
                    </label>
                    <input
                      type="file"
                      id="video"
                      name="video"
                      onChange={handleFileChange}
                      accept="video/*"
                      required
                      className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>


                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e)=>setdescription(e.target.value)}
                    rows="4"
                    className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                {uploading && <div className='text-2xl text-center'>Uploading Video, Please wait...</div>}


                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
    </Fragment>
  )
}

export default Videouploadform