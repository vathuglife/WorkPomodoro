
import './StopTimeButton.css'
import { FaStop } from 'react-icons/fa';
import {useState} from 'react'


export interface StopTimeButtonProps{
    resetTimer:Function;
}
const StopTimeButton = (props:StopTimeButtonProps) => {    
    const [isLabelShown,updateIsLabelShown] = useState("hidden");   
    const labelStyle: { [key: string]: React.CSSProperties } = {
        container: {
            display:isLabelShown
        },
      }
    return (
        <div id='stopbtn-div' onClick={()=>props.resetTimer()}>
            <FaStop id='fa-stop-btn' size="50"/>                        
            <div id='hidden-text' 
            style={labelStyle.container}
            >Stahp</div>
        </div>

    );
}
export default StopTimeButton;
