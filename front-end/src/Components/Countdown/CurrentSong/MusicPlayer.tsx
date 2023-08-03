import './MusicPlayer.css'
import { FaMusic } from 'react-icons/fa';
import {useState} from 'react'
import { FaFastForward } from 'react-icons/fa';
import { FaFastBackward } from 'react-icons/fa';
import {useEffect} from 'react'



export default function MusicPlayer(){
    // const[song,updateSong] = useState<any>()        
    const [nowPlaying,setNowPlaying] = useState('') 
    const [isPlaying,setIsPlaying] = useState(false)
    const [audioUrl,setAudioUrl] = useState<string>('')
    const player = new Audio()
     
    useEffect(()=>{                      
        console.log('i will now be played!')
        loadSong.then((song)=>playSong(song)) // "then" helps chain the loadSong Promise and the playSong Promise together.
        return(()=>{
            player.pause()
            URL.revokeObjectURL(audioUrl)
        })
    },[]) //The dependency list forces useEffect to run only once.      
    
    /*In this case, a Promise does the following:
    - Guarantees that the function right after it (playSong) will run.
    - Guarantees that the functions run SEQUENTIALLY.  */
    const loadSong  = new Promise(function (resolve,reject){
        let dbName = 'workpomodoro'
        let objStore = 'songs'                    
        var request = indexedDB.open(dbName)                    
        request.onsuccess = ()=>{
            let db = request.result            
            let transaction = db.transaction(objStore,'readonly')
            
                let store = transaction.objectStore(objStore)
                /*We can't force TS to get the search result immediately, by typing like this:
                    store.get('songId').result
                    Instead, we can get the result in the onsuccess method.
                */
                let songRequest = store.get('SON00000')
                songRequest.onsuccess = ()=>{                                             
                    //Resolve (Promise) returns a value if the Promise is handled successfully.
                    //In contrast, Reject returns a value if the Promise fails.
                    resolve(songRequest.result)
                    
                }
                
        }  
                      
    } )

    const playSong = (song:any) =>{    
        const base64Audio = song['audioBase64'] 
        setNowPlaying(song['title'])
        const decodedData = atob(base64Audio)
        const arrayBuffer = new Uint8Array(decodedData.length);

        for (let i = 0; i < decodedData.length; i++) {
            arrayBuffer[i] = decodedData.charCodeAt(i);
        }                                
        const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
        
        const url = URL.createObjectURL(blob); 
        //This url will be used to revoke the audio when user exits the component.
        setAudioUrl(url)                                 
        player.src = url;
        player.play();
    
                            
    }
    const playPauseSong = ()=>{
            // On video playing toggle values
        player.onplaying = function() {
            setIsPlaying(true)
        };

        // On video pause toggle values
        player.onpause = function() {
            setIsPlaying(true)
        };

     
        if (player.paused && !isPlaying) {
            return player.play();
        }

    
        if (!player.paused && isPlaying) {
            player.pause();
        }
        
    }
        
    
        
    
    return (
        <div id='current-song-border'>    
            <div id='fa-music' onClick={playPauseSong}><FaMusic size="30"/></div>
            <div id='current-song'>{nowPlaying}</div>
            <div id='prev-song'><FaFastBackward size='28'/></div>
            <div id='next-song'><FaFastForward size='28'/></div>
            
        </div>
    );
}