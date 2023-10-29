import {useState,useEffect} from 'react'
export interface DownloadProgressProps{
    progress:string
}
export default function DownloadProgress({progress}:DownloadProgressProps){
    const [width,updateWidth] = useState('1000px');
    const [textColor,updateTextColor] = useState<string>('white')    
    const [pos,updatePos] = useState<string>('')
    useEffect(()=>{                
        updateProgress()    
        return(()=>{false})    
    })
    
    const getProgressInt = ():number=>{
        let regex = '\\d+'     
        let result = progress.match(regex)
        if(result===null) return 0
        else progress = result[0]
        return parseInt(progress)
    }
    const updateProgress = ()=>{        
        let numberSection = getProgressInt();
        
        if(0<numberSection && numberSection<100){
            updatePos('26.6%')
            let remainingWidth = 1000*numberSection/100            
            let actualWidth = 1000-remainingWidth            
            updateWidth(`${actualWidth}px`)
            if(numberSection>=30){
                updateTextColor('#000034')
            }           
        }else if (numberSection==100){
            updateWidth('0px')
        }else{
            updatePos('18%')
        }
        
        
    }
    const progBarFrame:{[key:string]:React.CSSProperties} ={
        container:{
            width:'1000px',
            height:'300px',            
            opacity:'100%',
            position:'absolute',
            right:'0.1%',            
            top:'0.5%',
            borderRadius:'25px'
        }
    }
    const progBarStyle:{[key:string]:React.CSSProperties} ={
        container:{
            width:width,            
            height:'300px',
            backgroundColor:'grey',
            opacity:'100%',
            position:'absolute',
            right:'0%',            
            top:'-0.6%',
            borderRadius:'30px'
        }
    }
    const progressTextStyle:{[key:string]:React.CSSProperties} ={
        container:{
            fontSize:'50px',
            fontWeight:'bold',
            position:'absolute',            
            textAlign:'center',
            left:pos,
            top:'30%',
            color:textColor 
        }
    }
    return(
        <div style={progBarFrame.container}> 
            <div style={progBarStyle.container}></div>
            <div style={progressTextStyle.container}>
                    {progress}
            </div>
        </div>
    )
}