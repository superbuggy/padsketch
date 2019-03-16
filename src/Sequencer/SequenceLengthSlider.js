import React from 'react'

export default function SequenceLengthSlider({ min, max, changeSequenceLength, sequenceLength }) {

  // const range = Array.from({ length: max - min }).map((_, i) => i + 4)

  const onChange = event => {
    event.persist()
    changeSequenceLength(parseInt(event.target.value, 10))
  }

  return (
    <label>
      Length
      <input 
        type="range"
        min={min}
        max={max}
        step={1}
        onChange={onChange} 
        defaultValue={sequenceLength}
        />
      {sequenceLength}
    </label>
  )

}
