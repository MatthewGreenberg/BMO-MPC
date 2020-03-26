import React, { useEffect, useState, useCallback } from 'react'
import { useSpring, a, config } from 'react-spring/three'

const Mouth = ({ activeSound }) => {
  const [active, setActive] = useState(false)

  useEffect(() => {
    changeMouth()
  }, [activeSound])

  const animProps = useSpring({
    scale: active ? [1.1, 1.5, 1] : [1, 1, 1],
    config: config.default,
  })

  function changeMouth() {
    setActive(true)
    setTimeout(() => setActive(false), 300)
  }

  return (
    <a.group
      rotation={[0, 0, -Math.PI / 2]}
      onClick={() => changeMouth()}
      scale={animProps.scale}
    >
      <mesh position={[-2.1, 0, 2.4]}>
        <a.circleGeometry args={[0.75, 3, 0]} attach="geometry" />
        <meshToonMaterial attach="material" color="black" />
      </mesh>
      <mesh position={[-2.1, 0, 2.41]}>
        <a.circleGeometry args={[0.5, 3, 0]} attach="geometry" />
        <meshToonMaterial attach="material" color="white" />
      </mesh>
    </a.group>
  )
}

export default Mouth
