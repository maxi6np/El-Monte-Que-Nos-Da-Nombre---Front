import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import FondoForm from "../img/fondoForm.png";
import LogoFinalBanner from "../img/logo_final_Banner.png";
import { Formulario } from "./Formulario";

export const Planificar = ({ logout, activeButton, setActiveButton }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
        <Toolbar sx={{ width: "100%" }}>
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
                    onClick={() => setActiveButton('Inicio')}
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
              ":hover": {
                backgroundColor: activeButton === "Inicio" ? "#00897b" : null,
              },
              backgroundColor: activeButton === "Inicio" ? "#00897b" : null,
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
              ":hover": {
                backgroundColor: activeButton === "Descubre" ? "#00897b" : null,
              },
              backgroundColor: activeButton === "Descubre" ? "#00897b" : null,
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
              ":hover": {
                backgroundColor:
                  activeButton === "Itinerarios" ? "#00897b" : null,
              },
              backgroundColor:
                activeButton === "Itinerarios" ? "#00897b" : null,
            }}
            onClick={() => setActiveButton("Itinerarios")}
          >
            Itinerarios
          </Button>
          {cookies.session && (
            <Button
              color="inherit"
              component={Link}
              to="/planificar"
              sx={{
                ":hover": {
                  backgroundColor:
                    activeButton === "Planificar" ? "#00897b" : null,
                },
                backgroundColor:
                  activeButton === "Planificar" ? "#00897b" : null,
              }}
              onClick={() => setActiveButton("Planificar")}
            >
              Planificar ruta
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <div
        style={{
          backgroundImage: `url(${FondoForm})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "100vw",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            width: "60vw",
            height: "100%",
            margin: "auto",
            paddingTop: "3rem",
            paddingBottom: "3rem",
          }}
        >
          <Typography
            variant="h3"
            sx={{ textAlign: "center", marginBottom: "5rem" }}
            component="h3"
          >
            Planifica tu propia ruta
          </Typography>
          <Formulario />
        </div>
      </div>
      <Footer />
    </div>
  );
};
