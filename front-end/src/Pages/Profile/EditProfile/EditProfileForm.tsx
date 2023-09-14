import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './EditProfileForm.css'
import { faX } from '@fortawesome/free-solid-svg-icons';
import {useRef,useState,useEffect} from 'react'
import { faQuestion,faUpload,faSave,faEye } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserResponseData } from '../Main/ProfilePage';



interface InputFieldProps{
    label:string;
    inputType:string;
    value:string;
    updateValue:(value:string)=>void;
}
function InputField({label,inputType,value,updateValue}:InputFieldProps){
    const [isPassword,updateIsPassword] = useState(inputType);
    const showHidePassword = ()=>{
        if(isPassword==='password') updateIsPassword('text')
        else updateIsPassword('password')
    }
    return (        
        <div id='edit-profile-form-input-container'>
            <div className='edit-profile-form-input-label'>{label}</div>
            <div className='edit-profile-form-input-wrapper'>                
                <input type={isPassword} className='edit-profile-form-input'
                        value={value}
                        onChange={(e)=>updateValue((e.target as HTMLInputElement).value)}/>
            </div>        
            {(()=>{
                if(inputType==='password') return(
                    <div id='password-eye-icon' onClick={showHidePassword}>
                        <FontAwesomeIcon size='2x' icon={faEye}/>
                    </div>
                )
            })()}
        </div>
    )
}

interface AvatarChangerProps{    
    responseImage:string;
    updateImgB64:(image:string)=>void;
}

function AvatarChanger({responseImage,updateImgB64}:AvatarChangerProps){    
    const imageUploaderRef = useRef<HTMLInputElement>(null);
    const [image,updateImage] = useState<string>();
    
    const handleImageChange = (e:React.ChangeEvent)=>{
        let file = (e.target as HTMLInputElement).files![0]                
        console.log('Preparing to convert file!')
        blobToBase64(file).then((result:string)=>{
            console.log(result)
            updateImage(result) //Update the image INSIDE THE FORM.
            updateImgB64(result) //Update the image OUTSIDE THE FORM (for calling the API)           
        })

    }
    const blobToBase64 = (img:Blob)=>{
        return new Promise<string> ((resolve,reject)=>{
            let result = ''
            let reader = new FileReader();
            reader.readAsDataURL(img as Blob)
            reader.onload = ()=>{
                result = reader.result as string;
                resolve(result)
            }
            reader.onerror = (error)=> {
                reject(error);  
            }
        
    })
}
    useEffect(()=>{
        updateImage(responseImage)
    },[])
    
    
    const handleImageSubmit = ()=>{
        imageUploaderRef.current?.click();       
    }
    return(
        <div id='avatar-changer-container'>
             {(()=>{
                if(image===undefined) return(
                    <div className='question-mark'
                        id ='avatar-circle-image' >                        
                        <FontAwesomeIcon                         
                            size="8x" 
                            icon={faQuestion}></FontAwesomeIcon>
                    </div>
                )
                else return(
                    <img id='avatar-circle-image' 
                        src={image}>
                    </img>
                )
    
            })()}
            
            <div id='upload-btn' onClick={handleImageSubmit}>
                <FontAwesomeIcon size='1x' icon={faUpload} className='upload-btn-item'/>
                <div className='upload-btn-item'>Upload</div>
                <input style={{display:'none'}} type='file' ref={imageUploaderRef}
                    onChange={(e)=>handleImageChange(e)}/>
            </div>
           
        </div>
    )
}

interface EditProfileFormProps{
    showForm:boolean; 
    hideForm:()=>void;
    responseData:UserResponseData;
}


export default function EditProfileForm({showForm,hideForm,responseData}:EditProfileFormProps){     
    const API_URL = "https://localhost:7263/workpomodoro/update"        
    const TOKEN = localStorage.getItem('user-token');
    const [name,updateName] = useState<string>(null!)
    const [username,updateUsername] = useState<string>(null!)
    const [password,updatePassword] = useState<string>(null!)
    const [image,updateImage] = useState<string>(null!)
    const navigator = useNavigate()
    useEffect(()=>{
        updateName(responseData.name);
        updateImage(responseData.image);        
        updateUsername(responseData.username);
    },[])

    const config = {
        headers:{
            Authorization:'Bearer '+TOKEN
        },        
    }
    let body = {
        "name": name,
        "username": username,
        "password": password,
        "image":image
    }
   
    
    const handleSaveData = ()=>{
        axios.post(API_URL,body,config)
            .then(
                ()=>{
                    alert("Successfully updated user details! Please log in again to apply the changes.")
                    localStorage.removeItem("user-token")
                    window.location.reload();
                }
            )
            .catch(
                (reason)=>{
                    console.log(reason)
                }
            )            
    }

   
    if(!showForm)
        return null

    else return(
        /*Logic: Calls the function in the parent component (ProfileSection) 
        to close this form, since we can't close the form right inside of itself. */
        <span id='edit-profile-overlay'>
            <div id='exit-btn' onClick={hideForm}>
                <FontAwesomeIcon size='3x' icon={faX}/>
            </div>
            <div id='edit-profile-form'>
                <AvatarChanger responseImage={responseData.image} updateImgB64={updateImage}/>                    
                <div id='edit-profile-form-all-input-container'>                                        
                    <InputField label='Name' inputType='text' value={name} updateValue={updateName}/>            
                    <InputField label='Username' inputType='text' value={username} updateValue={updateUsername}/>           
                    <InputField label='Password' inputType='password' value={password} updateValue={updatePassword}/>                    
                </div>        
            </div>     
             <div id='save-btn' onClick={handleSaveData}>
                <FontAwesomeIcon className='save-btn-item' size='1x' icon={faSave}/>
                <div className='save-btn-item'>Save</div>
            </div>       
        </span>
    )

}