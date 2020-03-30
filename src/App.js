import React, {
  useRef,
  useCallback,
  useState,
  Suspense,
  useEffect,
} from 'react'
import './App.css'
import { Canvas } from 'react-three-fiber'
import Box from './Components/Box'
import Controls from './Components/Controls'
import Plane from './Components/Plane'
import Effects from './Components/Effects'
import Loading from './Components/Loading'
import * as THREE from 'three'

function App() {
  const mouse = useRef([300, -200])
  const [hovered, setHover] = useState(false)
  const [loading, setLoading] = useState(true)

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
          position: [0, 0, 13],
        }}
        gl={{ alpha: false, antialias: false, logarithmicDepthBuffer: true }}
        pixelRatio={window.devicePixelRatio}
        onCreated={({ gl, scene }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping
          gl.outputEncoding = THREE.sRGBEncoding
          // scene.background = new THREE.Color('#373740')
        }}
      >
        >
        <Controls />
        <spotLight
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          penumbra={1}
          castShadow
          intensity={0.5}
          position={[4, 10, 3]}
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
        <Plane />
        <Box mouse={mouse} setHover={setHover} />
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
