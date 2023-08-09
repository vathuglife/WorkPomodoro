import './MusicPlayer.css'
import { FaMusic } from 'react-icons/fa';
import {useState} from 'react'
import { FaFastForward } from 'react-icons/fa';
import { FaFastBackward } from 'react-icons/fa';
import {useEffect} from 'react'
import { Song } from '../../../Pages/Music/AllSongs/AllSongs';




export default function MusicPlayer(){
    // const[song,updateSong] = useState<any>()        
    const [nowPlaying,setNowPlaying] = useState('') 
    const [isPlaying,setIsPlaying] = useState(false)    
    //const [playlist,updatePlaylist] = useState<Song[]>([])
    const [audioUrl,updateAudioUrl] = useState<string>('')
    const [currentSong,updateCurrentSong] = useState<number>(0)
    const [isLoaded,updateIsLoaded ] = useState<boolean>(false)
    const player = new Audio()
     
    useEffect(()=>{                      
        console.log('i will now be played!')        
        loadSong
            .then((tempList)=>{                             
                //updateIsLoaded(true)                
                                                    
                playSong(tempList as Song[])   
            }) // "then" helps chain the loadSong Promise and the playSong Promise together.
        return(()=>{
            player.pause()
            URL.revokeObjectURL(audioUrl)
        })
    },[]) //The dependency list forces useEffect to run only once.      
    
    /*In this case, a Promise does the following:
    - Guarantees that the function right after it (playSong) will run.
    - Guarantees that the functions run SEQUENTIALLY.  */
    const loadSong  = new Promise ((resolve,reject) => {
        let dbName = 'workpomodoro'
        let songsObjStore = 'songs'       
        let playlistObjStore = 'playlist'               
        var request = indexedDB.open(dbName)      
        let tempList = [] as Song[]
        
        //Runs when the database is not created/needs to be updated to newer version.
        request.onupgradeneeded = () => {           
            let db = request.result;
            db.createObjectStore(songsObjStore)
            db.createObjectStore(playlistObjStore)
                                            
        }
        request.onsuccess = ()=>{
            let db = request.result            
            let transaction = db.transaction(playlistObjStore,'readonly')
            
            let store = transaction.objectStore(playlistObjStore)
            /*We can't force TS to get the search result immediately, by typing like this:
                store.get('songId').result
                Instead, we can get the result in the onsuccess method.
            */
            let songRequest = store.getAll()
            songRequest.onsuccess = ()=>{                                             
                //Resolve (Promise) returns a value if the Promise is handled successfully.
                //In contrast, Reject returns a value if the Promise fails.
                let result = songRequest.result
                result.forEach((song)=>{
                    tempList.push(song)
                })
                resolve(tempList)
            }          
            // transaction.oncomplete = ()=>{                
            //     console.log('CURRENT TEMPLIST:' +tempList)     
                
            // }
        }  
                              
    } 
    )  
    // const updateSongsListPromise = (tempList:Song[])=>{
    //     return new Promise((resolve,reject)=>{
    //         updatePlaylist(tempList)
    //         resolve(true)
    //     })
    // }
    

    const playSong = (playlist:Song[]) =>{            
        const song = playlist[currentSong]
        
        const base64Audio = song['audioBase64'] 
        console.log('base64: '+base64Audio)
        setNowPlaying(song['title'])
        const decodedData = atob(base64Audio)
        const arrayBuffer = new Uint8Array(decodedData.length);

        for (let i = 0; i < decodedData.length; i++) {
            arrayBuffer[i] = decodedData.charCodeAt(i);
        }                                
        const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
        
        const url = URL.createObjectURL(blob); 
        //This url will be used to revoke the audio when user exits the component.
        updateAudioUrl(url)                                         
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