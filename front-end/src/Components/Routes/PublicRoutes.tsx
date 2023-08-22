import {Navigate, Route, Routes } from 'react-router-dom';

import LoginPage from "../../Pages/Login/LoginPage"
import RegisterPage  from "../../Pages/Register/RegisterPage"

export default function PublicRoutes() {
    return (
        <Routes>
            <Route path='login' element={<LoginPage/>}  />
            <Route path='register' element={<RegisterPage/>}/>            
            <Route path='*' element={<Navigate to='/login' replace/>} />
        </Routes>
    );
};