import Callingfordetails from './Callingfordetails';
import { FcRating } from "react-icons/fc";
import { LiaShippingFastSolid } from "react-icons/lia";
import returnimage from '../images/returnpolicy.jpg' 
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { additem } from '../utils/cartslice';
import { useNavigate } from 'react-router-dom';

//Clicked Product details using Callingfordetails component
function Productdetails() {
    let fAPIresp = [Callingfordetails()];
    console.log(fAPIresp,"fAPIresp");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleaddtocart(addtocartitem){
        dispatch(additem(addtocartitem));
    }

    function handlebuynow(item){
        handleaddtocart(item);
        navigate("/cart");
    }

  return (
    <Fragment>
            {
    fAPIresp.map((fproduct)=>{
        return(
            <div className='p-10 h-screen w-full flex justify-around items-center md:flex md:flex-col xl:flex-row max-sm:flex max-sm:flex-col' key={fproduct.id}>
                <div className='h-120 w-120 flex flex-col justify-between items-center shadow-2xl shadow-slate-500 rounded-2xl md:h-120 md:w-120 max-sm:h-70 max-sm:w-70' key={fproduct.id}>
                    <img className='m-2 h-100 w-100 md:h-100 md:w-100 max-sm:h-60 max-sm:w-60 max-sm:m-0' src={fproduct.thumbnail}/>
                    <div className='flex'> 
                        <button onClick={()=>handlebuynow(fproduct)} className='my-3 mx-6 text-xl h-10 w-40 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 max-sm:h-6 max-sm:w-24 max-sm:m-2 max-sm:text-sm'>Buy Now</button>
                        <button onClick={()=>handleaddtocart(fproduct)} className='my-3 mx-6 text-xl h-10 w-40 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 max-sm:h-6 max-sm:w-24 max-sm:m-2 max-sm:text-sm'>Add to Cart</button>
                    </div>
                </div>

                <div className='h-100/auto w-160 m-8 flex flex-col justify-Start items-center flex-wrap max-sm:w-80 max-sm:justify-center'>
                    <h1 className='text-2xl font-bold md:text-2xl max-sm:text-xl'>{fproduct.brand}</h1>
                    <h1 className='text-2xl font-semibold md:text-2xl max-sm:text-xl'>{fproduct.title}</h1>
                    <p className='text-xl md:text-center max-sm:h-auto max-sm:w-80 max-sm:text-center'>{fproduct.description}</p>
                    <div className='flex justify-center items-center'>
                        <span className='text-orange-500'>{fproduct.rating}</span> <FcRating />
                    </div>
                    <div className='flex justify-center items-center'>
                        <h1 className='m-1 text-red-600 text-xl'>(-{Math.round(fproduct.discountPercentage)}%)</h1>
                        <h1 className='text-xl'>₹{Math.round(fproduct.price*85.44).toLocaleString()}</h1>
                    </div>
                    <h1 className='text-xl text-gray-700'>M.R.P: <del>₹{Math.round((fproduct.price/(100-fproduct.discountPercentage))*100*85.44)}</del></h1>
                    <div className='m-2 flex justify-center items-center'>
                        <div className='mx-2 flex flex-col justify-center items-center'>
                            <img className='h-14 w-14' src={returnimage}/>
                            <h1>{fproduct.returnPolicy}</h1>
                        </div>
                        <div className='mx-2 flex flex-col justify-center items-center'>
                            <div><LiaShippingFastSolid  className='h-14 w-14' /></div>
                            <h1>{fproduct.shippingInformation}</h1>
                        </div>
                    </div>

                    <hr className='m-2 h-2 w-140 text-gray-600 max-sm:w-70'/>

                    <h1 className='text-lg font-bold'>Product Details</h1>
                    <ul className='h-100/auto w-80 flex flex-col justify-center items-center'>
                        <li className='m-1 font-mono'>Availability: {fproduct.availabilityStatus}</li>
                        <li className='m-1 font-mono'>Category: {fproduct.category}</li>
                        <li className='m-1 font-mono'>Warranty: {fproduct.warrantyInformation}</li>
                    </ul>

                    <hr className='m-2 h-2 w-140 text-gray-600 max-sm:w-70'/>

                    <div>

                    </div>

                </div>
            </div>
            
            
        )
    })
  }
    </Fragment>



  )

}

export default Productdetails