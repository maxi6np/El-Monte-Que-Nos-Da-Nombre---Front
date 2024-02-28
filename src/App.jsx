import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Registro from "./Registro";
import Inicio from "./inicio";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Cookies, useCookies } from 'react-cookie';
import PersonIcon from "@mui/icons-material/Person";
import Container from "@mui/material/Container";
import ImagenPortada from './img/iesmontenaranco.png';
import AspectRatio from '@mui/joy/AspectRatio';
import MapaPuntos from './MapaPuntos'

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['session']);


  const logout = () => {
    fetch('http://127.0.0.1:8000/logout', { method: 'post', headers: { 'Accept': 'application/json', 'Content-type': 'application/json', 'Authorization': 'Bearer ' + cookies.session.token, 'Access-Control-Allow-Origin': '*' } })
      .then(response => response.json())
      .then(data => {
        removeCookie('session');

      }
      )
  }
  return (
    <>
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar>
            <Container maxWidth='sm' sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '15vh', width: '1em' }}>

              <img src={ImagenPortada} alt="IES MONTE NARANCO" />

            </Container>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              El Monte que nos da el nombre
            </Typography>
            <PersonIcon />
            {cookies.session ? <Button color="inherit" onClick={() => logout()} component={Link} to="/">Logout</Button> : <Button color="inherit" component={Link} to="/login">Login</Button>}
            {!cookies.session && <Button color="inherit" component={Link} to="/registro">
              Registrarse
            </Button>}
          </Toolbar>
        </AppBar>
        <AppBar position="static" className="mb-5">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Inicio
            </Button>
            <Button color="inherit" component={Link} to="/mapa-puntos">
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
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
          <Route path="/mapa-puntos" element={<MapaPuntos />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
