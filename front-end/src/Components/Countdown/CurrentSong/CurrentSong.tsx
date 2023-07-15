import './CurrentSong.css'
import { FaMusic } from 'react-icons/fa';
import {useState} from 'react'
export default function CurrentTask(){
    const[song,updateSong] = useState("アイドルーYOASOBI")
    return (
        <div id='current-song-border'>    
            <div id='fa-music'><FaMusic size="30"/></div>
            <div id='current-song'>{song}</div>
        </div>
    );
}