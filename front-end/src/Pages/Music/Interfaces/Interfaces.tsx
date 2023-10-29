import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
export interface Song{    
    id:number;
    title:string;
    thumbnail:string;
    duration:string;
    audioBase64:string;
}
export interface MenuItem{      
    icon:IconDefinition
    label:string;
    color:string;
    function: ()=>void
}

export interface DbSong{
    key:string;
    value:Song;
}

