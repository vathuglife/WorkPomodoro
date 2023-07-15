import {Countdown} from "../../Components/Countdown/Countdown"
import {CountdownRefs} from '../../Components/Countdown/CountdownPageRefs'
import { ToDoListRefs } from "../../Components/Countdown/CountdownPageRefs"
import {ToDoList} from "../../Components/ToDoList/ToDoList"
import './CountdownPage.css'
import {useSpring,animated} from 'react-spring'
import MusicList from "../../Components/MusicList/MusicList"
import {useEffect, useState} from 'react'
import StopTimeButton from "../../Components/Countdown/StopTimeButton/StopTimeButton" 
import {useRef} from 'react';
import CurrentTask from "../../Components/Countdown/CurrentTask/CurrentTask"
import CurrentSong from "../../Components/Countdown/CurrentSong/CurrentSong"
import {FaArrowRight} from 'react-icons/fa';
import {FaArrowLeft} from 'react-icons/fa';

export default function CountdownPage(){                   
    const titleList = ["Step 1: Customize your To Do List",
                    "Step 2: Pick your favorite songs"];
                    /*0 = ToDoList, 1: Music List, 2: Countdown */
    const [currentComponent,updateCurrentComponent] = useState(0);   
    const [topTask,updateTopTask] = useState("");

    
    /*List of References (refs) from Parent component (CountdownPage)
        to Child Components (ToDoList, Countdown)
    ToDoListRefs and CountdownRefs are Interfaces. */
    const toDoListRef = useRef<ToDoListRefs>(null)
    const cdRef = useRef<CountdownRefs>(null)
    
    useEffect(() =>{//runs every time the currentComponent State changes (previous/continue btn pressed) 
        /*Updates the Top Task ONLY when we are in the ToDoList component (currentComponent = 0) */
        
        if(currentComponent==0){
            let currentTopTask = toDoListRef.current?.getTopTask()!            
            console.log("current top task:"+currentTopTask)
            console.log("current component: "+currentComponent)            
            updateTopTask(currentTopTask);
        }        
        
        
        if(currentComponent==2)  //ONLY RUNS if the currentComponent EQUALS TO 2 (Countdown Page)
        {
            cdRef.current?.resetTimer()
            cdRef.current?.resumeTimer()      
                                        
        }        
    },[currentComponent]
    )

    const reset = ()=>{                
        cdRef.current?.pauseTimer();//First click pauses the timer.
        let startOver = confirm("Do you really want to start over?");
        if(startOver==true) {                                 
            // cdRef.current.resetTimer()   
            updateCurrentComponent(0)                   
        }else {            
            cdRef.current?.resumeTimer()
        };
    }
    
    
    const prevComponent = ()=>{
        if(currentComponent>0){
            let currentValue = currentComponent;
            currentValue-=1;
            updateCurrentComponent(currentValue);
        }
    }        

    const appearProps = useSpring({
        from:{opacity:0},
        to:{opacity:1},           
        reset:true,
        duration:20          
    })                                                        

    const nextComponent = ()=>{
        if(currentComponent<titleList.length){
            let currentValue = currentComponent;
            currentValue+=1;
            updateCurrentComponent(currentValue);
        }
    }
    


    
    
    
    return(                                            
        <div id='main-container'>                        
            <div id='workspace-title'>Main Workspace</div>
            <div id="title-container">
                {/*Returns the appropriate title from the titleList,
                based on the selected index.*/}
                <animated.div style={appearProps}>
                    <div id='todo-title'>{titleList[currentComponent]}</div>                        
                </animated.div>                                
                
                {(()=>{
                    if(currentComponent!=2){ /*If the current component IS NOT Countdown, show the next and
                                             previous buttons for the ToDoList and MusicList components.*/                        
                        return(<div>
                            <div className='changeComponentBtn' id='prevBtn'
                                onClick={prevComponent}>
                                    <FaArrowLeft size='30'/>
                            </div>
                            <div className='changeComponentBtn' id='nextBtn'
                                onClick={nextComponent}>
                                    <FaArrowRight size='30'/>
                            </div>
                        </div>);
                    }
                })()}
                
                
            </div>            
            
            
            
            {/*Everything within TaskContext can access shared Data inside TaskContext.*/}            
            <animated.div style={appearProps}> {/* handles the fade-in/out effect */}
            {/*This is what we call the anonymous function within the render function.
            If I have some time left, I might Google what this thing actually is.*/}
                {(() => {                                
                    if(currentComponent===0) return (
                        <div>                            
                            <div className='main-container-item td-list'><ToDoList ref={toDoListRef}                              
                            /></div> 
                        </div>
                    )
                    else if(currentComponent===1) return(                                                   
                        <div className='main-container-item td-list'><MusicList/></div>                         
                    )
                    else {                        
                        
                        return(
                        /*Persists the Top Task in the ToDoList, then sends that Top Task 
                        to this component.*/
                        
                            <div className='countdown-div'>
                                <Countdown ref={cdRef}/>
                                <div className='stopbtn-pos-div'>
                                    <StopTimeButton resetTimer={reset}/>      
                                </div>
                                <div id='current-task-pos'><CurrentTask topTask={topTask}/>
                                    </div>
                                <div id='current-song-pos'><CurrentSong/></div>
                            </div>                         
                    )
                        
                    }
                })()}
            </animated.div>        
                        

        </div>         
        
        
    )

   
}