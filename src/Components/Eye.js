import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { useSpring, a, config } from 'react-spring/three'

const Eye = ({ x, y, mouse }) => {
  const eyeBall = useRef()
  const [shut, setShut] = useState(false)

  const animProps = useSpring({
    scale: shut ? [0, 0, 0] : [1, 1, 1],
    config: config.molasses,
  })

  useFrame(() => {
    eyeBall.current.position.set(
      x + mouse.current[0] / 10000,
      y + 0.21,
      -3 + mouse.current[1] / 10000
    )
  })
  return (
    <group receiveShadow rotation={[Math.PI / 2, 0, 0]}>
      <mesh position={[x, y, -3]}>
        <sphereBufferGeometry args={[0.4, 32, 32]} attach="geometry" />
        <meshToonMaterial color="black" attach="material" />
      </mesh>
      <a.mesh
        scale={animProps.scale}
        ref={eyeBall}
        position={[x + 0.1, y + 0.21, -3]}
      >
        <sphereBufferGeometry args={[0.2, 32, 32]} attach="geometry" />
        <meshToonMaterial color="white" attach="material" />
      </a.mesh>
    </group>
  )
}

export default Eye
