import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { AppBar, Box, Button, Grid, Toolbar, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { React, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import LogoFinalBanner from "../img/logo_final_Banner.png";
import MapaPuntos from "./MapaPuntos";
import Tarjetas from "./Tarjetas";
import { useTheme } from "@mui/material/styles";
import Hidden from "@mui/material/Hidden";

function Descubre({ logout, activeButton, setActiveButton }) {
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const [puntos, setPuntos] = useState([]);
  const [selectPoint, setSelectPoint] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    let body = JSON.stringify({
      token: cookies.session ? cookies.session.token : "",
    });

    setCargando(true);
    setPuntos([]);
    fetch("http://127.0.0.1:8000/puntos-trabajos", {
      method: "post",
      body: body,
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPuntos(data.data);
        setCargando(false);
      });
  }, []);

 const theme = useTheme();

  return (
    <div>
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
        <Grid item xs={12} sm={12} md={12} lg={4.5} xl={4.5}>
          <div style={{ position: "relative", height: "100%" }}>
            {cargando && (
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress />
              </div>
            )}
            {puntos != null && (
              <Tarjetas
                puntos={puntos}
                selectPoint={selectPoint}
                setSelectPoint={setSelectPoint}
              />
            )}
          </div>
        </Grid>

        {/* Columna de relleno */}
        <Hidden mdDown>
          <Grid container item lg={0.5} xl={0.5}></Grid>
        </Hidden>

        {/* Mapa */}
        <Grid container item xs={12} sm={12} md={12} lg={7} xl={7}>
          <MapaPuntos
            setSelectPoint={setSelectPoint}
            selectPoint={selectPoint}
          />
        </Grid>
      </Grid>

      <Footer />
    </div>
  );
}

export default Descubre;
