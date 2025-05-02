import { Fragment } from "react";
import './Components.css'
import todoimage from '../images/todo.jpg';

function Header(){
    return(
        <Fragment>
            <div className="Header">
                <img className="todoimage" src={todoimage} alt="" />
                <h1 className="MainHeader">Todolist</h1>
            </div>
        </Fragment>
    )
}

export default Header;