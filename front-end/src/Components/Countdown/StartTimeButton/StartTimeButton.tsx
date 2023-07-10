import './StartTimeButton.css'
import {useState} from 'react'
//Use the props any to help the child widget (StartTimeButton)
//call the parent function in Countdown.tsx (StartStopTimer)
//

export interface StartTimeBtnProps{
    stopTimerPare:Boolean;
}
export default function StartTimeButton({stopTimer}:StartTimeBtnProps){
    /*
        useState is a React function that contains/updates the data of a component 
        (e.g. input field, label button...)    
    */
   
    const [label,updateLabel] = useState("Start");        
    //async await is to force the setState functions (updateLabel) runs immediately. 
    //This is due to their asynchronosu nature (not running immediately)
    async function handleClick ()  {                            
        console.log(label);        
        if (label === "Start"){                        
            await updateLabel("Stop");
        }else{                              
            await updateLabel("Start");     
        }                    
        props.countdownParentFunc();
    }
    return(
        <div id="wrapper">
            <div className="button-container">
                <a href="#" className="button button--piyo">
                    <div className="button__wrapper" onClick={handleClick}>
                        <span className="button__text">Wanna stop?</span>
                    </div>
                    <div className="characterBox">
                        <div className="character wakeup">
                            <div className="character__face"></div>
                        </div>
                        <div className="character wakeup">
                            <div className="character__face"></div>
                        </div>
                        <div className="character">
                            <div className="character__face"></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}
