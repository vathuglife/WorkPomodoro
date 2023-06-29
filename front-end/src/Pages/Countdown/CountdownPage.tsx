import Countdown from "../../Components/Countdown/Countdown"
import ToDoList from "../../Components/ToDoList/ToDoList"
import './CountdownPage.css'
import NavBar from "../../Components/NavBar/NavBar"
export default function CountdownPage(){
    return(
        <div>

        <div className='navbar'><NavBar></NavBar></div>
        <div id='main-container'>            
            <div className='main-container-item'><Countdown/></div>
            <div className='main-container-item td-list'><ToDoList/></div>        
        </div>
        </div>                    
    )
}