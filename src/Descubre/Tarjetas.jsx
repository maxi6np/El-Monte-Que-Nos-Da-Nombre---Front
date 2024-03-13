import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DescriptionIcon from "@mui/icons-material/Description";
import SchoolIcon from "@mui/icons-material/School";
import { Button, CardActionArea, Grid, List, ListItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";

function Tarjetas({
  puntos,
  selectPoint,
  setSelectPoint,
  CentrarMapa,
  setLatLong,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);

  const mostrarPunto = (punto_id) => {
    const ptoSeleccionado = puntos.find(
      (punto) => punto.id_punto_interes === punto_id
    );
    if (ptoSeleccionado) {
      setSelectPoint(ptoSeleccionado);
      setOpenModal(true);
    }
  };

  const mostrarModal = (descripcion) => {
    setModalContent(descripcion);
    setOpenModal(true);
  };

  return (
    <Grid container style={{ maxHeight: "100vh", overflowY: "auto" }}>
      {puntos.map((punto) => (
        <Card
          onClick={() => {
            setLatLong([punto.latitud, punto.longitud]);
            setSelectPoint(punto);
          }}
          key={punto.id_punto_interes}
          sx={{
            margin: "auto",
            width: "30vw",
            marginBottom: "2rem",
            border: "1px solid #b8bec2",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardActionArea component="span">
            <CardContent>
              <CardMedia
                component="img"
                height="300"
                image={punto.imagen}
                alt={punto.nombre}
                sx={{ margin: "auto" }}
              />
              <Typography
                gutterBottom
                component="div"
                sx={{
                  textAlign: "center",
                  fontSize: "2rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  color: "#000000",
                }}
              >
                {punto.nombre}
              </Typography>
              <Typography variant="body">
                <p>
                  <span>
                    <DescriptionIcon
                      sx={{
                        fontSize: "1.5rem",
                        marginLeft: "0.2rem",
                      }}
                    />{" "}
                    <strong style={{ fontSize: "1.2rem" }}>Descripción:</strong>{" "}
                    <span style={{ fontSize: "1.2rem" }}>
                      {punto.descripcion}
                    </span>
                  </span>
                </p>
                <p>
                  <SchoolIcon
                    sx={{
                      fontSize: "1.5rem",
                      marginLeft: "0.2rem",
                    }}
                  />{" "}
                  <strong style={{ fontSize: "1.2rem" }}>Cursos: </strong>
                  <Grid
                    container
                    spacing={0}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {punto.trabajos != "" ? (
                      punto.trabajos.map((trabajo, index) => {
                         const trabajosMostrados = [];
                        return (
                          <React.Fragment key={index}>
                            <Grid
                              item
                              xs={6}
                              style={{
                                paddingLeft: "1.5rem",
                                paddingRight: "3rem",
                                textAlign: "center",
                              }}
                            >
                              <List>
                                {trabajo.categoriasTrabajos.map(
                                  (categoria, index) => {
                                    if (
                                      !trabajosMostrados.includes(
                                        categoria.nombre
                                      )
                                    ) {
                                      trabajosMostrados.push(categoria.nombre);
                                      return (
                                        <ListItem key={index}>
                                          <p
                                            style={{
                                              margin: 0,
                                              color: "black",
                                              fontSize: "1.1rem",
                                            }}
                                          >
                                            {trabajosMostrados}
                                          </p>{" "}
                                        </ListItem>
                                      );
                                    } else {
                                      return null;
                                    }
                                  }
                                )}
                              </List>
                            </Grid>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <p>Aún no hay cursos disponibles</p>
                    )}
                  </Grid>
                </p>
                <>
                  <AutoStoriesIcon
                    sx={{
                      fontSize: "1.5rem",
                      marginLeft: "0.2rem",
                    }}
                  />{" "}
                  <strong style={{ fontSize: "1.2rem" }}>Trabajos: </strong>
                  <Grid
                    container
                    spacing={0}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {punto.trabajos != "" ? (
                      punto.trabajos.map((trabajo, index) => (
                        <React.Fragment key={index}>
                          <p
                            key={index}
                            style={{
                              margin: 10,
                              color: "blue",
                              textDecoration: "underline",
                              cursor: "pointer",
                              component: "link",
                              fontSize: "1.1rem",
                            }}
                            onClick={() => {
                              setCategoriaSeleccionada(trabajo);
                              mostrarModal(trabajo.nombre);
                            }}
                          >
                            {trabajo.nombre}
                          </p>{" "}
                        </React.Fragment>
                      ))
                    ) : (
                      <p>Aún no hay trabajos disponibles</p>
                    )}
                  </Grid>
                </>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}

      {/* MODAL: */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "2rem",
            width: "80vw",
            height: "70vh",
            overflow: "auto",
          }}
        >
          <h3>{categoriaSeleccionada.nombre}</h3>
          <p>{categoriaSeleccionada.texto}</p>
          {(() => {
            switch (categoriaSeleccionada.tipo) {
              case "texto":
                let url = categoriaSeleccionada.URL;
                let urlModificada = url.substring(url.indexOf("/") + 1);
                return (
                  <a
                    href={categoriaSeleccionada.URL}
                    download={categoriaSeleccionada.URL}
                    target="_blank"
                  >
                    <Button
                      sx={{
                        margin: "2rem 0 0 0",
                        backgroundColor: "#00897b",
                      }}
                    >
                      <p style={{ color: "white" }}>{urlModificada}</p>
                    </Button>
                  </a>
                );
              case "audio":
                return (
                  <audio
                    controls
                    style={{ width: "50vw", height: "90%" }}
                    src={categoriaSeleccionada.URL}
                  />
                );
              case "video":
                return (
                  <video
                    controls
                    style={{ width: "100%", maxHeight: "90%" }}
                    src={categoriaSeleccionada.URL}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </Modal>
    </Grid>
  );
}

export default Tarjetas;
