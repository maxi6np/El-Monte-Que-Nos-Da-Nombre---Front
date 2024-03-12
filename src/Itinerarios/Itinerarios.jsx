import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import LogoFinalBanner from "../img/logo_final_Banner.png";
import MapaRutas from "./MapaRutas";
import Rutas from "./Rutas";


function Itinerarios({ logout, activeButton, setActiveButton }) {
  const [cookies, setCookie, removeCookie] = useCookies("session");
  const [puntosSeleccionados, setPuntosSeleccionados] = useState([]);

  const theme = useTheme();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
            <Toolbar sx={{ width: "100%" }}>
              <Grid2 container sx={{ width: "100%" }}>
                <Grid2 container item xs={12} sm={2} md={2} lg={4} xl={4}>
                  <Box
                    component="div"
                    sx={{
                      flexBasis: "100px",
                      justifySelf: "start",
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      marginLeft: "1rem",
                      [theme.breakpoints.down("sm")]: {
                        marginLeft: "auto",
                        marginRight: "auto",
                      },
                    }}
                  >
                    <Link to="/">
                      {" "}
                      <img
                        src={LogoFinalBanner}
                        alt="IES MONTE NARANCO"
                        style={{
                          height: "100%",
                          width: "100%",
                          display: "block",
                        }}
                        onClick={() => setActiveButton("Inicio")}
                      />
                    </Link>
                  </Box>
                </Grid2>
                <Grid2
                  container
                  item
                  xs={12}
                  sm={10}
                  md={10}
                  lg={4}
                  xl={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    EL MONTE QUE NOS DA NOMBRE
                  </Typography>
                </Grid2>
                <Grid2
                  container
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}
                  display="flex"
                  justifyContent="end"
                  alignItems="center"
                  sx={{
                    [theme.breakpoints.down("md")]: {
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    [theme.breakpoints.down("lg")]: {
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  }}
                >
                  <Box
                    component="div"
                    display="flex"
                    justifyContent="end"
                    alignItems="center"
                  >
                    {cookies.session && (
                      <Box
                        component="div"
                        display="flex"
                        justifyContent="end"
                        alignItems="center"
                        flexWrap="wrap"
                        gap="0.5rem"
                      >
                        <PersonIcon></PersonIcon>
                        <Typography
                          sx={{ marginRight: "1rem", textAlign: "center" }}
                        >
                          {cookies.session.username.toUpperCase()}
                        </Typography>
                      </Box>
                    )}
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
                        startIcon={<PersonAddIcon></PersonAddIcon>}
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
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <AppBar position="static" sx={{ backgroundColor: "#004d40" }}>
            <Toolbar
              sx={{
                height: "100%",
                marginLeft: "1rem",
                justifyContent: {
                  sm: "flex-start",
                  md: "flex-start",
                  lg: "flex-start",
                },
              }}
            >
              <Button
                color="inherit"
                component={Link}
                to="/"
                sx={{
                  height: "100%",
                  ":hover": {
                    backgroundColor:
                      activeButton === "Inicio" ? "#00897b" : null,
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
                    backgroundColor:
                      activeButton === "Descubre" ? "#00897b" : null,
                  },
                  backgroundColor:
                    activeButton === "Descubre" ? "#00897b" : null,
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
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
        {/* Tarjetas */}
        <Grid item xs={12} md={4.5}>
          <div style={{ position: "relative", height: "100%" }}>
            <Rutas
              setPuntosSeleccionados={setPuntosSeleccionados}
              setActiveButton={setActiveButton}
            />
          </div>
        </Grid>

        {/* Columna de relleno */}
        <Grid item xs={0} md={0.5}></Grid>

        {/* Mapa */}
        <Grid item xs={12} md={7}>
          <MapaRutas
            puntosSeleccionados={puntosSeleccionados}
            setPuntosSeleccionados={setPuntosSeleccionados}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Itinerarios;
