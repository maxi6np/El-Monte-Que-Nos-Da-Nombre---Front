import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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
    console.log(cookies.session.email);
    fetch('http://127.0.0.1:8000/logout', { method: 'post', headers: { 'Accept': 'application/json', 'Content-type': 'application/json', body:JSON.stringify({ 'email':cookies.session.email }), 'Access-Control-Allow-Origin': '*', } })
      .then(response => response.json())
      .then(data => {
        removeCookie('session');
        useNavigate('/inicio');
      }
      )
  }
  return (
    <>
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            className="mb-5"
            position="static"
            sx={{ bgcolor: "darkorange" }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                El monte que nos da nombre
              </Typography>
              {cookies.session ? <Button color="inherit" onClick={() => logout()}>Logout</Button> : <Link to='/'> <Button>Login</Button></Link>}
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" element={<Inicio />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
