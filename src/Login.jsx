import { useState } from 'react'
import Input from '@mui/material/Input';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import Button from '@mui/material/Button';
import { FormControl } from '@mui/material';
import { Container } from '@mui/material';
import { InputLabel } from '@mui/material';
import { makeStyles } from '@mui/material';
function Login() {
    return (
        <>
            <Container maxWidth='md'>
                <form>
                    <Grid container spacing={2}>
                        <Grid xs={12} >

                            <InputLabel htmlFor="emailUsuario">Email</InputLabel>
                            <Input fullWidth id="emailUsuario" type="email" required />

                        </Grid>
                        <Grid xs={12}>
                            <InputLabel htmlFor="contraseñaUsuario">Contraseña</InputLabel>
                            <Input fullWidth id="contraseñaUsuario" type="password" required />
                        </Grid>
                        <Grid xs={3}>
                            <Button variant="contained">Iniciar Sesion</Button>
                        </Grid>
                        <Grid xs={2}>
                            <Button variant="contained">Registrarse</Button>
                        </Grid>
                    </Grid>
                </form>

            </Container>
        </>
    )
}

export default Login