import React from 'react'

const Effect = ({ name, setEffectAmount, effectAmount, player }) => {
  function renderBars() {
    let result = []
    for (let i = 0; i < effectAmount; i++) {
      result.push(<div key={i} className="bar" />)
    }
    return result
  }
  return (
    <div className="effect-wrapper">
      <button
        onClick={() => {
          if (effectAmount > 0) {
            player.start()
            setEffectAmount(effectAmount - 1)
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
            setEffectAmount(effectAmount + 1)
          }
        }}
        className="add"
      >
        +
      </button>
      <h3>{name}</h3>
      {renderBars()}
    </div>
  )
}

export default Effect
