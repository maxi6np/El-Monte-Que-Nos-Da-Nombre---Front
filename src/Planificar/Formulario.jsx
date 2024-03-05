import React from 'react'
import { Button, Container, Grid, TextField, ThemeProvider, createTheme, Input } from "@mui/material";
import { useState } from "react";
import Error from "../Error";
import { useNavigate } from 'react-router-dom';
import LogoFinalBanner from "../img/logo_final_Banner.png";
import Eleccion from './Eleccion';


export const Formulario = () => {
    const [usuario, setUsuario] = useState({});
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [puntos, setPuntos] = useState("");
    const [imagen, setImagen] = useState("");
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState();
    const navigate = useNavigate();

    const handlePlanificar = (e) => {
        setError(false);
        e.preventDefault();

        if (
            [
                nombre,
                descripcion,
                puntos,
                imagen,
            ].includes("")
        ) {
            setMensaje("Rellene todos los campos");
            setError(true);
        } else {

            let body = JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                puntos: puntos,
                imagen: imagen
            })

            fetch('http://127.0.0.1:8000/planificar-ruta', { method: 'post', body: body, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.message === 'Ruta creada correctamente') {
                        navigate("/login");
                    } else {
                        setMensaje(data.message);
                        setError(true);
                    }
                })
        }
    };
    return (
        <div style={{width:'40vw', margin:'auto', marginTop:'2rem'}}>
            <Grid container spacing={1}>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <TextField
                                label="Nombre"
                                variant="outlined"
                                fullWidth
                                value={usuario.nombre}
                                onChange={
                                    (e) => {
                                        setNombre(e.target.value)
                                        setError(false)
                                    }
                                }
                                required
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                label="Descripcion"
                                variant="outlined"
                                fullWidth
                                value={usuario.descripcion}
                                onChange={(e) => {
                                    setDescripcion(e.target.value)
                                    setError(false)
                                }}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label>
                                Puntos de interés
                                <Eleccion />
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{ width: "100%" }}>
                                Imagen
                                <Input
                                    variant='outlined'
                                    type="file"
                                    onChange={(e) => {
                                        setImagen(e.target.files[0]);
                                        setError(false);
                                    }}
                                    fullWidth
                                />
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            {error && <Error>{mensaje}</Error>}

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                style={{ marginTop: "20px" }}
                                sx={{
                                    bgcolor: 'primary.main',
                                    ':hover': {
                                        bgcolor: 'primary.light'
                                    },
                                }}
                                onClick={handlePlanificar}
                            >
                                Crear ruta
                            </Button>
                        </Grid >
                    </Grid>
                </form>
            </Grid>
        </div>
    )
}
