import React, { useRef } from 'react'
import { useFrame } from 'react-three-fiber'

const Eye = ({ x, y, mouse }) => {
  const eyeBall = useRef()

  useFrame(() => {
    eyeBall.current.position.set(
      x + mouse.current[0] / 10000,
      y + 0.21,
      -3 + mouse.current[1] / 10000
    )
  })
  console.log(eyeBall, mouse)
  return (
    <group receiveShadow rotation={[Math.PI / 2, 0, 0]}>
      <mesh position={[x, y, -3]}>
        <sphereBufferGeometry args={[0.4, 32, 32]} attach="geometry" />
        <meshToonMaterial color="black" attach="material" />
      </mesh>
      <mesh ref={eyeBall} position={[x + 0.1, y + 0.21, -3]}>
        <sphereBufferGeometry args={[0.2, 32, 32]} attach="geometry" />
        <meshToonMaterial color="white" attach="material" />
      </mesh>
    </group>
  )
}

export default Eye
