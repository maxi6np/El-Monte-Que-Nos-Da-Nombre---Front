import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Error from "./Error";

const Registro = () => {
  const [usuario, setUsuario] = useState({});
  const [nombre, setNombre] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confirmarContrasenia, setConfirmarContrasenia] = useState("");
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState();

  const handleRegistrar = (event) => {
    setError(false);
    event.preventDefault();
    if (
      [
        nombre,
        nombreUsuario,
        apellidos,
        email,
        fechaNacimiento,
        contrasenia,
        confirmarContrasenia,
      ].includes("")
    ) {
      setMensaje("Rellene todos los campos");
      setError(true);
    } else if (contrasenia !== confirmarContrasenia) {
      setError(true);
      setMensaje("Las contraseñas no coinciden");
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={10} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Registro de usuario
          </Typography>
          <form>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              margin="normal"
              value={usuario.nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <TextField
              label="Nombre de usuario"
              variant="outlined"
              fullWidth
              margin="normal"
              value={usuario.nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
            <TextField
              label="Apellidos"
              variant="outlined"
              fullWidth
              margin="normal"
              value={usuario.apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={usuario.email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Fecha de Nacimiento"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={usuario.fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              required
            />
            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={usuario.contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
            />
            <TextField
              label="Confirmar contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={usuario.confirmarContrasenia}
              onChange={(e) => setConfirmarContrasenia(e.target.value)}
              required
            />
            {error && <Error>{mensaje}</Error>}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: "20px" }}
              sx={{ bgcolor: "darkorange" }}
              onClick={handleRegistrar}
            >
              Registrarse
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Registro;
