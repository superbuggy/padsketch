import React from 'react'
import ToneSlice from './ToneSlice'
import { pitchSets, CIRCLE_OF_FIFTHS } from './constants'
import { activeTonesAndInfoColor } from './styleConstants'

export const ToneCircle = ({
  activeTones,
  activeCount,
  tones,
  playing,
  play,
  stop
}) => {
  const SVG_SIZE = window.innerHeight * .7
  const VIEWBOX_ORIGIN = -1.1
  const VIEWBOX_SIZE = Math.abs(VIEWBOX_ORIGIN) * 2

  const slicePercentage = (1 / tones.length) || 50
  const toneSlices = tones.map((tone, index) => (
    <ToneSlice
      percentage={slicePercentage}
      order={index}
      key={index}
      tone={tone}
      active={activeTones.includes(tone)}
    />
  ))

  const svgStyle = {
    margin: `0 ${(window.innerWidth - SVG_SIZE) / 2}px`
  }

  return (
    <svg
      viewBox={`${VIEWBOX_ORIGIN} ${VIEWBOX_ORIGIN} ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
      style={svgStyle}
      height={SVG_SIZE}
      width={SVG_SIZE}
    >
      {toneSlices}
      <circle
        cx={0}
        cy={0}
        r={0.6}
        fill={'#086800'}
      />
      <text
        x={0}
        y={0}
        textAnchor={'middle'}
        fill={activeTonesAndInfoColor}
        strokeLinecap={'round'}
        strokeWidth={0.001}
        stroke={'#829345d0'}
        paintOrder={'stroke'}
        style={{
          fontSize: '0.12px'
        }}>
        {pitchSets[activeCount] ? `${pitchSets[activeCount]}` : ''}
      </text>
      <polygon
        onClick={playing ? stop : play}
        points={playing ? '-0.08, 0.20, -0.08, 0.36, 0.08, 0.36, 0.08, 0.20' : '-0.05, 0.2  -0.05, 0.4  0.10, 0.3'}
        fill={activeTonesAndInfoColor}
      />
    </svg>
  )
}
