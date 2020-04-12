import React from "react";
import ReactDOM from "react-dom";
import PartidaJodete from "./domain/PartidaJodete"
import Baraja52 from "./domain/Baraja52"
import "./carta.css"
import "./cartas-jugadas.css"

const JUGADOR_UNO = "pepe"
const JUGADOR_DOS = "juan"

function render(tree) {
  ReactDOM.render(tree, document.getElementById("root"));
}

class WebPresenterJodete {
  constructor() {
    this.ultimaCartaDescartada = null;
  }
  mostrarCartaInicial(carta) {
    this.ultimaCartaDescartada = carta
  }
  esperarPorJugada(jugador, jugadas, partida) {

    render(
      <div>
        <CartasJugadas carta={this.ultimaCartaDescartada} />
        <Turno jugador={jugador} jugadas={jugadas} onJugada={jugada => {
          if (jugada === "tomar") {
            partida.tomarCarta(jugador)
          } else if (jugada === "pasar") {
            partida.pasarTurno(jugador)
          } else {
            partida.bajarCarta(jugador, jugada)
          }
        }} />
      </div>
    )
  }
  mostrarDescarte(jugador, carta) {
    this.ultimaCartaDescartada = carta
  }
  mostrarDescarteInvalido(jugador, carta) {
  }
  mostrarResultado({ ganador, perdedor }) {
  }
}

function CartasJugadas(props) {
  const { carta } = props
  return (
    <div className="cartas-jugadas">
      <Carta carta={carta} />
    </div>
  )
}

function Carta({ carta, onClick = () => {} }) {
  const [palo, indice] = carta.split(".")
  return (
    <div onClick={onClick} className={"carta " + palo} key={carta}>
      <div className="indice">{indice}</div>
    </div>
  )
}

function Turno(props) {
  const { jugador, jugadas, onJugada } = props
  return (
    <>
      <div>Turno de {jugador}, elija:</div>
      
      <div className="mano-del-jugador">
        {jugadas.map(jugada => {
          return (
            <Carta key={jugada} onClick={() => onJugada(jugada)} carta={jugada} />
          )
        })}
      </div>
    </>
  )
}

const presenter = new WebPresenterJodete()
const partida = new PartidaJodete(presenter, new Baraja52())

partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)