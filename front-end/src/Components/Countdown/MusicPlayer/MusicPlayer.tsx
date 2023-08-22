import './MusicPlayer.css'
import { FaMusic } from 'react-icons/fa';
import {useState} from 'react'
import { FaFastForward } from 'react-icons/fa';
import { FaFastBackward } from 'react-icons/fa';
import {useEffect,useRef,forwardRef,useImperativeHandle,Ref} from 'react'
import { Song } from '../../../Pages/Music/Interfaces/Interfaces';

export interface MusicPlayerRefs{
    play:()=>void
    pause:()=>void
}

export const MusicPlayer = forwardRef((_props,ref:Ref<MusicPlayerRefs>)=>{
    // const[song,updateSong] = useState<any>()        
    const [nowPlaying,updateNowPlaying] = useState('')          
    const [audioUrl,updateAudioUrl] = useState<string>('')
    const [currentSong,updateCurrentSong] = useState<number>(0)
    const [isLoaded,updateIsLoaded ] = useState<boolean>(false)
    const [playlist,updatePlaylist] = useState<Song[]>([])
    
    /*
        Creates a new instance of HtmlAudioElement, and 
        PERSIST IT (prevent it from changing) on every re-render. 
    */
    const playerRef = useRef<HTMLAudioElement|null>(null)
     
    /*Workflow:
        1. 1st useEffect RUNS ONLY ONCE, in order to update "playlist" 
           with data from IndexedDb)         
        2. "playlist" is updated + isLoaded is updated -> MusicPlayer is refreshed.
        3. 2nd useEffect runs -> checks condition of isLoaded
        4. isLoaded equals to true -> plays song from "playlist"
    */    
    useEffect(()=>{                                      
        loadSongFromDb()                  
        return(()=>{
            playerRef.current?.pause()
            URL.revokeObjectURL(audioUrl)
        })
    },[]) //The dependency list forces useEffect to run only once.      

    
    useEffect(()=>{
        if(isLoaded) initSong()
    },[isLoaded,currentSong])
/*Dependency list explained:
- isLoaded: for first time load (After the first useEffect runs)
- currentSong: when the audio player changes to the next song, currentSong is changed, 
triggering the initSong() function to run once again.*/
    
    
    useImperativeHandle(ref,()=>({
        play,pause
    }))
    
    
    /*In this case, a Promise does the following:
    - Guarantees that the function right after it (playSong) will run.
    - Guarantees that the functions run SEQUENTIALLY.  */
    const loadSongFromDb = () => {
        let dbName = 'workpomodoro'
        let songsObjStore = 'songs'       
        let playlistObjStore = 'playlist'               
        var request = indexedDB.open(dbName)            
        
        //Runs when the database is not created/needs to be updated to newer version.
        request.onupgradeneeded = () => {           
            let db = request.result;
            db.createObjectStore(songsObjStore)
            db.createObjectStore(playlistObjStore)
                                            
        }
        request.onsuccess = ()=>{
            let db = request.result            
            let transaction = db.transaction(playlistObjStore,'readonly')
                  
            console.log('playlist is loaded')     
            let store = transaction.objectStore(playlistObjStore)
            /*We can't force TS to get the search result immediately, by typing like this:
                store.get('songId').result
                Instead, we can get the result in the onsuccess method.
            */
            let songRequest = store.getAll()
            songRequest.onsuccess = ()=>{                                                            
                let result = songRequest.result      
                updatePlaylist(prevArray=>{
                    const newArray = [...prevArray]
                    result.forEach((song)=>{
                        newArray.push(song)
                    })
                    return newArray
                });      
                updateIsLoaded(true)
                console.log('Current playlist: '+playlist)                               
                                
            }  
                      
                                
        }     
    }
    
    const initSong = () =>{            
        const song = playlist[currentSong]        
        
        if(song===undefined) {
            updateNowPlaying('Playlist is empty')
        }
        else{            
            console.log('Current song: '+song)
            const base64Audio = song['audioBase64']       
            updateNowPlaying(song['title'])
            const decodedData = atob(base64Audio)
            const arrayBuffer = new Uint8Array(decodedData.length);

            for (let i = 0; i < decodedData.length; i++) {
                arrayBuffer[i] = decodedData.charCodeAt(i);
            }                                
            const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
            
            const url = URL.createObjectURL(blob); 
            //This url will be used to revoke the audio when user exits the component.
            updateAudioUrl(url)                                         
            playerRef.current = new Audio(url)
            playerRef.current.play()
            playerRef.current.onended = handleNextSong
        }   
                            
    }
    const play = ()=>{
        if (playerRef.current!.paused){
            playerRef.current!.play()
        }
    }
    const pause = ()=>{        
        if (playerRef!=null ){
            if( playerRef.current!.played)
            playerRef.current!.pause()
        }
    }
    const handleNextSong = ()=>{
        
        if (currentSong < playlist.length - 1) {
            console.log('next song plz!')
            updateCurrentSong(currentSong + 1);
        } else {
            // If the playlist is finished, stop playback
            console.log('not next song yet blyat')
            playerRef.current!.pause()
        }
    }
        
    
        
    
    return (
        <div id='current-song-border'>    
            <div id='fa-music'><FaMusic size="30"/></div>
            <div id='song-title'>{nowPlaying}</div>
            <div id='prev-song'><FaFastBackward size='28'/></div>
            <div id='next-song'><FaFastForward size='28'/></div>            
        </div>
    );
}
)