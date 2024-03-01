import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Inicio from "./Inicio/Inicio";
import Login from "./Login/Login";
import Registro from "./Registro/Registro";
import PlayfairDisplay from "./assets/fonts/PlayfairDisplay-VariableFont_wght.ttf";
import Descubre from "./Descubre/Descubre";

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
          <Route path="/" element={<Inicio logout={logout} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/registro" element={<Registro />}></Route>
          <Route
            path="/mapa-puntos"
            element={<Descubre logout={logout} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
