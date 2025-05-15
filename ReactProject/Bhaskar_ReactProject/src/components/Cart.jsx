import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearcart, removeitem } from '../utils/cartslice';
import delimage from '../images/delete.png';


function Cart() {
  const dispatch = useDispatch()
  const cartItems = useSelector((citem)=>citem.cart.cartitems);
  let [array,setarray] = useState(cartItems);

    //Handling delete of the specific item from the cart
    function handledelete(item){
      let index = array.findIndex((obj)=> obj.id == item.id);
      console.log(index);

      if(index==0 && array.length==1){
        dispatch(clearcart());
        setarray([]);
      }
      else{
        dispatch(removeitem(index,item));
        let farr = array.filter((item)=>item.id!==array[index].id);
        setarray(farr);
      }
    }


    //All items can be deleted from cart with this button
    function handleclearcart(){
      dispatch(clearcart());
      setarray([]);
    }

  return (
    <Fragment>
      <div className='flex justify-center items-center'>
        <button className='my-3 mx-6 text-xl h-10 w-40 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700' onClick={handleclearcart}>Clear Cart</button>
      </div>
      <div className='flex flex-col justify-center items-center'>
        {
          array.map((item)=>{
            return(
              <div className='my-4 h-50 xl:h-50 w-240 xl:w-240 flex justify-around xl:justify-around items-center shadow-2xl rounded-2xl hover:bg-sky-100 md:w-180 max-sm:w-90 mx-sm:justify-evenly max-sm:h-30/auto max-sm:m-2'>
                <div className='h-45 w-100 flex justify-center items-center xl:h-45 xl:w-100 max-sm:h-45/auto max-sm:w-60/auto'>
                  <img className='h-40 w-40 hover:scale-110 xl:h-40 xl:w-40 max-sm:h-30 max-sm:w-60/auto' src={item.images[0]}/>
                </div>
            
                <div className='h-45 w-100 flex flex-col justify-center items-start'>
                  <h1 className='text-xl font-bold max-sm:text-lg'>{item.brand}</h1>
                  <h1 className='text-xl font-semibold max-sm:text-sm'>{item.title}</h1>
                  <h1 className='text-sm text-red-500'>Only {item.stock} left in stock</h1>
                  <h1>₹{Math.round(item.price*85.44).toLocaleString()}</h1>
                </div>

                <div className='mr-20 max-sm:m-2'>
                  <button onClick={()=>handledelete(item)} className='h-10 w-10 flex justify-center items-center rounded-2xl hover:bg-slate-400'><img className='h-8 w-8' src={delimage}/></button>
                </div>

              </div>

            )
          })

        }

      </div>
      

    </Fragment>
    
  )
}

export default Cart