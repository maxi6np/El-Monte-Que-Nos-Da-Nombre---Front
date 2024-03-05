import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { React, useState } from "react";
import { Link } from "react-router-dom";
import LogoFinalBanner from "../img/logo_final_Banner.png";
import MapaPuntos from "./MapaPuntos";
import Tarjetas from "./Tarjetas";
import { useCookies } from "react-cookie";
import Footer from "../Footer";


function Descubre({ logout, activeButton, setActiveButton }) {
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);


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
                    onClick={() => setActiveButton("Inicio")}
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
                    onClick={() => {
                      setActiveButton("Inicio");
                      logout();
                    }}

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
            onClick={() => setActiveButton("Inicio")}
          >
            Inicio
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/descubre"
            sx={{
              ":hover": { backgroundColor: activeButton === "Descubre" ? "#00897b" : null },
              backgroundColor: activeButton === "Descubre" ? "#00897b" : null
            }}
            onClick={() => setActiveButton("Descubre")}
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
            onClick={() => setActiveButton("Itinerarios")}
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
            onClick={() => setActiveButton("Información")}
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

      <Footer />
    </div>
  );
}

export default Descubre;
