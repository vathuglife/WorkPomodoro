import './Playlist.css'
import {useEffect,useState} from 'react'
import { DbSong } from '../Interfaces/Interfaces';
import { Song } from '../Interfaces/Interfaces';
import EachSongInPlaylist from './EachSongInPlaylist/EachSongInPlaylist';
export interface EachSong{
    dbSong:DbSong;
    index:number;
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
                <EachSongInPlaylist dbSong={dbSong} index={index}/>
            )
        }
        </ol>                   
    )
}