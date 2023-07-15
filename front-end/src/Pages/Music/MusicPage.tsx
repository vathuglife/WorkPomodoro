
import './MusicPage.css'



export default function MusicPage(){           
    // let 
    // const getUserDetails = async()=>{
    //     await axios.get()

    // }
    
    return(                        
        <div className="main-container">
            <div className='songs-list-title'>Songs List</div>
            
            <iframe 
                id='youtube-search'
                src="https://www.youtube.com/watch?v=pfaSUYaSgRo&ab_channel=Fireship">

            </iframe>
            
        </div>                      
        
    )

   
}