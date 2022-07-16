import { FormControl, TextField } from "@mui/material";
import { useEffect } from "react";
import usePartida from "../context/usePartida";

const InputJugador = (props) => {
    const { posicion } = props;
    const { handledNombreJugador } = usePartida();

    const handledNombre = (e) => {
        handledNombreJugador(posicion, e.target.value);
    }

    useEffect(() => {
        handledNombreJugador(posicion, "");
    }, [posicion])

    return (
        <FormControl>
            <TextField label={`Jugador ${posicion}: *`} variant="outlined" onBlur={handledNombre} {...props} />
        </FormControl>
    );
}

export default InputJugador;