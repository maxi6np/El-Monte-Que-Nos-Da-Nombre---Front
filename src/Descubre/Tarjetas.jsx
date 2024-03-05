import DescriptionIcon from "@mui/icons-material/Description";
import { CardActionArea, Dialog, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import * as React from "react";

function Tarjetas({ puntos, setSelectPoint }) {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedPoint, setSelectedPoint] = React.useState(null);
  console.log(puntos);
  const mostrarPunto = (punto_id) => {
    const ptoSeleccionado = puntos.find(
      (punto) => punto.id_punto_interes === punto_id
    );
    if (ptoSeleccionado) {
      setSelectedPoint(ptoSeleccionado);
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

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
          onClick={() => mostrarPunto(punto.id_punto_interes)}
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
                  </Typography>

                  <Grid2 item xs={12} md={7} sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "#00897b", marginTop: "1rem" }}
                      onClick={(event) => {
                        event.stopPropagation(); // Evitar que el evento de clic llegue al contenedor Card
                        mostrarPunto(punto.id_punto_interes);
                      }}
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

      {/* Modal */}

      <Dialog open={openModal} onClose={handleCloseModal}>
        {selectedPoint && (
          <div>
            <Typography variant="h6">{selectedPoint.nombre}</Typography>
            <Typography variant="body1">{selectedPoint.descripcion}</Typography>
            {/* Agrega aquí cualquier otra información que quieras mostrar en el modal */}
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default Tarjetas;
