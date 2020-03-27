import React, { Suspense, useRef } from 'react'
import Pad from './Pad'
import Screen from './Screen'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { v1 as uuid } from 'uuid'
import Dial from './Dial'
import audioFiles from '../AudioFiles'
import Text from './Text'
import Trim from './Trim'
import SwitchButton from './SwitchButton'
import Eye from './Eye'
import Mouth from './Mouth'
const Box = ({ mouse }) => {
  const [pads, setPads] = useState([])
  const [activeSwitch, setActiveSwitch] = useState(0)
  const [activeSound, setActiveSound] = useState(audioFiles[activeSwitch].name)
  const [padToggle, setPadToggle] = useState(false)

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
          />
        )
        i++
      }
    setPads(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log('pad toggle is:', padToggle)
  return (
    <>
      <group rotation={[-Math.PI / 7.5, 0, 0]}>
        <Screen />
        <mesh recieveShadow>
          <boxBufferGeometry attach="geometry" args={[10, 10, 4]} />
          <meshToonMaterial
            specular={new THREE.Color('skyblue')}
            shininess={5}
            attach="material"
            color="#222222"
          />
        </mesh>
        <group>{pads}</group>
        <Dial />
        <Suspense fallback={null}>
          <Text child={activeSound.name || activeSound} />
        </Suspense>
        <pointLight
          color="hotpink"
          intensity={0.2}
          position={[0, 4, 3]}
          scale={[0.3, 0.3, 0.3]}
        />
        <Trim position={[0, -4.85, 2.05]} />
        <SwitchButton
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
          number={0}
          position={[2.3, 0, 2]}
          setActiveSound={setActiveSound}
          name={audioFiles[0].name}
        />
        <SwitchButton
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
          number={1}
          position={[3.0, 0, 2]}
          setActiveSound={setActiveSound}
          name={audioFiles[1].name}
        />
        <SwitchButton
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
          number={2}
          position={[3.7, 0, 2]}
          setActiveSound={setActiveSound}
          name={audioFiles[2].name}
        />
        <Eye x={2} y={2.2} mouse={mouse} />
        <Mouth activeSound={activeSound} />
        <Eye x={-2} y={2.2} mouse={mouse} />
      </group>
    </>
  )
}

export default Box
