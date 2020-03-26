import React, { useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
import { useSpring, a, config } from 'react-spring/three'

const Text = ({ child }) => {
  const [active, setActive] = useState(true)
  const font = useLoader(
    THREE.FontLoader,
    process.env.PUBLIC_URL + 'MOONGET_Heavy.blob'
  )
  const config = useMemo(
    () => ({
      font,
      size: 0.3,
      height: 0.05,
      curveSegments: 32,
    }),
    [font]
  )

  useEffect(() => {
    setActive(true)
    setTimeout(() => setActive(false), 100)
  }, [child])

  const animProps = useSpring({
    position: active ? [-2.75, 1.35, 2.3] : [-3, 1.35, 2.3],

    config: config.default,
  })

  return (
    <a.mesh frustumCulled={false} receiveShadow position={animProps.position}>
      <textBufferGeometry attach="geometry" args={[child, config]} />
      <a.meshToonMaterial
        transparent={true}
        opacity={0.4}
        color="black"
        attach="material"
      />
    </a.mesh>
  )
}

export default Text
