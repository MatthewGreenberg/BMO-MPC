import React from 'react'
import { useSpring, a, config } from 'react-spring/three'

const SwitchButton = ({
  position,
  number,
  activeSwitch,
  setActiveSwitch,
  name,
  setActiveSound,
}) => {
  const animProps = useSpring({
    color: number === activeSwitch ? 'deeppink' : 'white',

    config: config.default,
  })
  return (
    <mesh
      onClick={() => {
        setActiveSwitch(number)
        setActiveSound(name)
      }}
      position={position}
      scale={[0.4, 0.2, 0.1]}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshToonMaterial attach="material" color={animProps.color} />
    </mesh>
  )
}

export default SwitchButton
