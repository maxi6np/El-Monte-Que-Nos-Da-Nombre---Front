import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AspectRatio from "@mui/joy/AspectRatio";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import icono_movil2 from "./img/icono_movil2.png";
import LogoFinalBanner from "./img/logo_final_Banner.png";
import LoginIcon from '@mui/icons-material/Login';
import Cita from "./Cita";
import Video from "./Video";
import iesmontenaranco from "./img/iesmontenaranco.png";
import LogoFinal from "./img/logo_final.png";
import logoasturias from "./img/logoasturias.png";
import logoeducastur from "./img/logoeducastur.png";

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
                  flexBasis: "100px",
                  justifySelf: "start",
                  marginTop: '1rem',
                  marginBottom:'1rem'
                 
                }}
              >
                <Link to='/'> <img src={LogoFinalBanner} alt="IES MONTE NARANCO" style={{height:'100%', width:'100%'}} /></Link>
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
                    Cerrar Sesión
                  </Button>
                ) : (
                  <Button color="inherit" component={Link} to="/login" startIcon={<LoginIcon></LoginIcon>}>
                    Iniciar Sesión
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

      <Cita />
      <Video />

      <Box sx={{ py: 4 }}>
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
        <Grid item xs={12} md={6} textAlign="center">
          <Typography
            variant="h4"
            align="center"
            sx={{ color: "white" }}
            gutterBottom
          >
            Contacto
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} sx={{ paddingLeft: 5, py: 3 }}>
          <Grid container>
            <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "left" }}>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Dirección:</strong> Pedro Caravia 9. CP 33012. Oviedo
                (ASTURIAS)
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Teléfono:</strong>{" "}
                <a href="tel:985292464" style={{ color: "white" }}>
                  985292464
                </a>
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Fax:</strong> 985292247
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Correo:</strong>{" "}
                <a
                  href="mailto:naranco@educastur.org"
                  style={{ color: "white" }}
                >
                  naranco@educastur.org
                </a>
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Web:</strong>{" "}
                <a
                  href="https://alojaweb.educastur.es/web/iesmontenaranco"
                  target="_blank"
                  style={{ color: "white" }}
                >
                  https://alojaweb.educastur.es/web/iesmontenaranco
                </a>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "right" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginRight: "40px",
                }}
              >
                <img
                  src={iesmontenaranco}
                  alt="IES MONTE NARANCO"
                  style={{ width: "130px", marginRight: "20px" }}
                />
                <img
                  src={logoasturias}
                  alt="IES MONTE NARANCO"
                  style={{ width: "250px", marginRight: "20px" }}
                />
                <img
                  src={logoeducastur}
                  alt="IES MONTE NARANCO"
                  style={{ width: "250px" }}
                />
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center" gutterBottom>
              Copyright &copy; 2024 IESMONTENARANCO | Todos los derechos reservados
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Inicio;
