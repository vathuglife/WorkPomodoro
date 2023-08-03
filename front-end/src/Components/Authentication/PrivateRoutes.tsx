import { Navigate, Route, Routes } from 'react-router-dom';
import CountdownPage from "../../Pages/Countdown/CountdownPage"
import NavBar from "../NavBar/NavBar"
import MusicPage from "../../Pages/Music/MusicPage"
import ProfilePage from '../../Pages/Profile/Main/ProfilePage';
export default function PrivateRoutes() {
    return (
        <div>
        {/*The NavBar which is exclusively for those signed in.*/}
        <div className='flex'><NavBar></NavBar></div>
            <Routes>
                <Route path='countdown' element={<CountdownPage />} />
                <Route path='music' element={<MusicPage />} />
                <Route path='profile' element={<ProfilePage/>}/>
                <Route path='*' element={<Navigate to='/countdown' replace />} />
            </Routes>
        </div>
    );
};