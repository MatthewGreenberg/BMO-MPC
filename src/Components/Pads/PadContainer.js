import React, { useEffect, useState } from 'react'
import Pad from './Pad'
import { v1 as uuid } from 'uuid'
import audioFiles from '../../AudioFiles'

const PadContainer = ({ activeSwitch, setActiveSound }) => {
  const [pads, setPads] = useState([])
  const [padToggle, setPadToggle] = useState(false)
  const letters = [
    'z',
    'a',
    'q',
    '1',
    'x',
    's',
    'w',
    '2',
    'c',
    'd',
    'e',
    '3',
    'v',
    'f',
    'r',
    '4',
  ]

  useEffect(() => {
    let i = 0
    let arr = []

    for (let x = -3.5; x <= 0.5; x += 1.3)
      for (let y = -4; y <= 0; y += 1.3) {
        arr.push(
          <Pad
            setActiveSound={setActiveSound}
            key={uuid()}
            x={x}
            y={y}
            audioFile={audioFiles[activeSwitch].sounds[i]}
            padToggle={padToggle}
            setPadToggle={setPadToggle}
            letter={letters[i]}
            activeSwitch={activeSwitch}
          />
        )
        i++
      }
    setPads(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSwitch])
  return <group>{pads}</group>
}

export default PadContainer
