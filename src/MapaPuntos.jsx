import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { Link } from "react-router-dom";
  import PersonIcon from "@mui/icons-material/Person";
  import LogoFinal from './img/logo_final.png';
  import AspectRatio from '@mui/joy/AspectRatio';
  import { Cookies, useCookies } from 'react-cookie';
  import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
  

function MapaPuntos() {
    const [puntos, setPuntos] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['session']);

    useEffect(() => {
        const map = L.map('map').setView([43.3736, -5.8500], 13);
        const tiles = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        let marker = null;
        const myIcon = L.icon({
            iconUrl: './img/balon.svg',
            iconSize: [35, 35],
            iconAnchor: [17, 35],
            popupAnchor: [0, -35]
        });

        fetch('http://127.0.0.1:8000/mapa-puntos', { method: 'get' })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPuntos(data);
                console.log(puntos)

                // Iterar sobre puntos aquí, después de que puntos esté definido
                puntos.forEach(punto => {
                    marker = L.marker([punto.latitud, punto.longitud]).addTo(map)
                        .bindPopup(`<b>${punto.nombre}</b>`);
                    marker.on('click', function (e) {
                        map.setView(this.getLatLng(), 20);
                    });
                });
            })
        // .catch(error => {
        //     console.error('Error en la solicitud fetch:', error);
        // });

        map.on('contextmenu', () => {
            map.setView([40, -3.7], 6);
            map.closePopup();
        });

        // Clean up function
        return () => {
            map.off(); // Remove all event listeners
            map.remove(); // Remove the map instance
        };

    }, []); // Run this effect only once on mount

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ width: "100vw" }}>
                    <Grid2 container sx={{ width: "100%" }}>
                        <Grid2 xs display="flex" justifyContent="start" alignItems="center">
                            <AspectRatio
                                className="mt-2 mb-2"
                                variant="plain"
                                sx={{
                                    flexBasis: "200px",
                                    overflow: "auto",
                                    justifySelf: "start",
                                }}
                            >
                                <img src={LogoFinal} alt="IES MONTE NARANCO" />
                            </AspectRatio>
                        </Grid2>
                        <Grid2
                            xs
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Typography
                                variant="h6"
                                component="div"
                                sx={{ textAlign: "center" }}
                            >
                                El Monte que nos da el nombre
                            </Typography>
                        </Grid2>
                        <Grid2 xs display="flex" justifyContent="end" alignItems="center">
                            <Box component="div">
                                <PersonIcon />
                                {cookies.session ? (
                                    <Button
                                        color="inherit"
                                        onClick={() => logout()}
                                        component={Link}
                                        to="/"
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <Button color="inherit" component={Link} to="/login">
                                        Login
                                    </Button>
                                )}
                                {!cookies.session && (
                                    <Button color="inherit" component={Link} to="/registro">
                                        Registrarse
                                    </Button>
                                )}
                            </Box>
                        </Grid2>
                    </Grid2>
                </Toolbar>
            </AppBar>
            <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        Inicio
                    </Button>
                    <Button color="inherit" component={Link} to="/mapa-puntos">
                        Descubre
                    </Button>
                    <Button color="inherit" component={Link} to="/itinerarios">
                        Itinerarios
                    </Button>
                    <Button color="inherit" component={Link} to="/informacion">
                        Información del Proyecto
                    </Button>
                </Toolbar>
            </AppBar>

            <div id="map" style={{ width: '80%', height: '80vh' }}></div>
        </>
    );
}

export default MapaPuntos;
