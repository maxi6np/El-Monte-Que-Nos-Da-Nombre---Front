import PersonIcon from "@mui/icons-material/Person";
import { Container, InputLabel } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Error from "./Error";

function Login() {
  const [usuario, setUsuario] = useState();
  const [contraseña, setContraseña] = useState();
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["usuario"]);

  const login = (usuario, contraseña) => {
    if ([usuario, contraseña].includes("")) {
      setError(true);
      setMensaje("Rellene ambos campos");
    } else {
      let body = JSON.stringify({
        email: usuario,
        password: contraseña,
      });

      fetch("http://127.0.0.1:8000/login", {
        method: "post",
        body: body,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message == "correcto") {
            setCookie("sesion", data.token, { path: "/" });
            navigate("/inicio");
          } else {
            setMensaje(data.message);
            setError(true);
          }
        });
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            El Monte que nos da el nombre
          </Typography>
          <PersonIcon />
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/registro">
            Registrarse
          </Button>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/descubre">
            Descubre
          </Button>
          <Button color="inherit" component={Link} to="/itinerarios">
            Itinerarios
          </Button>
          <Button color="inherit" component={Link} to="/informacion">
            Información del Proyecto
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ marginTop: "60px" }}>
        {error && <Error>{mensaje}</Error>}
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            login(usuario, contraseña);
          }}
        >
          <Grid container spacing={2}>
            <Grid xs={12}>
              <InputLabel htmlFor="usuario">Email</InputLabel>
              <Input
                fullWidth
                id="usuario"
                type="email"
                required
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </Grid>
            <Grid xs={12}>
              <InputLabel htmlFor="contraseña">Contraseña</InputLabel>
              <Input
                fullWidth
                id="contraseña"
                type="password"
                required
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
              />
            </Grid>
            <Grid xs={3}>
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: "darkorange" }}
              >
                Iniciar Sesion
              </Button>
            </Grid>
            <Grid xs={2}>
              <Link to="/registro">
                <Button variant="contained" sx={{ bgcolor: "darkorange" }}>
                  Registrarse
                </Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
}

export default Login;
