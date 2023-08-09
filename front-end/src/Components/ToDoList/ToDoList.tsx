import './ToDoList.css'
import {useState} from 'react'
import reactsvg from '../../assets/react.svg'
import {forwardRef, useImperativeHandle,Ref} from 'react';
import { ToDoListRefs } from '../Countdown/CountdownPageRefs';
import {useRef} from 'react'
import axios,{AxiosResponse} from 'axios'
import { FaSave } from 'react-icons/fa';

export interface Task{
    name:string;
    type:number;
}

export const ToDoList = forwardRef((_props:{},ref:Ref<ToDoListRefs>)=>{       
    const [taskList,updateTaskList] = useState<Task[]>([]);
    const [filterList,_updateFilterList] = useState([{id:0,option:'All',mode:2},{id:1,option:'Pending',mode:0},{id:2,option:"Completed",mode:1}]); //allows the selection animation to work.
    const [activeOption, updateActiveOption] = useState({ id: 0, option: 'All', mode: 2 });
    const [taskInput,updateTaskInput] = useState("");
    const [viewMode,updateViewMode] = useState(0);
    const [isSaveBtn,updateIsSaveBtn] = useState(false);
    
    const dataUrl = "https://localhost:7263/workpomodoro/user/tasks"
    const TOKEN = localStorage.getItem('user-token');
    const config = {
        headers:{
            Authorization:'Bearer '+TOKEN
        },
        responseType:'text' as 'json'
    }
  
    const getData = ()=>{
        console.log('To-Do List is unmounted!')
        axios.get(dataUrl,config)
            .then((response:AxiosResponse)=>{                                
                updateTaskList(response.data);
                console.log(taskList)
            })
    }
    const saveData = ()=>{
        console.log()
        axios.post(dataUrl,taskList,config)
            .then((response:AxiosResponse)=>{                                                
                alert(response.data)
                updateIsSaveBtn(false)
            })
    }
    useState(()=>{
        getData()
        
    })

    
    useImperativeHandle(ref,()=>(
        {getTopTask}
    )); 
    function getTopTask():string {
        let topTask = ''
     
        for(let index = 0; index<taskList.length;index++){            
            let currentTask = taskList[index];
            console.log('top task: '+currentTask.name)
            if(currentTask.type===0){                
                topTask = currentTask.name
            }
            break;
        }        
        return topTask             
    }
      


    const handleEnter = (event:any) => {
        
        let enteredKeys = event.target.value        
        if(event.key === 'Enter'){
            //The idea is to create a copy of the current task array, update that copied array, then
            //overwrite it on the previous one.
            let tempTaskList = [...taskList]; //Creates a temp array, which contains everything of the TaskList array.
            //let currentId = taskList.length 
            updateTaskInput("");
            updateViewMode(0);
            updateIsSaveBtn(true)
            updateActiveOption({ id: 0, option: 'All', mode: 0 })
            console.log(enteredKeys)
            let newTask = {name:enteredKeys,type:0}
            tempTaskList.push(newTask)        
            updateTaskList(tempTaskList)   
        }                
    }    
    const handleCheckbox = (_event:any,taskId:number) => {                
        //1. The idea is to create a copy of the current task array, update that copied array, then
        //overwrite it on the previous one.
        let tempTaskList = [...taskList];
        let chosenTask = tempTaskList[taskId] //2. gets the chosen task out (call it A), based on the Id sent from the checkbox.
        chosenTask["type"] = 1; //3. changes A's "type" attribute from 0 (in progress) to 1 (complete) -> new task A.
        tempTaskList[taskId] = chosenTask; //Replace the old task A (step 2) with the new Task A (step 3)
        updateIsSaveBtn(true)
        updateTaskList(tempTaskList);// updates the old  TaskList with the new TaskList (tempTaskList)        
    }
    
    /*Handles the event when a HtmlDivElement (div) is dragged.
    divIndex is the position of the div that called this function.*/
    //Runs when user clicks on the list element and drag it.
    const draggedItem = useRef<any>()
    //Runs when the dragged task (e.g i love my life, index=0) overlaps the underneath task (e.g. i hate my life,index=1)
    //Returns the index of the overlapped element (I hate my life,index=1)
    const draggedOverItem = useRef<any>()
    
    const reupdateTaskList = ()=>{
        //Copies everything in the TaskList array to the prevTaskList object.
        //The three dots are called the spread operator (copies all items in an 
        //existing list to another new one.)
        let tempTaskList =  [...taskList]
        
        /*Step 1: Temporarily remove the dragged item (the one user clicks and hold on)
        then saves it in the dragged variable.*/
        console.log('current draggedItem: '+draggedItem.current)
        console.log('current draggedOverItem: '+draggedItem.current)
        let dragged = tempTaskList.splice(draggedItem.current!,1)[0];
        
        /*Step 2: At the task that is scrolled over (draggedOverItem), 
        changes its content with the one from "dragged"
         (the one user clicks and hold on.) */
        tempTaskList.splice(draggedOverItem.current!,0,dragged)
        for(var index=0;index<tempTaskList.length;index++){
            console.log(tempTaskList[index])
        }
        
        /*Step 3: Nullfies the dragged and draggedOver item, for the upcoming operations. */
        draggedItem.current = null;
        draggedOverItem.current = null;
        updateIsSaveBtn(true);
        updateTaskList(tempTaskList);
    }
    
 
    
    
    return(
                  
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

                            return(<li key={option.id}
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
                    {(()=>{
                        if(isSaveBtn) return(
                            <div onClick={saveData}>
                                <FaSave size="35"></FaSave>
                            </div>
                    )})()}
                    
                    <div onClick={()=>{
                        let deleteAll = confirm("Do you really want to delete all tasks?")
                        if (deleteAll==true){
                            updateTaskList([])
                            updateIsSaveBtn(true)
                        }                                            
                        }}>
                        <button className="clear-btn">Clear All</button>
                    </div>                
                </div>
                <ul className="task-box">
                    {taskList.map((eachTask,index) => {
                            {/*draggable: allows the list item to be dragged */}
                            {/*onDragEnd: When user releases the mouse, update the position of the tasks again (reupdateTaskList)*/}
                            {/*e.preventDefault: Prevents the default behavior of a div */}
                            return(<li key={index} className="tasklist-item" draggable
                            onDragStart={()=>{draggedItem.current = index} }
                            onDragEnter={()=>{draggedOverItem.current = index}} 
                            onDragEnd={reupdateTaskList} 
                            
                            onDragOver={(e)=>{e.preventDefault()}} 
                            
                            > 
                        { 
                            (() => {
                                if(viewMode===0) { //incomplete tasks
                                    if (eachTask.type===0){
                                        return (
                                            <div className="task-container">
                                                <div className="task-content"
                                               >{eachTask.name}
                                                    </div>
                                                <div className='task-status'>
                                                    <input type ='checkbox'onChange={event=>handleCheckbox(
                                                            event,index)}>

                                                    </input>
                                                </div>                                            
                                            </div>                                                        
                                        )
                                    }                                                
                                } else if (viewMode===1) { //completed tasks
                                    if (eachTask.type===1){
                                        return (
                                            <div className='task-container'>
                                                <div className="task-content">{eachTask.name}</div>
                                                <div className="task-status">Done</div>
                                            </div>
                                            
                                        )
                                    } 
                                }else if (viewMode===2){ //both incomplete and complete tasks
                                    if (eachTask.type===0){
                                        return (
                                            <div className='task-container'>
                                                <div className="task-content">{eachTask.name}</div>
                                                {/* This is how to pass the event into the function */}
                                                <div className="task-status">
                                                    <input type='checkbox'                                                                     
                                                        onChange={event=>handleCheckbox(
                                                            event,index)}>
                                                        
                                                    </input>                                                                                   
                                                </div>
                                                                                            
                                            </div>
                                            
                                        )
                                    }else{
                                        return (
                                            <div className='task-container'>
                                                <div className="task-content">{eachTask.name}</div>
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
    );

}
)