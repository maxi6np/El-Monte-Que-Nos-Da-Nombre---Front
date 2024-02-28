import AppBar from "@mui/material/AppBar";
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
  const [cookies, removeCookie] = useCookies(["session"]);

  const logout = () => {
    fetch("http://127.0.0.1:8000/logout", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + cookies.session.token,
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        removeCookie("session");
      });
  };
  return (
    <>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Inicio logout={logout} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
          <Route path="/mapa-puntos" element={<MapaPuntos />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
