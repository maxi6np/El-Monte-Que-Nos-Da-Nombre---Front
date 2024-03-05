import Typography from '@mui/material/Typography';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Menu } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import PercentIcon from '@mui/icons-material/Percent';
import { useCookies } from 'react-cookie';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from "react";

export default function Rutas({ setPuntosSeleccionados }) {
export default function Rutas({ setPuntosSeleccionados }) {
    const [rutas, setRutas] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies('session');
    const [ordenarPor, setOrdenarPor] = useState('Ninguna');
    const [filtrarPor, setFiltrarPor] = useState('Todas');
    const [filtradas, setFiltradas] = useState([]);

    const mostrarPuntos = (ruta_id) => {
        const rutaSeleccionada = rutas.find(ruta => ruta.id_ruta === ruta_id);
        if (rutaSeleccionada) {
            setPuntosSeleccionados(rutaSeleccionada.puntos_interes);
        }
    }


    const Ordenar = (condicion) => {
        switch (condicion) {
            case 'Reciente':
                setFiltradas(filtradas.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion)));
                break;
            case 'Longitud':
                setFiltradas(filtradas.sort((a, b) => b.duracion - a.duracion));
                break;
            case '%completada':
                setFiltradas(filtradas.sort((a, b) => b.porcentaje - a.porcentaje));
        }
    }

    const filtrar = (condicion1) => {



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
        .then(data => { setRutas(data.data); setCategorias(data.categorias); setFiltradas(data.data) });
}, []);

useEffect(() => {

    setFiltradas(rutas);
    if (filtrarPor !== 'Todas') {
        let nuevasFiltradas = [];


        filtradas.forEach(ruta => {
            ruta.puntos_interes.forEach(punto => {
                punto.categorias.forEach(categoria => {
                    if (categoria.nombre === filtrarPor) {
                        nuevasFiltradas.push(ruta);
                    }
                });
            });
        });

        setFiltradas(nuevasFiltradas);
    }
}, [filtrarPor]);

return (
    <>

        <Grid container spacing={2}>
            <Grid item xs={4}>
                <FormControl fullWidth sx={{ marginBottom: '2rem' }}>


                    <InputLabel id="select-ordenacion-label">Ordenar por</InputLabel>
                    <Select
                        labelId="select-ordenacion-label"
                        id="select-ordenacion"
                        label="Ordenar por"
                        value={ordenarPor}
                        onChange={(e) => { setOrdenarPor(e.target.value); Ordenar(e.target.value); }}
                    >
                        <MenuItem value='Ninguna'>Ninguna</MenuItem>
                        <MenuItem value={'Reciente'}>Reciente</MenuItem>
                        {cookies.session && <MenuItem value={'%completada'}>%completada</MenuItem>}
                        <MenuItem value={'Longitud'}>Longitud</MenuItem>
                    </Select>


                </FormControl>
            </Grid>
            <Grid item xs={4}>
                <FormControl fullWidth sx={{ marginBottom: '2rem' }}>
                    <InputLabel id="select-categoria-label">Mostrar por categoria</InputLabel>
                    <Select
                        labelId="select-categoria-label"
                        id="select-categoria"
                        label="Mostrar por categoria"
                        value={filtrarPor}
                        onChange={(e) => {
                            setFiltrarPor(e.target.value);
                            setFiltradas(rutas)
                            filtrar(e.target.value);
                        }}
                    >
                        <MenuItem value='Todas'>Todas</MenuItem>
                        {categorias.map((categoria) => !categoria.nombre.includes('accesible') && !categoria.nombre.includes('cerrada') ? <MenuItem key={categoria.nombre} value={`${categoria.nombre}`}>{categoria.nombre}</MenuItem> : null)}

                    </Select>
                </FormControl>
            </Grid>
        </Grid>

        {filtradas.map((ruta) => (
            <Card key={ruta.id_ruta} sx={{
                width: '33vw', marginBottom: '2rem', border: '1px solid #b8bec2',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }} onClick={() => mostrarPuntos(ruta.id_ruta)}>
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
                                    {cookies.session && <p><PercentIcon />Progreso: {ruta.porcentaje}%</p>}
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
