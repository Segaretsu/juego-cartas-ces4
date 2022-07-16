import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import InicioPartida from "../components/InicioPartida";

const InicioPartidaPage = () => {
    return (
        <Container>
            <header>
                <Typography align="center" marginY={5} component="h1" variant="h3">Iniciar juego</Typography>
            </header>
            <InicioPartida />
        </Container>
    );
}

export default InicioPartidaPage;