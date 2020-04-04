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
    this.cartasJugadas.push(siguienteCartaEnLaBaraja())
    this.presenter.mostrarCartaInicial(this.cartasJugadas[this.cartasJugadas.length - 1])
    this.presenter.mostrarMano(jugadorUno, this.manos[jugadorUno])
    this.presenter.mostrarMano(jugadorDos, this.manos[jugadorDos])
    this.presenter.esperarPorJugada(jugadorUno, this)
  }
  bajarCarta(jugador, cartaADescartar) {

    let manoDelJugador = this.manos[jugador]
    const ultimaCartaJugada = this.cartasJugadas[this.cartasJugadas.length - 1]
    const esDescarteValido = validarDescarte(cartaADescartar, ultimaCartaJugada)

    if (esDescarteValido) {
      this.presenter.mostrarDescarte(jugador, cartaADescartar)
      manoDelJugador = descartarCarta(manoDelJugador, cartaADescartar)
    } else {
      this.presenter.penalizarDescarteInvalido(jugador, cartaADescartar)
      manoDelJugador = tomarCarta(manoDelJugador, this.baraja)
    }

    this.presenter.mostrarMano(jugador, manoDelJugador)
    
    const siguienteJugador = jugador === this.jugadorUno
      ? this.jugadorDos
      : this.jugadorUno

    this.presenter.esperarPorJugada(siguienteJugador, this)
  }
}

function descartarCarta(mano, carta) {
  return mano.filter(cartaEnMano => cartaEnMano !== carta)
}
function tomarCarta(mano, baraja) {
  return [...mano, baraja.robarUnaCarta()]
}
function validarDescarte(cartaADescartar, ultimaCartaJugada) {
  const [palo1, numero1] = cartaADescartar.split(".")
  const [palo2, numero2] = ultimaCartaJugada.split(".")
  return palo1 === palo2 || numero1 === numero2
}

module.exports = PartidaJodete;