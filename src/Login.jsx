import { useState } from 'react'
import { Link, json } from 'react-router-dom';
import Input from '@mui/material/Input';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import { redirect, useNavigate } from 'react-router-dom';
import { FormControl } from '@mui/material';
import { Container } from '@mui/material';
import { InputLabel } from '@mui/material';
import { makeStyles } from '@mui/material';
import { useCookies } from 'react-cookie';
import Error from './Error';
function Login() {

    const [usuario, setUsuario] = useState();
    const [contraseña, setContraseña] = useState();
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState();
    const navigate = useNavigate();
<<<<<<< HEAD
    const [cookies, setCookie, removeCookie] = useCookies(['session']);
   
=======
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);

>>>>>>> 38b97fe961492a4adba5588ac8d60b9b46abe838

    const login = (usuario, contraseña) => {
        if ([usuario, contraseña].includes('')) {
            setError(true);
            setMensaje('Rellene ambos campos');
        }
        else {
            let body = JSON.stringify({
                email: usuario,
                password: contraseña
            })
<<<<<<< HEAD
            
            fetch('http://127.0.0.1:8000/login', {method:'post', body:body, headers: {'Accept':'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', }})
            .then(response => response.json())
            .then(data => {if (data.message == 'correcto') {
                setCookie('session', {'email':data.email, 'token': data.token} , {path:'/'});
                navigate("/inicio");
=======
>>>>>>> 38b97fe961492a4adba5588ac8d60b9b46abe838

            fetch('http://127.0.0.1:8000/login', { method: 'post', body: body, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } })
                .then(response => response,json())
                .then(data => {
                    if (data.message == 'correcto') {
                        setCookie('session', data.token, { path: '/' });
                        navigate("/inicio");

                    } else {
                        setMensaje(data.message)
                        setError(true);
                    }
                })


        }
    }

    return (
        <>

            <Container maxWidth='md'>
                {error && <Error>{mensaje}</Error>}
                <form method='post' onSubmit={(e) => { e.preventDefault(); login(usuario, contraseña) }}>
                    <Grid container spacing={2}>
                        <Grid xs={12} >

                            <InputLabel htmlFor="usuario">Email</InputLabel>
                            <Input fullWidth id="usuario" type="email" required value={usuario} onChange={(e) => setUsuario(e.target.value)} />

                        </Grid>
                        <Grid xs={12}>
                            <InputLabel htmlFor="contraseña">Contraseña</InputLabel>
                            <Input fullWidth id="contraseña" type="password" required value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                        </Grid>
                        <Grid xs={3}>
                            <Button type='submit' variant="contained" sx={{ bgcolor: 'darkorange' }}>Iniciar Sesion</Button>
                        </Grid>
                        <Grid xs={2}>
                            <Link to='/registro'>
                                <Button variant="contained" sx={{ bgcolor: 'darkorange' }}>Registrarse</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </form>

            </Container>
        </>
    )
}

export default Login