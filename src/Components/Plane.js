import React from 'react'

const Plane = () => {
  return (
    <group>
      <mesh position={[0, 0, -5]} receiveShadow castShadow>
        <planeBufferGeometry attach="geometry" args={[10000, 10000]} />
        <meshNormalMaterial attach="material" color="pink" />
      </mesh>
    </group>
  )
}

export default Plane
