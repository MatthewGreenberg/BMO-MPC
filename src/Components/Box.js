import React, { Suspense } from 'react'
import Pad from './Pad'
import Screen from './Screen/Screen'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { v1 as uuid } from 'uuid'
import Dial from './Dial'
import audioFiles from '../AudioFiles'
import Text from './Text'
import Trim from './Trim'
import Eyes from './Eyes'
import { useSpring, a } from 'react-spring/three'
import SwitchButtons from './SwitchButtons'
const Box = ({
  mouse,
  setHover,
  activeSwitch,
  setActiveSwitch,
  effectMode,
  setEffectMode,
}) => {
  const [pads, setPads] = useState([])
  const [activeSound, setActiveSound] = useState(audioFiles[activeSwitch].name)
  const [padToggle, setPadToggle] = useState(false)

  const { box } = useSpring({
    to: { box: 0 },
    from: { box: 25 },
    config: { mass: 2, tension: 150, friction: 20 },
  })

  const animProps = useSpring({
    rotation: effectMode ? [0, 0, 0] : [-Math.PI / 7.5, 0, 0],
  })

  function returnMaterial() {
    if (activeSwitch === 0) {
      return (
        <meshToonMaterial
          specular={new THREE.Color('skyblue')}
          shininess={5}
          attach="material"
          color="teal"
        />
      )
    } else if (activeSwitch === 1) {
      return (
        <meshToonMaterial
          specular={new THREE.Color('white')}
          shininess={5}
          attach="material"
          color="white"
        />
      )
    } else {
      return <meshNormalMaterial attach="material" />
    }
  }

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
            activeSwitch={activeSwitch}
          />
        )
        i++
      }
    setPads(arr)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSwitch])
  return (
    <>
      <a.group
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        rotation={animProps.rotation}
        position={box.interpolate(y => [0, y, 0])}
      >
        <Screen
          effectMode={effectMode}
          activeSwitch={activeSwitch}
          setEffectMode={setEffectMode}
        />
        <mesh recieveShadow>
          <boxBufferGeometry attach="geometry" args={[10, 10, 4]} />
          {returnMaterial()}
        </mesh>
        <group>{pads}</group>
        <Dial
          activeSwitch={activeSwitch}
          setEffectMode={setEffectMode}
          effectMode={effectMode}
        />
        <Suspense fallback={null}>
          <Text
            effectMode={effectMode}
            child={activeSound.name || activeSound}
          />
        </Suspense>
        <pointLight
          color="hotpink"
          intensity={0.2}
          position={[0, 4, 3]}
          scale={[0.3, 0.3, 0.3]}
        />
        <Trim activeSwitch={activeSwitch} position={[0, -4.85, 2.05]} />
        <SwitchButtons
          audioFiles={audioFiles}
          setActiveSound={setActiveSound}
          setActiveSwitch={setActiveSwitch}
          activeSwitch={activeSwitch}
        />
        <Eyes x={-1.75} y={3} mouse={mouse} effectMode={effectMode} />
      </a.group>
    </>
  )
}

export default Box
