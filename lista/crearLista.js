function crearLista(limite, presentador) {
  return {
    obtenerPlazasDisponibles() {
      const personasConfirmadas = 0
      return limite - personasConfirmadas
    },
    inscribirPersona(persona) {
      presentador.inscripcionConfirmada(persona)
    }
  }
}

module.exports = crearLista