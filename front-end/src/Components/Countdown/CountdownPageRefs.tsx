export interface CountdownRefs{
    resetTimer:()=>void;
    pauseTimer:()=>void;    
    resumeTimer:()=>void;

}
export interface ToDoListRefs{
    getTopTask:()=>string;

}