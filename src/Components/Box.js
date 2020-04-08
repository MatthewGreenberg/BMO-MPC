import React, { Suspense, useMemo } from 'react'
import Pad from './Pads/Pad'
import Screen from './Screen/Screen'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import Dial from './Dial'
import audioFiles from '../AudioFiles'
import Text from './Text'
import Trim from './Trim'
import Eyes from './Eyes'
import { useSpring, a } from 'react-spring/three'
import SwitchButtons from './SwitchButtons'
import PadContainer from './Pads/PadContainer'
import { EffectContext } from '../EffectContext'

const Box = ({
  mouse,
  setHover,
  activeSwitch,
  setActiveSwitch,
  effectMode,
  setEffectMode,
}) => {
  const [activeSound, setActiveSound] = useState(audioFiles[activeSwitch].name)

  const { box } = useSpring({
    to: { box: 0 },
    from: { box: 25 },
    config: { mass: 2, tension: 150, friction: 20 },
  })

  const animProps = useSpring({
    rotation: effectMode ? [0, 0, 0] : [-Math.PI / 7.5, 0, 0],
  })

  const returnMaterial = useMemo(() => {
    console.log('foo')
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
      return <meshBasicMaterial attach="material" color="lightblue" />
    }
  }, [activeSwitch])

  return (
    <>
      <a.group
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        rotation={animProps.rotation}
        position={box.interpolate((y) => [0, y, 0])}
        recieveShadow
      >
        <mesh>
          <boxBufferGeometry attach="geometry" args={[10, 10, 4]} />
          {returnMaterial}
        </mesh>
        <PadContainer
          activeSwitch={activeSwitch}
          setActiveSound={setActiveSound}
        />
        <Screen
          effectMode={effectMode}
          activeSwitch={activeSwitch}
          setEffectMode={setEffectMode}
        />
        <Dial
          activeSwitch={activeSwitch}
          setEffectMode={setEffectMode}
          effectMode={effectMode}
        />
        <Suspense fallback={null}>
          <Text
            effectMode={effectMode}
            activeSwitch={activeSwitch}
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
