import './NavBar.css'
import {FaClock,FaMusic, FaUser} from 'react-icons/fa'
import {To, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

/*Specifies the data type to be injected into the
 SideBarIcon functional Component.*/
interface SideBarIconProps {
  icon?: React.ReactNode;
  text?: String;
  url?: To;
}


export default function NavBar (){
   
  let navigate = useNavigate();
  let getUserInfoUrl = ""
  useEffect(()=>{

  })
 
  const SideBarIcon = ({icon,text,url}:SideBarIconProps)=>{
    
    const handleClick = ()=>{                 
        
        navigate(url!);
    }
    return(
    /* Style is overridden in NavBar.css*/
    <div className='sidebar-icon group' onClick={handleClick}> 
      {icon}
      <span className='sidebar-tooltip group-hover:scale-100'> {text} </span>
    </div>
    );
  }
  const UserNameIcon = ()=>{
    const handleClick = ()=>{
      navigate("/profile")
    }
    return(
      /*The top attribute of user-icon class overrides that of the sidebar-icon class. */
      <div className='sidebar-icon user-icon'
        onClick={handleClick}>
          <SideBarIcon icon={<FaUser/>} text='Username' />
      </div>
    )
  }
  

  return (
    
    /*
    - Fixed top-0: Makes the navbar fixed to the top left corner 
      of the browser window.
    - h-screen: Takes up the entire height of the screen  
    - w-16: width of 16 Tailwind unit spacing (64px)
    - Flex flex-col: aligns each child item

    */
    <div>
    <div className="fixed top-0 left-0 h-screen w-16
                  flex flex-col
                  bg-sidebar text-white shadow-lg">                        
      <SideBarIcon icon={<FaClock size="28"/>} text='Countdown' url="/countdown"/>
      <SideBarIcon icon={<FaMusic size="28"/>} text='Music' url="/music"/>                
      <UserNameIcon></UserNameIcon>
    </div>
    
    
    
    </div>

  );
    

}