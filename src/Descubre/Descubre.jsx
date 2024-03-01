import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import iesmontenaranco from "../img/iesmontenaranco.png";
import LogoFinalBanner from "../img/logo_final_Banner.png";
import logoasturias from "../img/logoasturias.png";
import logoeducastur from "../img/logoeducastur.png";
import MapaPuntos from "./MapaPuntos";
import Tarjetas from "./Tarjetas";
import { useCookies } from "react-cookie";


function Descubre({ logout, activeButton, setActiveButton }) {
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar sx={{ width: "100vw" }}>
          <Grid2 container sx={{ width: "100%" }}>
            <Grid2 xs display="flex" justifyContent="start" alignItems="center">
              <Box
                component="div"
                sx={{
                  flexBasis: "100px",
                  justifySelf: "start",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <Link to="/">
                  {" "}
                  <img
                    src={LogoFinalBanner}
                    alt="IES MONTE NARANCO"
                    style={{ height: "100%", width: "100%" }}
                    onClick={() => handleButtonClick("Inicio")}
                  />
                </Link>
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
                    sx={{ ":hover": { backgroundColor: "#00897b" } }}
                  >
                    Cerrar Sesión
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/login"
                    startIcon={<LoginIcon></LoginIcon>}
                    sx={{ ":hover": { backgroundColor: "#00897b" } }}
                  >
                    Iniciar Sesión
                  </Button>
                )}
                {!cookies.session && (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/registro"
                    startIcon={<PersonIcon></PersonIcon>}
                    sx={{ ":hover": { backgroundColor: "#00897b" } }}
                  >
                    Registrarse
                  </Button>
                )}
              </Box>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar sx={{ height: "100%" }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            sx={{
              height: "100%",
              ":hover": { backgroundColor: activeButton === "Inicio" ? "#00897b" : null },
              backgroundColor: activeButton === "Inicio" ? "#00897b" : null
            }}
            onClick={() => handleButtonClick("Inicio")}
          >
            Inicio
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/mapa-puntos"
            sx={{
              ":hover": { backgroundColor: activeButton === "Descubre" ? "#00897b" : null },
              backgroundColor: activeButton === "Descubre" ? "#00897b" : null
            }}
            onClick={() => handleButtonClick("Descubre")}
          >
            Descubre
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/itinerarios"
            sx={{
              ":hover": { backgroundColor: activeButton === "Itinerarios" ? "#00897b" : null },
              backgroundColor: activeButton === "Itinerarios" ? "#00897b" : null
            }}
            onClick={() => handleButtonClick("Itinerarios")}
          >
            Itinerarios
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/informacion"
            sx={{
              ":hover": { backgroundColor: activeButton === "Información" ? "#00897b" : null },
              backgroundColor: activeButton === "Información" ? "#00897b" : null
            }}
            onClick={() => handleButtonClick("Información")}
          >
            Información del Proyecto
          </Button>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
        {/* Tarjetas */}
        <Grid item xs={12} md={6}>
          <Tarjetas />
        </Grid>
        {/* Mapa */}
        <Grid item xs={12} md={6}>
          <MapaPuntos />
        </Grid>
      </Grid>

      <Box sx={{ backgroundColor: "#015d52", py: 4 }}>
        <Grid item xs={12} md={6} sx={{ paddingLeft: 9, py: 3 }}>
          <Grid container>
            <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "left" }}>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Dirección:</strong> Pedro Caravia 9. CP 33012. Oviedo
                (ASTURIAS)
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Teléfono:</strong>{" "}
                <a href="tel:985292464" style={{ color: "inherit" }}>
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
                  style={{ color: "inherit" }}
                >
                  naranco@educastur.org
                </a>
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                <strong>Web:</strong>{" "}
                <a
                  href="https://alojaweb.educastur.es/web/iesmontenaranco"
                  target="_blank"
                  style={{ color: "inherit" }}
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
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body1" align="center" gutterBottom>
            &copy; 2024 IES MONTE NARANCO | Todos los derechos reservados
          </Typography>
        </Grid>
      </Box>
    </div>
  );
}

export default Descubre;
