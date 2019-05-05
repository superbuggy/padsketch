import React from 'react'
import RangeSlider from './RangeSlider'
import Step from './Step'

export default function Lane ({
  sequence,
  instrument,
  changePulses,
  toggleStep,
  changeOffset,
  pulses,
  offset,
  activeStep,
  ...props}) {

  const handlePulsesChange = pulses => { changePulses(instrument, pulses) }
  const handleOffsetChange = offset => { changeOffset(instrument, offset) }
  const handleStepToggle = step => { toggleStep(instrument, step) }

  return (
    <div className="instrument-lane">
    <section>
      { 
        sequence.map((stepHasPulse, index) => {
          return (
            <Step
              key={index}
              step={index}
              handleStepToggle={handleStepToggle}
              isPlaying={index === activeStep}
              isInPattern={stepHasPulse}
            />
          )}) 
      }
    </section>
    <section className="controls">
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
