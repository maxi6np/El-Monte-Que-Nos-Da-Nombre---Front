import { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";
import LogoFinalBanner from "../img/logo_final_Banner.png";
import { useCookies } from "react-cookie";
import MapaRutas from "./MapaRutas";
import Rutas from "./Rutas";
import Footer from "../Footer";


function Itinerarios({ logout, activeButton, setActiveButton }) {
    const [cookies, setCookie, removeCookie] = useCookies("session");
    const [rutas, setRutas] = useState([]);
    const [puntosSeleccionados, setPuntosSeleccionados] = useState([]);


    useEffect(() => {
        let body = JSON.stringify({
            token: (cookies.session ? cookies.session.token : '')
        })
        fetch('http://127.0.0.1:8000/get-rutas', {
            method: "post",
            body: body,
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then(response => response.json())
            .then(data => setRutas(data.data));
    }, []);


    return (<>
        <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
            <Toolbar sx={{ width: "100vw" }}>
                <Grid2 container sx={{ width: "100%" }}>
                    <Grid2 xs display="flex" justifyContent="start" alignItems="center">
                        <Box
                            component="div"
                            sx={{
                                flexBasis: "100px",
                                justifySelf: "start",
                                marginTop: "1rem",
                                marginBottom: "1rem",
                            }}
                        >
                            <Link to="/">
                                {" "}
                                <img
                                    src={LogoFinalBanner}
                                    alt="IES MONTE NARANCO"
                                    style={{ height: "100%", width: "100%" }}
                                    onClick={() => setActiveButton("Inicio")}
                                />
                            </Link>
                        </Box>
                    </Grid2>
                    <Grid2
                        xs
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ textAlign: "center" }}
                        >
                            EL MONTE QUE NOS DA NOMBRE
                        </Typography>
                    </Grid2>
                    <Grid2 xs display="flex" justifyContent="end" alignItems="center">
                        <Box component="div">
                            {cookies.session ? (
                                <Button
                                    color="inherit"
                                    onClick={() => {
                                        setActiveButton("Inicio");
                                        logout();
                                    }}

                                    component={Link}
                                    to="/"
                                    startIcon={<LogoutIcon></LogoutIcon>}
                                    sx={{ ":hover": { backgroundColor: "#00897b" } }}
                                >
                                    Cerrar Sesión
                                </Button>
                            ) : (
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/login"
                                    startIcon={<LoginIcon></LoginIcon>}
                                    sx={{ ":hover": { backgroundColor: "#00897b" } }}
                                >
                                    Iniciar Sesión
                                </Button>
                            )}
                            {!cookies.session && (
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/registro"
                                    startIcon={<PersonIcon></PersonIcon>}
                                    sx={{ ":hover": { backgroundColor: "#00897b" } }}
                                >
                                    Registrarse
                                </Button>
                            )}
                        </Box>
                    </Grid2>
                </Grid2>
            </Toolbar>
        </AppBar>
        <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
            <Toolbar sx={{ height: "100%" }}>
                <Button
                    color="inherit"
                    component={Link}
                    to="/"
                    sx={{
                        height: "100%",
                        ":hover": { backgroundColor: activeButton === "Inicio" ? "#00897b" : null },
                        backgroundColor: activeButton === "Inicio" ? "#00897b" : null
                    }}
                    onClick={() => setActiveButton("Inicio")}
                >
                    Inicio
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/descubre"
                    sx={{
                        ":hover": { backgroundColor: activeButton === "Descubre" ? "#00897b" : null },
                        backgroundColor: activeButton === "Descubre" ? "#00897b" : null
                    }}
                    onClick={() => setActiveButton("Descubre")}
                >
                    Descubre
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/itinerarios"
                    sx={{
                        ":hover": { backgroundColor: activeButton === "Itinerarios" ? "#00897b" : null },
                        backgroundColor: activeButton === "Itinerarios" ? "#00897b" : null
                    }}
                    onClick={() => setActiveButton("Itinerarios")}
                >
                    Itinerarios
                </Button>
                <Button
                    color="inherit"
                    component={Link}
                    to="/informacion"
                    sx={{
                        ":hover": { backgroundColor: activeButton === "Información" ? "#00897b" : null },
                        backgroundColor: activeButton === "Información" ? "#00897b" : null
                    }}
                    onClick={() => setActiveButton("Información")}
                >
                    Información del Proyecto
                </Button>
            </Toolbar>
        </AppBar>



        <Typography variant="h3" sx={{ textAlign: 'center', marginTop: '2rem' }} component="h3">
            Rutas
        </Typography>

        <Grid container spacing={4} sx={{ marginTop: 2, marginBottom: 2 }}>
            {/* Tarjetas */}
            <Grid item xs={12} md={4}>
                <Rutas rutas={rutas} setPuntosSeleccionados={setPuntosSeleccionados} />
            </Grid>
            {/* Mapa */}
            <Grid item xs={12} md={8}>
                <MapaRutas puntosSeleccionados={puntosSeleccionados} setPuntosSeleccionados={setPuntosSeleccionados} />
            </Grid>
        </Grid>
        <Footer />
    </>

    );

}


export default Itinerarios