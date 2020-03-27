import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { useSpring, a, config } from 'react-spring/three'

const Eye = ({ x, y, mouse }) => {
  const eyeBall = useRef()
  const [shut, setShut] = useState(false)

  const animProps = useSpring({
    scale: shut ? [0, 0, 0] : [1, 1, 1],
    config: config.molasses,
  })

  useFrame(() => {
    eyeBall.current.position.set(
      x + mouse.current[0] / 9000,
      y + mouse.current[1] / 9000,
      2.3
    )
  })
  return (
    <a.mesh ref={eyeBall}>
      <circleBufferGeometry args={[0.25, 32]} attach="geometry" />
      <meshToonMaterial color="#333" attach="material" />
    </a.mesh>
  )
}

export default Eye
