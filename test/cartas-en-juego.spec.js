const expect = require("chai").expect
const CartasEnJuego = require("../jodete/domain/CartasEnJuego")

describe("cartas en juego", () => {
  it("debe fallar si no se crea con una carta", () => {
    
    expect(() => new CartasEnJuego()).to.throw()
  })
})