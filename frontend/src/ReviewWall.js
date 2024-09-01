import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Typography, Toolbar } from '@mui/material';
import FloatingCloud from './FloatingCloud';

export default function ReviewWall() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h1" fullWidth />
        </Toolbar>
      </AppBar>
      <Box m={2} pt={3}>
        <FloatingCloud />
      </Box>
    </Box>
  );
}
