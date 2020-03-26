import React from 'react'

const Screen = () => {
  return (
    <mesh recieveShadow position={[0, 2.75, 1.75]}>
      <boxBufferGeometry attach="geometry" args={[8, 3.25]} />
      <meshToonMaterial attach="material" color="lightgray" />
    </mesh>
  )
}

export default Screen
