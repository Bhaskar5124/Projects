import React from 'react'
import { Link } from "react-router-dom";
import gitimage from '../images/github.png'

function Header() {
  return (
    <div>
            <nav className=" bg-slate-800 text-white flex justify-between items-center px-12 h-20">
                <div className='flex justify-center items-center'>
                <img className='h-14 w-14 m-4 rounded-full' src='https://img.freepik.com/free-vector/book-floating-cartoon-vector-icon-illustration-education-object-icon-isolated-flat-vector_138676-13661.jpg?semt=ais_hybrid&w=740'/>
                <h1 className='text-3xl'>ONLINE LIBRARY</h1>
                <div className='bg-white m-4 h-9 w-9 rounded-full flex justify-center items-center'>
                    <a href='https://github.com/Bhaskar5124/newrepos' target='_blank'><img className='h-8 w-8 rounded-full' src={gitimage}/></a>
                </div>
                    
                </div>

                <ul className="flex" >
                    <div className="flex mx-4">
                        <li className="px-2"> <Link to='/'> HOME </Link> </li>
                    </div>
                    <div className="flex mx-4">
                        <li className="px-2"> <Link to='/bookbrowse'> BROWSEBOOK </Link> </li>
                    </div>
                    <div className="flex mx-4">
                        <li className="px-2"><Link to='/addbook'>ADDBOOK</Link></li>
                    </div>
                </ul>
            </nav>

        </div>
  )
}

export default Header