import './SongDetails.css'
import {useState} from 'react'

import {useEffect} from 'react'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import {forwardRef, useImperativeHandle,Ref} from 'react';
import { SongDetailsRef } from './SongDetailsRef'


export interface SongDetailsProps{
    isImageShown:boolean;
    videoUrl:string
}
export const SongDetails = forwardRef(({isImageShown,videoUrl}:SongDetailsProps,ref:Ref<SongDetailsRef>)=>{      
    
    
    const [thumbnailURL, updateThumbnailURL] = useState('')  
    const [title,updateTitle] = useState('')
    const [duration,updateDuration] = useState('')
    const apiKey = 'AIzaSyD6S2EldgZACFcDv5MOdA6k9TjCj9Nna5k'    

   
    useImperativeHandle(ref,()=>(
        {getTitle,getDuration,getImgUrl}
    ));
    function getTitle():string{        
        return title;
    }  
    function getDuration():string{
        return duration;
        
    }
    function getImgUrl():string{        
        return thumbnailURL;
    }
   


    function getVideoId(url:string):string{
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        if(match&&match[7].length==11)
            return match[7]
        return ''        
    }
    function extractVideoDetails(){        
        let noEmbedUrl = `https://noembed.com/embed?url=${videoUrl}`
        let vidId = getVideoId(videoUrl)
        let googleApiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${vidId}&part=contentDetails&key=${apiKey}`
        axios //updates the video thumbnail and title
            .get(noEmbedUrl)
            .then((response:AxiosResponse)=>{
                let title = response.data["title"]
                let thumbnailUrl = response.data["thumbnail_url"]
                console.log('Current title: '+title)
                console.log('Current thumbnailUrl: '+thumbnailUrl)
                updateTitle(title)
                updateThumbnailURL(thumbnailUrl)
            })
        axios
            .get(googleApiUrl)
            .then((response:AxiosResponse)=>{                
                var duration = response.data['items'][0]['contentDetails']['duration']                                
                var strippedDuration = duration.substring(2)
                var finalDuration = ''
                for (var charIndex=0;charIndex<strippedDuration.length;charIndex++){
                    var eachCharacter = strippedDuration[charIndex]
                    if(eachCharacter==='H'){
                        finalDuration+= ' Hours '
                    }
                    else if(eachCharacter==='M'){
                        finalDuration+= ' Minutes '
                    }
                    else if (eachCharacter==='S'){
                        finalDuration+= ' Seconds '
                    }else{
                        finalDuration+=eachCharacter;
                    }

                }
                updateDuration(finalDuration)
            })
    }

    useEffect(()=>{
        if(isImageShown===true){
            console.log("the process of filtering out the thumbnail begins!")                        
            extractVideoDetails();
            console.log('current thumbnail URL: '+thumbnailURL)
        }
        
        
    },[isImageShown])
    
    
    
    return (
        <div id='song-details-container'>           
            <div className='video-details-container'>
                <div className='details-title'>Name</div>
                <div className='details-content'>{title}</div>
            </div>
            <div className='video-details-container'>
                <div className='details-title'>Duration</div>
                <div className='details-content'>{duration}</div>
                <div id='video-thumbnail'>
                    <img src={thumbnailURL}></img>
                </div>
            </div>

        </div>
    );

}    
)