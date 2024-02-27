import { useState } from 'react'
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
import { Link } from 'react-router-dom';
import styled from '@emotion/styled'
import ImagenPortada from './img/iesmontenaranco.png'
function Login() {

    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['session']);

    const Div = styled.div`
        margin-top: 1rem;
    `;

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

            fetch('http://127.0.0.1:8000/login', { method: 'post', body: body, headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } })
                .then(response => response.json())
                .then(data => {
                    if (data.message == 'correcto') {
                        setCookie('session', { token: data.token }, { path: '/' });
                        navigate("/");

                    } else {
                        setMensaje(data.message)
                        setError(true);
                    }
                })
        }
    }


    return (
        <>

            <Container sx={{ display: 'flex' }}>
                <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <img src={ImagenPortada} alt="IES MONTE NARANCO" />
                </Container>
                <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '2rem' }}>
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
                            <Grid xs={12}>
                                <Button type='submit' variant="contained" sx={{ bgcolor: 'darkorange' }}>Iniciar Sesión</Button>
                            </Grid>
                        </Grid>
                        <div style={{ marginTop: '1rem', textAlign: 'center' }}>¿Aún no tienes cuenta? <Link to='/registro'>Regístrate</Link></div>
                    </form>
                </Container>
            </Container>
        </>


    )


}
export default Login