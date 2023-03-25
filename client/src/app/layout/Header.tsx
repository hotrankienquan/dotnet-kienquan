import React from 'react'
import { AppBar, Switch, Toolbar, Typography } from '@mui/material';
interface Props {
  darkMode: boolean;
  handleChangeTheme: () => void;
}
const Header = ({darkMode, handleChangeTheme} : Props) => {
  return (
    <AppBar position="static" sx={{mb:4}}>
      <Toolbar>
        <Typography variant='h6'>
          Blog kienquan
        </Typography>
        <Switch checked={darkMode} onChange={handleChangeTheme} />
      </Toolbar>
    </AppBar>
  )
}

export default Header