class CartasEnJuego {
  constructor(cartaInicial) {
    this.cartasJugadas = [cartaInicial]
    if (!cartaInicial || this.cartasJugadas.length === 0) {
      throw new Error("Cartas en Juego no puede ser creado sin una carta incial.")
    }
  }
  ultima() {
    return this.cartasJugadas[this.cartasJugadas.length - 1]
  }
  apilar(cartaADescartar) {
    if (esMismoPaloOMismoNumero(cartaADescartar, this.ultima())) {
      this.cartasJugadas.push(cartaADescartar)
      return cartaADescartar
    }
  }
}
function esMismoPaloOMismoNumero(cartaADescartar, ultimaCartaApilada) {
  const [palo1, numero1] = cartaADescartar.split(".")
  const [palo2, numero2] = ultimaCartaApilada.split(".")
  return palo1 === palo2 || numero1 === numero2
}

module.exports = CartasEnJuego;