import {createContext } from 'react';
import { SongInfo } from '../../Pages/Music/AllSongs/AllSongs';

const defaultState ={songsList: 
    [    
        {
            id:123,
            title:"Some dummy Song",
            duration:"3 minutes 42 seconds",
            thumbnail:"aaaa",
            isInPlaylist:false
        }
    ]
}
export interface SongsContextProps{
    songsList: SongInfo[]
}
export const SongsContext = createContext<SongsContextProps>(defaultState);

