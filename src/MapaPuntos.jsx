import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoFinal from './img/logo_final.png';
import AspectRatio from '@mui/joy/AspectRatio';
import { useCookies } from 'react-cookie';
import AspectRatio from "@mui/joy/AspectRatio";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { Link } from "react-router-dom";
import Markers from "./Markers";
import LogoFinal from "./img/logo_final.png";

function MapaPuntos({ logout }) {
    const [puntos, setPuntos] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const zoomLevel = 13;
    const latlong = [43.3736, -5.8500]

    const ZoomReset = () => {
        const map = useMapEvents({
            contextmenu() {
                map.setView(latlong, zoomLevel);
            }
        })
    }

    useEffect(() => {


        fetch('http://127.0.0.1:8000/mapa-puntos', { method: 'get' })
            .then(response => response.json())
            .then(data => setPuntos(data))





    }, []);

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
                <Toolbar sx={{ width: "100vw" }}>
                    <Grid2 container sx={{ width: "100%" }}>
                        <Grid2 xs display="flex" justifyContent="start" alignItems="center">
                            <Box
                                component='div'

                                sx={{
                                    flexBasis: "200px",
                                    justifySelf: "start",
                                    marginBottom: '-2em',
                                    marginTop: '-2em'
                                }}
                            >
                                <Link to='/'> <img src={LogoFinal} alt="IES MONTE NARANCO" style={{ height: '100%', width: '100%' }} /></Link>
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
                                        onClick={() => logout()}
                                        component={Link}
                                        to="/"
                                        startIcon={<LogoutIcon></LogoutIcon>}
                                        sx={{ ':hover': { backgroundColor: '#00897b' } }}
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon></LoginIcon>} sx={{ ':hover': { backgroundColor: '#00897b' } }}>
                                        Login
                                    </Button>
                                )}
                                {!cookies.session && (
                                    <Button color="inherit" component={Link} to="/registro" startIcon={<PersonIcon></PersonIcon>} sx={{ ':hover': { backgroundColor: '#00897b' } }}>
                                        Registrarse
                                    </Button>
                                )}
                            </Box>
                        </Grid2>
                    </Grid2>
                </Toolbar>
            </AppBar>
            <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
                <Toolbar sx={{ height: '100%' }}>
                    <Button color="inherit" component={Link} to="/" sx={{ height: '100%', ':hover': { backgroundColor: '#00897b' } }}>
                        Inicio
                    </Button>
                    <Button color="inherit" component={Link} to="/mapa-puntos" sx={{ ':hover': { backgroundColor: '#00897b' } }}>
                        Descubre
                    </Button>
                    <Button color="inherit" component={Link} to="/itinerarios" sx={{ ':hover': { backgroundColor: '#00897b' } }}>
                        Itinerarios
                    </Button>
                    <Button color="inherit" component={Link} to="/informacion" sx={{ ':hover': { backgroundColor: '#00897b' } }}>
                        Información del Proyecto
                    </Button>
                </Toolbar>
            </AppBar>
            <MapContainer center={latlong} zoom={zoomLevel} minZoom={zoomLevel} scrollWheelZoom={true} style={{ height: '80vh', width: '80%' }}>
                <TileLayer
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                />
                <Markers puntos={puntos}></Markers>
                <ZoomReset></ZoomReset>

            </MapContainer>

        </>
    );
}

export default MapaPuntos;
