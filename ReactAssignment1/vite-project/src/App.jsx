import Todoitem from "./Components/Todoitem";
import Todolist from "./Components/Todolist";
import './App.css'
import { Fragment } from "react";
import Header from "./Components/Header";


function App() {

  return (
    <Fragment>
      <Header/>
      <Todoitem/>
    </Fragment>
  )
}

export default App;
