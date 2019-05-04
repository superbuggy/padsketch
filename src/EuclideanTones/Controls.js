import React from 'react'
import RangeSlider from '../Sequencer/RangeSlider'

export const Controls = ({ 
  changeOffset,
  changeActiveCount,
  maxTones,
  activeCount,
  offset
}) => (
  <div>
    <RangeSlider
      min={0}
      max={maxTones}
      label={`${activeCount} ${activeCount === 1 ? 'Tone' : 'Tones'}`}
      value={activeCount}
      handleChange={changeActiveCount} />
    <RangeSlider
      min={0}
      max={maxTones - 1}
      value={offset}
      handleChange={changeOffset} />
  </div>
)

