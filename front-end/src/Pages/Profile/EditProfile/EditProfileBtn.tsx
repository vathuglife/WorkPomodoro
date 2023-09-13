import { FaEdit } from 'react-icons/fa'
import './EditProfileBtn.css'

interface EditProfileBtnProps{
    showFormFunction:()=>void;
}

export default function EditProfileBtn({showFormFunction}:EditProfileBtnProps){    
    return(
        <div id='edit-profile-btn-container' onClick={showFormFunction}>
            <div className='inline icon-container'><FaEdit size='28'/></div>
            <div className='inline label-container'>Edit my profile </div>           
        </div>

    )
}