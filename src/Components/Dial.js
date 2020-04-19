import React, { useMemo } from 'react'

const Dial = ({ activeSwitch, setEffectMode, effectMode }) => {
  const returnMaterial = useMemo(() => {
    if (activeSwitch === 0) {
      return <meshPhongMaterial attach="material" color="red" shininess={100} />
    } else if (activeSwitch === 1) {
      return <meshBasicMaterial attach="material" color="red" />
    } else {
      return <meshNormalMaterial attach="material" />
    }
  }, [activeSwitch])
  return (
    <mesh
      position={[3, -1.75, 2.25]}
      receiveShadow
      rotation={[Math.PI / 2, 0, 0]}
      onPointerDown={() => setEffectMode(!effectMode)}
    >
      <cylinderBufferGeometry attach="geometry" args={[0.75, 0.75, 0.5, 32]} />
      {returnMaterial}
    </mesh>
  )
}

export default Dial
