const PartidaJodete = require("./PartidaJodete");
const ReadlinePresenterJodete = require("./ReadlinePresenterJodete");

const JUGADOR_UNO = "pepe"
const JUGADOR_DOS = "juan"

const presenter = new ReadlinePresenterJodete()
const partida = new PartidaJodete(presenter)

partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)