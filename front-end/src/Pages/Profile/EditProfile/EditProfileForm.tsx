import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './EditProfileForm.css'
import { faX } from '@fortawesome/free-solid-svg-icons';
import {useRef,useState} from 'react'
import { faQuestion,faUpload,faSave,faEye } from '@fortawesome/free-solid-svg-icons';


interface EditProfileFormProps{
    showForm:boolean; 
    hideForm:()=>void;
}
interface InputFieldProps{
    label:string;
    inputType:string;
}
function InputField({label,inputType}:InputFieldProps){
    const [isPassword,updateIsPassword] = useState(inputType);
    const showHidePassword = ()=>{
        if(isPassword==='password') updateIsPassword('text')
        else updateIsPassword('password')
    }
    return (        
        <div id='edit-profile-form-input-container'>
            <div className='edit-profile-form-input-label'>{label}</div>
            <div className='edit-profile-form-input-wrapper'>                
                <input type={isPassword} className='edit-profile-form-input'/>
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
function AvatarChanger(){
    const imageUploaderRef = useRef<HTMLInputElement>(null);
    const [image,updateImage] = useState<File>();
    const handleImageChange = (e:React.ChangeEvent)=>{
        let file = (e.target as HTMLInputElement).files![0]
        console.log('Current image file: '+file)
        updateImage(file)
    }

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
                        src={URL.createObjectURL(image)}>
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

export default function EditProfileForm({showForm,hideForm}:EditProfileFormProps){     
    
    const handleSaveData = ()=>{

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
                <AvatarChanger/>                    
                <div id='edit-profile-form-all-input-container'>                                        
                    <InputField label='Name' inputType='text'/>            
                    <InputField label='Username' inputType='text'/>           
                    <InputField label='Password' inputType='password'/>                    
                </div>        
            </div>     
             <div id='save-btn' onClick={handleSaveData}>
                <FontAwesomeIcon className='save-btn-item' size='1x' icon={faSave}/>
                <div className='save-btn-item'>Save</div>
            </div>       
        </span>
    )

}