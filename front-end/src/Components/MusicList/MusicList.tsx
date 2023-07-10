import './MusicList.css'
import {useState} from 'react'
import reactsvg from '../../assets/react.svg'
import { FaSearch } from 'react-icons/fa';


export default function MusicList(){       
    
    const [musicList,updateMusicList] = useState([{id:0,name:"Nier Automata Playlist"},
                                                {id:1,name:"Somebody that I used to know..."}]);
    const [filterList,updateFilterList] = useState([{id:0,option:'All',mode:2},
                                                {id:1,option:'Pending',mode:0},{id:2,option:"Completed",mode:1}]); //allows the selection animation to work.
    const [activeOption, updateActiveOption] = useState({ id: 0, option: 'All', mode: 1 });
    const [taskInput,updateTaskInput] = useState("");
    const [viewMode,updateViewMode] = useState(1);
    
    const getTasks = async()=>{
        

    }
    const saveTasks = async()=>{
        
    }
    // const handleEnter = (event:any) => {
        
    //     let enteredKeys = event.target.value        
    //     if(event.key === 'Enter'){
    //         //The idea is to create a copy of the current task array, update that copied array, then
    //         //overwrite it on the previous one.
    //         let tempTaskList = [...taskList]; //Creates a temp array, which contains everything of the TaskList array.
    //         let currentId = taskList.length 
    //         updateTaskInput("");
    //         updateViewMode(0);
    //         updateActiveOption({ id: 0, option: 'All', mode: 0 })
    //         console.log(enteredKeys)
    //         let newTask = {id:currentId,task:enteredKeys,type:0}
    //         tempTaskList.push(newTask)        
    //         updateTaskList(tempTaskList)   
    //     }                
    // }    
    // const handleCheckbox = (event:any,taskId:number) => {                
    //     //1. The idea is to create a copy of the current task array, update that copied array, then
    //     //overwrite it on the previous one.
    //     let tempTaskList = [...taskList];
    //     let chosenTask = tempTaskList[taskId] //2. gets the chosen task out (call it A), based on the Id sent from the checkbox.
    //     chosenTask["type"] = 1; //3. changes A's "type" attribute from 0 (in progress) to 1 (complete) -> new task A.
    //     tempTaskList[taskId] = chosenTask; //Replace the old task A (step 2) with the new Task A (step 3)
    //     updateTaskList(tempTaskList);// updates the old  TaskList with the new TaskList (tempTaskList)        
    // }

    
    
    return(
                     
         <div className="music-list-wrapper">             
            <div className="search-bar">  
                <div className='search-icon'>{<FaSearch size='25'/>}</div>
                <input className="" type="text"
                    value={taskInput}
                    placeholder="Type the song name here..." onChange={
                            (e)=>updateTaskInput(e.target.value)                            
                        }>
                            
                        </input>
                
            </div>
                        
            <ul className="music-box">
                {musicList.map((eachMusic) => {
                    return(<li key={eachMusic.id} className="musiclist-item">                                                                
                        {eachMusic.name}                                                    
                    </li>);
                })}
            </ul>            
        </div>             
    );

}