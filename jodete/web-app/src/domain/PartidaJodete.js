import CartasEnJuego from "./CartasEnJuego"

class PartidaJodete {
  constructor(presenter, baraja, cantidadDeCartasBarajadasAlInicial = 5) {
    this.presenter = presenter
    this.manos = {}
    this.baraja = baraja
    this.cantidadDeCartasBarajadasAlInicial = cantidadDeCartasBarajadasAlInicial
  }
  iniciar(jugadorUno, jugadorDos) {
    this.jugadorUno = jugadorUno
    this.jugadorDos = jugadorDos

    this.manos[jugadorUno] = this.baraja.robarCartas(this.cantidadDeCartasBarajadasAlInicial)
    this.manos[jugadorDos] = this.baraja.robarCartas(this.cantidadDeCartasBarajadasAlInicial)

    this.cartasJugadas = new CartasEnJuego(this.baraja.robarUnaCarta())
    this.presenter.mostrarCartaInicial(this.cartasJugadas.ultima())
    this.presenter.esperarPorJugada(jugadorUno, [...this.manos[jugadorUno], "tomar"], this)
  }
  bajarCarta(jugador, cartaADescartar) {

    const manoDelJugador = this.manos[jugador]
    const siguienteJugador = jugador === this.jugadorUno
      ? this.jugadorDos
      : this.jugadorUno
    
    const cartaApilada = this.cartasJugadas.apilar(cartaADescartar)

    if (cartaApilada === cartaADescartar) {
      this.manos[jugador] = descartarCarta(manoDelJugador, cartaADescartar)
      this.presenter.mostrarDescarte(jugador, this.cartasJugadas.ultima())

      if (this.manos[jugador].length === 0) {
        return this.presenter.mostrarResultado({
          ganador: jugador,
          perdedor: siguienteJugador
        })
      }
    } else {
      this.manos[jugador] = tomarCarta(manoDelJugador, this.baraja)
      this.presenter.mostrarDescarteInvalido(jugador, cartaADescartar)
    }

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

export default PartidaJodete;