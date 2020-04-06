import React, { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { extend, useFrame, useThree } from 'react-three-fiber'

extend({ OrbitControls })

const Controls = ({ effectMode }) => {
  const { camera, gl } = useThree()
  const orbitRef = useRef()
  useFrame(() => {
    orbitRef.current.update()
  })

  return (
    <orbitControls
      enableZoom={false}
      enablePan={false}
      ref={orbitRef}
      args={[camera, gl.domElement]}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      maxAzimuthAngle={effectMode ? 0 : Math.PI / 6}
      minAzimuthAngle={effectMode ? 0 : -Math.PI / 6}
    />
  )
}

export default Controls
