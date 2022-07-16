import { MagicNumber } from "../config/constants";
import usePartida from "../context/usePartida";
import InputJugador from "../hooks/InputJugador";
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Button } from "@mui/material";


const InicioPartida = () => {

    const navigate = useNavigate();

    const { iniciarPartida, jugadores } = usePartida();

    const puedeJugar = async () => {
        if (jugadores.length > 0) {
            for await (const jugador of jugadores) {
                if (!jugador?.nombre || jugador?.nombre == '') {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    const iniciar = async () => {
        if (await puedeJugar()) {
            await iniciarPartida();
            navigate("/juego");
            return;
        }
        alert("Diligencie todos los campos obligatorios para continuar. (campos marcados con *)");
    }

    return (
        <>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                    <InputJugador name="jugador1" posicion={MagicNumber.UNO} />
                </Grid>
                <Grid item>
                    <InputJugador name="jugador2" posicion={MagicNumber.DOS} />
                </Grid>
                <Grid item>
                    <Button onClick={iniciar} variant="contained">Iniciar partida</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default InicioPartida;