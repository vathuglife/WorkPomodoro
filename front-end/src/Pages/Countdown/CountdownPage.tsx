import {Countdown} from "../../Components/Countdown/Countdown"
import {CountdownRefs} from '../../Components/Countdown/CountdownPageRefs'
import './CountdownPage.css'
import {useSpring,animated} from 'react-spring'
import {useEffect} from 'react'
import StopTimeButton from "../../Components/Countdown/StopTimeButton/StopTimeButton" 
import {useRef} from 'react';
import CurrentTask from "../../Components/Countdown/CurrentTask/CurrentTask"
import { MusicPlayer } from "../../Components/Countdown/MusicPlayer/MusicPlayer"

import {MusicPlayerRefs} from "../../Components/Countdown/MusicPlayer/MusicPlayer"
import { useNavigate } from "react-router-dom"

export default function CountdownPage(){                   

    /*List of References (refs) from Parent component (CountdownPage)
        to Child Components (ToDoList, Countdown)
    ToDoListRefs and CountdownRefs are Interfaces. */    
    const cdRef = useRef<CountdownRefs>(null)  
    const playerRef = useRef<MusicPlayerRefs>(null)         
    const navigator = useNavigate()
    const springProps = useSpring({
        from:{opacity:0},
        to:{opacity:1},           
        reset:true,
        duration:20          
    })    
   
    useEffect(()=>{    
        handlePomodoroSession();
        
    },[])

    
    const handlePomodoroSession = ()=>{
        cdRef.current?.resetTimer(1500)                  
        cdRef.current?.resumeTimer()
    }    
    const handleTimesUp = ()=>{
        playerRef.current?.pause()    
        navigator('/breaktime')            
    }

    const reset = ()=>{                
        cdRef.current?.pauseTimer();//First click pauses the timer.
        playerRef.current?.pause()
        let startOver = confirm("Do you really want to start over?");
        if(startOver==true) {                                             
            handlePomodoroSession()
        }else {            
            cdRef.current?.resumeTimer()
            playerRef.current?.play()
        };
    }
   
    
                                                    
    return(                                            
        <div id='main-container'>                                     
            <animated.div style={springProps}> {/* handles the fade-in/out effect */}                                
                <div id='page-title'>Pomodoro</div>     
                <div className='countdown-div'>
                    <Countdown handleTimesUp={handleTimesUp} ref={cdRef}/>
                    <div className='stopbtn-pos-div'>
                        <StopTimeButton resetTimer={reset}/>      
                    </div>
                    <div id='current-task-pos'><CurrentTask/>
                        </div>
                    <div id='current-song-pos'>
                        <MusicPlayer ref={playerRef}/>
                    </div>
                </div>                         
        
            </animated.div>                                            
           
        </div>         
        
        
    )

   
}