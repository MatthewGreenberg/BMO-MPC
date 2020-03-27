import React, { useEffect, useState, useCallback } from 'react'
import { useSpring, a, config } from 'react-spring/three'
import { Shape } from 'three'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry'
import { Line2 } from 'three/examples/jsm/lines/Line2'
import { extend, useThree, useUpdate } from 'react-three-fiber'

extend({ LineMaterial, LineGeometry, Line2 })
a.line2 = a('line2')
a.lineMaterial = a('lineMaterial')

const Mouth = ({ activeSound }) => {
  const [width, setWidth] = useState(1.75)
  const [height, setHeight] = useState(0.5)
  const [active, setActive] = useState(true)

  useEffect(() => {
    setActive(true)
    setTimeout(() => setActive(false), 250)
  }, [activeSound])

  const animProps = useSpring({
    scale: active ? [1.2, 1.1, 1] : [1, 1, 1],
    config: config.wobbly,
  })

  const { size } = useThree()

  const ref = useUpdate(geom => {
    const x1 = -width / 2
    const y = -height / 2
    const radius = 0.2
    const mouth = new Shape()
    mouth.moveTo(x1 - 0.1, y + radius)
    mouth.lineTo(x1 - 0.05, y + height - radius)
    mouth.quadraticCurveTo(x1, y + height, x1 + radius, y + height)
    mouth.lineTo(x1 + width - radius, y + height)
    mouth.quadraticCurveTo(
      x1 + width,
      y + height,
      x1 + width + 0.05,
      y + height - radius
    )
    mouth.lineTo(x1 + width + 0.1, y + radius)
    // mouth.quadraticCurveTo(x1 + width, y, x1 + width - radius, y)
    // mouth.lineTo(x1 + radius, y)
    // mouth.quadraticCurveTo(x1, y, x1, y + radius)
    const points = mouth
      .getPoints()
      .reduce((acc, { x, y }) => [...acc, x, y, 0], [], [])
    geom.setPositions(points)
  }, [])

  return (
    <a.line2
      rotation={[0, 0, Math.PI]}
      scale={animProps.scale}
      position={[0, 2.3, 2.3]}
    >
      <lineGeometry attach="geometry" ref={ref} />
      <a.lineMaterial
        attach="material"
        color={'#333'}
        linewidth={10}
        resolution={[size.width, size.height]}
      />
    </a.line2>
  )
}

export default Mouth
