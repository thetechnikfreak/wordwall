import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar, Box, FormControlLabel, Switch, Tooltip, TextField, Toolbar
} from '@mui/material';

export default function HostWallMenu() {
  const [wallVisible, setWallVisible] = React.useState(false);
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
          <TextField id="wall-name" label="Wall Name" variant="standard" fullWidth />
          <Tooltip title={wallVisible ? "Make wall visible to players." : "Hide wall so players cannot see it."}>
            <FormControlLabel control={
              <Switch checked={wallVisible} onChange={() => {setWallVisible(!wallVisible)}}/>
            } label="Show Wall" />
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
