import { IDBPCursorWithValue } from 'idb'
import {FaPlus, FaTrash } from 'react-icons/fa';

import { DbSong } from '../AllSongs/AllSongs';

export interface DropdownMenuProps{
    dbSong:DbSong
}
export default function DropdownMenu ({dbSong}:DropdownMenuProps){
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
                    alert('Added to Playlist.')
                }else{
                    store.put(dbSong.value,"SON00000") //in case no song is available.
                }
            }                         
        }
    }
    const removeFromDb = ()=>{
        let remove = confirm('Do you really want to delete this song?')
        if(remove){
            let dbName = 'workpomodoro'
            let objStore = 'songs'                    
            var request = indexedDB.open(dbName)    
            request.onupgradeneeded = () => {           
                let db = request.result;
                db.createObjectStore(objStore)                
            }
            
            //Runs when a database has already existed.
            request.onsuccess = ()=>{
                let db = request.result;
                //Creates a group of commands (transaction) that stops automatically when any of 
                //the command fails.
                const transaction = db.transaction('songs','readwrite')            
                const deleteRequest = transaction.objectStore(objStore).delete(dbSong.key)            
                deleteRequest.onsuccess = () => {
                    alert('Successfully removed song with name: '+dbSong.value.title)
                }
                                         
            }
        }
    }
    return(
        <div className='dropdown-container'>                        
            <div className='option-container' onClick={addToPlaylist}>
                <div className='option-icon'><FaPlus size='23'/></div>
                <div className='option-txt'>Add to Playlist</div>
            </div>
            <div className='option-container' onClick={removeFromDb}>
                <div className='option-icon delete'><FaTrash size='23'/></div>
                <div className='option-txt delete'>Delete</div>            
            </div>            
        </div>
    )
}