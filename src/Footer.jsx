import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";
import astur from "./img/astur.png";
import educa from "./img/educa.png";
import ies from "./img/ies.png";

function Footer() {
  return (
    <Grid container spacing={2} sx={{ paddingTop: 2 }}>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{
          backgroundColor: "#015d52",
          py: 4,
          color: "white",
          paddingLeft: 9,
        }}
      >
        <Grid container alignItems="center">
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            textAlign={{
              xs: "center",
              md: "center",
              lg: "left",
              paddingLeft: 60,
              paddingTop: 20,
            }}
          >
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
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            textAlign={{
              xs: "center",
              md: "right",
              lg: "right",
              paddingLeft: 60,
              paddingTop: 10,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "40px",
                height: "3.6rem",
                marginTop: "1rem",
              }}
            >
              <img
                src={ies}
                alt="IES MONTE NARANCO"
                style={{
                  width: "15%",
                  marginRight: "3rem",
                }}
              />
              <img
                src={educa}
                alt="IES MONTE NARANCO"
                style={{ width: "20%", marginRight: "3rem" }}
              />
              <img
                src={astur}
                alt="IES MONTE NARANCO"
                style={{ width: "20%", marginRight: "2rem" }}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <Typography
            variant="body1"
            align="center"
            style={{ marginTop: "1rem" }}
            gutterBottom
          >
            &copy; 2024 IES MONTE NARANCO | Todos los derechos reservados
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
