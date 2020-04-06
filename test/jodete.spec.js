const PartidaJodete = require("../jodete/PartidaJodete");
const PresenterJodete = require("../jodete/PresenterJodete");
const Baraja = require("../jodete/Baraja");
const expect = require("chai").expect;
const sinon = require("sinon");

const JUGADOR_UNO = "pepe"
const JUGADOR_DOS = "juan"

function iniciar(presenter) {
  const partida = new PartidaJodete(presenter, new Baraja())
  partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)
  return partida
}

describe("al inciar la partida", () => {

  it("cada jugador reciben 5 cartas y revelamos una carta en la mesa", () => {
    const presenter = new PresenterJodete()
    const mostrarMano = dadaLaInteraccion(presenter, "mostrarMano")
    const mostrarCartaInicial = dadaLaInteraccion(presenter, "mostrarCartaInicial")
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")
    
    const partida = iniciar(presenter)
    
    mostrarCartaInicial.primero("espada.1")
    mostrarMano.primero(JUGADOR_UNO, ["oro.1", "oro.2", "oro.3", "oro.4", "oro.5"])
    mostrarMano.segundo(JUGADOR_DOS, ["copa.1", "copa.2", "copa.3", "copa.4", "copa.5"])
    esperarPorJugada.primero(JUGADOR_UNO, partida)
  })
})

describe("cuando el jugador descarta carta valida", () => {
  it("su mano pierde la carta y esta se convierte en la ultima carta jugada", () => {
    const presenter = new PresenterJodete()
    const partida = iniciar(presenter)
    const mostrarDescarte = dadaLaInteraccion(presenter, "mostrarDescarte")

    partida.bajarCarta(JUGADOR_UNO, "oro.1")

    mostrarDescarte.primero(JUGADOR_UNO, ["oro.2", "oro.3", "oro.4", "oro.5"], "oro.1")
  })
})

describe("una vez que el jugador descarta", () => {
  it("debe esperar por el turno del oponente", () => {
    const presenter = new PresenterJodete()
    const partida = iniciar(presenter)
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")
    
    partida.bajarCarta(JUGADOR_UNO, "oro.1")
    partida.bajarCarta(JUGADOR_DOS, "copa.1")

    esperarPorJugada.segundo(JUGADOR_UNO, partida)
  })
})

describe("cuando el jugador intenta descartar una carta invalida", () => {
  it("debe retomar la carta y levantar una nueva", () => {
    const presenter = new PresenterJodete()
    const partida = iniciar(presenter)
    const mostrarDescarteInvalido = dadaLaInteraccion(presenter, "mostrarDescarteInvalido")
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")
    
    partida.bajarCarta(JUGADOR_UNO, "oro.2")
    
    mostrarDescarteInvalido.primero(JUGADOR_UNO, ["oro.1", "oro.2", "oro.3", "oro.4", "oro.5", "oro.6"], "oro.2")
    esperarPorJugada.primero(JUGADOR_DOS, partida)
  })
})

describe("durante el turno de cada jugador", () => {
  it("puede tomar una carta", () => {
    const presenter = new PresenterJodete()
    const partida = iniciar(presenter)
    const mostrarMano = dadaLaInteraccion(presenter, "mostrarMano")
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")

    partida.tomarCarta(JUGADOR_UNO)
    
    mostrarMano.primero(JUGADOR_UNO, ["oro.1", "oro.2", "oro.3", "oro.4", "oro.5", "oro.6"])
    esperarPorJugada.primero(JUGADOR_UNO, partida)
  })
})

function dadaLaInteraccion(object, message) {
  const stub = sinon.spy(object, message)
  return {
    primero(...args) {
      const message = stub.printf(`expect %n to be called with ${args.join(", ")} but called %c`)
      expect(stub.args[0], message).to.eqls(args)
    },
    segundo(...args) {
      const message = stub.printf(`expect %n to be called with ${args.join(", ")} but called %c`)
      expect(stub.args[1], message).to.eqls(args)
    },
    printLlamadas() {
      console.log(JSON.stringify(stub.args))
    }
  }
}