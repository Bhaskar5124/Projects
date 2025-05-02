import { Fragment, useState } from "react";
import Todolist from "./Todolist";
import './Components.css'
import gitimage from '../images/github.png';

function Todoitem(){
    let items = [
        {id:new Date().getTime(), title:"Homework", desc:"Have to do question of React", done:false},
    ]

    let [itemstate,setitemstate] = useState(items);

    let [input1,setinput1] = useState("")
    let [input2,setinput2] = useState("")

    function handleinput1(e){
        setinput1(e.target.value)
    }

    function handleinput2(e){
        setinput2(e.target.value)
    }

    function handleAdd(){
        if(input1=="" || input2==""){
            alert("Blank input can't be added")
        }
        else{
            let nv = {id:new Date().getTime(),title:input1 , desc:input2, done:false}
            setitemstate([...itemstate,nv]);
            setinput1("");
            setinput2("");
        }

    }

    return (
        <Fragment>
        <div>
            <div className="inputgroupdiv">
                <div className="inputdiv">
                    <input className="input1" type="text" onChange={handleinput1} value={input1} placeholder="Title"/>
                    <input className="input2" type="text" onChange={handleinput2} value={input2} placeholder="Description"/>
                    <a href="https://github.com/Bhaskar5124/newrepos" target="_blank"><img className="buttonimage" src={gitimage} alt="" /></a>
                </div>
                <button className="addbutton" onClick={handleAdd}>Add Task</button>
            </div>

        <Todolist itemstate={itemstate} setitemstate={setitemstate} setinput1={setinput1} setinput2={setinput2} input1={input1} input2={input2}/>
        </div>
        </Fragment>
    )
}

export default Todoitem;