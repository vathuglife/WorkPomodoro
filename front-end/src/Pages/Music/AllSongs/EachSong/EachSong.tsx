import {DbSong } from "../../Interfaces/Interfaces"
import {useState} from 'react'
import DropdownMenu from '../../DropdownMenu/DropdownMenu';
import { MenuItem } from "../../Interfaces/Interfaces";
import { IDBPCursorWithValue } from 'idb';
import {FaEllipsisV} from 'react-icons/fa';
import {faPlus,faTrash} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './EachSong.css'

interface EachSongProps{    
    dbSong:DbSong;
    index:number;
}
export default function EachSong ({dbSong,index}:EachSongProps){
    const [isDropdownActive,updateIsDropdownActive] = useState<Boolean>(false)    
    const song = dbSong.value
    const plusIcon:IconDefinition = faPlus as IconDefinition    
    const trashIcon:IconDefinition = faTrash as IconDefinition

    const handleEllipsisClick = () => {
        console.log('Currently selected key: '+dbSong.key)
        if(isDropdownActive)
            updateIsDropdownActive(false)
        else{
            updateIsDropdownActive(true)
        }
    }
    const updateSongId = (oldSongId:IDBValidKey):IDBValidKey=>{
        
        let regex = '\\d+'
        let temp = oldSongId.toString();
        let newDigit = parseInt(temp.match(regex)![0])
        newDigit++;
        let result = ''
        let prefix = "SON"
        if(newDigit<10) result = prefix+"0000"+newDigit
        else if(newDigit<100) result = prefix+"000"+newDigit
        else if(newDigit<1000) result = prefix+"00"+newDigit
        else if(newDigit<10000) result = prefix+"0"+newDigit                                
        
        return result;
    }
    const addToPlaylist = () => {        
        let dbName = 'workpomodoro'
        let objStore = 'playlist'                    
        var request = indexedDB.open(dbName)    
        
        
        //Runs when a database has already existed.
        request.onsuccess = ()=>{
            let db = request.result;
            //Creates a group of commands (transaction) that stops automatically when any of 
            //the command fails.                         
            const transaction = db.transaction('playlist','readwrite')            
            const store = transaction.objectStore(objStore)
            //Finds all items in the object store, in reverse.
            let latestItem = store.openCursor(null,'prev')            
            latestItem.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBPCursorWithValue>).result;
                if(cursor){
                    const key = cursor.key;      
                    let newKey = updateSongId(key)              
                    console.log(`Latest key generated: ${newKey}`)
                    store.put(dbSong.value,newKey)                    
                }else{
                    store.put(dbSong.value,"SON00000") //in case no song is available.                    
                }
                alert('Added to Playlist.')
            }                         
        }
    }
    
     
    const removeFromDb = ()=>{
        console.log('delete button is clicked!')
        let remove = confirm('Do you really want to delete this song?')
        if(remove){
            let dbName = 'workpomodoro'
            let songsObjStore = 'songs'                    
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
                
                const songsTransaction = db.transaction(songsObjStore,'readwrite')
                const songDeleteRequest = songsTransaction.objectStore(songsObjStore).delete(dbSong.key)            
                songDeleteRequest.onsuccess = () => {
                    alert('Successfully removed song with name: '+dbSong.value.title)
                }                         
                songDeleteRequest.onerror = ()=>{
                    console.log(' The song might not be existent in the Songs List. '+dbSong.value.title)
                }
            }
        }
    }  
  
    const menuList:MenuItem[] = [
        {icon:plusIcon,label:'Add to Playlist',color:'#000034',function:addToPlaylist},
        {icon:trashIcon,label:'Delete',color:'red',function:removeFromDb}
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
