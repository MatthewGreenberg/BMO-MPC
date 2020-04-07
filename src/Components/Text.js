import React, { useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { useLoader } from 'react-three-fiber'
import { useSpring, a } from 'react-spring/three'

const Text = ({ child, effectMode, activeSwitch }) => {
  const [active, setActive] = useState(true)
  const font = useLoader(
    THREE.FontLoader,
    process.env.PUBLIC_URL + 'MOONGET_Heavy.blob'
  )

  const returnMaterial = useMemo(() => {
    if (activeSwitch === 0) {
      return (
        <a.meshToonMaterial
          transparent={true}
          opacity={1}
          color="yellow"
          attach="material"
        />
      )
    } else if (activeSwitch === 1) {
      return (
        <a.meshToonMaterial
          transparent={true}
          opacity={1}
          color="yellow"
          attach="material"
        />
      )
    } else {
      return <meshBasicMaterial color="white" attach="material" />
    }
  }, [activeSwitch])

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
      {returnMaterial}
    </a.mesh>
  )
}

export default Text
