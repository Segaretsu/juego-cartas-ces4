import axios from "axios";
import CONSTANTES from "../config/constants";

const DeckofcardsapiService = {
    getId,
    getCartas,
}

async function getId() {
    const URI = `${CONSTANTES.URL_API}/new/shuffle`;
    const { data } = await axios.get(URI);
    return data?.deck_id;
}

/**
 * 
 * @param {number} count número de cartas a obtener.
 * @param {string} idPartida id de la partida.
 * @returns n cartas
 */
async function getCartas(count, idPartida) {
    const URI = `${CONSTANTES.URL_API}/${idPartida}/draw/?count=${count}`;
    const { data } = await axios.get(URI);
    console.log(data)
    return data?.cards;
}

export default DeckofcardsapiService;