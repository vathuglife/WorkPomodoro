import { ToDoList } from "./ToDoList/ToDoList"
import { useRef} from "react"
import { useSpring,animated } from "react-spring"
import { ToDoListRefs } from "../../Components/Countdown/CountdownPageRefs"
import './TaskPage.css'
export const TaskPage = ()=>{
    const toDoListRef = useRef<ToDoListRefs>(null)
    const springProps = useSpring({
        from:{opacity:0},
        to:{opacity:1},           
        reset:true,
        duration:20          
    })      
    return(
        <div>
            <animated.div style={springProps}>
                <div id='task-title'>Tasks</div>
                <div className='td-list-pos'><ToDoList ref={toDoListRef}/></div> 
            </animated.div>
        </div>
    
    )
}