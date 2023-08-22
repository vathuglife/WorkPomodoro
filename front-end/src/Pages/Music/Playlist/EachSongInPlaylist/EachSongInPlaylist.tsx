import {DbSong } from "../../Interfaces/Interfaces"
import {useState} from 'react'
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import { MenuItem } from "../../Interfaces/Interfaces";
import {FaEllipsisV} from 'react-icons/fa';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';


interface EachSongProps{    
    dbSong:DbSong;
    index:number;
}
export default function EachSongInPlaylist ({dbSong,index}:EachSongProps){
    const [isDropdownActive,updateIsDropdownActive] = useState<Boolean>(false)    
    const song = dbSong.value       
    const trashIcon:IconDefinition = faTrash as IconDefinition

    const handleEllipsisClick = () => {
        console.log('Currently selected key: '+dbSong.key)
        if(isDropdownActive)
            updateIsDropdownActive(false)
        else{
            updateIsDropdownActive(true)
        }
    }
           
    const removeFromPlaylist = ()=>{
        console.log('delete button is clicked!')
        let remove = confirm('Do you really want to remove this song from the playlist?')
        if(remove){
            let dbName = 'workpomodoro'                              
            let playlistObjStore = 'playlist'
            var request = indexedDB.open(dbName)                
            
            //Runs when a database has already existed.
            request.onsuccess = ()=>{
                let db = request.result;
                //Creates a group of commands (transaction) that stops automatically when any of 
                //the command fails.
                const transaction = db.transaction(playlistObjStore,'readwrite')            
                const playlistDeleteRequest = transaction.objectStore(playlistObjStore).delete(dbSong.key)            
                playlistDeleteRequest.onsuccess = ()=>{
                    console.log('Successfully removed song from Playlist.')
                }
                playlistDeleteRequest.onerror = ()=>{
                    console.log('The song might not be existent in the Playlist.')
                }                                                      
            }
        }
    }  
  
    const menuList:MenuItem[] = [        
        {icon:trashIcon,label:'Remove from playlist',color:'red',function:removeFromPlaylist}
    ]
    return(
        <li className='list-item'>
            <div className='index'>{index+1}</div>
            <img className='thumbnail' src={dbSong.value.thumbnail}></img>
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
