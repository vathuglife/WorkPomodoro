import {useState} from 'react'
import { FaPlay } from 'react-icons/fa';
import './ConfirmStartBtn.css'
export interface ConfirmStartBtnProps{
    startPlayback:()=>void;
}
export default function ConfirmStartBtn({startPlayback}:ConfirmStartBtnProps){       
    
    return (
        <div id='grey-background'>
            <div id='confirm-start-border' onClick={startPlayback}>    
                <div id='fa-play'><FaPlay size="30"/></div>     
                <div id='fa-play-txt'>I'm ready, let's go! </div>       
            </div>
        </div>
    );
}