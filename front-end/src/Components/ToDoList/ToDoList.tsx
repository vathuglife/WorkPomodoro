import './ToDoList.css'
import {useState} from 'react'
import reactsvg from '../../assets/react.svg'


export default function ToDoList(){       
    const [taskList,updateTaskList] = useState([{id:0,task:"dummy task 1",type:1},{id:1,task:"dummy task 2",type:0}]);
    const [filterList,updateFilterList] = useState([{id:0,option:'All',mode:2},{id:1,option:'Pending',mode:0},{id:2,option:"Completed",mode:1}]); //allows the selection animation to work.
    const [activeOption, updateActiveOption] = useState({ id: 0, option: 'All', mode: 2 });
    const [taskInput,updateTaskInput] = useState("");
    const [viewMode,updateViewMode] = useState(0);
    
    const getTasks = async()=>{
        

    }
    const saveTasks = async()=>{
        
    }
    const handleEnter = (event:any) => {
        
        let enteredKeys = event.target.value        
        if(event.key === 'Enter'){
            //The idea is to create a copy of the current task array, update that copied array, then
            //overwrite it on the previous one.
            let tempTaskList = [...taskList]; //Creates a temp array, which contains everything of the TaskList array.
            let currentId = taskList.length 
            updateTaskInput("");
            updateViewMode(0);
            updateActiveOption({ id: 0, option: 'All', mode: 0 })
            console.log(enteredKeys)
            let newTask = {id:currentId,task:enteredKeys,type:0}
            tempTaskList.push(newTask)        
            updateTaskList(tempTaskList)   
        }                
    }    
    const handleCheckbox = (event:any,taskId:number) => {                
        //1. The idea is to create a copy of the current task array, update that copied array, then
        //overwrite it on the previous one.
        let tempTaskList = [...taskList];
        let chosenTask = tempTaskList[taskId] //2. gets the chosen task out (call it A), based on the Id sent from the checkbox.
        chosenTask["type"] = 1; //3. changes A's "type" attribute from 0 (in progress) to 1 (complete) -> new task A.
        tempTaskList[taskId] = chosenTask; //Replace the old task A (step 2) with the new Task A (step 3)
        updateTaskList(tempTaskList);// updates the old  TaskList with the new TaskList (tempTaskList)        
    }

    
    
    return(
         <div>            
            <div className="to-do-list-wrapper">                
                <div className="task-input">  
                    <img src={reactsvg} className="input-icon"></img>                      
                    <input className="task-input" type="text"
                        value={taskInput}
                        placeholder="Add a New Task + Enter" onChange={
                                (e)=>updateTaskInput(e.target.value)                            
                            } onKeyDown={(e)=>handleEnter(e)}>
                                
                            </input>
                </div>
                
                <div className="controls">
                
                    <ul className="filters">
                        {filterList.map((option)=>{

                            return(<li 
                                    onClick={()=>{
                                        updateViewMode(option.mode)
                                        updateActiveOption(option) //highlights the currently active option (e.g. All, Completed, In Progress)
                                    }}
                                    className={`option ${activeOption == option && "active"}`}> 
                                    {option.option}                                                      
                                </li>);
                        })                        

                        }                    
                    </ul>
                    <div onClick={()=>{
                        let deleteAll = confirm("Do you really want to delete all tasks?")
                        if (deleteAll==true){
                            updateTaskList([])
                        }                                            
                        }}>
                        <button className="clear-btn">Clear All</button>
                    </div>                
                </div>
                <ul className="task-box">
                    {taskList.map((eachTaskDict) => {
                            return(<li key={eachTaskDict.id} className="tasklist-item">                                                                
                        {
                            (() => {
                                if(viewMode===0) { //incomplete tasks
                                    if (eachTaskDict.type===0){
                                        return (
                                            <div className="task-container">
                                                <div className="task-content">{eachTaskDict.task}</div>
                                                <div className='task-status'>
                                                    <input type ='checkbox'onChange={event=>handleCheckbox(
                                                            event,eachTaskDict.id)}>

                                                    </input>
                                                </div>                                            
                                            </div>                                                        
                                        )
                                    }                                                
                                } else if (viewMode===1) { //completed tasks
                                    if (eachTaskDict.type===1){
                                        return (
                                            <div className='task-container'>
                                                <div className="task-content">{eachTaskDict.task}</div>
                                                <div className="task-status">Done</div>
                                            </div>
                                            
                                        )
                                    } 
                                }else if (viewMode===2){ //both incomplete and complete tasks
                                    if (eachTaskDict.type===0){
                                        return (
                                            <div className='task-container'>
                                                <div className="task-content">{eachTaskDict.task}</div>
                                                {/* This is how to pass the event into the function */}
                                                <div className="task-status">
                                                    <input type='checkbox'                                                                     
                                                        onChange={event=>handleCheckbox(
                                                            event,eachTaskDict.id)}>
                                                        
                                                    </input>                                                                                   
                                                </div>
                                                                                            
                                            </div>
                                            
                                        )
                                    }else{
                                        return (
                                            <div>
                                                <div className="task-content">{eachTaskDict.task}</div>
                                                <div className="task-status">Done</div>
                                            </div>
                                            
                                        )
                                    } 

                                }
                            })()  
                        }
                                    
                        </li>);
                    })}
                </ul>            
            </div>  
        </div>    
    );

}