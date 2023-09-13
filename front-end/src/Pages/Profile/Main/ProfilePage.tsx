import './ProfilePage.css'
import ProfileSection from '../ProfileSection/ProfileSection'
import SettingsCard from '../SettingsCard/SettingsCard'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons'
interface EachSetting{
    icon:IconDefinition
    title:String;
    desc:String;
}
export default function ProfilePage (){
    const settings:EachSetting[] = [
        {icon:faPersonCircleQuestion,
             title:"Themes",desc:'Changes the theme for the entire app.'}       
    ]

    const handleShowForm = ()=>{

    }
    return(
        <div id='profile-page-container'>            
            <ProfileSection/>     
            <div className='settings-card-group'>
                <div id='settings-label'>Personalization</div>
                {settings.map((setting)=>
                    <SettingsCard icon={setting.icon} title={setting.title} desc={setting.desc}/>
             )}
            </div>       
        </div>
     )
}