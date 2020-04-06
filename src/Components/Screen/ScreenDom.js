import React, { useState, useEffect } from 'react'
import Effect from './Effect'
import { Dom } from 'react-three-fiber'
import { useSpring, animated, config } from 'react-spring'
import * as Tone from 'tone'

const ScreenDom = ({ setEffectMode, effectMode }) => {
  const [reverbAmount, setReverbAmount] = useState(3)
  const [delayAmount, setDelayAmount] = useState(3)
  const [distortionAmount, setDistortionAmount] = useState(3)
  const [player, setPlayer] = useState(null)
  useEffect(() => {
    let tonePlayer = new Tone.Player(
      'https://producertime.s3.us-east-2.amazonaws.com/ct_prc_pound.wav'
    ).toMaster()
    tonePlayer.volume.value = -10
    setPlayer(tonePlayer)
  }, [])

  const animProps = useSpring({
    opacity: effectMode ? 0.7 : 0.00001,
    delay: effectMode ? 500 : 0,
    config: { duration: effectMode ? 1000 : 0 },
  })

  return (
    <Dom position={[-3, 2, 1.75]}>
      <animated.div
        style={{ opacity: animProps.opacity }}
        className="effects-wrapper"
      >
        <h1>CONTROLS</h1>
        <Effect
          setEffectAmount={setReverbAmount}
          name="reVerb"
          effectAmount={reverbAmount}
          player={player}
        />
        <Effect
          setEffectAmount={setDelayAmount}
          name="delAy"
          effectAmount={delayAmount}
          player={player}
        />
        <Effect
          setEffectAmount={setDistortionAmount}
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
