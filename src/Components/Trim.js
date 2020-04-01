import React from 'react'

const Trim = ({ activeSwitch, position }) => {
  function returnMaterial() {
    if (activeSwitch === 0) {
      return (
        <meshPhongMaterial
          transparent={true}
          opacity={0.4}
          attach="material"
          color="#222"
        />
      )
    } else if (activeSwitch === 1) {
      return <meshToonMaterial shininess={5} attach="material" color="white" />
    } else {
      return <meshNormalMaterial attach="material" />
    }
  }
  return (
    <mesh position={position}>
      <boxBufferGeometry attach="geometry" args={[10, 0.3, 0.1]} />
      {returnMaterial()}
    </mesh>
  )
}

export default Trim
