import './ProfilePage.css'
import ProfileSection from '../ProfileSection/ProfileSection'
import SettingsCard from '../SettingsCard/SettingsCard'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import {useState} from 'react'
import { useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'

interface EachSetting{
    icon:IconDefinition
    title:String;
    desc:String;
}

export interface UserResponseData{
    uid:number;
    name:string;
    username:string;
    image:string;
}


export default function ProfilePage (){
    const GET_USR_DAT_URL = "https://localhost:7263/workpomodoro/account"
    const TOKEN = localStorage.getItem("user-token");
    const [responseData,updateResponseData] = useState<UserResponseData>()
    const settings:EachSetting[] = [
        {icon:faPersonCircleQuestion,
             title:"Themes",desc:'Changes the theme for the entire app.'}       
    ]
    const config = {
        headers:{
            Authorization:'Bearer '+TOKEN
        },        
        responseType:'text' as 'json'
    }
    useEffect(()=>{        
        axios.get(GET_USR_DAT_URL,config)
        .then((response:AxiosResponse)=>{
            console.log('Current response data: '+response.data)
            updateResponseData(response.data)
        })        
    },[])
   
   
    return(
        <div id='profile-page-container'>            
            <ProfileSection responseData={responseData as UserResponseData}/>     
            <div className='settings-card-group'>
                <div id='settings-label'>Personalization</div>
                {settings.map((setting)=>
                    <SettingsCard icon={setting.icon} title={setting.title} desc={setting.desc}/>
             )}
            </div>       
        </div>
     )
}