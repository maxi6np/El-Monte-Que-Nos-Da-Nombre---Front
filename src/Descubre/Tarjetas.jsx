import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DescriptionIcon from "@mui/icons-material/Description";
import { CardActionArea, Grid, List, ListItem } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

function Tarjetas({ puntos, selectPoint, setSelectPoint }) {
  const mostrarPunto = (punto_id) => {
    const ptoSeleccionado = puntos.find(
      (punto) => punto.id_punto_interes === punto_id
    );
    if (ptoSeleccionado) {
      setSelectPoint(ptoSeleccionado);
      setOpenModal(true);
    }
  };

  return (
    <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
      {puntos.map((punto) => (
        <Card
          onClick={() => mostrarPunto(punto.id_punto_interes)}
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
                  <DescriptionIcon sx={{ marginLeft: "0.2rem" }} />{" "}
                  <span>
                    <strong>Descripción: </strong>
                  </span>
                  <span sx={{ textAlign: "justify" }}>{punto.descripcion}</span>
                </p>
                <>
                  <AutoStoriesIcon sx={{ marginLeft: "0.2rem" }} />{" "}
                  <span>
                    <strong>Trabajos: </strong>
                  </span>
                  <Grid
                    container
                    spacing={0}
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {punto.trabajos?.map((trabajo, index) => (
                      <React.Fragment key={index}>
                        <Grid
                          item
                          xs={6}
                          style={{
                            paddingLeft: "8rem",
                            paddingRight: "1.5rem",
                            textAlign: "center",
                          }}
                        >
                          <List>
                            {trabajo.categoriasTrabajos.map(
                              (categoria, index) => (
                                <ListItem key={index}>
                                  <p style={{ margin: 0 }}>
                                    {categoria.nombre}
                                  </p>{" "}
                                </ListItem>
                              )
                            )}
                          </List>
                        </Grid>
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
                              (categoria, index) => (
                                <ListItem key={index}>
                                  <p style={{ margin: 0 }}>
                                    {categoria.descripcion}
                                  </p>{" "}
                                </ListItem>
                              )
                            )}
                          </List>
                        </Grid>
                      </React.Fragment>
                    ))}
                  </Grid>
                </>
              </Typography>

              <Grid2 item xs={12} md={7} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ backgroundColor: "#00897b", marginTop: "1rem" }}
                >
                  Ver trabajos
                </Button>
              </Grid2>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

export default Tarjetas;
