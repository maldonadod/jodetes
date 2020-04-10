//una persona puede inscribirse en una lista
//si la lista alcanzo su limite, se le notifica que esta en lista de espera.
//una vez que la lista libera un espacio se le notifica al usuario que esta confirmado
//si la lista tiene espacio libre, lo confirma.

// lista.limite = 2
// lista.inscribi("jessi")
// lista.inscribi("dani")
// lista.inscribi("pepe")

const expect = require("chai").expect;
const crearLista = require("../lista/crearLista")

it.skip("quiero saber las plazas disponibles", function() {

  //arrange
  const limite = 250
  const lista = crearLista(limite)

  //act, exercise
  const plazasDisponibles = lista.obtenerPlazasDisponibles();

  //assert
  expect(plazasDisponibles).to.equal(250);
})