import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoFinal from './img/logo_final.png';
import AspectRatio from '@mui/joy/AspectRatio';
import { Cookies, useCookies } from 'react-cookie';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const Inicio = ({ logout }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);

  return (
    <div>
      <AppBar position="static">
        <Toolbar sx={{width:'100vw'}}>
          <Grid2 container  sx={{width:'100%'}}>
            <Grid2 xs  display="flex" justifyContent="start" alignItems="center">
              <AspectRatio className='mt-2 mb-2' variant="plain" sx={{ flexBasis: '200px', overflow: "auto", justifySelf: 'start' }}>
                <img src={LogoFinal} alt="IES MONTE NARANCO" />
              </AspectRatio>
            </Grid2>
            <Grid2  xs  display="flex" justifyContent="center" alignItems="center">
              <Typography
                variant="h6"
                component="div"
                sx={{ textAlign: 'center'}}
              >
                El Monte que nos da el nombre
              </Typography>
            </Grid2>
            <Grid2 xs  display="flex" justifyContent="end" alignItems="center">
              <Box component='div'>
                <PersonIcon />
                {cookies.session ? <Button color="inherit" onClick={() => logout()} component={Link} to="/">Logout</Button> : <Button color="inherit" component={Link} to="/login">Login</Button>}
                {!cookies.session && <Button color="inherit" component={Link} to="/registro">
                  Registrarse
                </Button>}
              </Box>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
      <AppBar position="static" className="mb-5">
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
