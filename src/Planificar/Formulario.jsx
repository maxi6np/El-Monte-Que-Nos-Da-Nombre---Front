import React from 'react'
import { Button, Grid, TextField, Input, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from "@mui/material";
import { useState, useEffect } from "react";
import Error from "../Error";
import { useNavigate } from 'react-router-dom';
import Eleccion from './Eleccion';
import Textarea from '@mui/material/TextareaAutosize';
import CircularProgress from '@mui/material/CircularProgress';
import { useCookies } from 'react-cookie';


export const Formulario = () => {
    const [usuario, setUsuario] = useState({});
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState();
    const navigate = useNavigate();
    const [puntos, setPuntos] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkCheckbox, setCheckCheckbox] = useState(true)
    const [cargando, setCargando] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies('session')

    useEffect(() => {
        setPuntos([])
        setCargando(true)
        fetch("http://127.0.0.1:8000/puntos-trabajos", { method: "get" })
            .then((response) => response.json())
            .then((data) => {
                setPuntos(data.data.map(punto => ({ ...punto, seleccionado: false })));
                setCargando(false)
            });
    }, []);


    const handlePlanificar = (e) => {
        e.preventDefault();
        console.log(checkCheckbox)
        setChecked([])
        setError(false);

        if (
            [
                nombre,
                descripcion,
            ].includes("")
        ) {
            setMensaje("Rellene todos los campos");
            setError(true);
        } else if (checked.length < 1) {
            setMensaje("Elige al menos un punto de interés");
            setError(true);
        } else {

            if (imagen == null || imagen == '') {
                let body = JSON.stringify({
                    imagen: imagen
                })

                fetch('http://127.0.0.1:8000/get-imagen-ppi', { method: 'post', body: body, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        // setImagen(data)
                    })
            }

            let body = JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                puntos: checked,
                imagen_principal: imagen,
                publica: checkCheckbox ? 1 : 0,
                token: cookies.session.token
            })

            fetch('http://127.0.0.1:8000/planificar-ruta', { method: 'post', body: body, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.message === 'Ruta creada correctamente') {
                        navigate("/itinerarios");
                    } else {
                        setMensaje(data.message);
                        setError(true);
                    }
                })
        }
    };
    return (
        <div style={{ width: '40vw', margin: 'auto', marginTop: '6rem', height: '100%' }}>
            <Grid container spacing={1}>
                <form>
                    <Grid container spacing={5}>
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
                        <Grid item xs={12} md={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Textarea
                                placeholder='Descripción*'
                                size="lg" name="Size"
                                color="neutral"
                                minRows={2}
                                onChange={
                                    (e) => {
                                        setDescripcion(e.target.value)
                                        setError(false)
                                    }
                                }
                                required />
                        </Grid>
                        <Grid item xs={12}>
                            <label>
                                Puntos de interés*
                            </label>
                            {(cargando) ? (
                                <Grid container style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <CircularProgress />
                                </Grid>
                            ) : (<Eleccion puntos={puntos} setPuntos={setPuntos} setChecked={setChecked} />)}
                        </Grid>
                        <Grid item xs={12}>
                            <label style={{ width: "100%" }}>
                                Imagen
                                <Input
                                    variant='outlined'
                                    type="file"
                                    onChange={(e) => {
                                        setImagen(e.target.files[0].name);
                                        setError(false);
                                    }}
                                    fullWidth
                                />
                            </label>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl>
                                <label>Visibilidad*</label>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={checkCheckbox}
                                    onChange={(e) => setCheckCheckbox(e.target.value)}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="Pública" />
                                    <FormControlLabel value={false} control={<Radio />} label="Privada" />
                                </RadioGroup>
                            </FormControl>
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
