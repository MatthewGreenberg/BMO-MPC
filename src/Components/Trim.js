import React from 'react'

const Trim = props => {
  const { position } = props
  return (
    <mesh position={position}>
      <boxBufferGeometry attach="geometry" args={[10, 0.3, 0.1]} />
      <meshPhongMaterial
        transparent={true}
        opacity={0.4}
        attach="material"
        color="#222"
      />
    </mesh>
  )
}

export default Trim
