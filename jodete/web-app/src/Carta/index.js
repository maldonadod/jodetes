import React from "react"
import "./carta.css"

function Carta({ carta }) {
  const [palo, indice] = carta.split(".")
  function ondragstart(e) {
    e.dataTransfer.setData("text/plain", carta)
    e.dataTransfer.dropEffect = "move"
  }
  return (
    <div draggable="true" onDragStart={ondragstart} className={"carta " + palo} key={carta}>
      <div className="indice">{indice}</div>
    </div>
  )
}

export default Carta;