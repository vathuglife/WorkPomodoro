import './ProfileSection.css'
import { FaUser } from 'react-icons/fa'
import { Logout } from '../Logout/Logout'
import EditProfileBtn from '../EditProfile/EditProfileBtn'
import EditProfileForm from '../EditProfile/EditProfileForm'
import {useState} from 'react'
export default function ProfileSection(){
    const [isFormShown,updateIsFormShown] = useState(false)
    const handleShowForm = ()=>{
        if(!isFormShown) updateIsFormShown(true);        
    }
    const handleHideForm = ()=>{
        if(isFormShown) updateIsFormShown(false);
    }
    return(
        <div id='profile-section-container'>
            <div className='inline-disp avatar'>
                <FaUser size='28'/>
            </div>
            <div className='desc inline-disp'>
                <div className='welcomeTxt'>Welcome back!</div>
                <div className="usernameTxt">VATHUGLIFE</div>
            </div>
            
            <div className='user-controls inline-disp'>
                <div className='user-control logout-btn'>
                    <Logout/>
                </div>
                <div className='user-control edit-profile-btn'>
                    <EditProfileBtn showFormFunction={handleShowForm}/>
                </div>
            </div>
            <EditProfileForm showForm={isFormShown} hideForm={handleHideForm}/>
        </div>
    )
}