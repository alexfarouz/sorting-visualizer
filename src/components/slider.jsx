import "./slider.css"
import "./SortingVisualizer.css"

const Slider = ({label, value, onChange, rangeMin, rangeMax, units}) => {
    // Directly call the passed onChange function with the new value
    const handleChange = (e) => {
      onChange(e.target.value);
    };
    return (
      <div>
        <label id="slider-label">
          {label}
          <span id="slider-label">{value}{units}</span>
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
