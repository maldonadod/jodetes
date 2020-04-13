const expect = require("chai").expect
const Baraja = require("../jodete/domain/Baraja")

describe("Baraja", () => {
  it("debe devolver una carta cuando se roba", () => {

    const baraja = new Baraja()
    const carta = baraja.robarUnaCarta()

    expect(carta).to.eqls("oro.1")
  })
})