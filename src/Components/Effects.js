/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useEffect } from 'react'
import { useLoader, useThree, useFrame } from 'react-three-fiber'

import {
  SMAAImageLoader,
  BlendFunction,
  EffectComposer,
  EffectPass,
  RenderPass,
  SMAAEffect,
  SSAOEffect,
  NormalPass,
  PixelationEffect,
  NoiseEffect,
  GlitchEffect,
} from 'postprocessing'

// Fix smaa loader signature
const _load = SMAAImageLoader.prototype.load
SMAAImageLoader.prototype.load = function(_, set) {
  return _load.bind(this)(set)
}

export default function Effects({ activeSwitch }) {
  const { gl, scene, camera, size } = useThree()

  function isMobile() {
    return size.width < 600
  }

  const smaa = useLoader(SMAAImageLoader)
  const composer = useMemo(() => {
    const composer = new EffectComposer(gl)
    composer.addPass(new RenderPass(scene, camera))
    const smaaEffect = new SMAAEffect(...smaa)
    smaaEffect.colorEdgesMaterial.setEdgeDetectionThreshold(0.1)
    const normalPass = new NormalPass(scene, camera)
    const pixelationEffect = new PixelationEffect(5.0)
    const glitchEffect = new GlitchEffect()

    const ssaoEffect = new SSAOEffect(camera, normalPass.renderTarget.texture, {
      blendFunction: BlendFunction.SUBTRACT,
      samples: 15,
      rings: 2,
      distanceThreshold: 1, // Render distance depends on camera near&far.
      distanceFalloff: 0, // No need for falloff.
      rangeThreshold: 0, // Larger value works better for this camera frustum.
      rangeFalloff: 0.1,
      luminanceInfluence: 1,
      radius: 30,
      scale: 0.35,
      bias: 0.5,
    })
    const noiseEffect = new NoiseEffect({
      blendFunction: BlendFunction.AVERAGE,
      premultiply: true,
      opacity: 0.2,
    })
    noiseEffect.blendMode.opacity.value = 0.2

    let pass = [camera]
    if (!isMobile()) {
      pass.push(ssaoEffect)
    }

    const effectPass1 = new EffectPass(...pass)
    const effectPass2 = new EffectPass(camera, noiseEffect, pixelationEffect)
    const effectPass3 = new EffectPass(...pass)

    composer.addPass(normalPass)

    switch (activeSwitch) {
      case 0:
        composer.addPass(effectPass1)
        effectPass1.renderToScreen = true
        break
      case 1:
        composer.addPass(effectPass2)
        effectPass2.renderToScreen = true
        break
      case 2:
        composer.addPass(effectPass3)
        effectPass3.renderToScreen = true
        break
      default:
        break
    }
    return composer
  }, [size, activeSwitch])

  useEffect(() => void composer.setSize(size.width, size.height), [
    composer,
    size,
  ])

  return useFrame((_, delta) => {
    return composer.render(delta)
  }, 1)
}
