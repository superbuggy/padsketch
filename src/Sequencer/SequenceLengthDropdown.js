import React from 'react'

export default function SequenceLengthDropdown({ changeSequenceLength, sequenceLength }) {

  const range = Array.from({ length: 13}).map((_, i) => i + 4)

  const onChange = event => {
    event.persist()
    changeSequenceLength(parseInt(event.target.value, 10))
  }

  return (
    <label>
        Length
      <select
        onChange={onChange}
        defaultValue={sequenceLength}
      >
        {
          range.map((amountOfSteps, i) => (
            <option 
              value={amountOfSteps} 
              key={i} 
            >
              { amountOfSteps }
            </option>
          ))
        }
      </select>
    </label>
  )

}
