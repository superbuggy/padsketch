import React from 'react'
import RangeSlider from './RangeSlider'

export default function Lane ({
  sequence,
  instrument,
  changePulses,
  changeOffset,
  pulses,
  offset,
  activeStep,
  ...props}) {

  const handlePulsesChange = pulses => { changePulses(instrument, pulses) }
  const handleOffsetChange = offset => { changeOffset(instrument, offset) }

  return (
    <div className="instrument-lane">
    <section>
      { 
        sequence.map((isActive, index) => {
          return (
            <div
              key={index}
              className={`step ${isActive && 'active-cell'} ${index === activeStep && 'active-step'}`}
            />
          )}) 
      }
    </section>
    <section>
      <p>{instrument}</p>
      <RangeSlider 
        handleChange={handlePulsesChange}
        min={0}
        max={sequence.length}
        value={pulses}
        label={'Pulses'}
      />
      <RangeSlider 
        handleChange={handleOffsetChange}
        min={0}
        max={sequence.length}
        value={offset}
        label={'Offset'}
      />
    </section>
    </div>
  )
}
