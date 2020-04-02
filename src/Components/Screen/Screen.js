import React from 'react'
import './screen.scss'
import ScreenDom from './ScreenDom'

const Screen = ({ activeSwitch, setEffectMode, effectMode }) => {
  function returnMaterial() {
    if (activeSwitch === 0) {
      return <meshToonMaterial attach="material" color="lightgray" />
    } else if (activeSwitch === 1) {
      return <meshToonMaterial attach="material" color="lightgray" />
    } else {
      return <meshNormalMaterial attach="material" />
    }
  }
  return (
    <group>
      <ScreenDom setEffectMode={setEffectMode} effectMode={effectMode} />

      <mesh recieveShadow position={[0, 2.75, 1.75]}>
        <boxBufferGeometry attach="geometry" args={[8, 3.25]} />
        {returnMaterial()}
      </mesh>
    </group>
  )
}

export default Screen
