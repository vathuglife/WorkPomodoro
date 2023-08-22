
import './MusicPage.css'


import HorizontalNavBar from './HorizontalNavBar/HorizontalNavBar'
import YTDownloader from './Downloader/YTDownloader'

import {useState} from 'react'
import AllSongs from './AllSongs/AllSongs'
import { useSpring ,animated} from 'react-spring'
import Playlist from './Playlist/Playlist'
export default function MusicPage(){               
    const [currentComponent,updateCurrentComponent] = useState<number>(0)    
    const springProps = useSpring({
        from:{opacity:0},
        to:{opacity:1},           
        reset:true,
        duration:20          
    })       
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
                {(()=>{
                    if (currentComponent===0) return (<Playlist/>)
                    else if(currentComponent===1) return(<AllSongs/>)
                    else if(currentComponent===2) return(<YTDownloader/>)
                })()}
                
            </div>     
            </animated.div>
        </div>                 
        
    )

   
}