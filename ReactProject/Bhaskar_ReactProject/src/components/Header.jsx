import React from 'react'
import "tailwindcss";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { BiHome } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaGithub } from "react-icons/fa";

const Header = ()=>{

    const cartItems = useSelector((store)=>store.cart.cartitems);
    console.log(cartItems);


    return(
        <div>
            
            <nav className="bg-gray-900 text-white flex justify-between items-center px-12 h-20 md:px-12 max-sm:px-8">
                <div className='flex justify-center items-center h-20 w-100'>
                <img className="m-4 h-14 w-14 rounded-full md:m-4 max-sm:m-1" src='https://cdn.dribbble.com/userupload/17526548/file/original-6830d3c8d502546d6eeb559f65852ebb.jpg?resize=400x0'/>
                <h1 className='text-4xl md:m-0 md:text-4xl md:font-normal max-sm:text-xl max-sm:ml-1 max-sm:mr-5 max-sm:font-bold'>Shoppy Globe</h1>
                <a href='https://github.com/Bhaskar5124/newrepos' target='_blank'><FaGithub className='h-8 w-8 m-4 rounded-full hover:border border-red-600'/></a>
                </div>
                <ul className="flex" >
                    <div className="flex mx-4">
                        <span className="mt-1"> <BiHome /> </span>
                        <li className="px-2"><Link to="/">HOME</Link></li>
                    </div>

                    <div className="flex mx-4">
                        <span className="mt-1"> <FaShoppingCart/> </span>
                        <li className="px-2"><Link to="/cart">CART({cartItems.length})</Link></li>
                    </div>
                </ul>
            </nav>

        </div>
    )
}

export default Header;
