import React from 'react'
import * as Tone from 'tone'

const effects = {
  distortion: {
    instance: new Tone.Chebyshev(50).toMaster(),
    value: 0.0,
  },
  reverb: { instance: new Tone.Freeverb().toMaster(), value: 0.0 },
  delay: {
    instance: new Tone.PingPongDelay('8n', 0.5).toMaster(),
    value: 0.0,
  },
}

export const EffectContext = React.createContext(effects)
