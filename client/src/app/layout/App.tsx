import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import { useState } from 'react';
import Header from './Header';
import Catalog from '../../features/Catalog/Catalog';

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
      <CssBaseline />
      <Header darkMode={ darkMode} handleChangeTheme={handleChangeTheme}/>
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App
