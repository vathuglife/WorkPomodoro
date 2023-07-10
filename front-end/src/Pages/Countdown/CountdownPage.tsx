import {Countdown} from "../../Components/Countdown/Countdown"
import {CountdownRefs} from '../../Components/Countdown/CountdownRefs'
import ToDoList from "../../Components/ToDoList/ToDoList"
import './CountdownPage.css'
import {useSpring,animated} from 'react-spring'
import MusicList from "../../Components/MusicList/MusicList"
import {useEffect, useState} from 'react'
import StopTimeButton from "../../Components/Countdown/StopTimeButton/StopTimeButton" 
import {useRef} from 'react';
export default function CountdownPage(){               
    
    const titleList = ["Step 1: Customize your To Do List",
                    "Step 2: Pick your favorite songs"];
                    /*0 = ToDoList, 1: Music List, 2: Countdown */
    const [currentComponent,updateCurrentComponent] = useState(2);      
                
    const cdRef = useRef<CountdownRefs>(new class implements CountdownRefs {
        resumeTimer(): void {}
        resetTimer(): void {}
        pauseTimer(): void {}
      })
    
    useEffect(()=>{                
        cdRef.current.resetTimer()
        cdRef.current.resumeTimer()        
    },[]);

    const reset = ()=>{                
        cdRef.current.pauseTimer();//First click pauses the timer.
        let startOver = confirm("Do you really want to start over?");
        if(startOver==true) {            
            console.log("timer will be reset!")                
            cdRef.current.resetTimer()   
            cdRef.current.resumeTimer()                     
        }else {            
            cdRef.current.resumeTimer()
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
        duration:100          
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
                                onClick={prevComponent}>Previous</div>
                            <div className='changeComponentBtn' id='nextBtn'
                                onClick={nextComponent}>Next</div>
                        </div>);
                    }
                })()}
                
                
            </div>            
            
            
            
            <animated.div style={appearProps}> {/* handles the fade-in/out effect */}
            {/*This is what we call the anonymous function within the render function.
            If I have some time left, I might Google what this thing actually is.*/}
                {(() => {                                
                    if(currentComponent===0) return (
                        <div>
                            
                            <div className='main-container-item td-list'><ToDoList/></div> 
                        </div>
                    )
                    else if(currentComponent===1) return(                                                   
                        <div className='main-container-item td-list'><MusicList/></div>                         
                    )
                    else return(
                        <div className='countdown-div'>
                            <Countdown ref={cdRef}/>
                            <div className='stopbtn-pos-div'>
                                <StopTimeButton resetTimer={reset}/>      
                            </div>
                        </div> 
                    )
                })()}
            </animated.div>
                        

        </div>         
        
        
    )

   
}