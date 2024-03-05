import DescriptionIcon from "@mui/icons-material/Description";
import { CardActionArea, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import * as React from "react";

function Tarjetas({ puntos, setSelectPoint }) {

  const mostrarPunto = (punto_id) => {
    const ptoSeleccionado = puntos.find(punto => punto.id_punto_interes === punto_id);
    if (ptoSeleccionado) {
      setSelectPoint([ptoSeleccionado])
    }
  }
  return (
    <>
      {puntos.map((punto) => (
        <Card
          key={punto.id_punto_interes}
          sx={{
            width: "33vw",
            marginBottom: "2rem",
            border: "1px solid #b8bec2",
            borderRadius: "8px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          onClick={() => mostrarPunto(punto.id_punto_interes)}
        >
          <CardActionArea component="span">
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={punto.imagen}
                    alt={punto.nombre}
                  />
                </Grid>
                <Grid item xs={12} md={7}>
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    sx={{ textAlign: "center" }}
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
                  </Typography>

                  <Grid2 item xs={12} md={7} sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "#00897b", marginTop: "1rem" }}
                    >
                      Ver detalles
                    </Button>
                  </Grid2>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </>
  );
}

export default Tarjetas;
