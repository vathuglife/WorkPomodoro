import './CurrentTask.css'
import { FaTasks } from 'react-icons/fa';
import {useEffect,useState} from 'react'
import axios,{AxiosRequestConfig, AxiosResponse} from "axios"


export default function CurrentTask(){    
    const topTaskApiUrl = 'https://localhost:7263/workpomodoro/user/toptask'
    const [topTask,updateTopTask] = useState("");
    const token = localStorage.getItem('user-token')
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    } as AxiosRequestConfig

    useEffect(()=>{
        axios.get(topTaskApiUrl,config)
            .then((response:AxiosResponse)=>{            
                updateTopTask(response.data.name)
            })
    },[])
    
    return (
        <div id='current-task-border'>    
            <div id='fa-task'><FaTasks size="30"/></div>
            <div id='task-detail'>{topTask}</div>
        </div>
    );
}