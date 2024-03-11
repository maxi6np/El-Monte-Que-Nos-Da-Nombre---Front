import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeleteIcon from "@mui/icons-material/Delete";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import PercentIcon from "@mui/icons-material/Percent";
import StarIcon from "@mui/icons-material/Star";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import * as React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function Rutas({ setPuntosSeleccionados, setActiveButton }) {
  const [rutas, setRutas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies("session");
  const [ordenarPor, setOrdenarPor] = useState("reciente");
  const [filtrarPor, setFiltrarPor] = useState("todas");
  const [filtradas, setFiltradas] = useState([]);
  const [progreso, setProgreso] = useState("todas");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const CircleButton = styled(Button)({
    borderRadius: "50%",
    width: "3rem",
    height: "3rem",
    minWidth: 0,
  });

  const handleEdit = (ruta) => {
    let body = JSON.stringify({
      ruta: ruta,
    });

    fetch("http://127.0.0.1:8000/encontrar-ruta", {
      method: "post",
      body: body,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        navigate("/planificar");
        setActiveButton("Planificar");
      });
  };

  const handleDelete = () => {};

  const mostrarPuntos = (ruta_id) => {
    const rutaSeleccionada = rutas.find((ruta) => ruta.id_ruta == ruta_id);
    if (rutaSeleccionada) {
      setPuntosSeleccionados(rutaSeleccionada.puntos_interes);
    }
  };

  const getPorcentaje = (ruta) => {
    let visitados = [];
    if (ruta.realiza.length == 0) {
      return -1;
    }
    ruta.puntos_interes.forEach((element) => {
      if (element.visitados.length > 0) {
        visitados.push(element);
      }
    });
    return Math.round((visitados.length / ruta.puntos_interes.length) * 100);
  };

  const Ordenar = (condicion, array) => {
    switch (condicion) {
      case "reciente":
        array.sort((a, b) => {
          return new Date(b.fecha_creacion) - new Date(a.fecha_creacion);
        });
        break;
      case "longitud":
        array.sort((a, b) => {
          return b.duracion - a.duracion;
        });
        break;
      case "%completada":
        let porcentajes = [];
        array.forEach((ruta) => {
          porcentajes.push({ ruta: ruta, porcentaje: getPorcentaje(ruta) });
        });
        porcentajes.sort((a, b) => {
          return b.porcentaje - a.porcentaje;
        });
        array = [];
        porcentajes.forEach((ruta) => array.push(ruta.ruta));
        break;
    }
    setFiltradas(array);
  };
  useEffect(() => {
    let body = JSON.stringify({
      token: cookies.session ? cookies.session.token : "",
    });

    setCargando(true);
    fetch("http://127.0.0.1:8000/get-rutas", {
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
        setRutas(data.data);
        setCategorias(data.categoriasPuntos);
        Ordenar(ordenarPor, data.data);
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    console.log(rutas);
    const nuevasFiltradas = [];
    rutas.forEach((ruta) => {
      let cumple = 0;
      if (
        (progreso == "empezadas" && ruta.realiza.length > 0) ||
        (progreso == "sinEmpezar" && ruta.realiza.length == 0) ||
        progreso == "todas"
      ) {
        if (filtrarPor == "todas") {
          cumple = ruta.puntos_interes.length;
        } else {
          ruta.puntos_interes.forEach((punto) => {
            punto.categoriasPuntos.forEach((categoria) => {
              if (categoria.nombre == filtrarPor) {
                cumple++;
              }
            });
          });
        }
      }
      if (cumple == ruta.puntos_interes.length) {
        !nuevasFiltradas.find((element) => element == ruta) &&
          nuevasFiltradas.push(ruta);
      }
    });

    Ordenar(ordenarPor, nuevasFiltradas);
  }, [filtrarPor, progreso]);

  const [expandedRuta, setExpandedRuta] = useState({});

  const toggleExpand = (id_ruta) => {
    setExpandedRuta({ ...expandedRuta, [id_ruta]: !expandedRuta[id_ruta] });
  };

  return (
    <>
      {cargando ? (
        <Grid
          container
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid container spacing={2}>
            {cookies.session && (
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ marginBottom: "2rem" }}>
                  <InputLabel id="select-progreso-label">Progreso</InputLabel>
                  <Select
                    labelId="select-progreso-label"
                    id="select-progreso"
                    label="Progreso"
                    value={progreso}
                    onChange={(e) => {
                      setProgreso(e.target.value);
                    }}
                  >
                    <MenuItem value={"todas"}>TODAS</MenuItem>
                    <MenuItem value={"empezadas"}>EMPEZADAS</MenuItem>
                    <MenuItem value={"sinEmpezar"}>SIN EMPEZAR</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ marginBottom: "2rem" }}>
                <InputLabel id="select-ordenacion-label">
                  Ordenar por
                </InputLabel>
                <Select
                  labelId="select-ordenacion-label"
                  id="select-ordenacion"
                  label="Ordenar por"
                  value={ordenarPor}
                  onChange={(e) => {
                    setOrdenarPor(e.target.value);
                    const ordenadas = filtradas;
                    Ordenar(e.target.value, ordenadas);
                  }}
                >
                  <MenuItem value={"reciente"}>RECIENTE</MenuItem>
                  {cookies.session && (
                    <MenuItem value={"%completada"}>%COMPLETADA</MenuItem>
                  )}
                  <MenuItem value={"longitud"}>LONGITUD</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ marginBottom: "2rem" }}>
                <InputLabel id="select-categoria-label">
                  Mostrar por categoria
                </InputLabel>
                <Select
                  labelId="select-categoria-label"
                  id="select-categoria"
                  label="Mostrar por categoria"
                  value={filtrarPor}
                  onChange={(e) => {
                    setFiltrarPor(e.target.value);
                  }}
                >
                  <MenuItem value="todas">TODAS</MenuItem>
                  {categorias.map((categoria) => (
                    <MenuItem
                      key={categoria.nombre}
                      value={`${categoria.nombre}`}
                    >
                      {categoria.nombre.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box component="div" overflow="auto" maxHeight="80vh">
            {filtradas.map((ruta) => (
              <Card
                key={ruta.id_ruta}
                sx={{
                  width: "33vw",
                  marginBottom: "2rem",
                  border: "1px solid #b8bec2",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => mostrarPuntos(ruta.id_ruta)}
              >
                <CardActionArea component="span">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={5}>
                        <CardMedia
                          component="img"
                          height="100%"
                          image={ruta.imagen_principal}
                          alt={ruta.nombre}
                        />
                      </Grid>
                      <Grid item xs={12} md={7}>
                        <Typography
                          gutterBottom
                          variant="h4"
                          component="div"
                          sx={{ textAlign: "center" }}
                        >
                          {ruta.nombre}
                        </Typography>
                        <Typography variant="body" color="text.secondary">
                          <p>
                            <StarIcon /> Dificultad: {ruta.dificultad}
                          </p>
                          <p>
                            <AccessTimeIcon /> Duración: {ruta.duracion}h
                          </p>
                          {cookies.session && (
                            <p>
                              <PercentIcon />{" "}
                              {ruta.realiza.length > 0
                                ? `Progreso: ${getPorcentaje(ruta)}%`
                                : "Sin empezar"}{" "}
                            </p>
                          )}
                          <p>
                            <DescriptionIcon />
                            Descripción:{" "}
                            {ruta.descripcion.split(" ").length > 25
                              ? expandedRuta[ruta.id_ruta]
                                ? ruta.descripcion
                                : `${ruta.descripcion
                                    .split(" ")
                                    .slice(0, 25)
                                    .join(" ")}...`
                              : ruta.descripcion}
                            <Button
                              onClick={() => toggleExpand(ruta.id_ruta)}
                              color="primary"
                              size="small"
                              style={{ textTransform: "none" }}
                              sx={{
                                display:
                                  ruta.descripcion.split(" ").length <= 25
                                    ? "none"
                                    : "block",
                              }}
                            >
                              {expandedRuta[ruta.id_ruta]
                                ? "Ver menos"
                                : "Ver más"}
                            </Button>
                          </p>
                          {cookies.session && (
                            <Stack direction="row" spacing={2}>
                              <CircleButton
                                sx={{ backgroundColor: "#FFA500" }}
                                startIcon={<EditIcon sx={{ color: "white" }} />}
                                onClick={() => handleEdit(ruta)}
                              />
                              <CircleButton
                                sx={{ backgroundColor: "#FF6347" }}
                                endIcon={
                                  <DeleteIcon sx={{ color: "white" }} f />
                                }
                                onClick={() => handleDelete(ruta)}
                              />
                            </Stack>
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </>
      )}
    </>
  );
}
