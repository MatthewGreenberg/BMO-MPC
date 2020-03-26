import React from 'react'

const Eye = ({ x, y }) => {
  return (
    <group receiveShadow rotation={[Math.PI / 2, 0, 0]}>
      <mesh position={[x, y, -3]}>
        <sphereBufferGeometry args={[0.4, 32, 32]} attach="geometry" />
        <meshToonMaterial color="black" attach="material" />
      </mesh>
      <mesh position={[x + 0.1, y + 0.21, -3]}>
        <sphereBufferGeometry args={[0.2, 32, 32]} attach="geometry" />
        <meshToonMaterial color="white" attach="material" />
      </mesh>
    </group>
  )
}

export default Eye
