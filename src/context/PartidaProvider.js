import { useState } from "react";
import { MagicNumber } from "../config/constants";
import DeckofcardsapiService from "../services/deckofcardsapi.service";
import { PartidaContext } from "./PartidaContext";

const PartidaProvider = ({ children }) => {
    const [jugadores, setJugadores] = useState([]);
    const [mazoGanador, setMazoGanador] = useState({});
    const [idPartida, setIdPartida] = useState("");

    const handledNombreJugador = (numeroJugador, nombre) => {
        const pos = numeroJugador - 1;
        if (jugadores[pos]) {
            jugadores[pos].nombre = nombre;
        } else {
            jugadores[pos] = { nombre };
        }
        setJugadores([...jugadores]);
    }

    const iniciarPartida = async () => {
        const id = await DeckofcardsapiService.getId();
        setIdPartida(id);
        const cartas = await DeckofcardsapiService.getCartas(jugadores.length, id);
        const jugadoresPartida = [];
        for (let index = 0; index < jugadores.length; index++) {
            const jugador = { ...jugadores[index], "cartas": [cartas[index]] };
            jugadoresPartida.push(jugador);
        }
        setJugadores([...jugadoresPartida]);
    }

    const pedirCartas = async () => {
        const cartas = await DeckofcardsapiService.getCartas(jugadores.length, idPartida);
        const jugadoresPartida = [];
        for (let index = 0; index < jugadores.length; index++) {
            const jugador = { ...jugadores[index], "cartas": [...jugadores[index].cartas, cartas[index]] };
            jugadoresPartida.push(jugador);
        }
        setJugadores([...jugadoresPartida]);
        validarGanador(jugadoresPartida);
    }

    const validarGanador = (jugadoresPartida) => {
        let parejasEncontradas = [];
        let posicion = 0;
        for (const jugador of jugadoresPartida) {
            for (let index = 0; index < jugador.cartas.length; index++) {
                const cartaActual = jugador.cartas[index];
                const parejas = jugador.cartas.filter(carta => carta.value === cartaActual.value);
                if (parejas.length === 2) {
                    const pareja = {
                        hasPareja: true,
                        cartas: parejas,
                        jugador: jugadores[posicion].nombre
                    }
                    parejasEncontradas[posicion] = pareja;
                }
            }
            posicion++;
        }
        // Eliminamos los espacios vacios.
        parejasEncontradas = parejasEncontradas.filter(Boolean);
        // Validamos si ganaron más de un jugador a la vez, para desempatar.
        if (parejasEncontradas.length == 1) {
            unicoGanador(parejasEncontradas);
        } else if (parejasEncontradas.length > 1) {
            empate(parejasEncontradas);
        }
    }

    function unicoGanador(parejasEncontradas) {
        for (let index = 0; index < parejasEncontradas.length; index++) {
            const pareja = parejasEncontradas[index];
            if (pareja?.hasPareja) {
                setMazoGanador(pareja);
            }
        }
    }

    function empate(parejasEncontradas) {
        let ganador = {
            jugador: parejasEncontradas[0].jugador,
            carta1: parejasEncontradas[0].cartas[MagicNumber.CERO],
            carta2: parejasEncontradas[0].cartas[MagicNumber.UNO],
        };
        for (let index = 1; index < parejasEncontradas.length; index++) {
            const pareja = parejasEncontradas[index];
            console.group("Valor mazos");
            console.log("MazoGanador: " + valorMazo(ganador.carta1.suit, ganador.carta2.suit))
            console.log("MazoGanador: " + valorMazo(pareja.cartas[0].suit, pareja.cartas[1].suit))
            console.groupEnd();
            if (valorMazo(ganador.carta1.suit, ganador.carta2.suit) < valorMazo(pareja.cartas[0].suit, pareja.cartas[1].suit)) {
                ganador = {
                    jugador: pareja.jugador,
                    cartas: pareja.cartas,
                };
            }
        }
        setMazoGanador(ganador);
    }

    function valorMazo(carta1, carta2) {
        return getSuitValue(carta1) + getSuitValue(carta2)
    }

    function getSuitValue(suit) {
        //suit > número es mayot
        // 4. "HEARTS"
        // 3. "SPADES"
        // 2. "DIAMONDS"
        // 1. "CLUBS"
        switch (suit) {
            case "HEARTS":
                return 4;
            case "SPADES":
                return 3;
            case "DIAMONDS":
                return 2;
            case "CLUBS":
                return 1;
            default:
                return 0;
        }
    }

    const reiniciarJuego = () => {
        setJugadores([]);
        setMazoGanador({});
        setIdPartida("");
    }

    return (
        <PartidaContext.Provider value={{ jugadores, idPartida, iniciarPartida, handledNombreJugador, pedirCartas, mazoGanador, reiniciarJuego }}>
            {children}
        </PartidaContext.Provider>
    )

}

export default PartidaProvider;