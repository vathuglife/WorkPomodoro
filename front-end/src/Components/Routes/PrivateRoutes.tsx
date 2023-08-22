import { Navigate, Route, Routes } from 'react-router-dom';
import CountdownPage from "../../Pages/Countdown/CountdownPage"
import NavBar from "../NavBar/NavBar"
import MusicPage from "../../Pages/Music/MusicPage"
import ProfilePage from '../../Pages/Profile/Main/ProfilePage';
import { TaskPage } from '../../Pages/Tasks/TaskPage';
import BreaktimePage from '../../Pages/Breaktime/BreaktimePage';
export default function PrivateRoutes() {
    return (
        <div>
        {/*The NavBar which is exclusively for those signed in.*/}
        <div className='flex'><NavBar></NavBar></div>
            <Routes>
                <Route path='countdown' element={<CountdownPage />} />
                <Route path='music' element={<MusicPage />} />
                <Route path='tasks' element={<TaskPage />} />
                <Route path='profile' element={<ProfilePage/>}/>
                <Route path='breaktime' element={<BreaktimePage/>}/>
                <Route path='*' element={<Navigate to='/tasks' replace />} />
            </Routes>
        </div>
    );
};