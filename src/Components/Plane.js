import React, { useMemo } from 'react'

const Plane = ({ activeSwitch }) => {
  const returnMaterial = useMemo(() => {
    if (activeSwitch === 0) {
      return <meshPhongMaterial attach="material" color="teal" />
    } else if (activeSwitch === 1) {
      return <meshMatcapMaterial attach="material" color="yellow" />
    } else {
      return <meshNormalMaterial attach="material" />
    }
  }, [activeSwitch])
  return (
    <group>
      <mesh position={[0, 0, -5]} receiveShadow castShadow>
        <planeBufferGeometry attach="geometry" args={[10000, 10000]} />
        {returnMaterial}
      </mesh>
    </group>
  )
}

export default Plane
