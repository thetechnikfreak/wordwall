import * as React from 'react';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiFileWordBox } from '@mdi/js';
import { AppBar, Box, Typography, Toolbar } from '@mui/material';
import FloatingCloud from './FloatingCloud';

export default function ReviewWall() {
  const navigate = useNavigate();

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
            <Icon path={mdiFileWordBox} size={1} onClick={() => {navigate("/")}}/>
          </IconButton>
          <Typography variant="h1" fullWidth />
        </Toolbar>
      </AppBar>
      <Box m={2} pt={3}>
        <FloatingCloud wall_id={window.wall_id}/>
      </Box>
    </Box>
  );
}
