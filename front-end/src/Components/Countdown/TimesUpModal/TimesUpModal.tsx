import './TimesUpModal.css'
import { FaClock,FaArrowDown,FaPlay} from 'react-icons/fa'
import {useState} from 'react'

interface TimesUpModalProps{
    handleBreakSession:(duration:number)=>void;
}
export default function TimesUpModal({handleBreakSession}:TimesUpModalProps){
    const [selectedDuration,updateSelectedDuration] = useState('Choose a duration') 
    const durationList = ['5 minutes','10 minutes']
    const [isDropdownShown,updateIsDropdownShown] = useState('none')
    const cssStyle:{[key:string]:React.CSSProperties} = {
        container: {
            display:isDropdownShown,                       
        }
    }    
    const handleShowDropdown = ()=>{
        if(isDropdownShown==='none') updateIsDropdownShown('block')
        else updateIsDropdownShown('none')
    }
    const handleSelectDuration = (duration:string)=>{
        updateSelectedDuration(duration)
        updateIsDropdownShown('none')
    }
    const handleTimeSelection = ()=>{
        if(selectedDuration==='5 minutes'){
            handleBreakSession(300)
        }else{
            handleBreakSession(600)
        }
    }
    return(
        <span className='times-up-overlay'>
            <div className='modal-box'>                                   
                <div className='clock-icon'><FaClock size='68'/></div>                
                <div className='information'>
                    <div className='title'>Time's up!</div>
                    <div className='details'> 
                        How long would you like to take a break?
                    </div>
                    
                    <div className='select-menu'>
                        <div className='select-btn' onClick={handleShowDropdown}>
                            <span id='select-btn-label'>{selectedDuration}</span>
                            <i id='arrow-down'><FaArrowDown size='20'/></i>
                        </div>
                        <ul className='timer-options' style={cssStyle.container}>
                            {durationList.map((duration)=>{
                                return(
                                    <li className='timer-option'
                                        onClick={()=>handleSelectDuration(duration)}>
                                        {duration}
                                    </li>
                                )
                            })}                                                        
                        </ul>
                    </div>
                    <div id='next-arrow' 
                        onClick={handleTimeSelection}>
                        <FaPlay size='28'/>
                    </div>
                    
                </div>
            </div>
        </span>
    )
}