import React from 'react'

const Dial = () => {
  return (
    <mesh
      position={[3, -1.5, 2.25]}
      receiveShadow
      rotation={[Math.PI / 2, 0, 0]}
    >
      <cylinderBufferGeometry attach="geometry" args={[0.75, 0.75, 0.5, 32]} />
      <meshPhongMaterial attach="material" color="red" />
    </mesh>
  )
}

export default Dial
