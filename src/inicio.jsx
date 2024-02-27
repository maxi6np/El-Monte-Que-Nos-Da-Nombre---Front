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
