import React from 'react'

export default function Lane ({steps, instrument, ...props}) {

  const stepsPerInstrument = steps.map((_, index) => (
    <div
      key={index}
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
