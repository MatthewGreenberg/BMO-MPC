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
import Effects from './Components/Effects'
import Loading from './Components/Loading'
import { useSpring, a } from 'react-spring/three'

function Dolly({ effectMode }) {
  useFrame(({ _, camera }) => {
    if (effectMode) {
      camera.updateProjectionMatrix(
        void (camera.position.z > 5
          ? (camera.position.z -= 0.5)
          : camera.position.z,
        (camera.position.y = 2.5))
      )
    } else {
      camera.updateProjectionMatrix(
        void (camera.position.z < 13
          ? (camera.position.z += 0.5)
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
    <>
      {loading && <Loading />}
      <Canvas
        onMouseMove={onMouseMove}
        camera={{
          position: [0, 0, 15],
        }}
        gl={{ antialias: false }}
        pixelRatio={window.devicePixelRatio}
      >
        <Controls effectMode={effectMode} />
        <a.spotLight
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          penumbra={1}
          castShadow
          angle={animProps.angle}
          intensity={0.5}
          position={[4, 10, 5]}
        />
        <spotLight
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          penumbra={1}
          castShadow
          intensity={0.25}
          position={[-10, 10, 3]}
          color="blue"
        />
        <pointLight
          penumbra={1}
          castShadow
          intensity={0.25}
          color="orange"
          position={[3, 0, 5]}
        />
        <pointLight
          penumbra={1}
          castShadow
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
        {!isMobile() && (
          <Suspense fallback={null}>
            <Effects activeSwitch={activeSwitch} />
          </Suspense>
        )}
        <Dolly effectMode={effectMode} />
      </Canvas>
    </>
  )
}

export default App
