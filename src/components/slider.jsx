import "./slider.css"
import "./SortingVisualizer.css"
import React from "react";

const Slider = ({label, value, onChange, rangeMin, rangeMax, units}) => {
  // Directly call the passed onChange function with the new value
  const valueDisplayRef = React.useRef(null);

  // and update the display label directly without using state
  const handleChange = (e) => {
      const newValue = e.target.value;
      // Update the display value directly
      if (valueDisplayRef.current) {
          valueDisplayRef.current.innerText = `${newValue}${units}`;
      }
      onChange(newValue);
  };
    return (
      <div>
        <label id="slider-label">
          {label}
          <span ref={valueDisplayRef} id="slider-label">{value}{units}</span>
        </label>
        <input 
          type="range"
          min={rangeMin} // Assuming you want the minimum speed to be 1ms
          max={rangeMax} // And maximum to be something reasonable for visualization
          defaultValue={value} // Use the value from props
          onChange={handleChange}
        />
        
      </div>
    );
  };  

export default Slider;