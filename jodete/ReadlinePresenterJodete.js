const readline = require("readline")

class PresenterJodete {

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    console.clear()
  }
  mostrarMano(jugador, mano) {
    console.log(`la mano de ${jugador} contiene: ${mano.join(", ")}`)
  }
  mostrarCartaInicial(carta) {
    console.log("Iniciamos la partida con la carta: ", carta)
  }
  mostrarDescarte(jugador, carta) {
    console.log(jugador + " descartó: ", carta)
  }
  esperarPorJugada(jugador, partida) {
    this.rl.question(jugador + " juega: ", carta => {
      partida.bajarCarta(jugador, carta)
    })
  }
}

module.exports = PresenterJodete;