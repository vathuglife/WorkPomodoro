import { FaLink } from 'react-icons/fa'
import { FaDownload } from 'react-icons/fa'
import { SongDetails } from './SongDetails/SongDetails'
import {useRef, useState} from 'react'
import axios from 'axios'
import { AxiosResponse } from 'axios';
import {useEffect} from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill';
import { IDBPCursorWithValue} from 'idb'
import { SongDetailsRef } from './SongDetails/SongDetailsRef'
import './YTDownloader.css'
import DownloadProgress from './DownloadProgress/DownloadProgress'


export default function YTDownloader(){
    const [link, updateLink] = useState('');
    const [isImageShown,updateIsImageShown] = useState(false)
    const [isLabelShown,updateIsLabelShown] = useState('none')    
    const [isDownloading,updateIsDownloading] = useState(false)
    const [downloadProgress,updateDownloadProgress] = useState<string>("")
    const api = 'https://localhost:7263/workpomodoro/music/download'
    const progressApi = 'https://localhost:7263/workpomodoro/music/download/progress'
    const token = localStorage.getItem("user-token")
    const progressConfig = {   
        headers:{
            Authorization:`Bearer ${token}`
        },    
        
    }   
   
    const songDetailsRef = useRef<SongDetailsRef>(null);
   
    useEffect(()=>{
         //Prevents this component from being unmounted (stops downloading)
        return(()=>{false})                   
    })
    
    const labelStyle: { [key: string]: React.CSSProperties } = {
        container: {
            display:isLabelShown,
            position:'absolute',
            fontSize:'18px',
            right:'30px',
            top:'12px',
            justifyContent:'center',  
            color:'white'    
        },
    }      
   
   
   
    const handleDownload = ()=>{                              
        //Listens to the download progress changes, emitted from the YouTube downloader (ASP.NET Core)
        //This technique is using SSE (Server-sent events), rather similar to WebSockets, but simpler.
        const progressEvent = new EventSourcePolyfill(progressApi,progressConfig)
        updateIsDownloading(true)
        progressEvent.onopen = (e)=>{
            console.log('Successfully connected to Server. Trying to download...')            
        }
        progressEvent.onmessage = (e) => {
            console.log('current progress: '+e.data)
            updateDownloadProgress(e.data)
        }
        const body = {
            "title": songDetailsRef.current?.getTitle(),
            "duration":songDetailsRef.current?.getDuration(),
            "thumbnail": songDetailsRef.current?.getImgUrl(),
            "url" : link        
        }        

        axios /*MUST SET responseType for axios, or else, the audio data might be corrupted. */
            .post(api,body,{headers:{Authorization:`Bearer ${token}`},responseType:'json'})
            .then((response:AxiosResponse)=>{                                                                                 
                let songData = response.data
                saveToClientDb(songData)                                         
            })  
        
    }
    
  
    const saveToClientDb = async(songData:JSON)=>{                  
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
        
        //Runs when a database has already existed.
        request.onsuccess = ()=>{
            let db = request.result;
            //Creates a group of commands (transaction) that stops automatically when any of 
            //the command fails.
            const transaction = db.transaction('songs','readwrite')            
            const store = transaction.objectStore(songsObjStore)
            //Finds all items in the object store, in reverse.
            let latestItem = store.openCursor(null,'prev')            
            latestItem.onsuccess = (event) => {
                const cursor = (event.target as IDBRequest<IDBPCursorWithValue>).result;
                if(cursor){
                    const key = cursor.key;
                    let newKey = updateSongId(key);
                    console.log(`Latest key generated: ${newKey}`)
                    store.put(songData,newKey)
                }else{
                    store.put(songData,"SON00000") //in case no song is available.
                }
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
                                                       
        
       
    }
              


    const handleInput = (e:any)=>{
        updateLink(e.target.value)
        /*
            When this state changes, the SongDetails Component 
            to update the video title and 
            the thumbnail will be triggered.
        */
        updateIsImageShown(false)
        updateIsImageShown(true)
    }
    return (
        <div className='ytdownloader-container'>            
                    
            <div id='url-border'>                
                <div id='fa-link'><FaLink size="30"/></div>
                <input id='input-field' type='text'
                    placeholder='Type or Paste a valid YouTube URL here...'
                    onChange={(e)=>handleInput(e)}></input>
            </div>
                    
            <div className='details-title'>Details</div>
            <div id='controls-btn-group'>
                <div className='controls-btn'
                    onClick={handleDownload}
                    onMouseEnter={()=>updateIsLabelShown("inline-block")}
                    onMouseLeave={()=>updateIsLabelShown("none")}><FaDownload size="32"/>
                    <div style={labelStyle.container}>Download</div>
                </div>
            </div>

      
                
                    
                    <div id='song-details'>
                        {(()=>{
                            if(link.length===0){
                                return(
                                <div id='temp-text'>
                                    After pasting the link, the song details will be shown here.
                                </div>
                                )
                            }
                            else {
                                if(!isDownloading) return(
                                        <SongDetails isImageShown={isImageShown} 
                                                    videoUrl={link} 
                                                    opac={'100%'}
                                                    ref={songDetailsRef}/>
                                        
                                    )
                                else return(
                                    <div>
                                        <DownloadProgress progress={downloadProgress}/>
                                        <SongDetails isImageShown={isImageShown}                                                     
                                                    videoUrl={link} 
                                                    opac={'15%'}
                                                    ref={songDetailsRef}/>
                                    </div>
                                )
                            }
                        })()}                                        
                    </div>                  
                

            
            
        </div>
    )

}