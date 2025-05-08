import React from 'react'
import { useRouteError } from 'react-router-dom'


const Error = () => {

    const err = useRouteError();

    

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-slate-700 text-white px-4">
      <img className='h-24 w-24' src='https://cdn.pixabay.com/photo/2016/05/30/14/23/detective-1424831_1280.png'/>
      <div className="text-3xl font-bold mb-2 text-red-500">Oops! Something went wrong.</div>
      <div className="text-md mb-6">
        <p><strong className='text-sky-300'>Status:</strong> {err.status}</p>
        <p><strong className='text-sky-300'>Message:</strong> {err.statusText}</p>
        <p><strong className='text-sky-300'>Details:</strong> {err.data}</p>
      </div>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-slate-800 transition"
      >
        Go Home
      </a>
    </div>
  );
}


export default Error