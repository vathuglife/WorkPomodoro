export interface CountdownRefs{
    resetTimer:(duration:number)=>void;
    pauseTimer:()=>void;    
    resumeTimer:()=>void;

}
export interface ToDoListRefs{
    getTopTask:()=>string;

}