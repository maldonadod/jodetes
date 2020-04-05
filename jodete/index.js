const PartidaJodete = require("./PartidaJodete");
const ReadlinePresenterJodete = require("./ReadlinePresenterJodete");
const Baraja52 = require("./Baraja52");

const JUGADOR_UNO = "pepe"
const JUGADOR_DOS = "juan"

const presenter = new ReadlinePresenterJodete()
const partida = new PartidaJodete(presenter, new Baraja52())

partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)