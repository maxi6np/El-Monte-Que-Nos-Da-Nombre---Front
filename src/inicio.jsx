import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const Inicio = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            El Monte que nos da el nombre
          </Typography>
          <PersonIcon/>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/registro">
            Registrarse
          </Button>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Inicio
          </Button>
          <Button color="inherit" component={Link} to="/descubre">
            Descubre
          </Button>
          <Button color="inherit" component={Link} to="/itinerarios">
            Itinerarios
          </Button>
          <Button color="inherit" component={Link} to="/informacion">
            Información del Proyecto
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Lugares que puedes visitar
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Inicio;
