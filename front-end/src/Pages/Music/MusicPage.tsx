
import './MusicPage.css'
import axios, { AxiosResponse } from 'axios';
import HorizontalNavBar from './HorizontalNavBar/HorizontalNavBar'
import YTDownloader from './Downloader/YTDownloader'
import {useEffect, useState} from 'react'
import AllSongs, { SongInfo } from './AllSongs/AllSongs'
import { useSpring ,animated} from 'react-spring'
import Playlist from './Playlist/Playlist'
import {SongsContext} from '../../Components/Context/SongsContext'
import { createDbObjStoreIfNotExist, saveToClientDb} from '../../Utils/IndexedDbUtils';
import { Song } from './Interfaces/Interfaces';

export default function MusicPage(){               
    const [currentComponent,updateCurrentComponent] = useState<number>(1)    
    const [songsList,updateSongsList] = useState<SongInfo[]>([])    
    const [playlistSongs,updatePlaylistSongs] = useState<SongInfo[]>([])
    const springProps = useSpring({
        from:{opacity:0},
        to:{opacity:1},           
        reset:true,
        duration:20          
    })       
    const getAllPreviewSongs = 'https://localhost:7263/workpomodoro/music/preview'
    const downloadPlaylistSongsUrl = 'https://localhost:7263/workpomodoro/music/playlist/all'

    const TOKEN = localStorage.getItem('user-token');
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization:'Bearer ' + TOKEN
        }        

    }
    

    useEffect(()=>{
        createDbObjStoreIfNotExist('workpomodoro',1,'playlist')
        getAllSongsForPreview()                     
        return(()=>{false})    
    },[])
    
        
    useEffect(()=>{ //Only gets the list of songs IN THE PLAYLIST (isInPlaylist = true)
                    //after the songsList is loaded (changes from null to not null)                        
        if(songsList.length!==0)
            getPlaylistSongs()
    },[songsList])    
                            
    
    useEffect(()=>{
        if(playlistSongs.length!==0)
        downloadPlaylistSongs()
    },[playlistSongs])
            
    const getAllSongsForPreview = async ()=>{        
        console.log('I am running first!');
        await axios
            .get(getAllPreviewSongs,config)
            .then((response:AxiosResponse)=>{                                
                updateSongsList(()=>[...response.data])                                
            })        
        console.log('First is done running!');
    }    
    const getPlaylistSongs = async ()=>{                        
        let tempArr = [] as SongInfo[]
        await songsList.map((eachSong)=>{           
            if(eachSong.isInPlaylist===true){                                
                tempArr.push(eachSong)
                
            }
        })   
        updatePlaylistSongs(()=>[...tempArr])            
    }
    
    
    const downloadPlaylistSongs = async ()=>{
        console.log('I am running third!');        
        
        const request = JSON.stringify(playlistSongs)
        console.log('Current request body:' +request)
        await axios.post(downloadPlaylistSongsUrl,request,config)
            .then((response:AxiosResponse)=>{
                const songData = response.data as Song[]                                            
                songData.map((song)=>{
                    saveToClientDb(song)
                })
            })
        
    }
    const changeComponent = (component:number)=>{
        updateCurrentComponent(component)
    
    }
    
    return(                        
        <div className="main-container">
            <div className='nav-bar-pos'>
                <HorizontalNavBar updateSubComponent={changeComponent} />
            </div>
            <animated.div style={springProps}>
            <div className='sub-component-pos'>                 
                <SongsContext.Provider value={{songsList}}>
                    {(()=>{
                        
                        if (currentComponent===0) return (<Playlist/>)
                        else if(currentComponent===1) return(<AllSongs/>)
                        
                        else if(currentComponent===2) return(<YTDownloader/>)
                    })()}
                </SongsContext.Provider>
            </div>     
            </animated.div>
        </div>                 
        
    )

   
}