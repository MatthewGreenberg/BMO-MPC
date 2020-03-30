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
} from 'postprocessing'

// Fix smaa loader signature
const _load = SMAAImageLoader.prototype.load
SMAAImageLoader.prototype.load = function(_, set) {
  return _load.bind(this)(set)
}

export default function Effects({ innerWidth }) {
  const { gl, scene, camera, size } = useThree()

  const smaa = useLoader(SMAAImageLoader)
  const composer = useMemo(() => {
    const composer = new EffectComposer(gl)
    composer.addPass(new RenderPass(scene, camera))
    const smaaEffect = new SMAAEffect(...smaa)
    smaaEffect.colorEdgesMaterial.setEdgeDetectionThreshold(0.1)
    const normalPass = new NormalPass(scene, camera)
    const ssaoEffect = new SSAOEffect(camera, normalPass.renderTarget.texture, {
      blendFunction: BlendFunction.SUBTRACT,
      samples: 10,
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

    const effectPass = new EffectPass(camera, smaaEffect, ssaoEffect)
    effectPass.renderToScreen = true
    composer.addPass(normalPass)
    composer.addPass(effectPass)
    return composer
  }, [])

  useEffect(() => void composer.setSize(size.width, size.height), [
    composer,
    size,
  ])
  return useFrame((_, delta) => composer.render(delta), 1)
}
