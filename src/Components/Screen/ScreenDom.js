import React, { useState, useEffect, useContext } from 'react'
import Effect from './Effect'
import { Dom } from 'react-three-fiber'
import { useSpring, animated, config } from 'react-spring'
import * as Tone from 'tone'
import { EffectContext } from '../../EffectContext'

const ScreenDom = ({ setEffectMode, effectMode }) => {
  const effects = useContext(EffectContext)
  const [reverbAmount, setReverbAmount] = useState(0)
  const [delayAmount, setDelayAmount] = useState(0)
  const [distortionAmount, setDistortionAmount] = useState(0)
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    let tonePlayer = new Tone.Player(
      'https://producertime.s3.us-east-2.amazonaws.com/ct_prc_pound.wav'
    ).toMaster()
    tonePlayer.volume.value = -10
    setPlayer(tonePlayer)
  }, [])

  const animProps = useSpring({
    opacity: effectMode ? 0.7 : 0,
    delay: effectMode ? 500 : 0.01,
    config: { duration: effectMode ? 1000 : 0 },
  })

  function handleSetDistortion(type) {
    if (type === 'add') {
      effects.distortion.value += 0.1
      setDistortionAmount(distortionAmount + 1)
    } else {
      effects.distortion.value -= 0.1
      setDistortionAmount(distortionAmount - 1)
    }
  }

  function handleSetDelay(type) {
    if (type === 'add') {
      effects.delay.value += 0.1
      setDelayAmount(delayAmount + 1)
    } else {
      effects.delay.value -= 0.1
      setDelayAmount(delayAmount - 1)
    }
  }

  function handleSetReverb(type) {
    if (type === 'add') {
      effects.reverb.value += 0.1
      setReverbAmount(reverbAmount + 1)
    } else {
      effects.reverb.value -= 0.1
      setReverbAmount(reverbAmount - 1)
    }
  }
  console.log(distortionAmount)
  return (
    <Dom position={[-3, 2, 1.75]}>
      <animated.div
        style={{ opacity: animProps.opacity }}
        className="effects-wrapper"
      >
        <h1>CONTROLS</h1>
        <Effect
          setEffectAmount={handleSetReverb}
          name="reVerb"
          effectAmount={reverbAmount}
          player={player}
        />
        <Effect
          setEffectAmount={handleSetDelay}
          name="delAy"
          effectAmount={delayAmount}
          player={player}
        />
        <Effect
          setEffectAmount={handleSetDistortion}
          name="distorTion"
          effectAmount={distortionAmount}
          player={player}
        />
        <button onClick={() => setEffectMode(false)} className="exit-button">
          BACK
        </button>
      </animated.div>
    </Dom>
  )
}

export default React.memo(ScreenDom)
