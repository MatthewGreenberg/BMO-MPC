import React, { useRef, useCallback, useState } from 'react'
import './App.css'
import { Canvas, Dom } from 'react-three-fiber'
import Box from './Components/Box'
import Controls from './Components/Controls'
import Plane from './Components/Plane'

function App() {
  const mouse = useRef([300, -200])
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  )
  return (
    <Canvas
      onMouseMove={onMouseMove}
      camera={{
        position: [0, 0, 14],
      }}
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

      <Plane />

      <Box mouse={mouse} />
    </Canvas>
  )
}

export default App
