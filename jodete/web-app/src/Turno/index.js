import React from "react"
import Carta from "../Carta"
import "./turno-del-jugador.css"

function Turno(props) {
  const { jugador, jugadas } = props
  return (
    <div className="turno-del-jugador">
      <div>Turno de {jugador}, elija:</div>

      <div className="mano-del-jugador">
        {jugadas.map(jugada => {
          return (
            <Carta key={jugada} carta={jugada} />
          )
        })}
      </div>
    </div>
  )
}

export default Turno;