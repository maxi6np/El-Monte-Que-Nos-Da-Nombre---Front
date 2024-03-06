import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import DescriptionIcon from "@mui/icons-material/Description";
import { CardActionArea, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

function Tarjetas({ puntos }) {
  /*const [categorias, setCategorias] = useState([]);

  const categoriasTrabajos = (idPunto) => {
    puntos.map((punto) => {
      if (punto.id_punto_interes === idPunto) {
        punto.trabajos.map((trabajo) =>
          trabajo.categoriasTrabajos.map((categoria) =>
            setCategorias([categoria.nombre, categoria.descripcion])
          )
        );
      }
    });
  };

  useEffect(() => {
    const idPuntoDeseado = 46;
    categoriasTrabajos(idPuntoDeseado);
  }, []);*/

  return (
    <div style={{ maxHeight: "100vh", overflowY: "auto" }}>
      {puntos.map((punto) => (
        <Card
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
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={punto.imagen}
                    alt={punto.nombre}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography
                    gutterBottom
                    component="div"
                    sx={{
                      textAlign: "center",
                      fontSize: "2rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {punto.nombre}
                  </Typography>
                  <Typography variant="body" color="text.secondary">
                    <p>
                      <DescriptionIcon />{" "}
                      <span>
                        <strong>Descripción: </strong>
                      </span>
                      <span sx={{ textAlign: "justify" }}>
                        {punto.descripcion}
                      </span>
                    </p>
                    <>
                      <AutoStoriesIcon />{" "}
                      <span>
                        <strong>Trabajos: </strong>
                      </span>
                      {punto.trabajos?.map((trabajo) => {
                        return trabajo.categoriasTrabajos.map(
                          (categoria, index) => {
                            return (
                              <p key={index}>
                                {categoria.nombre} - {categoria.descripcion}
                              </p>
                            );
                          }
                        );
                      })}
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
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
}

export default Tarjetas;
