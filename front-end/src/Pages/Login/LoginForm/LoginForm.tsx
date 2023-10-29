import './LoginForm.css'
import {useNavigate} from 'react-router-dom'
import {AxiosResponse,AxiosError } from 'axios'
import {useState} from 'react'
import axios from 'axios'



export default function LoginRegisterForm(){	
	let [username,updateUsername] = useState("");
	let [password,updatePassword] = useState("");	
	let REGISTER_URL = "https://localhost:7263/workpomodoro/login"	
	let navigate = useNavigate();

	const signup = ()=>{		
		let path = '/register'
		navigate(path);

	}
	const validateLogin = ()=>{
		return axios.post(
			REGISTER_URL,
			JSON.stringify({			
				"username": username,
				"password": password
			}			
			), {headers: { "Content-Type": "application/json" },
			withCredentials: true})
		.then((response:AxiosResponse)=>{		
			
			if(response.status === 200){						
				localStorage.setItem("user-token",response.data.token);		
				//Automatic routing to the countdown page is already done by ReactRouter (AppRouter).
				//window.location.reload()
				return response.data
			}
		})
		.catch((reason: AxiosError) => {
			alert (reason.response?.data)
			console.log(reason.message)
		  })
		
		
		
	}
	const handleLogin =(e:React.MouseEvent)=>{
		e.preventDefault();		
		validateLogin().then(()=>{
			navigate('/tasks')
			window.location.reload()
		})

	}
		
		
		
	

    return(                   
		<div className="login-container" >			 
			<div className="form-container">
				<form action="#">
					<h1>Create Account</h1>
					<div className="social-container">
						<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
						<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
						<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
					</div>
					<span>or use your email for registration</span>					
					<button>Sign Up</button>
				</form>
			</div>
			<div className="form-container sign-in-container">
				<form action="#">
					<h1>Sign in</h1>											
					<br></br>					
					<input type="text" placeholder="Username" value={username}
						onChange={(e)=>updateUsername(e.target.value)}/>
					<input type="password" placeholder="Password" value={password}
						onChange={(e)=>updatePassword(e.target.value)}/>	
					<a href="#">Forgot your password?</a>
					<button className="log-in-btn" onClick={(e)=>handleLogin(e)}>Sign In</button>
				</form>
			</div>
			<div className="overlay-container">
				<div className="overlay">					
					<div className="overlay-panel overlay-right">
						<h1>Welcome Back!</h1>
						<p>Don't have an account? Click here to create one!</p>						
						<button className="ghost" id="signUp" onClick={signup}>Sign Up</button>
					</div>
				</div>
			</div>
		</div>        
    )

}