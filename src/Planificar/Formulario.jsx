import React from 'react'
import { Button, Grid, TextField, Input, FormControlLabel, Radio, RadioGroup, FormControl, FormLabel } from "@mui/material";
import { useState, useEffect } from "react";
import Error from "../Error";
import { useNavigate } from 'react-router-dom';
import Eleccion from './Eleccion';
import Textarea from '@mui/material/TextareaAutosize';
import CircularProgress from '@mui/material/CircularProgress';
import { useCookies } from 'react-cookie';


export const Formulario = ({ setActiveButton }) => {
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
    const [editando, setEditando] = useState(false)

    useEffect(() => {
        setPuntos([])
        setCargando(true)

        let body2 = JSON.stringify({
            token: (cookies.session ? cookies.session.token : '')
        })
        fetch('http://' + import.meta.env.VITE_APP_PETICION_IP + ':8000/puntos-trabajos', {
            method: "post", body: body2, headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setPuntos(data.data.map(punto => ({ ...punto, seleccionado: false })));
                setCargando(false)
            });
    }, []);


    const handlePlanificar = (e) => {
        e.preventDefault();
        setError(false);
        console.log(imagen)
        console.log(checked)
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

            const formdata = new FormData();
            formdata.append("nombre", nombre);
            imagen != undefined ? formdata.append("imagen_principal", imagen) : formdata.append('imagen_principal', '');
            formdata.append("descripcion", descripcion);
            formdata.append("publica", checkCheckbox ? 1 : 0);
            checked.forEach((id) => {
                formdata.append("puntos[]", id);
            });
            formdata.append("token", cookies.session.token);
            for (const value of formdata.values()) {
                console.log(value);
            }
            const requestOptions = {
                method: "POST",
                headers: { 'Access-Control-Allow-Origin': '*', },
                body: formdata,
                redirect: "follow"
            };

            fetch('http://' + import.meta.env.VITE_APP_PETICION_IP + ':8000/planificar-ruta', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.message == 'Ruta creada correctamente') {
                        console.log(data)
                        navigate("/itinerarios");
                        setActiveButton('Itinerarios')
                    }else{
                        setMensaje(data.message);
                        setError(true);
                    }
                })
                .catch((error) => console.error(error));
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
                                    onChange={(e) => setImagen(e.target.files[0])}
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
                                Crear ruta
                            </Button>
                        </Grid >
                    </Grid>
                </form>
            </Grid>
        </div>
    )
}
