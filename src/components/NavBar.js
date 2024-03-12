import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const Navbar = () => (
  <AppBar position="static">
    <Container>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          Elevate Health
        </Typography>
        <Button color="inherit" component={RouterLink} to="/login">
          Login
        </Button>
        <Button color="inherit" component={RouterLink} to="/profile">
          Profile
        </Button>
        <Button color="inherit" component={RouterLink} to="/display-goal">
          Goals
        </Button>
        <Button color="inherit" component={RouterLink} to="/recommendation">
          Recommendation
        </Button>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Navbar;

