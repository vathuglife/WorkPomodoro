import {useState,useEffect} from 'react'
import { FaTrash } from 'react-icons/fa';
export interface Task{
    name:string;
    type:number;
}

export interface EachTaskProps{
    updateTaskStatus:(event:any,taskId:number)=>void;
    deleteTask:(taskId:number)=>void
    index:number;
    isTopTask:boolean;
    eachTask:Task;    
    isPendingView:boolean; //only highlights the 1st task as yellow when the Pending mode is selected.
}
export const EachTask = ({updateTaskStatus,
                            deleteTask,index,
                            eachTask,
                            isTopTask,
                            isPendingView}:EachTaskProps)=>{
    const [statusColor,updateStatusColor] = useState('red')
    const [containerColor,updateContainerColor] = useState('white')        
    const statusStyle:{[key:string]:React.CSSProperties} = {
        container:{
            backgroundColor:statusColor,
            borderColor:statusColor
        }
    }
    const containerStyle:{[key:string]:React.CSSProperties} = {
        container:{
            backgroundColor:containerColor,            
        }
    }
    
    useEffect(()=>{            
        if(eachTask.type===1) {  //for completed tasks      
            updateStatusColor('green')                    
        }
        if(isTopTask && isPendingView) {//for incomplete ones      
            console.log(`${isTopTask} ${isPendingView}`)
            updateContainerColor('#FFC300')            
            
        }    
        /*Resets the status color to red.
        Reason: Imagine we have 2 tasks like this:
        - Task 1: ahahaha (Completed)
        - Task 2: ahihi (Incomplete)
        
        Step 1: ahahaha is chosen to display on the screen, 
                the state (statusColor) changes from 'red' (default) to green.
        Step 2: as there is no destructor set (return in useEffect()), statusColor
                is STUCK at Green.
        Step 3: ahihi is chosen, and as nothing updates statusColor (green->red),
                the status color is stuck at Green.
        */
        return(()=>{
            updateContainerColor('white')
            updateStatusColor('red')
        }) 
                                                
    })
    const handleCheckbox = (event:any,index:number)=>{
        if(isPendingView) //only allows user to change the task 
                          //from red to green in Pending screen.
            updateTaskStatus(event,index)
    }
    
    return(        
        <div className="task-container" style={containerStyle.container}>            
            <div className='task-status'style={statusStyle.container}
                onClick={event=>handleCheckbox(event,index)}>                
            </div> 
            
            <div className="task-content">
                {eachTask.name}
            </div>

            <div className='delete-task-btn' 
                onClick={()=>deleteTask(index)}>
                <FaTrash size='28'/>
            </div>
                                                      
        </div>   
        
    )
}