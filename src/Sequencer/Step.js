import React from 'react'

export default function Step ({
  step,
  isInPattern,
  isPlaying,
  handleStepToggle,
  ...props
}) {
  const handleClick = event => { handleStepToggle(step)  }
  return (
    <div
      className={`step ${isInPattern && 'active-cell'} ${isPlaying && 'step-playing'}`}
      onClick={handleClick}
    />
  )
}