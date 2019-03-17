import React from 'react'

export default function RangeSlider({ min, max, handleChange, value, label }) {

  const onChange = event => {
    event.persist()
    handleChange(parseInt(event.target.value, 10))
  }

  return (
    <label>
      {label}
      <input 
        type="range"
        min={min}
        max={max}
        step={1}
        onChange={onChange} 
        defaultValue={value}
        />
      {value}
    </label>
  )

}
