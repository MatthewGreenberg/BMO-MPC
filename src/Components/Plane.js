import React from 'react'

const Plane = () => {
  return (
    <mesh position={[0, 0, -5]} receiveShadow castShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhysicalMaterial attach="material" color="pink" />
    </mesh>
  )
}

export default Plane
