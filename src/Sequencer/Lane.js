import React from 'react'
import RangeSlider from './RangeSlider'

export default function Lane ({steps, instrument, changePulses, pulses, ...props}) {

  const handleChange = pulses => { changePulses(instrument, pulses) }

  return (
    <div className="instrument-lane">
      { 
        steps.map((isActive, index) => {return(
          <div
            key={index}
            className={`step ${isActive && 'active-cell'}`}
          />
        )}) 
      }
      { 
        `${instrument}` 
      }
      <RangeSlider 
        handleChange={handleChange}
        min={0}
        max={steps.length}
        value={pulses}
        label={'pulses'}
      />
    </div>
  )
}
