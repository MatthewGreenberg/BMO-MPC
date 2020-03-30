import React, { useEffect, useState } from 'react'
import SwitchButton from './SwitchButton'
import * as THREE from 'three'

const SwitchButtons = ({
  activeSwitch,
  setActiveSwitch,
  audioFiles,
  setActiveSound,
}) => {
  const [loadedSound, setLoadedSound] = useState(null)
  useEffect(() => {
    const listener = new THREE.AudioListener()
    const sound = new THREE.Audio(listener)
    const audioLoader = new THREE.AudioLoader()

    audioLoader.load(
      'https://producertime.s3.us-east-2.amazonaws.com/jh_snare_one_shot_mid_click_ladder.wav',
      function(buffer) {
        sound.setBuffer(buffer)

        sound.setVolume(0.5)
        setLoadedSound(sound)
      }
    )
  }, [])
  return (
    <group>
      <SwitchButton
        activeSwitch={activeSwitch}
        setActiveSwitch={setActiveSwitch}
        number={0}
        position={[2.3, 0, 2]}
        setActiveSound={setActiveSound}
        name={audioFiles[0].name}
        loadedSound={loadedSound}
      />
      <SwitchButton
        activeSwitch={activeSwitch}
        setActiveSwitch={setActiveSwitch}
        number={1}
        position={[3.0, 0, 2]}
        setActiveSound={setActiveSound}
        name={audioFiles[1].name}
        loadedSound={loadedSound}
      />
      <SwitchButton
        activeSwitch={activeSwitch}
        setActiveSwitch={setActiveSwitch}
        number={2}
        position={[3.7, 0, 2]}
        setActiveSound={setActiveSound}
        name={audioFiles[2].name}
        loadedSound={loadedSound}
      />
    </group>
  )
}

export default SwitchButtons
