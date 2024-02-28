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
        
        <Routes>
          <Route path="/" element={<Inicio logout={logout} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
