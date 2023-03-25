import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import { useState } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })
  function handleChangeTheme() {
    setDarkMode(!darkMode);
  }
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme='colored'/>
      <CssBaseline />
      <Header darkMode={ darkMode} handleChangeTheme={handleChangeTheme}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
