import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioPartidaPage from "../pages/InicioPartidaPage";
import PartidaPage from "../pages/PartidaPage";
import PartidaProvider from "../context/PartidaProvider";

const RouterApp = () => {
    return (
        <BrowserRouter>
            <PartidaProvider>
                <Routes>
                    <Route path="/" element={<InicioPartidaPage />} />
                    <Route path="/juego" element={<PartidaPage />} />
                </Routes>
            </PartidaProvider>
        </BrowserRouter>
    );
}

export default RouterApp;