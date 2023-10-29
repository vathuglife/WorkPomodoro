import './Playlist.css'
import {useEffect,useState} from 'react'
import { DbSong } from '../Interfaces/Interfaces';
import { Song } from '../Interfaces/Interfaces';
import EachSongInPlaylist from './EachSongInPlaylist/EachSongInPlaylist';
import { GetAllItemsFromObjStore } from '../../../Utils/IndexedDbUtils';
export interface EachSong{
    dbSong:DbSong;
    index:number;
}


export default function Playlist(){    
    const [songsList,updateSongsList] = useState<Song[]>([])  
    const dbName = 'workpomodoro'      
    const objStoreName = 'playlist'
    useEffect(()=>{        
        GetAllItemsFromObjStore(dbName,objStoreName)
            .then((result)=>{
                let resArray = result as Song[]
                updateSongsList([...resArray])
            })
    },[])    
       

    return(        
        <ol className='all-songs-list'>                           
        {
            songsList.map((song,index)=>
                <EachSongInPlaylist song={song} index={index}/>
            )
        }
        </ol>                   
    )
}