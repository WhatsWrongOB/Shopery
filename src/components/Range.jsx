import React, { useEffect, useState } from "react";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const MyRangeSlider = ({ min, max, getRange }) => {
  const [range, setRange] = useState({ min: min, max: max });
  const [value, setValue] = useState([min, max]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getRange(value[0], value[1]);
  }, [value]);

  return (
    <div className="pt-3">
      <RangeSlider
        min={range.min}
        max={range.max}
        step={5}
        value={value}
        onInput={handleChange}
      />
      <div className="flex gap-2 mt-2 py-4">
        <p>Price:</p>
        <span className="font-medium pb-2 text-sm">
          ${value[0]} - ${value[1]}
        </span>
      </div>
    </div>
  );
};

export default MyRangeSlider;
