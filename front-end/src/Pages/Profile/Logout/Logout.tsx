import './Logout.css'
import { useNavigate } from 'react-router-dom'
export const Logout = ()=>{
    const handleLogout = ()=>{
        let navigator = useNavigate()
        let isLogout = confirm('Do you really want to log out now?')
        if (isLogout){
            localStorage.removeItem('user-token')
            navigator('/login')
        }
    }
    return(
        <div id='btn-container' onClick={handleLogout}>Log Out </div>
    )
}