const readline = require("readline")

class PresenterJodete {

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    console.clear()
  }
  mostrarCartaInicial(carta) {
    console.log("Iniciamos la partida con la carta:", carta)
  }
  mostrarDescarte(jugador, mano, carta) {
    console.log(jugador + " descartó: ", carta)
  }
  esperarPorJugada(jugador, jugadas, partida) {
    const jugadasDisponibles = jugadas.join(", ")
    this.rl.question(`${jugador}: ${jugadasDisponibles} >> `, carta => {
      if (carta === "tomar") {
        partida.tomarCarta(jugador)
      } else if (carta === "pasar") {
        partida.pasarTurno(jugador)
      } else {
        partida.bajarCarta(jugador, carta)
      }
    })
  }
  mostrarDescarteInvalido(jugador, mano, carta) {
    this.manos[jugador] = mano
    console.log(jugador + " descartó invalidamente: ", carta, " debe levantar una carta...")
  }
}

module.exports = PresenterJodete;