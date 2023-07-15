import './ProgressBar.css'
export interface progressBarProps{
    timeRemainingText: string;    
    progressBarValue: string;    
}
/*Note: Props is basically Propeties of the ProgressBar object, including
- The time remaining on the screen
- The percentage remaining on the progress bar.
Props allows the parent component (CountdownPage) to update the time and percentage
values of the ProgressBar Component. */
export default function ProgressBar({timeRemainingText,progressBarValue}:progressBarProps){
    
   
    return (
        <div>
            <h1>{timeRemainingText}</h1>
                <div className="progress-bar">
                <div className="progress-fill"
                    style={{
                        width:progressBarValue
                    }}
                    
                ></div> {/*The style attribute allows us to edit the CSS progress bar width
            by using code, NOT from CSS file. */}
            </div>
        </div>
    );
}