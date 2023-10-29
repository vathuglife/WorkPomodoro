import './HorizontalNavBar.css'
import {useState} from 'react'
import { faPlay,faList,faDownload } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export interface HorizontalNavBarProps{
    updateSubComponent:(component:number)=>void;
}
interface EachLink{
    icon:IconDefinition;
    text:String;
}

export default function HorizontalNavBar({updateSubComponent}:HorizontalNavBarProps){
    const links:EachLink[] = [
        {icon:faPlay,text:'Playlist'},
        {icon:faList,text:'All Songs'},
        {icon:faDownload,text:'Download'}
    ]    
    const [selected,updateSelected] = useState(1);
    /*Selection workflow:
    1. User clicks on one of the hyperlinks in links array..
    2. The index of that hyperlink (e.g. 0 - Playlist) is saved. 
    3. Since the "selected" Hook changed, a refresh is triggered.
    4. While re-rendering the map() function, React finds out that 
        the first item (Playlist) has an index 0 which is the same 
        as the one we had selected before. 
    5. Then, it applies the class with the name "active", which inverts the bg and text color.*/    
       
    return(        
        <ul className='navbar-container'>
            {links.map((eachLink,index)=>{
                return (
                    <li       
                        onClick={()=>{
                            updateSelected(index)
                            updateSubComponent(index)
                            console.log('Current sub component: '+index)
                        }}                   
                        className={`navbar-item ${selected == index && "active"}`}
                        key={index}>
                        <div className='fa-icon'><FontAwesomeIcon icon={eachLink.icon}/></div>
                        <div className='hor-navbar-txt'>{eachLink.text}</div>
                    </li>
                )
            })}            
        </ul>
        
    )
}