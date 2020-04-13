import React from "react"
import "./cartas-jugadas.css"

function CartasJugadas(props) {
  const { carta } = props
  const [palo, indice] = carta.split(".")

  function ondrop(e) {
    e.preventDefault()
    const data = e.dataTransfer.getData("text/plain");
    props.onJugada(data)
  }
  function ondragover(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"
  }
  return (
    <div className="cartas-jugadas">
      <div onDrop={ondrop} onDragOver={ondragover} className={"carta " + palo} key={carta}>
        <div className="indice">{indice}</div>
      </div>
    </div>
  )
}

export default CartasJugadas;