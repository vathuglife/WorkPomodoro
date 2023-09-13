import { FaSignOutAlt } from 'react-icons/fa'
import './Logout.css'
export const Logout = ()=>{        
    const handleLogout = ()=>{
        
        let isLogout = confirm('Do you really want to log out now?')
        if (isLogout){
            localStorage.removeItem('user-token')
            window.location.reload();
        }
    }
    return(
        <div id='logout-btn-container' onClick={handleLogout}>
            <div className='inline icon-container'><FaSignOutAlt size='28'/></div>
            <div className='inline label-container'>Log Out </div>            
        </div>
    )
}