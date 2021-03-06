import React, {
  useRef,
  useCallback,
  useState,
  Suspense,
  useEffect,
} from 'react'
import './App.css'
import { Canvas, useFrame } from 'react-three-fiber'
import Box from './Components/Box'
import Controls from './Components/Controls'
import Plane from './Components/Plane'
import Loading from './Components/Loading'
import { useSpring, a } from 'react-spring/three'
import { EffectContext } from './EffectContext'
import Effects from './Components/Effects'
import * as THREE from 'three'
import Social from './Components/Social'
function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function Dolly({ effectMode }) {
  const [zIndex, set] = useState(13)
  const [active, setActive] = useState(false)
  const prevEffectMode = usePrevious({ effectMode })

  useEffect(() => {
    if (!prevEffectMode?.effectMode && effectMode) {
      setActive(true)
    } else {
      setTimeout(() => setActive(false), 500)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectMode])

  useFrame(({ _, camera }) => {
    if (!active) {
      return
    }
    if (effectMode) {
      camera.updateProjectionMatrix(
        void (camera.position.z > 6.5 ? (camera.position.z -= 0.5) : null),
        (camera.position.y = 2.5)
      )
    } else {
      camera.updateProjectionMatrix(
        void (camera.position.z < zIndex
          ? (camera.position.z += 0.3)
          : camera.position.z),
        (camera.position.y = 0)
      )
    }
  })

  return null
}

function App() {
  const mouse = useRef([300, -200])
  const [hovered, setHover] = useState(false)
  const [loading, setLoading] = useState(true)
  const [effectMode, setEffectMode] = useState(false)
  const [activeSwitch, setActiveSwitch] = useState(0)

  function isMobile() {
    return window.innerWidth < 600
  }

  const animProps = useSpring({
    angle: activeSwitch === 0 ? Math.PI / 6 : Math.PI / 3,
  })

  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  )

  useEffect(
    () => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'),
    [hovered]
  )
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <EffectContext.Provider>
      {loading && <Loading />}
      <Social />
      <Canvas
        shadowMap
        onMouseMove={onMouseMove}
        camera={{
          position: [0, 0, isMobile() ? 16 : 13],
        }}
        pixelRatio={window.devicePixelRatio}
      >
        <Controls effectMode={effectMode} />
        <a.spotLight
          penumbra={1}
          angle={animProps.angle}
          intensity={0.5}
          position={[4, 10, 5]}
          castShadow
        />
        <spotLight
          penumbra={1}
          intensity={0.25}
          position={[-10, 10, 3]}
          color="blue"
          castShadow
        />
        <pointLight
          penumbra={1}
          intensity={0.25}
          color="orange"
          position={[3, 1, 5]}
        />
        <pointLight
          penumbra={1}
          intensity={0.35}
          color="orange"
          position={[-3, -1, 5]}
        />
        <Plane activeSwitch={activeSwitch} />
        <Box
          activeSwitch={activeSwitch}
          setActiveSwitch={setActiveSwitch}
          mouse={mouse}
          setHover={setHover}
          setEffectMode={setEffectMode}
          effectMode={effectMode}
        />
        <Suspense fallback={null}>
          <Effects activeSwitch={activeSwitch} />
        </Suspense>
        {!isMobile() && <Dolly effectMode={effectMode} />}
      </Canvas>
    </EffectContext.Provider>
  )
}

export default App
