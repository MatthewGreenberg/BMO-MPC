import React, {
  useEffect,
  useState,
  useCallback,
  Suspense,
  useMemo,
  useContext,
} from 'react'
import * as Tone from 'tone'
import { EffectContext } from '../../EffectContext'
import { useSpring, a, config } from 'react-spring/three'
import PadText from '../PadText'

const Pad = ({
  x,
  y,
  audioFile,
  setActiveSound,
  setPadToggle,
  padToggle,
  letter,
  activeSwitch,
  kit,
}) => {
  const [player, setPlayer] = useState(null)
  const [active, setActive] = useState(false)
  const animProps = useSpring({
    color: active ? 'hotpink' : 'purple',
    planeColor: active ? 'pink' : 'white',
    scale: active ? [0.9, 0.9, 0.9] : [1, 1, 1],
    planeScale: active ? [0.8, 0.8, 0.8] : [1, 1, 1],
    config: config.default,
  })

  const effects = useContext(EffectContext)
  const { distortion, reverb, delay } = effects

  const returnMaterial = useMemo(() => {
    if (activeSwitch === 0) {
      return (
        <a.meshPhongMaterial
          emissive="#222"
          attach="material"
          color={animProps.color}
          emissiveintensity={100}
          shininess={100}
        />
      )
    } else if (activeSwitch === 1) {
      return (
        <a.meshPhongMaterial
          emissive="#888"
          attach="material"
          color={animProps.color}
        />
      )
    } else {
      return <meshNormalMaterial attach="material" />
    }
  }, [activeSwitch, animProps.color])

  function returnPlaneMaterial() {
    if (activeSwitch === 0) {
      return (
        <a.meshToonMaterial
          transparent={true}
          opacity={0.75}
          attach="material"
          color={animProps.planeColor}
          shininess={100}
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
    (player) => {
      setActive(true)
      player.stop().start()
      setActiveSound(audioFile)
      setPadToggle(!padToggle)
      setTimeout(function () {
        setActive(false)
      }, 100)
    },
    [audioFile, padToggle, setActiveSound, setPadToggle]
  )
  useEffect(() => {
    if (!player) {
      return
    }
    const distortionInstance = distortion.instance
    player.connect(distortionInstance)

    distortionInstance.wet.value = distortion.value
  }, [distortion.instance, distortion.value, player])

  useEffect(() => {
    if (!player) {
      return
    }
    const reverbInstance = reverb.instance
    player.connect(reverbInstance)
    reverbInstance.wet.value = reverb.value
  }, [player, reverb.instance, reverb.value])

  useEffect(() => {
    if (!player) {
      return
    }
    const delayInstance = delay.instance
    player.connect(delayInstance)

    delayInstance.wet.value = delay.value
  }, [delay.instance, delay.value, distortion.value, player])

  useEffect(() => {
    const player = new Tone.Player({
      url: audioFile.url,
    }).toMaster()

    player.volume.value = -18
    setPlayer(player)
    function handleKeydown(e) {
      const keyName = e.key
      if (keyName === letter) {
        setActivePad(player)
      }
    }

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
            setActivePad(player)
          }}
          position={[x, y, 2]}
          scale={animProps.scale}
          recieveShadow
        >
          <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
          {returnMaterial}
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
