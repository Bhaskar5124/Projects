import React, { Fragment, useEffect, useState } from 'react'
import Apicalling from './Apicalling'
import { Link } from 'react-router-dom';


//Home component of the Shoppy globe website using Apicalling component 
function Body() {

  let RespAPI = Apicalling();
  let [filteredproducts,setfilteredprodcts] = useState(RespAPI);

  useEffect(()=>{
    if(RespAPI && RespAPI.length){
      setfilteredprodcts(RespAPI)
    }
  } , [RespAPI])
  

  function handlesearch(searchtext){
    let farr = RespAPI.filter((fp)=>fp.title.toLowerCase().includes(searchtext.toLowerCase()));
    setfilteredprodcts(farr);
  }

  return (
    <Fragment>

      <div className='flex justify-center items-center'>
        <input className='text-center m-4 h-14 w-100 rounded-4xl border border-slate-500' onChange={(e)=>handlesearch(e.target.value)} type='text' placeholder='Search Products' />
      </div>
      
      <div className='flex flex-wrap justify-center items-center content-center md:flex md:flex-row md:flex-wrap max-sm:flex flex-col'>
        {
          filteredproducts.map((product,index)=>{
            return(
              <Link to={`/product/${product.id}`}>
                <div className='m-3 p-2 h-62/auto w-56 flex flex-col justify-center items-center rounded-2xl shadow-xl hover:scale-102' key={product.id}>
                  <img className='h-40 w-40' src={product.images[0]}/>
                  <h3 className='text-sm font-bold'>{product.brand}</h3>
                  <h3 className='text-sm overflow-ellipsis'>{product.title}</h3>
                  <div className='m-1 w-54 flex justify-start items-center'>
                    <h3 className='m-1 text-base'><del>₹{Math.round((product.price/(100-product.discountPercentage))*100*85.44)}</del></h3>
                    <h3 className='text-base'>₹{Math.round(product.price*85.44).toLocaleString()}</h3>
                    <h3 className='m-1 text-sm'>({Math.round(product.discountPercentage)}% off)</h3>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </Fragment>
  )
}

export default Body