
import './StopTimeButton.css'
import { FaStop } from 'react-icons/fa';

import {useState} from 'react'


export interface StopTimeButtonProps{
    resetTimer:Function;
}
const StopTimeButton = (props:StopTimeButtonProps) => {    
    const [isLabelShown,updateIsLabelShown] = useState("none");   
    const labelStyle: { [key: string]: React.CSSProperties } = {
        container: {
            display:isLabelShown,
            color:'white',
            fontWeight:'bold',
            fontSize:'22px',
            position:'relative',
            top:'14px',
            left:'55px'            
        },
      }
    return (
        <div id='stopbtn-div' onClick={()=>props.resetTimer()}
            onMouseEnter={()=>updateIsLabelShown("inline")}
            onMouseLeave={()=>updateIsLabelShown("none")}>
            <FaStop id='fa-stop-btn' size="40"/>                                    
            <div id='hidden-text' 
                style={labelStyle.container}
               
            >Stahp!!</div>
        </div>

    );
}
export default StopTimeButton;
