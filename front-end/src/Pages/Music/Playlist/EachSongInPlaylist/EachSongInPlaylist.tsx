import {Song } from "../../Interfaces/Interfaces"
import {useState} from 'react'
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import { MenuItem } from "../../Interfaces/Interfaces";
import {FaEllipsisV} from 'react-icons/fa';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { removeFromObjStore } from "../../../../Utils/IndexedDbUtils";
import axios,{AxiosResponse} from "axios";

interface EachSongProps{    
    song:Song;
    index:number;
}
export default function EachSongInPlaylist ({song,index}:EachSongProps){
    const [isDropdownActive,updateIsDropdownActive] = useState<Boolean>(false)        
    const trashIcon:IconDefinition = faTrash as IconDefinition
    const dbName = 'workpomodoro'
    const objStoreName = 'playlist'
    const TOKEN = localStorage.getItem('user-token');
    const deleteSongUrl = 'https://localhost:7263/workpomodoro/music/playlist/remove'
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization:'Bearer ' + TOKEN
        }        

    }
    const handleEllipsisClick = () => {
        console.log('Currently selected key: '+song.id)
        if(isDropdownActive)
            updateIsDropdownActive(false)
        else{
            updateIsDropdownActive(true)
        }
    }
           
    
  
    const removeFromPlaylist = ()=>{
        let isDelete = confirm('Do you want to remove this song from the playlist?')
        if(isDelete){
            const data = {id:song.id}
            removeFromObjStore(dbName,objStoreName,song.id)
            axios.post(deleteSongUrl,data,config)
                .then(
                    (response:AxiosResponse)=>{
                        console.log(response.data)
                    }
                )
        }
            
    }
    const menuList:MenuItem[] = [        
        {icon:trashIcon,label:'Remove from playlist',color:'red',function:removeFromPlaylist}
    ]
    return(
        <li className='list-item'>
            <div className='index'>{index+1}</div>
            <img className='thumbnail' src={song.thumbnail}></img>
            <div className='song-info'>
                <div className='song-title'>{song.title}</div>
                <div className='song-duration'>{song.duration}</div>
            </div>     
            <div className='three-dot-menu'
                onClick={handleEllipsisClick}
                >                
                <FaEllipsisV size='28'/>
                {(()=>{
                    if(isDropdownActive) return(<DropdownMenu menuList={menuList}/>)
                })()}
                
            </div>                                                   
        </li>
    )
}
