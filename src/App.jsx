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

function App() {
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
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/inicio" element={<Inicio></Inicio>}></Route>
          <Route path="/registro" element={<Registro />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
