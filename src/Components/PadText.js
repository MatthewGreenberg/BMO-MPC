import React, { useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
import { useSpring, a, config } from 'react-spring/three'

const PadText = ({ child, x, y, active }) => {
  const font = useLoader(
    THREE.FontLoader,
    process.env.PUBLIC_URL + 'MOONGET_Heavy.blob'
  )
  const config = useMemo(
    () => ({
      font,
      size: 0.3,
      height: 0.001,
      curveSegments: 32,
    }),
    [font]
  )

  const animProps = useSpring({
    scale: active ? [0.8, 0.8, 0.8] : [1, 1, 1],

    config: config.default,
  })

  return (
    <a.mesh
      frustumCulled={false}
      receiveShadow
      position={[x - 0.11, y - 0.1, 2.51]}
      scale={animProps.scale}
    >
      <textBufferGeometry attach="geometry" args={[child, config]} />
      <meshPhongMaterial
        transparent={true}
        opacity={0.5}
        color="purple"
        attach="material"
        shininess={100}
      />
    </a.mesh>
  )
}

export default PadText
