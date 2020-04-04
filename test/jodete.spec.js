const PartidaJodete = require("../jodete/PartidaJodete");
const PresenterJodete = require("../jodete/PresenterJodete");
const expect = require("chai").expect;
const sinon = require("sinon");

describe("al inciar la partida", () => {

  it("cada jugador reciben 5 cartas y revelamos una carta en la mesa", () => {
    const presenter = new PresenterJodete()
    const partida = new PartidaJodete(presenter)

    const mostrarMano = dadaLaInteraccion(presenter, "mostrarMano")
    const mostrarCartaInicial = dadaLaInteraccion(presenter, "mostrarCartaInicial")
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")

    const JUGADOR_UNO = "pepe"
    const JUGADOR_DOS = "juan"

    partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)
    
    mostrarMano.primero(JUGADOR_UNO, ["oro.1", "oro.2", "oro.3", "oro.4", "oro.5"])
    mostrarCartaInicial.primero("espada.1")
    mostrarMano.segundo(JUGADOR_DOS, ["copa.1", "copa.2", "copa.3", "copa.4", "copa.5"])
    esperarPorJugada.primero(JUGADOR_UNO, partida)
  })
})

describe("cuando el jugador baja carta valida", () => {
  it("su mano pierde la carta y esta se convierte en la ultima carta jugada", () => {
    const presenter = new PresenterJodete()
    const partida = new PartidaJodete(presenter)
    
    const JUGADOR_UNO = "pepe"
    const JUGADOR_DOS = "juan"
    partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)
    
    const mostrarDescarte = dadaLaInteraccion(presenter, "mostrarDescarte")
    const mostrarMano = dadaLaInteraccion(presenter, "mostrarMano")

    partida.bajarCarta(JUGADOR_UNO, "oro.1")

    mostrarDescarte.primero(JUGADOR_UNO, "oro.1")
    mostrarMano.primero(JUGADOR_UNO, ["oro.2", "oro.3", "oro.4", "oro.5"])
  })
})

describe("una vez que el jugador descarta", () => {
  it("debe esperar por el turno del oponente", () => {
    const presenter = new PresenterJodete()
    const partida = new PartidaJodete(presenter)
    
    const JUGADOR_UNO = "pepe"
    const JUGADOR_DOS = "juan"
    partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)
    partida.bajarCarta(JUGADOR_UNO, "oro.1")
    
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")
    
    partida.bajarCarta(JUGADOR_DOS, "copa.1")

    esperarPorJugada.primero(JUGADOR_UNO, partida)
  })
})

function dadaLaInteraccion(object, message) {
  const stub = sinon
    .stub(object, message)
    .callsFake(() => {})
  return {
    primero(...args) {
      const message = stub.printf(`expect %n to be called with ${args.join(", ")} but called %c`)
      expect(stub.args[0], message).to.eqls(args)
    },
    segundo(...args) {
      const message = stub.printf(`expect %n to be called with ${args.join(", ")} but called %c`)
      expect(stub.args[1], message).to.eqls(args)
    }
  }
}