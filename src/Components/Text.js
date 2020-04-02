import React, { useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
import { useSpring, a, config } from 'react-spring/three'

const Text = ({ child, effectMode }) => {
  const [active, setActive] = useState(true)
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

  useEffect(() => {
    setActive(true)
    setTimeout(() => setActive(false), 100)
  }, [child])

  const animProps = useSpring({
    position: active ? [-3.25, 1.37, 2.3] : [-3.5, 1.37, 2.3],
    scale: effectMode ? [0.00001, 0.00001, 0.00001] : [1, 1, 1],
    config: config.default,
  })

  return (
    <a.mesh
      scale={animProps.scale}
      frustumCulled={false}
      receiveShadow
      position={animProps.position}
    >
      <textBufferGeometry attach="geometry" args={[child, config]} />
      <a.meshToonMaterial
        transparent={true}
        opacity={1}
        color="yellow"
        attach="material"
      />
    </a.mesh>
  )
}

export default Text
