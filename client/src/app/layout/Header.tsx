import React from 'react'
import { AppBar, Badge, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';
interface Props {
  darkMode: boolean;
  handleChangeTheme: () => void;
}
const midLinks = [
  { title: 'post', path: '/post' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' }
]
const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  typography: 'h6',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: 'text.secondary'
  }
}
const Header = ({ darkMode, handleChangeTheme }: Props) => {
  const { user } = useAppSelector(state => state.account);
  // console.log("log user in header.tsx",user)
  return (
    <AppBar position="static" sx={{mb:4}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box display='flex' alignItems='center'>
          <Typography variant="h6" component={NavLink}
              to='/'
              sx={navStyles}
          >
              Blog kienquan
          </Typography>
          <Switch checked={darkMode} onChange={handleChangeTheme} />
        </Box>
        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
              <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
              >
                  {title.toUpperCase()}
              </ListItem>
          ))}

          {
            user && user.roles?.includes('admin') &&
            <ListItem
                component={NavLink}
                to="/adminpage"
                sx={navStyles}
              >
                ADMIN
            </ListItem>
          }
      </List>
      <Box display='flex' alignItems='center'>
          {
            user ? (
            <SignedInMenu />
            ) : (
                
            <List sx={{ display: 'flex' }}>
                {rightLinks.map(({ title, path }) => (
                    <ListItem
                        component={NavLink}
                        to={path}
                        key={path}
                        sx={navStyles}
                    >
                        {title.toUpperCase()}
                    </ListItem>
                ))}
            </List>
            )
          }

      </Box>    
      </Toolbar>
    </AppBar>
  )
}

export default Header