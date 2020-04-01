import React, { useEffect, useState, useCallback, Suspense } from 'react'
import * as THREE from 'three'
import { useSpring, a, config } from 'react-spring/three'
import PadText from './PadText'

const Pad = ({
  x,
  y,
  audioFile,
  setActiveSound,
  setPadToggle,
  padToggle,
  letter,
  activeSwitch,
}) => {
  const [sound, setSound] = useState(null)
  const [active, setActive] = useState(false)
  const animProps = useSpring({
    color: active ? 'hotpink' : 'purple',
    planeColor: active ? 'pink' : 'white',
    scale: active ? [0.9, 0.9, 0.9] : [1, 1, 1],
    planeScale: active ? [0.8, 0.8, 0.8] : [1, 1, 1],
    config: config.default,
  })

  function returnMaterial() {
    if (activeSwitch === 0) {
      return <a.meshPhongMaterial attach="material" color={animProps.color} />
    } else if (activeSwitch === 1) {
      return <a.meshPhongMaterial attach="material" color={animProps.color} />
    } else {
      return <meshNormalMaterial attach="material" />
    }
  }

  function returnPlaneMaterial() {
    if (activeSwitch === 0) {
      return (
        <a.meshToonMaterial
          transparent={true}
          opacity={0.75}
          attach="material"
          color={animProps.planeColor}
        />
      )
    } else if (activeSwitch === 1) {
      return (
        <a.meshToonMaterial
          transparent={true}
          opacity={0.75}
          attach="material"
          color={animProps.planeColor}
        />
      )
    } else {
      return <meshNormalMaterial attach="material" />
    }
  }

  const setActivePad = useCallback(
    sound => {
      setActive(true)
      if (sound.isPlaying) {
        sound.stop()
      }
      sound.play()
      setActiveSound(audioFile)
      setPadToggle(!padToggle)

      setTimeout(function() {
        setActive(false)
      }, 200)
    },
    [audioFile, padToggle, setActiveSound, setPadToggle]
  )

  useEffect(() => {
    function handleKeydown(e) {
      const keyName = e.key
      if (keyName === letter) {
        setActivePad(sound)
      }
    }
    const listener = new THREE.AudioListener()
    const sound = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()

    audioLoader.load(audioFile.url, function(buffer) {
      sound.setBuffer(buffer)

      sound.setVolume(0.5)
    })

    setSound(sound)

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioFile])
  return (
    <>
      <Suspense fallback={null}>
        <PadText active={active} x={x} y={y} child={letter} />
      </Suspense>
      <group>
        <a.mesh
          onPointerDown={() => {
            setActivePad(sound)
          }}
          position={[x, y, 2]}
          scale={animProps.scale}
          recieveShadow
        >
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          {returnMaterial()}
        </a.mesh>
        <a.mesh scale={animProps.planeScale} castShadow position={[x, y, 2.51]}>
          <planeBufferGeometry attach="geometry" args={[0.8, 0.8, 0.1]} />
          {returnPlaneMaterial()}
        </a.mesh>
      </group>
    </>
  )
}

export default Pad
