import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import { useCallback, useState, useEffect } from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from '../store/configureStore';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import LoadingComponent from './LoadingComponent';
function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser())
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(()=>setLoading(false))
  }, [initApp])
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
  if(loading) return <LoadingComponent message='loading initial app...'/>
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
