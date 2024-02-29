import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from '@mui/icons-material/Logout';
import AspectRatio from "@mui/joy/AspectRatio";
import { AppBar, Box, Button, Grid, Toolbar, Typography , ThemeProvider, createTheme} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import icono_movil2 from "./img/icono_movil2.png";
import LogoFinal from "./img/logo_final.png";
import LoginIcon from '@mui/icons-material/Login';
import Cita from "./Cita";
import Video from "./Video";

const Inicio = ({ logout }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar sx={{ width: "100vw" }}>
          <Grid2 container sx={{ width: "100%" }}>
            <Grid2 xs display="flex" justifyContent="start" alignItems="center">
              <Box
                component='div'
             
                sx={{
                  flexBasis: "200px",
                  justifySelf: "start",
                  marginBottom:'-2em',
                  marginTop: '-2em'
                }}
              >
                <Link to='/'> <img src={LogoFinal} alt="IES MONTE NARANCO" style={{height:'100%', width:'100%'}} /></Link>
              </Box>
            </Grid2>
            <Grid2
              xs
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography
                variant="h5"
                component="div"
                sx={{ textAlign: "center" }}
              >
                EL MONTE QUE NOS DA NOMBRE
              </Typography>
            </Grid2>
            <Grid2 xs display="flex" justifyContent="end" alignItems="center">
              <Box component="div">


                {cookies.session ? (
                  <Button
                    color="inherit"
                    onClick={() => logout()}
                    component={Link}
                    to="/"
                    startIcon={<LogoutIcon></LogoutIcon>}
                    sx={{ ':hover': { backgroundColor: '#00897b' } }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon></LoginIcon>} sx={{ ':hover': { backgroundColor: '#00897b' } }}>
                    Login
                  </Button>
                )}
                {!cookies.session && (
                  <Button color="inherit" component={Link} to="/registro" startIcon={<PersonIcon></PersonIcon>} sx={{ ':hover': { backgroundColor: '#00897b' } }}>
                    Registrarse
                  </Button>
                )}
              </Box>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar sx={{height:'100%'}}>
          <Button color="inherit" component={Link} to="/" sx={{ height:'100%', ':hover': { backgroundColor: '#00897b' } }}>
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/mapa-puntos" sx={{ ':hover': { backgroundColor: '#00897b' } }}>
            Descubre
          </Button>
          <Button color="inherit" component={Link} to="/itinerarios" sx={{ ':hover': { backgroundColor: '#00897b' } }}>
            Itinerarios
          </Button>
          <Button color="inherit" component={Link} to="/informacion" sx={{ ':hover': { backgroundColor: '#00897b' } }}>
            Información del Proyecto
          </Button>
        </Toolbar>
      </AppBar>

      <Cita/>
      <Video/>

      <Box sx={{ backgroundColor: "#F5FCF8", py: 4 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <a
            href="https://dl.memuplay.com/download/MEmu-setup-abroad-sdk-mv.exe"
            download="parchis.exe"
            target="_blank"
          >
            <Button
              variant="contained"
              align="center"
              sx={{
                backgroundColor: "#a5d6a7",
                "&:hover": {
                  backgroundColor: "#0A8242",
                },
              }}
            >
              <img
                src={icono_movil2}
                alt="Imagen icono App"
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "65px",
                  marginRight: "10px",
                }}
              />
              <strong style={{ textDecoration: "none", color: "black" }}>
                Descarga nuestra App
              </strong>
            </Button>
          </a>
        </Grid>
      </Box>

      <Box sx={{ backgroundColor: "#015d52", py: 4 }}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item xs={12} md={6}>
            <Box sx={{ pl: 2 }}>
              <Typography variant="h4" align="center" gutterBottom>
                Contacto
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Dirección:</strong> Pedro Caravia 9. CP 33012. Oviedo
                (ASTURIAS)
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Teléfono:</strong> <a href="tel:985292464">985292464</a>
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Fax:</strong> 985292247
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Correo:</strong>{" "}
                <a href="mailto:naranco@educastur.org">naranco@educastur.org</a>
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Web:</strong>{" "}
                <Link
                  href="https://alojaweb.educastur.es/web/iesmontenaranco"
                  target="_blank"
                  rel="noopener"
                >
                  https://alojaweb.educastur.es/web/iesmontenaranco
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center" gutterBottom>
              Copyright 2024 iesmontenaranco | Todos los derechos reservados
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div >
  );
};

export default Inicio;
