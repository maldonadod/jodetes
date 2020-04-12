const inquirer = require("inquirer")

class PresenterJodete {

  constructor() {
    console.clear()
    this.jugadas = {
      lineas: [],
      add(jugada) {
        this.lineas.push(jugada)
        console.clear()
        this.lineas.forEach(linea => {
          console.log(linea)
        })
      },
      imprimirLineas() {
        console.clear()
        this.lineas.forEach(linea => {
          console.log(linea)
        })
      }
    }
  }
  mostrarCartaInicial(carta) {
    this.jugadas.add(`Iniciamos la partida con la carta: ${carta}`)
  }
  mostrarDescarte(jugador, carta) {
    this.jugadas.add(`${jugador} descartó ${carta}`)
  }
  esperarPorJugada(jugador, jugadas, partida) {
    inquirer
      .prompt([{
        prefix: "",
        type: "list",
        name: "jugada",
        pageSize: 20,
        message: `Turno ${jugador}:`,
        choices: jugadas,
        default: jugadas.includes("tomar") ? "tomar" : "pasar"
      }])
      .then(({ jugada }) => {
        this.jugadas.imprimirLineas()
    
        if (jugada === "tomar") {
          partida.tomarCarta(jugador)
        } else if (jugada === "pasar") {
          partida.pasarTurno(jugador)
        } else {
          partida.bajarCarta(jugador, jugada)
        }
      });
  }
  mostrarDescarteInvalido(jugador, carta) {
    this.jugadas.imprimirLineas()
    console.log(`${jugador}, solo puedes descartar cartas del mismo número o mismo palo que la última carta descartada.`)
  }
  mostrarResultado({ ganador, perdedor }) {
    console.log(`Gano: ${ganador}, perdio: ${perdedor}`)
  }
}

module.exports = PresenterJodete;