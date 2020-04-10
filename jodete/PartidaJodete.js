const Baraja = require("./Baraja")
const CartasEnJuego = require("./CartasEnJuego")

class PartidaJodete {
  constructor(presenter, baraja) {
    this.presenter = presenter
    this.manos = {}
    this.baraja = baraja
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
    this.cartasJugadas = new CartasEnJuego(siguienteCartaEnLaBaraja())
    this.presenter.mostrarCartaInicial(this.cartasJugadas.ultima())
    this.presenter.esperarPorJugada(jugadorUno, [...this.manos[jugadorUno], "tomar"], this)
  }
  bajarCarta(jugador, cartaADescartar) {

    let manoDelJugador = this.manos[jugador]
    const ultimaCartaJugada = this.cartasJugadas.ultima()
    const esDescarteValido = validarDescarte(cartaADescartar, ultimaCartaJugada)

    if (esDescarteValido) {
      this.manos[jugador] = descartarCarta(manoDelJugador, cartaADescartar)
      this.cartasJugadas.apilar(cartaADescartar)
      this.presenter.mostrarDescarte(jugador, this.manos[jugador], this.cartasJugadas.ultima())
    } else {
      this.manos[jugador] = tomarCarta(manoDelJugador, this.baraja)
      this.presenter.mostrarDescarteInvalido(jugador, this.manos[jugador], cartaADescartar)
    }

    const siguienteJugador = jugador === this.jugadorUno
      ? this.jugadorDos
      : this.jugadorUno

    this.presenter.esperarPorJugada(siguienteJugador, [...this.manos[siguienteJugador], "tomar"], this)
  }
  tomarCarta(jugador) {
    this.manos[jugador] = tomarCarta(this.manos[jugador], this.baraja)

    this.presenter.esperarPorJugada(jugador, [...this.manos[jugador], "pasar"], this)
  }
  pasarTurno(jugador) {
    const siguienteJugador = jugador === this.jugadorUno
      ? this.jugadorDos
      : this.jugadorUno
    this.presenter.esperarPorJugada(siguienteJugador, [...this.manos[siguienteJugador], "tomar"], this)
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