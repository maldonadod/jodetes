class Baraja {
  constructor() {
    this.cartas = [
      "oro.1", "oro.2", "oro.3", "oro.4", "oro.5",
      "copa.1", "copa.2", "copa.3", "copa.4", "copa.5",
      "espada.1",
      "oro.6"
    ]
  }
  robarUnaCarta() {
    return this.cartas.shift()
  }
  robarCartas(cantidadAtomar) {
    let cartas = []
    for (let index = 0; index < cantidadAtomar; index++) {
      cartas = [...cartas, this.robarUnaCarta()]
    }
    return cartas
  }
}

module.exports = Baraja;