import React from 'react'

export default function SequenceLengthDropdown({ changeSteps, sequenceLength }) {

  const range = Array.from(Array(13)).map((_, i) => i + 4)
  return (
    <label>
      Length
    <select onChange={changeSteps}>
      {
        range.map((amountOfSteps, i) => (
          <option 
            value={amountOfSteps} 
            key={i} 
            selected={sequenceLength === amountOfSteps}
          >
            { amountOfSteps }
          </option>
        ))
      }
    </select>
    </label>
  )

}
