const audioFiles = {
  0: {
    name: 'kit 1',
    sounds: [
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/808-Kick_27.wav',
        name: 'kick',
        pitch: 'c1',
        key: 'z',
      },
      {
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/snare2.wav',
        name: 'snare',

        pitch: 'C#1',
        key: 'x',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/AL_rhodes_chord_Gmaj.wav',
        name: 'gmaj7',
        pitch: 'D1',
        key: 'c',
      },
      {
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/sub-bass.wav',
        name: 'sub bass',
        pitch: 'D#1',
        key: 'v',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/808-Hat_Closed_01.wav',
        name: 'hat',

        pitch: 'E1',
        key: 'a',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/808-Hat_Open_01.wav',
        name: 'open hat',
        pitch: 'F1',
        key: 's',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/AL_piano_chord_Asus.wav',
        name: 'asus',
        pitch: 'F#1',
        key: 'd',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/AL_piano_chord_D7%235.wav',
        name: 'd7',
        pitch: 'G1',
        key: 'f',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/808-Snare_01.wav',
        name: 'snare',
        pitch: 'A2',
        key: 'q',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/rim.wav',
        name: 'rim',
        pitch: 'A#2',
        key: 'w',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/AL_rhodes_chord_Gb7_%239b13.wav',
        name: 'gb7',
        pitch: 'B2',
        key: 'e',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/D7%235.wav',
        name: 'd7#5',
        pitch: 'C2',
        key: 'r',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/808-Clap_02.wav',
        name: 'clap',
        pitch: 'C#2',
        key: '1',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/splash.wav',
        name: 'splash',
        pitch: 'D2',
        key: '2',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/pluck.wav',
        name: 'gb7',
        pitch: 'D#2',
        key: '3',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/Ab7b13.wav',
        name: 'ab7b13',
        pitch: 'E2',
        key: '4',
      },
    ],
  },
  1: {
    name: 'kit 2',
    sounds: [
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/ct_kick_senseless.wav',
        name: 'kick',
        pitch: 'C1',
        key: 'z',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/808-Hat_Closed_01.wav',
        name: 'hat',
        pitch: 'C#1',
        key: 'x',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/ct_fx_curv.wav',
        name: 'curve',
        pitch: 'D1',
        key: 'c',
      },
      {
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/sub-bass.wav',
        name: 'sub',
        pitch: 'D#1',
        key: 'v',
      },
      {
        url:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/808-Hat_Closed_01.wav',
        name: 'hat',
        pitch: 'E1',
        key: 'a',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/ct_cym_gizzy.wav',
        name: 'cymbal',
        pitch: 'F1',
        key: 's',
      },
      {
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/snare2.wav',
        name: 'snare',
        pitch: 'F#1',
        key: 'd',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/ct_chord_xzib2_C.wav',
        name: 'chord !',
        pitch: 'G1',
        key: 'f',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/ct_snr_quincy.wav',
        name: 'snare',
        pitch: 'G#1',
        key: 'q',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/ct_prc_pound.wav',
        name: 'perc',
        pitch: 'A2',
        key: 'w',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/ct_chord_nature3_C.wav',
        name: 'arp',
        pitch: 'A#2',
        key: 'e',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/ct_chord_ras2_C.wav',
        name: 'chord delay',
        pitch: 'B2',
        key: 'r',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/ct_snr_tizzy.wav',
        name: 'snare2',
        pitch: 'C2',
        key: '1',
      },
      {
        url: 'https://producertime.s3.us-east-2.amazonaws.com/ct_prc_essy.wav',
        name: 'plop',
        pitch: 'C#2',
        key: '2',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/ct_chord_lima2_C.wav',
        name: 'chords',
        pitch: 'D2',
        key: '3',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/ct_lead_yeez4_C.wav',
        name: 'coin',
        pitch: 'D#2',
        key: '4',
      },
    ],
  },

  2: {
    name: 'kit 3',
    sounds: [
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_kick_island.wav',
        name: 'kick',
        pitch: 'c1',
        key: 'z',
      },
      {
        url: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/377560/sub-bass.wav',
        name: 'sub bass',
        pitch: 'C#1',
        key: 'x',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_C_carry_on_lead_1.wav',
        name: 'lead',
        pitch: 'D1',
        key: 'c',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_C_i_see_thunder_lead_2.wav',
        name: 'stab',
        pitch: 'D#1',
        key: 'v',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_hihat_surf.wav',
        name: 'hat',

        pitch: 'E1',
        key: 'a',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_shaker_surf.wav',
        name: 'shaker',
        pitch: 'F1',
        key: 's',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_C_carry_on_lead_2.wav',
        name: 'lead2',
        pitch: 'F#1',
        key: 'd',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_C_i_see_thunder_lead_3.wav',
        name: 'stab2',
        pitch: 'G1',
        key: 'f',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_clap_kingston.wav',
        name: 'clap',

        pitch: 'A2',
        key: 'q',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_snap_carry_on.wav',
        name: 'snap',
        pitch: 'A#2',
        key: 'w',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_C_carry_on_pluck_1.wav',
        name: 'pluck',
        pitch: 'B2',
        key: 'e',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_C_kalimba_2.wav',
        name: 'kalimba',
        pitch: 'C2',
        key: 'r',
      },
      {
        url:
          '	https://producertime.s3.us-east-2.amazonaws.com/SS_clap_water_stone.wav',
        name: 'clap',
        pitch: 'C#2',
        key: '1',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_snap_water_stone.wav',
        name: 'snap2',
        pitch: 'D2',
        key: '2',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_C_carry_on_pluck_3.wav',
        name: 'pluck2',
        pitch: 'D#2',
        key: '3',
      },
      {
        url:
          'https://producertime.s3.us-east-2.amazonaws.com/SS_C_marimba_4.wav',
        name: 'marimba',
        pitch: 'E2',
        key: '4',
      },
    ],
  },
}

export default audioFiles
