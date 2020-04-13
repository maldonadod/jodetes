const PartidaJodete = require("../jodete/domain/PartidaJodete");
const PresenterJodete = require("../jodete/domain/PresenterJodete");
const Baraja = require("../jodete/domain/Baraja");
const expect = require("chai").expect;
const sinon = require("sinon");

const JUGADOR_UNO = "pepe"
const JUGADOR_DOS = "juan"

function iniciar(presenter, cantidadDeCartasBarajadasAlInicial) {
  const partida = new PartidaJodete(presenter, new Baraja(), cantidadDeCartasBarajadasAlInicial)
  partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)
  return partida
}

describe("al inciar la partida", () => {
  it("cada jugador reciben 5 cartas y revelamos una carta en la mesa", () => {
    const presenter = new PresenterJodete()
    const mostrarCartaInicial = dadaLaInteraccion(presenter, "mostrarCartaInicial")
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")
    
    const partida = iniciar(presenter)
    
    mostrarCartaInicial.primero("espada.1")
    esperarPorJugada.primero(JUGADOR_UNO, ["oro.1", "oro.2", "oro.3", "oro.4", "oro.5", "tomar"], partida)
  })
})

describe("cuando el jugador descarta carta valida", () => {
  it("su mano pierde la carta y esta se convierte en la ultima carta jugada", () => {
    const presenter = new PresenterJodete()
    const partida = iniciar(presenter)
    const mostrarDescarte = dadaLaInteraccion(presenter, "mostrarDescarte")

    partida.bajarCarta(JUGADOR_UNO, "oro.1")

    mostrarDescarte.primero(JUGADOR_UNO, "oro.1")
  })
})

describe("una vez que el jugador descarta", () => {
  it("debe esperar por el turno del oponente", () => {
    const presenter = new PresenterJodete()
    const partida = iniciar(presenter)
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")
    
    partida.bajarCarta(JUGADOR_UNO, "oro.1")
    partida.bajarCarta(JUGADOR_DOS, "copa.1")

    const jugadas = [
      "oro.2",
      "oro.3",
      "oro.4",
      "oro.5",
      "tomar",
    ]

    esperarPorJugada.segundo(JUGADOR_UNO, jugadas, partida)
  })
})

describe("cuando el jugador intenta descartar una carta invalida", () => {
  it("debe retomar la carta y levantar una nueva", () => {
    const presenter = new PresenterJodete()
    const partida = iniciar(presenter)
    const mostrarDescarteInvalido = dadaLaInteraccion(presenter, "mostrarDescarteInvalido")
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")
    
    partida.bajarCarta(JUGADOR_UNO, "oro.2")
    
    const jugadas = [
      "copa.1",
      "copa.2",
      "copa.3",
      "copa.4",
      "copa.5",
      "tomar",
    ]

    mostrarDescarteInvalido.primero(JUGADOR_UNO, "oro.2")
    esperarPorJugada.primero(JUGADOR_DOS, jugadas, partida)
  })
})

describe("durante el turno de cada jugador", () => {
  it("puede tomar una carta", () => {
    const presenter = new PresenterJodete()
    const partida = iniciar(presenter)
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")

    partida.tomarCarta(JUGADOR_UNO)
    
    esperarPorJugada.primero(JUGADOR_UNO, ["oro.1", "oro.2", "oro.3", "oro.4", "oro.5", "oro.6", "pasar"], partida)
  })
})

describe("durante el turno de cada jugador si este levanta una carta", () => {
  it("puede pasar el turno", () => {
    const presenter = new PresenterJodete()
    const partida = iniciar(presenter)
    partida.tomarCarta(JUGADOR_UNO)
    
    const esperarPorJugada = dadaLaInteraccion(presenter, "esperarPorJugada")
    
    partida.pasarTurno(JUGADOR_UNO)
    partida.pasarTurno(JUGADOR_DOS)
    
    const jugadasDelJugadorDos = [
      "copa.1",
      "copa.2",
      "copa.3",
      "copa.4",
      "copa.5",
      "tomar",
    ]
    const jugadasDelJugadorUno = [
      "oro.1",
      "oro.2",
      "oro.3",
      "oro.4",
      "oro.5",
      "oro.6",
      "tomar",
    ]

    esperarPorJugada.primero(JUGADOR_DOS, jugadasDelJugadorDos, partida)
    esperarPorJugada.segundo(JUGADOR_UNO, jugadasDelJugadorUno, partida)
  })
})

describe("cuando un jugador se queda sin cartas en la mano", () => {
  it("gana la partida y esta se termina", () => {
    const cantidadDeCartasBarajadasAlInicial = 1
    const presenter = new PresenterJodete()
    
    const mostrarResultado = dadaLaInteraccion(presenter, "mostrarResultado")
    
    const partida = iniciar(presenter, cantidadDeCartasBarajadasAlInicial)

    partida.bajarCarta(JUGADOR_UNO, "oro.1")
    
    mostrarResultado.primero({
      ganador: JUGADOR_UNO,
      perdedor: JUGADOR_DOS,
    })
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