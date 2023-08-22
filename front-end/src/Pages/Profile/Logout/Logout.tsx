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
        <div id='btn-container' onClick={handleLogout}>Log Out </div>
    )
}