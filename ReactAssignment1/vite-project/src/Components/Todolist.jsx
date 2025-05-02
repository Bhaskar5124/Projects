import { Fragment, useState } from "react";
import Todoitem from "./Todoitem";
import './Components.css'
import delimage from '../images/delete.png';
import editimage from '../images/edit.png';



function Todolist({itemstate,setitemstate,setinput1,setinput2,input1,input2}){
    console.log(itemstate);


    function handleDelete(id){
        const arr = itemstate.filter((item)=>item.id!==id);
        setitemstate(arr);
    }


    function handleUpdate(id){
        itemstate.filter((item)=>
        {if(item.id==id){
            setinput1(item.title)
            setinput2(item.desc)
            }
        });       
    }

    

    function handlecheckbox(id){
        setitemstate(
            itemstate.map((item) =>
                item.id === id ? { ...itemstate, done: !item.done } : item
            )
          );
    };




    return(
        itemstate.map((item,index)=>{
            return(
                <div className="List" key={index}>
                    <div className="Info">
                        <h2 className="title">{index+1}. Title:{item.title}</h2>
                        <h3 className="desc">Description:{item.desc}</h3>
                    </div>

                    <div className="TaskButtons">  
                        <button className="opbuttons" onClick={()=>handleDelete(item.id)}><img className="buttonimage" src={delimage} alt="" /></button>
                        <button className="opbuttons" onClick={()=>handleUpdate(item.id)}><img className="buttonimage" src={editimage} alt="" /></button>
                        <input className="markbox" type="checkbox" checked={item.done} onChange={()=>handlecheckbox(item.id)}/>
                    </div>

                </div>
            )
        })
    )
}



export default Todolist;
