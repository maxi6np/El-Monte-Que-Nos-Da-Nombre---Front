import React from 'react'
import { Button, Grid, TextField, Input, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from "@mui/material";
import { useState, useEffect } from "react";
import Error from "../Error";
import { useNavigate } from 'react-router-dom';
import Eleccion from './Eleccion';
import Textarea from '@mui/material/TextareaAutosize';
import CircularProgress from '@mui/material/CircularProgress';
import { useCookies } from 'react-cookie';


export const FormularioEditar = ({ setActiveButton, idRuta }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagen, setImagen] = useState("");
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [puntos, setPuntos] = useState([]);
    const [checked, setChecked] = useState([]);
    const [checkCheckbox, setCheckCheckbox] = useState(true)
    const [cargando, setCargando] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies('session')
    const [editando, setEditando] = useState(false)

    useEffect(() => {
        let body = JSON.stringify({
            token: cookies.session.token
        })
        setCargando(true)

        fetch(`http://127.0.0.1:8000/encontrar-ruta/${idRuta}`, { method: 'post', body: body, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } })
            .then(response => response.json())
            .then(data => {
                setNombre(data.data.nombre);
                setDescripcion(data.data.descripcion);
                setImagen(data.data.imagen_principal);
                data.data.publica == 1 ? setCheckCheckbox(true) : setCheckCheckbox(false);
                setChecked(data.data.puntos_interes.map(punto => (punto.id_punto_interes)));


            });



        let body2 = JSON.stringify({
            token: (cookies.session ? cookies.session.token : '')
        })
        fetch("http://127.0.0.1:8000/puntos-trabajos", {
            method: "post", body: body2, headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPuntos(data.data);
                setCargando(false)
            });

    }, []);


    const handlePlanificar = (e) => {
        e.preventDefault();
        setChecked([])
        setError(false);

        if (
            [
                nombre,
                descripcion,
            ].includes("")
        ) {
            setMensaje("Rellene los campos obligatorios");
            setError(true);
        } else if (checked.length < 1) {
            setMensaje("Elige al menos un punto de interés");
            setError(true);
        } else {

            let body = JSON.stringify({
                nombre: nombre,
                descripcion: descripcion,
                puntos: checked,
                imagen_principal: imagen,
                publica: checkCheckbox ? 1 : 0,
                token: cookies.session.token
            })

            fetch(`http://127.0.0.1:8000/editar-ruta/${idRuta}`, { method: 'put', body: body, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.message === 'Ruta creada correctamente') {
                        navigate("/itinerarios");
                        setActiveButton('Itinerarios')
                        setEditando(false)
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
                                value={nombre}
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
                                value={descripcion}
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
                            ) : (<Eleccion puntos={puntos} setPuntos={setPuntos} setChecked={setChecked} checked={checked} />)}
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
                        <Grid xs={12} gap={'1em'} display="flex" justifyContent="end" alignItems="center" sx={{marginTop:'1em'}}>
                            {imagen != '' && <Grid item xs={6} >
                                <h6>Imagen antigua</h6>
                                <img
                                    src={'/' + imagen}
                                    alt='imagen actual'
                                    style={{ height: "100%", width: "100%" }}

                                />
                            </Grid>}
                            <Grid item xs={5}>
                                <Button
                                    type="button"
                                    variant="contained"
                                    fullWidth
                                    
                                    sx={{
                                        bgcolor: 'red',

                                    }}
                                    onClick={(e) => { setImagen(''); e.target.style.display = 'none' }}
                                >
                                    Eliminar imagen
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl>
                                <label>Visibilidad*</label>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={checkCheckbox}
                                    onChange={(e) => setCheckCheckbox(!checkCheckbox)}
                                >
                                    <FormControlLabel control={<Radio value={true} />} label="Pública" />
                                    <FormControlLabel control={<Radio value={false} />} label="Privada" />
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
                                Editar ruta
                            </Button>
                        </Grid >
                    </Grid>
                </form>
            </Grid>
        </div>
    )
}
