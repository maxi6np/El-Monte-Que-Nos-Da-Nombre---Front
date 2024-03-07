import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import astur from "./img/astur.png";
import educa from "./img/educa.png";
import ies from "./img/ies.png";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#015d52", py: 4, color: "white   " }}>
      <Grid item xs={12} md={6} sx={{ paddingLeft: 9, py: 3 }}>
        <Grid container>
          <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="body1" align="left" gutterBottom>
              <strong>Dirección:</strong> Pedro Caravia 9. CP 33012. Oviedo
              (ASTURIAS)
            </Typography>
            <Typography variant="body1" align="left" gutterBottom>
              <strong>Teléfono:</strong>{" "}
              <a href="tel:985292464" style={{ color: "inherit" }}>
                985292464
              </a>
            </Typography>
            <Typography variant="body1" align="left" gutterBottom>
              <strong>Fax:</strong> 985292247
            </Typography>
            <Typography variant="body1" align="left" gutterBottom>
              <strong>Correo:</strong>{" "}
              <a
                href="mailto:naranco@educastur.org"
                style={{ color: "inherit" }}
              >
                naranco@educastur.org
              </a>
            </Typography>
            <Typography variant="body1" align="left" gutterBottom>
              <strong>Web:</strong>{" "}
              <a
                href="https://alojaweb.educastur.es/web/iesmontenaranco"
                target="_blank"
                style={{ color: "inherit" }}
              >
                https://alojaweb.educastur.es/web/iesmontenaranco
              </a>
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "right" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "40px",
                marginTop: "10px",
              }}
            >
              <img
                src={ies}
                alt="IES MONTE NARANCO"
                style={{
                  width: "190px",
                  marginRight: "60px",
                  height: "100px",
                }}
              />

              <img
                src={educa}
                alt="IES MONTE NARANCO"
                style={{ width: "250px", marginRight: "60px" }}
              />

              <img
                src={astur}
                alt="IES MONTE NARANCO"
                style={{ width: "300px", marginRight: "1px" }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" align="center" gutterBottom>
          &copy; 2024 IES MONTE NARANCO | Todos los derechos reservados
        </Typography>
      </Grid>
    </Box>
  );
}
