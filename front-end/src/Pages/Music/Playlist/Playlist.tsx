import {FaEllipsisV} from 'react-icons/fa';
import './Playlist.css'
import {useEffect,useState} from 'react'
import DropdownMenu from '../DropdownMenu/DropdownMenu';

export interface EachSong{
    dbSong:DbSong;
    index:number;
}

function EachSong ({dbSong,index}:EachSong){
    const [isDropdownActive,updateIsDropdownActive] = useState<Boolean>(false)    
    const song = dbSong.value
    const handleEllipsisClick = () => {
        console.log('Currently selected key: '+dbSong.key)
        if(isDropdownActive)
            updateIsDropdownActive(false)
        else{
            updateIsDropdownActive(true)
        }
    }
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
                    if(isDropdownActive) return(<DropdownMenu dbSong={dbSong}/>)
                })()}
                
            </div>                                                   
        </li>
    )
}

export interface Song{    
    title:string;
    thumbnail:string;
    duration:string;
    audioBase64:string;
}


export interface DbSong{
    key:string;
    value:Song;
}
export default function Playlist(){    
    const [songsList,updateSongsList] = useState<DbSong[]>([])        
    useEffect(()=>{
        getAllSongs()
    },[])
    const getAllSongs = () => {
        let dbName = 'workpomodoro'
        let objStore = 'playlist'                
        var request = indexedDB.open(dbName)        
        request.onsuccess = ()=>{
            let db = request.result;
            const keysTransaction = db.transaction('playlist','readonly')            
            const keyStore = keysTransaction.objectStore(objStore)
            const keysRequest = keyStore.getAllKeys()
            keysRequest.onsuccess = ()=>{
                const keys = keysRequest.result as string[]     
                const valuesTransaction = db.transaction(objStore)
                const store = valuesTransaction.objectStore(objStore)
                const result = [] as DbSong[]
                keys.forEach(key=>{
                    const valueTr = store.get(key)
                    valueTr.onsuccess = ()=>{
                        const eachDbSong = {key:key as string,value:valueTr.result as Song}
                        result.push(eachDbSong)
                    }                    
                })   
                valuesTransaction.oncomplete = ()=>{
                    //Only returns the result of the Promise function, 
                    //after the IndexedDb has already gathered all songs in IndexedDb.
                    //This is IMPORTANT, as without it, the valueTr.onsuccess function will be skipped.
                    updateSongsList(result);
                }                                                                  
                
            }
        }       
        
    }

       
    return(
        
           <ol className='all-songs-list'>                           
            {
                songsList.map((dbSong,index)=>
                    <EachSong dbSong={dbSong} index={index}/>
                )
           }
           </ol>
           
        
    )
}