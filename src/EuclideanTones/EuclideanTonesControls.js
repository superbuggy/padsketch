import React from 'react'
import RangeSlider from '../Sequencer/RangeSlider'

export const EuclideanTonesControls = ({ 
  changeOffset,
  changeActiveCount,
  maxTones,
  activeCount,
  offset
}) => (
  <div className={'euclidean-tones-controls'}>
    <RangeSlider
      min={0}
      max={maxTones}
      label={`${activeCount === 1 ? 'Tone' : 'Tones'}`}
      value={activeCount}
      handleChange={changeActiveCount} />
    <RangeSlider
      min={0}
      max={maxTones - 1}
      label={`Offset`}
      value={offset}
      handleChange={changeOffset} />
  </div>
)

