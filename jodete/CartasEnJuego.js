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
  apilar(carta) {
    return this.cartasJugadas.push(carta)
  }
}

module.exports = CartasEnJuego;