import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import {useEffect} from 'react'
import axios, { AxiosError,AxiosRequestConfig,AxiosResponse } from 'axios'

import PrivateRoutes  from "./PrivateRoutes"
import PublicRoutes from "./PublicRoutes"
import {useState} from 'react'




export default function AppRouter (){    
    let USER_INFO_URL = "https://localhost:7263/workpomodoro/validate"	
    let [authenStatus,updateAuthenStatus] = useState("in-progress");    
    let token = localStorage.getItem("user-token")    
    let GET_CONFIG = {
        method:"GET",
        headers:{           
            'Content-Type': 'application/json',
            Authorization: "Bearer "+token
        }
    } as AxiosRequestConfig
    
    useEffect(()=>{
        //This function is ONLY for checking if the user is logged in or not.        
        authenticate(); 

    })
     
    const authenticate = ()=>{        
        axios.get(USER_INFO_URL, GET_CONFIG)
        .then((response: AxiosResponse)=>{            
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
