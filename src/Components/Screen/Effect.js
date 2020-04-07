import React, { useMemo, useEffect } from 'react'

const Effect = ({ name, setEffectAmount, effectAmount, player }) => {
  const renderBars = useMemo(() => {
    console.log('rendering bars')
    let result = []
    for (let i = 0; i < effectAmount; i++) {
      result.push(<div key={i} className="bar" />)
    }
    return result
  }, [effectAmount])

  return (
    <div className="effect-wrapper">
      <button
        onClick={() => {
          if (effectAmount > 0) {
            player.start()
            setEffectAmount('subtract')
          }
        }}
        className="subtract"
      >
        -
      </button>
      <button
        onClick={() => {
          if (effectAmount < 10) {
            player.start()
            setEffectAmount('add')
          }
        }}
        className="add"
      >
        +
      </button>
      <h3>{name}</h3>
      {renderBars}
    </div>
  )
}

export default Effect
