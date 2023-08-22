import './Countdown.css'
import {CountdownRefs} from './CountdownPageRefs'
import {useState,useEffect} from 'react'
import ProgressBar from './ProgressBar/ProgressBar'
import {forwardRef, useImperativeHandle,Ref} from 'react';



export interface CountdownProps{
    handleTimesUp:()=>void
}

export const Countdown = forwardRef(({handleTimesUp}:CountdownProps,ref:Ref<CountdownRefs>) => {    
    
    const [parentTimeInStr,updateParentTimeInStr] = useState("25:00");
    const [parentTimeInSecs,updateParentTimeInSecs] = useState(1500);    
    const [progressBar,updateProgressBar] = useState("100%");        
    const [isRunning,updateIsRunning] = useState(false);       
    /*Needs to research more on React Refs (useImperativeHandle) */
    useImperativeHandle(ref,()=>(
        {resetTimer,resumeTimer,pauseTimer}
    ));
    function resetTimer(duration:number){        
        updateParentTimeInSecs(duration);       
        console.log("Current secs remaining:"+parentTimeInSecs)
    }  
    function pauseTimer(){
        if(isRunning==true) updateIsRunning(false);
        
    }
    function resumeTimer(){        
        let tempSecs = parentTimeInSecs;
        tempSecs -=1;                
        updateIsRunning(true)
        console.log('Current parentTimeInSecs: ',parentTimeInSecs)
    }       
    function recalculateTime(){
        let min = Math.floor(parentTimeInSecs/60);
        let secs = parentTimeInSecs%60                        
        let minTxt = min.toString()
        let secsTxt = secs.toString()            
        if(min<10) {minTxt = '0'+min};
        if(secs<10) {secsTxt = '0'+secs};
        
        updateParentTimeInStr(minTxt+":"+secsTxt)
        let progressBarValue = (parentTimeInSecs/1500*100).toString()+"%";            
        updateProgressBar(progressBarValue);
    }    

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
            recalculateTime()
            return () => clearInterval(timer);            
            
        }else if(parentTimeInSecs===0 && isRunning===true){
            updateParentTimeInStr("00:00")            
            handleTimesUp()            
        }

        
    },[isRunning,parentTimeInSecs])//Listens to the changes of isRunning props, passed from CountdownPage.    
    
    return(
        <div id="countdown-box">                      
            <div id="progress-bar"><ProgressBar 
                                timeRemainingText={parentTimeInStr}
                                progressBarValue={progressBar}/>            
                  
            </div>
        </div>
    )
})
