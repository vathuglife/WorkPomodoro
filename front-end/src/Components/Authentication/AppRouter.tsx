import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import {useEffect} from 'react'
import axios, { AxiosError,AxiosResponse } from 'axios'

import PrivateRoutes  from "./PrivateRouter"
import PublicRoutes from "./PublicRouter"
import {useState} from 'react'




export default function AppRouter (){    
    let USER_INFO_URL = "https://localhost:7263/workpomodoro/validate"	
    let [authenStatus,updateAuthenStatus] = useState("in-progress");
    let [status,updateStatus] = useState(100);
    let token = localStorage.getItem("user-token")
    let GET_CONFIG = {
        method:"GET",
        headers:{           
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+token
        }
    }
    
    useEffect(()=>{
        //This function is ONLY for checking if the user is logged in or not.        
        authenticate(); 

    })
     
    const authenticate = async ()=>{
        
        await axios.get(USER_INFO_URL, GET_CONFIG)
        .then((response: AxiosResponse)=>{
            updateStatus(response.data.status)
            if(response.status===200){
                updateAuthenStatus("authenticated");
            }else{
                updateAuthenStatus("unauthorized");
            }          
        })
        .catch((error:AxiosError)=>{
            console.log(error.message)
        }) 
        
        
    }

    return (
    <BrowserRouter>
        <Routes>
            
            {/*If the user is authenticated (logged in), for ALL ROUTES (/), 
            allows him/her to access pages specified in the PrivateRouter (countdown)*/
                authenStatus === "authenticated"
                    ?<Route path='/*'element={<PrivateRoutes/>}></Route>
                    
                    /*If not, then the user can only view the Login/Register page. */
                    
                    :<Route path='/*' element={<PublicRoutes/>}></Route>            
            }
            {/*If the user enters some bullshit keyword into the search bar, automatically
            redirects to the Login Page. */}
            <Route path='*' element={<Navigate to='/login'/>}></Route>            
            
           
        </Routes>
    </BrowserRouter>
    );

}