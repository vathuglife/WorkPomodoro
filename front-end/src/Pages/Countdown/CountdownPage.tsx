import {Countdown} from "../../Components/Countdown/Countdown"
import {CountdownRefs} from '../../Components/Countdown/CountdownPageRefs'
import {useState} from 'react'
import './CountdownPage.css'
import {useSpring,animated} from 'react-spring'
import {useEffect} from 'react'
import StopTimeButton from "../../Components/Countdown/StopTimeButton/StopTimeButton" 
import {useRef} from 'react';
import CurrentTask from "../../Components/Countdown/CurrentTask/CurrentTask"
import {MusicPlayer} from "../../Components/Countdown/CurrentSong/MusicPlayer"
import ConfirmStartBtn from "../../Components/Countdown/ConfirmStartBtn/ConfirmStartBtn"
import {MusicPlayerRefs} from "../../Components/Countdown/CurrentSong/MusicPlayer"


export default function CountdownPage(){                   

    /*List of References (refs) from Parent component (CountdownPage)
        to Child Components (ToDoList, Countdown)
    ToDoListRefs and CountdownRefs are Interfaces. */    
    const cdRef = useRef<CountdownRefs>(null)  
    const playerRef = useRef<MusicPlayerRefs>(null)    
    const [isStarted,updateIsStarted]  = useState<boolean>(false)

    useEffect(()=>{
        
        /*This function will run when this component (CountdownPage) unmounts
         Unmount means: When user decides to change to another page (MusicPage...)
         This will help us save the task list data to the database with API call.
        */
        console.log('component is mounted!')
        
        return (()=>{
            console.log('component is NOT MOUNTED!')
        })
    },[])

    useEffect(()=>{
        if(isStarted){
            restartTimer();
        }
    },[isStarted])

    const restartTimer = ()=>{
        cdRef.current?.resetTimer()                  
        cdRef.current?.resumeTimer()
    }
    
    const reset = ()=>{                
        cdRef.current?.pauseTimer();//First click pauses the timer.
        playerRef.current?.pause()
        let startOver = confirm("Do you really want to start over?");
        if(startOver==true) {                                             
            restartTimer()
        }else {            
            cdRef.current?.resumeTimer()
            playerRef.current?.play()
        };
    }
    
    const springProps = useSpring({
        from:{opacity:0},
        to:{opacity:1},           
        reset:true,
        duration:20          
    })                                                        

    const startTimerAndPlayback = ()=>{
        updateIsStarted(true)
    }
    return(                                            
        <div id='main-container'>                        
                                                
            {(()=>{
                if(!isStarted) return(
                    <div className='confirm-start-btn-pos'>
                        <ConfirmStartBtn startPlayback={startTimerAndPlayback}/>        
                    </div>
                )
                else{                                                       
                    return(                    
                        <animated.div style={springProps}> {/* handles the fade-in/out effect */}                                
                            <div id='page-title'>Pomodoro</div>     
                            <div className='countdown-div'>
                                <Countdown ref={cdRef}/>
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
                            
                    )
                }
            })()}                                    
            

        </div>         
        
        
    )

   
}