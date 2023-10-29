import {useSpring,animated} from 'react-spring'
import { Countdown } from '../../Components/Countdown/Countdown'
import {useRef,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { CountdownRefs } from '../../Components/Countdown/CountdownPageRefs'
import TimesUpModal from '../../Components/Countdown/TimesUpModal/TimesUpModal'
import TimesUpChime from '../../../resources/audio/timesUp.mp3'

export default function BreaktimePage(){
    const [isBreakTimeSelected,updateIsBreakTimeSelected] = useState<boolean>(false)    
    const [duration,updateDuration] = useState<number>(0);
    const cdRef = useRef<CountdownRefs>(null)
    const audioPlayer = new Audio(TimesUpChime)
    const navigator = useNavigate()
    const springProps = useSpring({
        from:{opacity:0},
        to:{opacity:1},           
        reset:true,
        duration:20          
    })    
    
    useEffect(()=>{
        
        if(isBreakTimeSelected) {
            cdRef.current?.resetTimer(duration)    
            cdRef.current?.resumeTimer()
        }else{
            audioPlayer.play()
        }
        return(()=>{audioPlayer.pause()})
    },[isBreakTimeSelected])
    
    const handleBreakSession = (duration:number)=>{        
        updateIsBreakTimeSelected(true);
        updateDuration(duration);
        
    }

    const handleTimesUp = ()=>{ //navigates back to the countdown page after the break time ends.
        audioPlayer.play(); 
        let isAccepted = confirm("Time's up! It's time to get back to work!")       
        if(isAccepted){
            navigator('/tasks')
        }
            
    }


    return(                    
        <div id='main-container'>        
            {(()=>{
                if(!isBreakTimeSelected) return(
                    <TimesUpModal handleBreakSession={handleBreakSession}/>
                )
                else return(
                    <animated.div style={springProps}> {/* handles the fade-in/out effect */}                                
                        <div id='page-title'>Breaktime</div>     
                        <div className='countdown-div'>
                            <Countdown handleTimesUp={handleTimesUp} ref={cdRef}/>               
                        </div>                             
                    </animated.div>        
                )
                
                
            })()} 
        
        </div>
    ) 
    
}