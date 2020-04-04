const Baraja = require("./Baraja.js")

class PartidaJodete {
  constructor(presenter) {
    this.presenter = presenter
    this.cartasJugadas = []
    this.manos = {}
    this.baraja = new Baraja()
  }
  iniciar(jugadorUno, jugadorDos) {
    this.jugadorUno = jugadorUno
    this.jugadorDos = jugadorDos

    const siguienteCartaEnLaBaraja = () => this.baraja.robarUnaCarta()

    this.manos[jugadorUno] = [
      siguienteCartaEnLaBaraja(),
      siguienteCartaEnLaBaraja(),
      siguienteCartaEnLaBaraja(),
      siguienteCartaEnLaBaraja(),
      siguienteCartaEnLaBaraja(),
    ]
    this.manos[jugadorDos] = [
      siguienteCartaEnLaBaraja(),
      siguienteCartaEnLaBaraja(),
      siguienteCartaEnLaBaraja(),
      siguienteCartaEnLaBaraja(),
      siguienteCartaEnLaBaraja(),
    ]
    this.presenter.mostrarCartaInicial(siguienteCartaEnLaBaraja())
    this.presenter.mostrarMano(jugadorUno, this.manos[jugadorUno])
    this.presenter.mostrarMano(jugadorDos, this.manos[jugadorDos])
    this.presenter.esperarPorJugada(jugadorUno, this)
  }
  bajarCarta(jugador, carta) {
    this.presenter.mostrarDescarte(jugador, carta)
    
    this.manos[jugador] = descartarCarta(this.manos[jugador], carta)

    this.presenter.mostrarMano(jugador, this.manos[jugador])

    const siguienteJugador = jugador === this.jugadorUno
      ? this.jugadorDos
      : this.jugadorUno

    this.presenter.esperarPorJugada(siguienteJugador, this)
  }
}

function descartarCarta(mano, carta) {
  return mano.filter(cartaEnMano => cartaEnMano !== carta)
}

module.exports = PartidaJodete;