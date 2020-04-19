import React from 'react'
import { useSpring, a, config } from 'react-spring/three'

const SwitchButton = ({
  position,
  number,
  activeSwitch,
  setActiveSwitch,
  name,
  setActiveSound,
  loadedSound,
}) => {
  const animProps = useSpring({
    color: number === activeSwitch ? 'deeppink' : 'white',
    scale: number === activeSwitch ? [0.45, 0.25, 0.15] : [0.4, 0.2, 0.1],
    config: config.wobbly,
  })
  return (
    <a.mesh
      onPointerDown={() => {
        setActiveSwitch(number)
        setActiveSound(name)
        loadedSound.play()
      }}
      position={position}
      scale={animProps.scale}
      recieveShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <a.meshToonMaterial attach="material" color={animProps.color} />
    </a.mesh>
  )
}

export default SwitchButton
