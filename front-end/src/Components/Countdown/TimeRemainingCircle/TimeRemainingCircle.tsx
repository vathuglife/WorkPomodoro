import './TimeRemainingCircle.css'



const TimeRemainingCircle = (props:any) => {
    let {
      size = 300,
      timeRemaining = props.timeRemText, //The timer text - for displaying purposes
      secsRemaining = props.timeRemSecs, //The secs remaining - for the progress bar to decrease
      trackWidth = 10,
      trackColor = `#ddd`,
      indicatorWidth = 10,
      indicatorColor = `#07c`,
      indicatorCap = `round`,
      label = `Time Remaining`,
      labelColor = `#333`,
      spinnerMode = false,
      spinnerSpeed = 1
    } = props    
    const center = size / 2,
          radius = center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
          dashArray = 2 * Math.PI * radius,
          dashOffset = dashArray * ((1500 - secsRemaining) / 1500 )//updates the blue progress circle.
          
  
    let hideLabel = (size < 100 || !label.length || spinnerMode) ? true : false
  
    return (
      <>
        <div
          className="svg-pi-wrapper"
          style={{ width: size, height: size }}
        >
          <svg
            className="svg-pi" 
            style={{ width: size, height: size }}
          >
            <circle
              className="svg-pi-track"
              cx={center}
              cy={center}
              fill="transparent"
              r={radius}
              stroke={trackColor}
              strokeWidth={trackWidth}
            />
            <circle
              className={`svg-pi-indicator ${
                spinnerMode ? "svg-pi-indicator--spinner" : ""
              }`}
              style={{ animationDuration: (spinnerSpeed * 1000).toString() }}
              cx={center}
              cy={center}
              fill="transparent"
              r={radius}
              stroke={indicatorColor}
              strokeWidth={indicatorWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap={indicatorCap}
            />
          </svg>
  
          {!hideLabel && (
            <div 
              className="svg-pi-label" 
              style={{ color: labelColor }}
            >
              <span className="svg-pi-label__loading">
                {label}
              </span>
  
              {!spinnerMode && (
                <span className="svg-pi-label__timeRemaining">
                  {`${timeRemaining > 100 ? 100 : timeRemaining}`}
                </span>
              )}
            </div>
          )}
        </div>
      </>
    )
  }

export default TimeRemainingCircle;