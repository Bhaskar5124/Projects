import React, { Fragment, useEffect, useState } from 'react'
import { Books } from '../utils/data';



function Home() {

    let pbook = Books.filter((item)=>item.popular=="y")

  return (
    <Fragment>
        <div className='flex justify-center items-center'>
            <p className='text-2xl m-6'><b className='text-indigo-800'>Welcome to Online Library,</b> where you will find your favourite <b className='text-yellow-600'>Books</b></p>
        </div>

        <div className='flex justify-center items-center'>
            <h1 className='text-xl text-center underline decoration-indigo-800'>Our delicate Choices</h1>
        </div>

        <div className='m-4 flex flex-wrap justify-center items-center content-center'>
        { pbook.map((book,index)=>{
            return(
            <div className="h-100 w-70 m-10 flex flex-col justify-center items-center rounded-2xl shadow-xl hover:bg-blue-50 hover:scale-105" key={book.id}>
                <img className='h-70 w-60 rounded-2xl' src={book.imageLink}/>
                <h2 className='font-bold text-center m-1'>{book.title}</h2>
                <h3 className='text-center m-1'>{book.author}</h3>
            </div>
            )
        })}
        </div>
    </Fragment>
    
  )
}

export default Home