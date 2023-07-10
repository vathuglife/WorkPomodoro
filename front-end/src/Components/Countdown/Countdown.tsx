import './Countdown.css'
import {CountdownRefs} from './CountdownRefs'
import {useState,useEffect} from 'react'
import ProgressBar from './ProgressBar/ProgressBar'
import {forwardRef, useImperativeHandle,Ref} from 'react';




export const Countdown = forwardRef((props:{},ref:Ref<CountdownRefs>) => {    
    
    const [parentTimeInStr,updateParentTimeInStr] = useState("25:00");
    const [parentTimeInSecs,updateParentTimeInSecs] = useState(1500);    
    const [progressBar,updateProgressBar] = useState("100%");        
    const [isRunning,updateIsRunning] = useState(false);
  
    /*Needs to research more on React Refs (useImperativeHandle) */
    function resetTimer(){        
        updateParentTimeInSecs(1500);       
        console.log("Current secs remaining:"+parentTimeInSecs)
    }  
    function pauseTimer(){
        if(isRunning==true) updateIsRunning(false);
        
    }
    function resumeTimer(){
        
        let tempSecs = parentTimeInSecs;
        tempSecs -=1;
        console.log('Current tempSecs: ',tempSecs)        
        updateIsRunning(true)
        console.log('Current parentTimeInSecs: ',parentTimeInSecs)
    }
    useImperativeHandle(ref,()=>(
             {resetTimer,resumeTimer,pauseTimer}
    ));
    useEffect(() => { //runs when AT LEAST A STATE CHANGES 
                //(e.g. isRunning State, triggered by Start button).        
        if(parentTimeInSecs>0 && isRunning==true){
            console.log("im running!")            
            
            //Decreases the parentTimeInSecs by 1, every 1 second (1500,1499,1498...)
            const timer = setInterval(()=>
                updateParentTimeInSecs(parentTimeInSecs-1)
                ,1000
            )  
            console.log("Current timer is: "+timer)      ;

            //Updates the time on the screen (e.g 24:59, 24:58)
            let min = Math.floor(parentTimeInSecs/60);
            let secs = parentTimeInSecs%60;
            
            updateParentTimeInStr(min+":"+secs)
            let progressBarValue = (parentTimeInSecs/1500*100).toString()+"%";
            console.log(progressBarValue);
            updateProgressBar(progressBarValue);
            return () => clearInterval(timer);        
            
        }
    },[isRunning,parentTimeInSecs])//Listens to the changes of isRunning props, passed from CountdownPage.    
    
    return(
        <div id="countdown-box">
            {/* timeRemText: the time displayed on the screen, 
                timeRemSecs: the time remaining in seconds, for the progress bar.
            */}
            {/* <TimeRemainingCircle 
                timeRemText={parentTimeInStr} 
                timeRemSecs={parentTimeInSecs} 
                className="countdown-box-child">
            </TimeRemainingCircle>     */}
            
            <div id="progress-bar"><ProgressBar 
                                timeRemainingText={parentTimeInStr}
                                progressBarValue={progressBar}/>
            </div>
          
        </div>
        
    )
})
