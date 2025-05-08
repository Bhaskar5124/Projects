import React, { Fragment, useState } from 'react'
import { Books } from '../utils/data'
import { useNavigate } from 'react-router-dom';


function Addbook() {
    const navigate = useNavigate();

    let [inp1,setinp1] = useState('');
    let [inp2,setinp2] = useState('');
    let [inp3,setinp3] = useState('');
    let [inp4,setinp4] = useState('');
    let [inp5,setinp5] = useState('');
    let [inp6,setinp6] = useState('');
    let [inp7,setinp7] = useState('');

    let [add,setadd] = useState(Books);

    function handleinp1(e){
        setinp1(e.target.value)
    }
    function handleinp2(e){
        setinp2(e.target.value)
    }
    function handleinp3(e){
        setinp3(e.target.value)
    }
    function handleinp4(e){
        setinp4(e.target.value)
    }
    function handleinp5(e){
        setinp5(e.target.value)
    }
    function handleinp6(e){
        setinp6(e.target.value)
    }
    function handleinp7(e){
        setinp7(e.target.value)
    }


    function handleaddbook(){
        if(inp1=="" || inp2=="" || inp3==""|| inp4==""|| inp5==""|| inp5==""|| inp5==""){
            alert("Blank input can't be added")
        }
        else{
            let nbook = {
                "id":Books.length+1,
                "author": inp1,
                "title": inp2,
                "country": inp3,
                "imageLink": inp4,
                "language": inp5,
                "pages": inp6,
                "year": inp7,
              }

            setadd(add.unshift(nbook));

        }

        navigate('/bookbrowse');
    }



  return (
    <Fragment>
        <div className='flex justify-center items-center'>
            <h1 className='text-center text-2xl m-6'>Add <b className='text-yellow-600'>Books</b> to our Library</h1>
        </div>

        <div className='flex justify-center items-center'>
            <form className='h-100 w-280 flex flex-wrap justify-center items-center rounded-2xl shadow-xl'>
                <input className='text-center m-4 h-16 w-72 border border-gray rounded-xl' type='text' placeholder='Author' onChange={handleinp1} value={inp1}/>
                <input className='text-center m-4 h-16 w-72 border border-gray rounded-xl' type='text' placeholder='Title' onChange={handleinp2} value={inp2}/>
                <input className='text-center m-4 h-16 w-72 border border-gray rounded-xl' type='text' placeholder='Country' onChange={handleinp3} value={inp3}/>
                <input className='text-center m-4 h-16 w-72 border border-gray rounded-xl' type='text' placeholder='Imagelink' onChange={handleinp4} value={inp4}/>
                <input className='text-center m-4 h-16 w-72 border border-gray rounded-xl' type='text' placeholder='Language' onChange={handleinp5} value={inp5}/>
                <input className='text-center m-4 h-16 w-72 border border-gray rounded-xl' type='number' placeholder='Pages' onChange={handleinp6} value={inp6}/>
                <input className='text-center m-4 h-16 w-72 border border-gray rounded-xl' type='number' placeholder='Year of Publishing' onChange={handleinp7} value={inp7}/>
            </form>
        </div>

        <div className='flex justify-center items-center'>
        <button className='m-2 h-8 w-48 bg-gray-300 border border-black rounded-xl hover:bg-slate-800 transition hover:text-white' onClick={handleaddbook}>Add Book</button> 
        </div>
    </Fragment>
    
  )
}

export default Addbook