import React, { useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { useSpring, a, config } from 'react-spring/three'

const Pad = props => {
  const { x, y, audioFile, setActiveSound } = props
  const [sound, setSound] = useState(null)
  const [active, setActive] = useState(false)
  const animProps = useSpring({
    color: active ? 'hotpink' : 'purple',
    planeColor: active ? 'black' : 'black',
    scale: active ? [0.9, 0.9, 0.9] : [1, 1, 1],
    planeScale: active ? [0.8, 0.8, 0.8] : [1, 1, 1],

    config: config.default,
  })

  const setActivePad = useCallback(() => {
    setActive(true)
    sound.stop()
    sound.play()
    setActiveSound(audioFile)

    setTimeout(function() {
      setActive(false)
    }, 200)
  }, [audioFile, setActiveSound, sound])
  useEffect(() => {
    let listener = new THREE.AudioListener()
    let sound = new THREE.Audio(listener)
    let audioLoader = new THREE.AudioLoader()
    audioLoader.load(audioFile.url, function(buffer) {
      sound.setBuffer(buffer)
      sound.play()
      sound.stop()

      sound.setVolume(1)
    })
    setSound(sound)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <group>
      <a.mesh
        onPointerDown={() => {
          setActivePad()
        }}
        position={[x, y, 2]}
        scale={animProps.scale}
        recieveShadow
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <a.meshPhongMaterial attach="material" color={animProps.color} />
      </a.mesh>
      <a.mesh scale={animProps.planeScale} castShadow position={[x, y, 2.51]}>
        <planeBufferGeometry attach="geometry" args={[0.8, 0.8, 0.1]} />
        <a.meshToonMaterial
          transparent={true}
          opacity={0.75}
          attach="material"
          color={props.planeColor}
        />
      </a.mesh>
    </group>
  )
}

export default Pad
