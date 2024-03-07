import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./Inicio/Inicio";
import Login from "./Login/Login";
import Registro from "./Registro/Registro";
import PlayfairDisplay from "./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf";
import Descubre from "./Descubre/Descubre";
import { useState, useEffect } from "react";
import Itinerarios from "./Itinerarios/Itinerarios";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Planificar } from './Planificar/Planificar'

const theme = createTheme({
  palette: {
    text: {
      icon: "a",
    },
    primary: {
      main: "#004d40",
      light: "#00897b",
    },
  },
  typography: {
    fontFamily: [
      "Playfair Display",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Playfair Display';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${PlayfairDisplay});
         
        }
      `,
    },
  },
});

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["session"]);
  const [activeButton, setActiveButton] = useState(() => {
    let storedButton = localStorage.getItem('activeButton');
    return storedButton ? storedButton : 'Inicio';
  });

  useEffect(() => {
    localStorage.setItem('activeButton', activeButton);
  }, [activeButton]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setActiveButton(localStorage.getItem('activeButton'));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

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
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio logout={logout} activeButton={activeButton} setActiveButton={setActiveButton} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
          <Route path="/descubre" element={<Descubre logout={logout} activeButton={activeButton} setActiveButton={setActiveButton} />}
          ></Route>
          <Route path="/itinerarios" element={<Itinerarios logout={logout} activeButton={activeButton} setActiveButton={setActiveButton} />}></Route>
          <Route path="/planificar" element={<Planificar logout={logout} activeButton={activeButton} setActiveButton={setActiveButton} />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
