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
import { saveToClientDb } from '../../../Utils/IndexedDbUtils'

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
        progressEvent.onopen = ()=>{
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