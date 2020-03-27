import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { useSpring, a, config } from 'react-spring/three'

const Eyes = ({ x, y, mouse }) => {
  const eyeBall = useRef()
  const eyeBall2 = useRef()
  let timer = useRef()

  const [shut, setShut] = useState(false)

  useEffect(() => {
    function toggleShut() {
      let timeArray = [3200, 2750, 2500, 3000, 2000, 1500]

      handleShutEye()

      clearInterval(timer.current)
      timer.current = setInterval(toggleShut, randRange(timeArray))
    }
    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    }

    function handleShutEye() {
      setShut(true)
      setTimeout(() => setShut(false), randomNumber(100, 500))
    }

    toggleShut()
  }, [])

  const animProps = useSpring({
    scale: shut ? [1, 0, 0] : [1, 1, 1],
    config: { duration: 250 },
  })

  function randRange(data) {
    var newTime = data[Math.floor(data.length * Math.random())]
    return newTime
  }

  useFrame(() => {
    eyeBall.current.position.set(
      x + mouse.current[0] / 9000,
      y + mouse.current[1] / 9000,
      2.3
    )
    eyeBall2.current.position.set(
      -x + mouse.current[0] / 9000,
      y + mouse.current[1] / 9000,
      2.3
    )
  })

  return (
    <group>
      <a.mesh scale={animProps.scale} ref={eyeBall}>
        <circleBufferGeometry args={[0.25, 32]} attach="geometry" />
        <meshToonMaterial color="#333" attach="material" />
      </a.mesh>
      <a.mesh scale={animProps.scale} ref={eyeBall2}>
        <circleBufferGeometry args={[0.25, 32]} attach="geometry" />
        <meshToonMaterial color="#333" attach="material" />
      </a.mesh>
    </group>
  )
}

export default Eyes
