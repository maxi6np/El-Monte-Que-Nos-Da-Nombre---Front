import Typography from '@mui/material/Typography';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { useCookies } from 'react-cookie';
import { useState } from "react";

export default function Rutas({ rutas }) {
    const [puntosSeleccionados, setpuntosSeleccionados] = useState([]);

    const mostrarPuntos = (ruta_id) => {
        const rutaSeleccionada = rutas.find(ruta => ruta.id_ruta === ruta_id);
        if (rutaSeleccionada) {
            setpuntosSeleccionados(rutaSeleccionada.puntos_interes);
            console.log(puntosSeleccionados)
        }
    }

    return (
        <>
            {rutas.map((ruta) => (
                <Card key={ruta.id_ruta} sx={{
                    width: '33vw', marginBottom: '2rem', border: '1px solid #b8bec2',
                    borderRadius: '8px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                    <CardActionArea component='span'>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={5}>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={ruta.imagen_principal}
                                        alt={ruta.nombre}
                                    />
                                </Grid>
                                <Grid item xs={12} md={7}>
                                    <Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'center' }}>
                                        {ruta.nombre}
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        <p><StarIcon /> Dificultad: {ruta.dificultad}</p>
                                        <p><AccessTimeIcon /> Duración: {ruta.duracion}h</p>
                                        <p><DescriptionIcon /> Descripción: {ruta.descripcion}</p>
                                        <Button variant="contained" color="primary" sx={{ backgroundColor: '#00897b', marginTop: '1rem' }} onClick={() => mostrarPuntos(ruta.id_ruta)}>
                                            Ver detalles
                                        </Button>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>

            ))}

            {/* Muestra los puntos de interés de la ruta seleccionada */}
            {puntosSeleccionados.length > 0 && (
                <div>
                    <Typography variant="h6">Puntos de Interés</Typography>
                    {puntosSeleccionados.map((punto, index) => (
                        <div key={index}>
                            <Typography variant="subtitle1">{punto.nombre}</Typography>
                            <Typography variant="body2">{punto.descripcion}</Typography>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
