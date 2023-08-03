import { Logout } from '../Logout/Logout'
import './ProfilePage.css'

export default function ProfilePage (){
     return(
        <div className='main-container'>
            <div id='logout-btn-pos'><Logout/></div>
        </div>
     )
}