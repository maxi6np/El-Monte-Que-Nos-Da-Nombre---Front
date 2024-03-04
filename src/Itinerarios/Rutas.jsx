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
import { useCookies } from 'react-cookie'; import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";

export default function Rutas() {
    const [rutas, setRutas] = useState([]);
    const[cookies, setCookie, removeCookie] = useCookies('session');
    const [ordenarPor, setOrdenarPor] = useState();
    const [puntosSeleccionados, setpuntosSeleccionados] = useState([]);

    const mostrarPuntos = (ruta_id) => {
        const rutaSeleccionada = rutas.find(ruta => ruta.id_ruta === ruta_id);
        if (rutaSeleccionada) {
            setpuntosSeleccionados(rutaSeleccionada.puntos_interes);
            console.log(puntosSeleccionados)
        }
    }
    const Ordenar = (condicion) => {
        switch (condicion) {
            case 'Reciente':
                setRutas(rutas.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)));
                break;
            case 'Longitud':
                setRutas(rutas.sort((a, b) => b.duracion - a.duracion));
                break;
        }
    }
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
            <FormControl  sx={{marginBottom:'2rem', width:'30%'}}>
                <InputLabel id="select-ordenacion-label">Ordenar por</InputLabel>
                <Select
                    labelId="select-ordenacion-label"
                    id="select-ordenacion"
                    label="Ordenar por"
                    value={ordenarPor}
                    onChange={(e) => {setOrdenarPor(e.target.value); Ordenar(e.target.value);}}
                >
                    <MenuItem value={'Reciente'}>Reciente</MenuItem>
                    <MenuItem value={'%completada'}>%completada</MenuItem>
                    <MenuItem value={'Longitud'}>Longitud</MenuItem>
                </Select>
            </FormControl>
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
