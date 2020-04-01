import React from 'react'

const Dial = ({ activeSwitch }) => {
  function returnMaterial() {
    if (activeSwitch === 0) {
      return <meshPhongMaterial attach="material" color="red" />
    } else if (activeSwitch === 1) {
      return <meshPhongMaterial attach="material" color="red" />
    } else {
      return <meshNormalMaterial attach="material" />
    }
  }
  return (
    <mesh
      position={[3, -1.5, 2.25]}
      receiveShadow
      rotation={[Math.PI / 2, 0, 0]}
    >
      <cylinderBufferGeometry attach="geometry" args={[0.75, 0.75, 0.5, 32]} />
      {returnMaterial()}
    </mesh>
  )
}

export default Dial
