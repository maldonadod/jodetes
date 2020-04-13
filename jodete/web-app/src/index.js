import PartidaJodete from "./domain/PartidaJodete"
import Baraja52 from "./domain/Baraja52"
import WebPresenterJodete from "./WebPresenterJodete"
import "./index.css"

const JUGADOR_UNO = "pepe"
const JUGADOR_DOS = "juan"

const presenter = new WebPresenterJodete()
const partida = new PartidaJodete(presenter, new Baraja52())

partida.iniciar(JUGADOR_UNO, JUGADOR_DOS)