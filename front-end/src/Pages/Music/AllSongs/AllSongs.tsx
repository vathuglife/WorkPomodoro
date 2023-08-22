import './AllSongs.css'
import {useEffect,useState} from 'react'
import { DbSong,Song} from '../Interfaces/Interfaces';
import EachSong  from './EachSong/EachSong';




export default function AllSongs(){    
    
    const [songsList,updateSongsList] = useState<DbSong[]>([])        
    
   
    useEffect(()=>{
        getAllSongs()
    },[])

    const getAllSongs = () => {
        let dbName = 'workpomodoro'
        let objStore = 'songs'                
        var request = indexedDB.open(dbName)        
        request.onsuccess = ()=>{
            let db = request.result;
            const keysTransaction = db.transaction('songs','readonly')            
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