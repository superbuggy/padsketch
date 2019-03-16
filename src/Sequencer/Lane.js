import React from 'react'

export default function Lane ({steps, instrument, ...props}) {
  const stepsPerInstrument = steps.map(step => (
    <div
      key={step}
      className="step"
    />

  ))
  return (
    <div className="instrument-lane">
      { stepsPerInstrument }
      { instrument }
    </div>
  )
}
