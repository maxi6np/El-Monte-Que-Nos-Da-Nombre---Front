import { Button, Container, Grid, TextField, ThemeProvider, createTheme } from "@mui/material";
import { useState } from "react";
import Error from "../Error";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogoFinal from '../img/logo_final.png';


const Registro = () => {
  const [usuario, setUsuario] = useState({});
  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState();
  const navigate = useNavigate();

  const handleRegistrar = (e) => {
    let reg = new RegExp(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/)
    setError(false);
    e.preventDefault();

    if (
      [
        nombre,
        nombreUsuario,
        apellidos,
        email,
        fechaNacimiento,
        contrasenia,
        confirmarContrasenia,
      ].includes("")
    ) {
      setMensaje("Rellene todos los campos");
      setError(true);
    } else if (contrasenia !== confirmarContrasenia) {
      setError(true);
      setMensaje("Las contraseñas no coinciden");
    } else if (contrasenia.length < 8) {
      setError(true);
      setMensaje("La contraseña debe tener más de 8 caracteres")
    } else if (!reg.test(email)) {
      setError(true)
      setMensaje('Introduzca un email válido')
    } else {

      let body = JSON.stringify({
        nombre_usuario: nombreUsuario,
        email: email,
        password: contrasenia,
        nombre: nombre,
        apellidos: apellidos,
        fecha_nacimiento: fechaNacimiento
      })

      fetch('http://' + import.meta.env.VITE_APP_PETICION_IP + '/register', { method: 'post', body: body, headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.message === 'Usuario registrado correctamente') {
            navigate("/login");
          } else {
            setMensaje(data.message);
            setError(true);
          }
        })
    }
  };

  return (
    <Container sx={{ display: 'flex' }}>
      <Grid container spacing={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
        <form>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField
                label="Apellidos"
                variant="outlined"
                fullWidth
                value={usuario.apellidos}
                onChange={(e) => {
                  setApellidos(e.target.value)
                  setError(false)
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Nombre de usuario"
                variant="outlined"
                fullWidth
                value={usuario.nombreUsuario}
                onChange={(e) => {
                  setNombreUsuario(e.target.value)
                  setError(false)
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="text"
                variant="outlined"
                fullWidth
                value={usuario.email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(false)
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                variant="outlined"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                value={usuario.fechaNacimiento}
                onChange={(e) => {
                  setFechaNacimiento(e.target.value)
                  setError(false)
                }}
                required
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                label="Contraseña"
                type="password"
                variant="outlined"
                fullWidth
                value={usuario.contrasenia}
                onChange={(e) => {
                  setContrasenia(e.target.value)
                  setError(false)
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirmar contraseña"
                type="password"
                variant="outlined"
                fullWidth
                value={usuario.confirmarContrasenia}
                onChange={(e) => {
                  setConfirmarContrasenia(e.target.value)
                  setError(false)
                }}
                required
              />
            </Grid >
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
                  }
                }}
                onClick={handleRegistrar}

              >
                Registrarse
              </Button>
            </Grid >
          </Grid>
          <div style={{ marginTop: '1rem', textAlign: 'center' }} >
            <p>¿Ya tienes cuenta? <Link to='/login'>Inicia sesión</Link></p>
            <p><Link to='/'>Volver a la página principal</Link></p>
          </div>
        </form>

      </Grid>

      <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Link to='/'><img src={LogoFinal} alt="IES MONTE NARANCO" /></Link>
      </Container>

    </Container>
  );
};

export default Registro;
