import { ToDoList } from "../../../Components/ToDoList/ToDoList"
import { useRef } from "react"
import { ToDoListRefs } from "../../../Components/Countdown/CountdownPageRefs"
import './TaskPage.css'
export const TaskPage = ()=>{
    const toDoListRef = useRef<ToDoListRefs>(null)
    return(
                              
        <div className='td-list-pos'><ToDoList ref={toDoListRef}/></div> 
    
    )
}