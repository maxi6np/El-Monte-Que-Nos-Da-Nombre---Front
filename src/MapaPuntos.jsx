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
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import Markers from './Markers';


function MapaPuntos() {
    const [puntos, setPuntos] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
    const [zoomLevel, setZoomLevel] = useState(13);
    const [Latlong, setLatlong] = useState([43.3736, -5.8500])
    const cambiarZoom = (e) => {
        setLatlong(e.getLatLng()); 
        setZoomLevel(20)
    }
    useEffect(() => {

        




        fetch('http://127.0.0.1:8000/mapa-puntos', { method: 'get' })
                .then(response => response.json())
             .then(data => setPuntos(data))
                 

        //         // Iterar sobre puntos aquí, después de que puntos esté definido
        //         puntos.forEach(punto => {
        //             marker = L.marker([punto.latitud, punto.longitud]).addTo(map)
        //                 .bindPopup(`<b>${punto.nombre}</b>`);
        //             marker.on('click', function (e) {
        //                 map.setView(this.getLatLng(), 20);
        //             });
        //         });
        //     })
        // // .catch(error => {
        // //     console.error('Error en la solicitud fetch:', error);
        // // });

        // map.on('contextmenu', () => {
        //     map.setView([40, -3.7], 6);
        //     map.closePopup();
        // });

        // // Clean up function
        // return () => {
        //     map.off(); // Remove all event listeners
        //     map.remove(); // Remove the map instance


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
            <MapContainer center={Latlong} zoom={zoomLevel} scrollWheelZoom={false} style={{height:'80vh', width:'80%'}}>
                <TileLayer 
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
                />
               <Markers puntos={puntos}></Markers>
                
            </MapContainer>

        </>
    );
}

export default MapaPuntos;
