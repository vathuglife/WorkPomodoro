
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './DropdownMenu.css'
import { MenuItem } from '../Interfaces/Interfaces';

export interface DropdownMenuProps{    
    menuList:MenuItem[]
}
export default function DropdownMenu ({menuList}:DropdownMenuProps){ 
    return(
        <div className='dropdown-container'>   
            {menuList.map((menuItem)=>{                
                return(
                    <div className='option-container' onClick={menuItem.function}>
                        <div className='option-icon' style={{color:menuItem.color}}>
                            <FontAwesomeIcon icon={menuItem.icon} size='xl'/>
                        </div>
                        
                        <div className='option-txt' style={{color:menuItem.color}}>
                            {menuItem.label}
                        </div>
                    </div>
                )                
            })}                     
                        
        </div>
    )
}