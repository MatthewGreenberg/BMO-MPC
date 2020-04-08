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
  NormalPass,
  PixelationEffect,
  NoiseEffect,
} from 'postprocessing'

// Fix smaa loader signature
const _load = SMAAImageLoader.prototype.load
SMAAImageLoader.prototype.load = function (_, set) {
  return _load.bind(this)(set)
}

export default function Effects({ activeSwitch }) {
  const { gl, scene, camera, size } = useThree()

  const smaa = useLoader(SMAAImageLoader)
  const composer = useMemo(() => {
    const composer = new EffectComposer(gl)
    composer.addPass(new RenderPass(scene, camera))
    const smaaEffect = new SMAAEffect(...smaa)
    smaaEffect.colorEdgesMaterial.setEdgeDetectionThreshold(0.1)
    const normalPass = new NormalPass(scene, camera)
    const pixelationEffect = new PixelationEffect(5.0)

    const noiseEffect = new NoiseEffect({
      blendFunction: BlendFunction.AVERAGE,
      opacity: 0.2,
    })
    noiseEffect.blendMode.opacity.value = 0.2

    let pass = [camera, smaaEffect]

    const effectPass1 = new EffectPass(...pass)
    const effectPass2 = new EffectPass(camera, noiseEffect, pixelationEffect)
    const effectPass3 = new EffectPass(...pass)

    composer.addPass(normalPass)

    switch (activeSwitch) {
      case 0:
        composer.addPass(effectPass1)
        effectPass1.renderToScreen = true
        effectPass2.renderToScreen = false
        effectPass3.renderToScreen = false
        break
      case 1:
        composer.addPass(effectPass2)
        effectPass2.renderToScreen = true
        effectPass1.renderToScreen = false
        effectPass3.renderToScreen = false
        break
      case 2:
        composer.addPass(effectPass3)
        effectPass3.renderToScreen = true
        effectPass1.renderToScreen = false
        effectPass2.renderToScreen = false
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
