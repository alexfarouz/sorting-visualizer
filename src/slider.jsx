const Slider = ({ref, value, onChange }) => {
    // Directly call the passed onChange function with the new value
    const handleChange = (e) => {
      onChange(e.target.value);
    };
    return (
      <div>
        <input 
          type="range"
          min="1" // Assuming you want the minimum speed to be 1ms
          max="10" // And maximum to be something reasonable for visualization
          value={value} // Use the value from props
          onChange={handleChange}
        />
      </div>
    );
  };  

export default Slider;
