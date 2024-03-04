import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
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

export default function Rutas() {
    const [rutas, setRutas] = useState([]);
    const[cookies, setCookie, removeCookie] = useCookies('session');

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
                                        <Button variant="contained" color="primary" sx={{ backgroundColor: '#00897b', marginTop: '1rem' }}>
                                            Ver detalles
                                        </Button>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>

            ))}
        </>
    );
}
