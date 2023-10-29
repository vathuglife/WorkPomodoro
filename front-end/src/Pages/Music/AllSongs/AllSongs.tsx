import './AllSongs.css'
import {useContext, useEffect,useState} from 'react'
import { DbSong,Song} from '../Interfaces/Interfaces';
import EachSong  from './EachSong/EachSong';
import {SongsContext} from '../../../Components/Context/SongsContext';

export interface SongInfo{
   id:number;
   title:string;
   duration:string;
   thumbnail:string;
   isInPlaylist:boolean;
}

export default function AllSongs(){    
    
    const songsContext = useContext(SongsContext)
    const songsList = songsContext.songsList

    useEffect(()=>{                
    },[])

    return(
        
           <ol className='all-songs-list'>                           
            {
                songsList.map((eachSongInfo,key)=>
                    
                        <EachSong songInfo={eachSongInfo} index={key}/>                    
                )
           }
           </ol>
           
        
    )
}