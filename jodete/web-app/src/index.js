import React from "react"
import ReactDOM from "react-dom"
import PartidaJodete from "./domain/PartidaJodete"
import Baraja52 from "./domain/Baraja52"
import Mesa from "./Mesa"
import CartasJugadas from "./CartasJugadas"
import Turno from "./Turno"
import "./index.css"

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
    function onJugada(jugada) {
      if (jugada === "tomar") {
        partida.tomarCarta(jugador)
      } else if (jugada === "pasar") {
        partida.pasarTurno(jugador)
      } else {
        partida.bajarCarta(jugador, jugada)
      }
    }
    render(
      <Mesa>
        <CartasJugadas
          carta={this.ultimaCartaDescartada}
          onJugada={onJugada}
        />
        <Turno
          jugador={jugador}
          jugadas={jugadas}
        />
      </Mesa>
    )
  }
  mostrarDescarte(jugador, carta) {
    this.ultimaCartaDescartada = carta
  }
  mostrarDescarteInvalido(jugador, carta) {
  }
  mostrarResultado({ ganador, perdedor }) {
    render(`Ganó ${ganador}, ${perdedor} seguí participando.`)
  }
}

const presenter = new WebPresenterJodete()
const partida = new PartidaJodete(presenter, new Baraja52())

partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)