import TimeRemainingCircle from './TimeRemainingCircle/TimeRemainingCircle'
import StartTimeButton from './StartTimeButton/StartTimeButton'
import './Countdown.css'
import {useState,useEffect} from 'react'

const Countdown = () => {    
    const [parentTimeInStr,updateParentTimeInStr] = useState("25:00");
    const [parentTimeInSecs,updateParentTimeInSecs] = useState(1500);    
    const [isRunning,updateIsRunning] = useState(false)
    
    useEffect(() => { //runs when AT LEAST A STATE CHANGES (e.g. isRunning State, triggered by Start button).
        console.log(isRunning)
        if(parentTimeInSecs>0 && isRunning==true){
            console.log("im running!")
            console.log(isRunning)
            //Decreases the parentTimeInSecs by 1, every 1 second (1500,1499,1498...)
            const timer = setInterval(()=>
                updateParentTimeInSecs(parentTimeInSecs-1)
                ,1000
            )        

            //Updates the time on the screen (e.g 24:59, 24:58)
            let min = Math.floor(parentTimeInSecs/60);
            let secs = parentTimeInSecs%60;
            updateParentTimeInStr(min+":"+secs)
            return () => clearInterval(timer);        
            
        }               
    },[parentTimeInSecs,isRunning])
    
    
    return(
        <div id="countdown-box">
            {/* timeRemText: the time displayed on the screen, 
                timeRemSecs: the time remaining in seconds, for the progress bar.
            */}
            <TimeRemainingCircle 
                timeRemText={parentTimeInStr} 
                timeRemSecs={parentTimeInSecs} 
                className="countdown-box-child">
            </TimeRemainingCircle>    
            <StartTimeButton 
                className="countdown-box-child"
                countdownParentFunc={()=>{ 
                    if(isRunning==(false)){
                        updateIsRunning(true)
                    }else{
                        let startOver = confirm("Do you really want to start over?")
                        if (startOver==true){
                            updateIsRunning(false)
                            updateParentTimeInStr("25:00");
                            updateParentTimeInSecs(1500);
                        } 
                    }
                }               
            }></StartTimeButton>
        </div>
        
    )
}
export default Countdown