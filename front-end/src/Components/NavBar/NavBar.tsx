import './NavBar.css'
import userImg from '../../../resources/images/user.png'
export default function NavBar (){
    const getUserDetails = ()=>{

    }

    return (
    <div id='navbar'>        
        <div id='label'>Work Pomodoro</div>
        <div id='profile-container'>            
            <img id='rounded-img' className='profile-child'src={userImg}></img>            
            <div id='profile-name' className='profile-child'>            
            </div>
        </div>
    </div>    
 
   
    )    

}