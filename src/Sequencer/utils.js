// Bjorklund algorithm from https://gist.github.com/withakay/1286731

/*
An implementation of the Bjorklund algorithm in JavaScript
Inspired by the paper 'The Euclidean Algorithm Generates Traditional Musical Rhythms'
by Godfried Toussaint

This is a port of the original algorithm by E. Bjorklund which I
found in the paper 'The Theory of Rep-Rate Pattern Generation in the SNS Timing Systems' by
E. Bjorklund.
Jack Rutherford
*/

export function generatePattern (length, pulses) {
  if ( pulses === 0 ) return Array.from({ length }).fill(false)
  length = Math.round(length)
  pulses = Math.round(pulses)

  if (pulses > length || pulses === 0 || length === 0) {
    return []
  }

  let pattern = []
  let counts = []
  let remainders = []
  let divisor = length - pulses
  remainders.push(pulses)
  let level = 0

  while (true) {
    counts.push(Math.floor(divisor / remainders[level]))
    remainders.push(divisor % remainders[level])
    divisor = remainders[level]
    level += 1
    if (remainders[level] <= 1) {
      break
    }
  }

  counts.push(divisor)

  const builder = () => {
    let r = 0
    return function build (level) {
      r += 1
      if (level > -1) {
        for (var i = 0; i < counts[level]; i++) {
          build(level - 1)
        }
        if (remainders[level] !== 0) {
          build(level - 2)
        }
      } else if (level === -1) {
        pattern.push(false)
      } else if (level === -2) {
        pattern.push(true)
      }
    }
  }

  builder()(level)
  return pattern.reverse()
}

export function rotate (array, times) {
  if (!array.length) return []
  if (!times) return array
  let rotatedArray = array.slice()
  let count = 0
  while (count < times) {
    rotatedArray.push(rotatedArray.shift()) //rotate left
    count += 1
  }
  return rotatedArray
}
