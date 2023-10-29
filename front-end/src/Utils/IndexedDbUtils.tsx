
import { DbSong, Song } from '../Pages/Music/Interfaces/Interfaces'
export const GetAllItemsFromObjStore = (dbName:string,objStoreName:string)=>{    
    return new Promise((resolve,_reject)=>{
        var request = indexedDB.open(dbName)           
        request.onsuccess = ()=>{
            let db = request.result;
            const store = db.transaction(objStoreName,'readonly').objectStore(objStoreName)                                    
            var allRecords = store.getAll()
            allRecords.onsuccess = ()=>{                 
                resolve(allRecords.result)
            }
        }       
            
    })
}
export const saveToClientDb = async(songData:Song)=>{                  
    let dbName = 'workpomodoro'    
    let playlistObjStore = 'playlist'  
    var request = indexedDB.open(dbName)
    
    
    request.onsuccess = ()=>{
        let db = request.result;
        //Creates a group of commands (transaction) that stops automatically when any of 
        //the command fails.
        const transaction = db.transaction(playlistObjStore,'readwrite')            
        const store = transaction.objectStore(playlistObjStore)
        //Finds all items in the object store, in reverse.                
      
                // const key = cursor.key;
                // let newKey = updateSongId(key);
                //console.log(`Latest key generated: ${newKey}`)
        store.put(songData,songData.id)
            
    }                         
}
    

export const checkSongIsDownloaded = ()=>{
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
            }                                                                  
            
        }
    }       
}
export const createDbObjStoreIfNotExist = (dbName:string,version:number,objStore:string)=>{    
    var request = indexedDB.open(dbName,version)    

    request.onsuccess = ()=>{        
    }
    request.onupgradeneeded = ()=>{        
        var db:IDBDatabase = request.result
        if (!db.objectStoreNames.contains(objStore)) {
            db.createObjectStore(objStore);            
        }
    }
}

export const removeFromObjStore = (dbName:string,objStoreName:string,id:number)=>{
                
    var request = indexedDB.open(dbName)                
    
    //Runs when a database has already existed.
    request.onsuccess = ()=>{
        let db = request.result;
        //Creates a group of commands (transaction) that stops automatically when any of 
        //the command fails.
        const objStore = db.transaction(objStoreName,'readwrite').objectStore(objStoreName)            
        const deleteRequest = objStore.delete(id)            
        deleteRequest.onsuccess = ()=>{
            console.log('Successfully removed song from Playlist.')
        }
        deleteRequest.onerror = ()=>{
            console.log('The song might not be existent in the Playlist.')
        }                                                      
    }
}

