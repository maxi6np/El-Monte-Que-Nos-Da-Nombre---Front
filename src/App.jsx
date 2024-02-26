import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@mui/material';



function App() {
  const [nombre, setContraseña] = useState([]);

  return (
    <>
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar className='mb-5' position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                El monte que nos da nombre
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
