import './RegisterForm.css'
import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import axios from "axios"
import { AxiosResponse, AxiosError } from 'axios'
export default function RegisterForm(){
    let navigate = useNavigate();
	let [fullName,updateFullName] = useState("");
	let [username,updateUsername] = useState("");
	let [password,updatePassword] = useState("");
	let REGISTER_URL = "https://localhost:7263/workPomodoro/signup"	
	
	const handleSignup = ()=>{
								
		let response = axios.post(REGISTER_URL,JSON.stringify({
			"name": fullName,
			"username": username,
			"password": password
		}			
		), {headers: { "Content-Type": "application/json" },
        withCredentials: true})
		.then((response: AxiosResponse) => {		
			
			let confirmed = confirm("Successfully signed up!");
			if (confirmed){
				let route = '/'
				navigate(route)
			}
		  })
		  .catch((reason: AxiosError) => {
			alert (reason.response?.data)
			console.log(reason.message)
		  })
		

	}
	return(             		      
		<div className="container" >
			<div className="form-container sign-up-container">
				<form action="#">
					<h1>Create Account</h1>
					<div className="social-container">
						<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
						<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
						<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
					</div>
					
					<input type="text" placeholder="Name" />
					<input type="email" placeholder="Email" />
					<input type="password" placeholder="Password" />
					<button>Sign Up</button>
				</form>
			</div>
			<div className="form-container sign-in-container">
				<form action="#">
					<h1>Sign up</h1>	
					<br></br>										
					<input type="text" placeholder="Full Name" value={fullName}
						onChange={(e)=>updateFullName(e.target.value)}/>
					<input type="text" placeholder="Username" value={username}
						onChange={(e)=>updateUsername(e.target.value)}/>
					<input type="password" placeholder="Password" value={password}
						onChange={(e)=>updatePassword(e.target.value)}/>		
					<br></br>			
					<button className="sign-up-btn" onClick={handleSignup}>I'm done!</button>
				</form>
			</div>
			<div className="overlay-container">
				<div className="overlay">
					
					<div className="overlay-panel overlay-right">
						<h1>New Here?</h1>
						<p>Finish your personal details, and you're off to go!</p>						
					</div>
				</div>
			</div>
		</div>        
    )

}