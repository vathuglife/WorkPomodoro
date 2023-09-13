import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import './SettingsCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface SettingsCardProps{
    icon:IconDefinition
    title:String;
    desc:String;
}
export default function SettingsCard({icon,title,desc}:SettingsCardProps){
    return(
        <div id="settings-card-container">
            <div className='settings-icon'>
                <FontAwesomeIcon icon={icon} size='3x'/>
            </div>
            <div className='settings-txt'>                
                <div className='settings-title'>{title}</div>
                <div className='settings-desc'>{desc}</div>
            </div>            
        </div>
    )
}