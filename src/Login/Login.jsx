import { useState } from 'react'
import Input from '@mui/material/Input';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { InputLabel } from '@mui/material';
import { useCookies } from 'react-cookie';
import Error from '../Error';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled'
import LogoFinal from '../img/logo_final.png';


function Login() {

    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['session']);

    const Div = styled.div`
        margin-top: 1rem;
        text-align: center;
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

            <Container sx={{ display: 'flex' }}>
                <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Link to='/'><img src={LogoFinal} alt="IES MONTE NARANCO" /></Link>
                </Container>
                <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '2rem' }}>
                    
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
                            {error && <Error>{mensaje}</Error>}
                                <Button type="submit"
                                    variant="contained"

                                    fullWidth
                                    style={{ marginTop: "20px" }}
                                    sx={{
                                        bgcolor: 'primary.main',
                                        ':hover': {
                                            bgcolor: 'primary.light'
                                        }
                                    }}>Iniciar Sesión</Button>
                            </Grid>
                        </Grid>
                        <Div>
                            <p>¿Aún no tienes cuenta? <Link to='/registro'>Regístrate</Link></p>
                            <p><Link to='/'>Volver a la página principal</Link></p>
                        </Div>
                    </form>
                </Container>
            </Container>


    )


}
export default Login