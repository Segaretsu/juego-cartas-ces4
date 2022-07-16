import { useEffect } from "react";
import usePartida from "../context/usePartida";
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Button, Icon, Typography } from "@mui/material";

const Juego = () => {

    const { jugadores, pedirCartas, mazoGanador, reiniciarJuego } = usePartida();

    const navigate = useNavigate();

    const handledJuego = () => {
        pedirCartas();
    }

    useEffect(() => {
        if (mazoGanador?.jugador) {
            // alert("El ganador es el jugador: " + mazoGanador.jugador);
        }
    }, [mazoGanador]);

    function getIcon(nombreJugador) {
        if (mazoGanador?.jugador) {
            if (nombreJugador == mazoGanador?.jugador) {
                return <Icon sx={{ color: "#83a832" }}>check_circle</Icon>;
            }
            return <Icon sx={{ color: "#b30000" }}>cancel</Icon>;
        }
        return <Icon>radio_button_unchecked</Icon>;
    }

    const finalizarJuego = () => {
        reiniciarJuego();
        navigate("/");
    }

    return (
        <>
            {!mazoGanador?.jugador && <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item>
                    <Button onClick={handledJuego} variant="contained"><Icon>play_arrow</Icon></Button>
                </Grid>
            </Grid>}
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                {mazoGanador?.jugador &&
                    <>
                        <Grid item xs={12} md={6} lg={6} >
                            <Typography align="center" marginY={2} component="p" variant="h5">
                                El jugador ganador fue: <Icon sx={{ color: "#83a832" }}>check_circle</Icon>
                            </Typography>
                            <Typography align="center" marginY={2} component="p" variant="p">
                                {mazoGanador?.jugador}
                            </Typography>
                            <Typography align="center" marginY={2} component="p" variant="h6">
                                Cartas Opcionadas
                            </Typography>
                            <div>
                                {mazoGanador.cartas.map((carta, index) => <img key={`${index}-${carta.value}`} width="120" height="180" src={carta.image} />)}
                            </div>
                        </Grid>
                        <Grid direction="column" marginY={2}>
                            <Grid item xs={12} md={6} lg={6}>
                                <Button onClick={finalizarJuego} variant="outlined">Partida nueva<Icon>play_arrow</Icon></Button>
                            </Grid>
                        </Grid>

                    </>
                    ||
                    ""}
            </Grid>
            <Grid container spacing={2}>
                {jugadores.map((jugador) => {
                    return (
                        <Grid key={jugador.nombre} item xs={12} md={6} lg={6} >
                            <p>Jugador: {jugador.nombre} {getIcon(jugador.nombre)}</p>
                            <div>
                                {jugador.cartas.map((carta, index) => <img key={`${index}-${carta.value}`} width="120" height="180" src={carta.image} />)}
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}

export default Juego;