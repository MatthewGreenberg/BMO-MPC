import React, { useState, useEffect } from 'react'
import { useSpring, a, config, useTransition } from 'react-spring/three'
import * as Tone from 'tone'

import Effect from './Effect'

const Effects = () => {
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
  const els = [
    <Effect
      setEffectAmount={setReverbAmount}
      name="revErb"
      effectAmount={reverbAmount}
      player={player}
      key={0}
    />,
    <Effect
      setEffectAmount={setDelayAmount}
      name="delAy"
      effectAmount={delayAmount}
      player={player}
      key={1}
    />,
    <Effect
      setEffectAmount={setDistortionAmount}
      name="distorTion"
      effectAmount={distortionAmount}
      player={player}
      key={2}
    />,
  ]
  const transitions = useTransition(els, item => item.key, {
    from: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
    enter: { transform: 'translate3d(0,0px,0)', opacity: 1 },
    leave: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
  })

  return transitions.map(({ item, props, key }) => (
    <a.div key={key} style={props}>
      {item}
    </a.div>
  ))
}

export default Effects
