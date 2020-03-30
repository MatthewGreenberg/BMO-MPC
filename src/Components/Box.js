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
import Eyes from './Eyes'
import { useSpring, a, config } from 'react-spring/three'
const Box = ({ mouse, setHover }) => {
  const [pads, setPads] = useState([])
  const [activeSwitch, setActiveSwitch] = useState(0)
  const [activeSound, setActiveSound] = useState(audioFiles[activeSwitch].name)
  const [padToggle, setPadToggle] = useState(false)

  const { box } = useSpring({
    to: { box: 0 },
    from: { box: 15 },
    delay: 500,
    config: { mass: 2, tension: 150, friction: 20 },
  })

  useEffect(() => {
    let i = 0
    let arr = []
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
            setHover={setHover}
          />
        )
        i++
      }
    setPads(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <a.group
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        rotation={[-Math.PI / 7.5, 0, 0]}
        position={box.interpolate(y => [0, y, 0])}
      >
        <Screen />
        <mesh recieveShadow>
          <boxBufferGeometry attach="geometry" args={[10, 10, 4]} />
          <meshToonMaterial
            specular={new THREE.Color('skyblue')}
            shininess={5}
            attach="material"
            color="teal"
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
        <Eyes x={-1.75} y={3} mouse={mouse} />
      </a.group>
    </>
  )
}

export default Box
