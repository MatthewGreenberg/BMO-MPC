import * as Tone from 'tone'

export function Sampler() {
  const prefix = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/'
  const KD = 'C2' // Kick Drum
  const SD = 'D2' // Snare Drum (Clap)
  const CH = 'E2' // Closed Hat
  const OH = 'F2' // Open Hat
  const CY = 'G2' // Cymbal
  const CHA = 'A3' // Chant
  const TO = 'B3' // tom
  let kit = new Tone.Sampler({
    [KD]: `${prefix}808-Kick_27.wav`,
    [SD]: `${prefix}808-Snare_01.wav`,
    [CH]: `${prefix}808-Hat_Closed_01.wav`,
    [OH]: `${prefix}808-Hat_Open_01.wav`,
    [CY]: `${prefix}crash.WAV`,
    [CHA]: `${prefix}808-Chant_03.wav`,
    [TO]: `${prefix}tom.WAV`,
  })
  kit.toMaster()
  return kit
}
