//una persona puede inscribirse en una lista
//si la lista alcanzo su limite, se le notifica que esta en lista de espera.
//una vez que la lista libera un espacio se le notifica al usuario que esta confirmado
//si la lista tiene espacio libre, lo confirma.

// lista.limite = 2
// lista.inscribi("jessi")
// lista.inscribi("dani")
// lista.inscribi("pepe")

const expect = require("chai").expect;

it("quiero saber las plazas disponibles", function() {

  const limite = 250

  const lista = {
    obtenerPlazasDisponibles() {
      const personasConfirmadas = 0
      return limite - personasConfirmadas
    }
  }

  const plazasDisponibles = lista.obtenerPlazasDisponibles();

  expect(plazasDisponibles).to.eqls(250);
})