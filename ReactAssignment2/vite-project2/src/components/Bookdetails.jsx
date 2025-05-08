import React, { Fragment, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Books } from '../utils/data';

function Bookdetails() {
    const navigate = useNavigate();
    const params = useParams();
    let clickedbook = Books.filter((item)=>item.id==params.id);

    function handleback(){
        navigate('/bookbrowse');
    }

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='border m-10 h-102 w-202 border-black bg-slate-600 flex justify-center items-center'>
            <div className='m-10 h-100 w-200 bg-white flex justify-between items-center border border-black'>
                <img className='h-100 w-100' src={clickedbook[0].imageLink}/>
                <div className='h-100 w-100 flex flex-col justify-center items-start'>
                    <h3 className='mx-5 my-2'><b>Title :</b> {clickedbook[0].title}</h3>
                    <h3 className='mx-5 my-2'><b>Author :</b> {clickedbook[0].author}</h3>
                    <h3 className='mx-5 my-2'><b>Country of Origin :</b> {clickedbook[0].country}</h3>
                    <h3 className='mx-5 my-2'><b>Year of Publishing :</b> {clickedbook[0].year}</h3>
                    <h3 className='mx-5 my-2'><b>Language :</b> {clickedbook[0].language}</h3>
                    <h3 className='mx-5 my-2'><b>Pages :</b> {clickedbook[0].pages}</h3>

                </div>

            </div>

        </div>
        <button className='m-2 h-8 w-48 bg-gray-300 border border-black rounded-xl hover:bg-slate-800 transition hover:text-white' onClick={handleback}>Back to Browse</button> 

    </div>
  )
}

export default Bookdetails