import './CurrentTask.css'
import { FaTasks } from 'react-icons/fa';


export interface CurrentTaskProps{
    topTask:string
}

export default function CurrentTask({topTask}:CurrentTaskProps){    
    return (
        <div id='current-task-border'>    
            <div id='fa-task'><FaTasks size="30"/></div>
            <div id='task-detail'>{topTask}</div>
        </div>
    );
}