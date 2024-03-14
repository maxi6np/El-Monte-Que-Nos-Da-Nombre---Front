import styled from "@emotion/styled";
import { Container, InputLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import Error from "../Error";
import LogoFinal from "../img/logo_final.png";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);

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

            fetch('http://' + import.meta.env.VITE_APP_PETICION_IP + '/login', { method: 'post', body: body, headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', } })
                .then(response => response.json())
                .then(data => {
                    if (data.message == 'correcto') {
                        setCookie('session', { token: data.token, username: data.username }, { path: '/' });
                        navigate("/");

                    } else {
                        setMensaje(data.message)
                        setError(true);
                    }
                })
        }
    }


  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: { xs: "column", lg: "row" },
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { xs: "auto", lg: "100vh" },
          marginBottom: { xs: "2rem", lg: 0 },
        }}
      >
        <Link to="/">
          <img src={LogoFinal} alt="IES MONTE NARANCO" />
        </Link>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
        }}
      >
        <form
          method="post"
          onSubmit={(e) => {
            e.preventDefault();
            login(usuario, contraseña);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel htmlFor="usuario">Email</InputLabel>
              <Input
                fullWidth
                id="usuario"
                type="text"
                value={usuario}
                onChange={(e) => {
                  setError(false);
                  setUsuario(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="contraseña">Contraseña</InputLabel>
              <Input
                fullWidth
                id="contraseña"
                type="password"
                value={contraseña}
                onChange={(e) => {
                  setError(false);
                  setContraseña(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              {error && <Error>{mensaje}</Error>}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                style={{ marginTop: "20px" }}
                sx={{
                  bgcolor: "primary.main",
                  ":hover": {
                    bgcolor: "primary.light",
                  },
                }}
              >
                Iniciar Sesión
              </Button>
            </Grid>
          </Grid>
          <Div>
            <p>
              ¿Aún no tienes cuenta? <Link to="/registro">Regístrate</Link>
            </p>
            <p>
              <Link to="/">Volver a la página principal</Link>
            </p>
          </Div>
        </form>
      </Grid>
    </Container>
  );
}
export default Login;
