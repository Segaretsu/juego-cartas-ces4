import { useContext } from "react";
import { PartidaContext } from "./PartidaContext";

const usePartida = () => {
    return useContext(PartidaContext);
}

export default usePartida;