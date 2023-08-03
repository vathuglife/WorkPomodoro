import './MusicList.css'
import {useState} from 'react'
import { FaSearch } from 'react-icons/fa';
import axios, { AxiosError,AxiosResponse } from 'axios'
import {useEffect} from 'react'
export default function MusicList(){       
    
    const [musicList,updateMusicList] = useState([{id:0,name:"Nier Automata Playlist"},
                                                {id:1,name:"Somebody that I used to know..."}]);
    const [filterList,updateFilterList] = useState([{id:0,option:'All',mode:2},
                                                {id:1,option:'Pending',mode:0},{id:2,option:"Completed",mode:1}]); //allows the selection animation to work.
    const [activeOption, updateActiveOption] = useState({ id: 0, option: 'All', mode: 1 });
    const [taskInput,updateTaskInput] = useState("");
    const [viewMode,updateViewMode] = useState(1);
    let token = localStorage.getItem("user-token")
    
    let POST_CONFIG = {        
        headers:{           
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        
    }
    let BODY = {
        url:"https://www.youtube.com/watch?v=AFclnymNuEo"
    }
    // const apiUrl = "https://localhost:7263/workpomodoro/music"

    // const getSongsToPlay = () => {
    //     axios
    //         .post(apiUrl,BODY,POST_CONFIG)
    //         .then(
    //             (response:AxiosResponse)=>{
    //             console.log(response.data)
    //         })
        
        
    // }   
    useEffect(()=>{
        console.log('Current token: '+POST_CONFIG.headers.Authorization)
        // getSongsToPlay()
    },[])         
    return(
                     
         <div className="music-list-wrapper">             
            <div className="search-bar">  
                <div className='search-icon'>{<FaSearch size='25'/>}</div>
                <input className="" type="text"
                    value={taskInput}
                    placeholder="Type the song name here..." onChange={
                            (e)=>updateTaskInput(e.target.value)                            
                        }>
                            
                        </input>
                
            </div>
                        
            <ul className="music-box">
                {musicList.map((eachMusic) => {
                    return(<li key={eachMusic.id} className="musiclist-item">                                                                
                        {eachMusic.name}                                                    
                    </li>);
                })}
            </ul>            
        </div>             
    );

}