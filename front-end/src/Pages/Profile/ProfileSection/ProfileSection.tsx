import './ProfileSection.css'
import { Logout } from '../Logout/Logout'
import EditProfileBtn from '../EditProfile/EditProfileBtn'
import EditProfileForm from '../EditProfile/EditProfileForm'
import {useState,useEffect} from 'react'
import { UserResponseData } from '../Main/ProfilePage'



interface ProfileSectionProps{
    responseData:UserResponseData
}
export default function ProfileSection({responseData}:ProfileSectionProps){
    const [isFormShown,updateIsFormShown] = useState(false)
    const handleShowForm = ()=>{
        if(!isFormShown) updateIsFormShown(true);        
    }
    const handleHideForm = ()=>{
        if(isFormShown) updateIsFormShown(false);
    }
    useEffect(()=>{
        console.log(`Current profile section stat: ${responseData}`);
    },[])
    if (responseData==undefined)
        return null!
    else return(
        <div id='profile-section-container'>
            <div className='inline-disp'>
                <img className='avatar' src={responseData.image}/>
            </div>
            <div className='desc inline-disp'>
                <div className='welcomeTxt'>Welcome back!</div>
                <div className="usernameTxt">{responseData.name}</div>
            </div>
            
            <div className='user-controls inline-disp'>
                <div className='user-control logout-btn'>
                    <Logout/>
                </div>
                <div className='user-control edit-profile-btn'>
                    <EditProfileBtn showFormFunction={handleShowForm}/>
                </div>
            </div>
            <EditProfileForm showForm={isFormShown} hideForm={handleHideForm}
                        responseData={responseData}/>
        </div>
    )
}