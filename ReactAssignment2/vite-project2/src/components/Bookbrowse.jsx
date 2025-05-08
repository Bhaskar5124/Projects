import React, { Fragment, useState } from 'react'
import { Books } from '../utils/data'
import { Link } from 'react-router-dom';



function Bookbrowse() {
    
     let [filteredbooks,setfilteredbooks] = useState(Books)

     function handlesearch(searchtext){
        let farr = filteredbooks.filter((fbook)=>fbook.title.toLowerCase().includes(searchtext.toLowerCase()))
        setfilteredbooks(farr);
    }

  return (
    <Fragment>
        
        <div className='flex justify-center items-center'>
            <input className='text-center m-4 h-14 w-100 rounded-4xl border border-slate-500' onChange={(e)=>handlesearch(e.target.value)} type='text' placeholder='Search Books' />
        </div>
        
        <div className='m-4 flex flex-wrap justify-center items-center content-center'>
        { filteredbooks.map((book,index)=>{
            return(
                <Link to={`/book/${book.id}`}>
                    <div className="h-100 w-70 m-10 flex flex-col justify-center items-center rounded-2xl shadow-xl hover:bg-blue-50 hover:scale-105" key={book.id}>
                        <img className='h-70 w-60 rounded-2xl' src={book.imageLink}/>
                        <h2 className='font-bold text-center m-1'>{book.title}</h2>
                        <h3 className='text-center m-1'>{book.author}</h3>
                    </div>
                </Link>
            )
        })}
        </div>

    </Fragment>


  )
}

export default Bookbrowse