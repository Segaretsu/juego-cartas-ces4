import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Juego from "../components/Juego";

const PartidaPage = () => {

    return (
        <Container>
            <header>
                <Typography align="center" marginY={3} component="h1" variant="h3">Juego</Typography>
            </header>
            <Juego />
        </Container>
    )
}

export default PartidaPage;