import { Navigate, Route, Routes } from 'react-router-dom';
import bg from '../../../resources/images/study-doodle-hor.jpg'
import CountdownPage from "../../Pages/Countdown/CountdownPage"
import NavBar from "../NavBar/NavBar"
import MusicPage from "../../Pages/Music/MusicPage"
import ProfilePage from '../../Pages/Profile/Main/ProfilePage';
import { TaskPage } from '../../Pages/Tasks/TaskPage';
import BreaktimePage from '../../Pages/Breaktime/BreaktimePage';


function BackgroundImg(){
    const bgStyle:{[key:string]:React.CSSProperties} = {
        container:{            
            position:"absolute",
            opacity:"0.12",
            top:"0px",
            width:"100vw",
            height:"100vh",
            left:'5vw'
            }
        }
    return(
        <div>
            <img style={bgStyle.container} src={bg}/>
        </div>
    )
}

export default function PrivateRoutes() {
   
    
    return (
        <div>
        {/*The NavBar which is exclusively for those signed in.*/}
        <div className='flex'><NavBar></NavBar></div>
            <Routes>
                
                <Route path='countdown' element={
                    <>
                        <BackgroundImg/>
                        <CountdownPage /> 
                    </>} 
                />
                <Route path='music' element={
                    <>
                        <BackgroundImg/>
                        <MusicPage />
                    </>
                } />
                <Route path='tasks' element={
                    <>
                        <BackgroundImg/>
                        <TaskPage />
                    </>
                } />
                <Route path='profile' element={            
                    <>                    
                        <BackgroundImg/>
                        <ProfilePage/>
                    </>
                }/>
                <Route path='breaktime' element={
                        <>
                            <BackgroundImg/>
                            <BreaktimePage />
                        </>
                }/>
                <Route path='*' element={<Navigate to='/tasks' replace />} />
            </Routes>
        </div>
    );
};