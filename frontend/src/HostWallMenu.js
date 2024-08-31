import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar, Box, Button, FormControlLabel, Grid, Stack, Switch, Tooltip,
  TextField, Toolbar
} from '@mui/material';
import FloatingCloud from './FloatingCloud';
import QrCode from './QrCode';

export default function HostWallMenu() {
  const [wallVisibleForPlayers, setWallVisibleForPlayers] = React.useState(false);
  const [viewWall, setViewWall] = React.useState(true);

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
          <Tooltip title={wallVisibleForPlayers ? "Make wall visible to players." : "Hide wall so players cannot see it."}>
            <FormControlLabel control={
              <Switch disabled checked={wallVisibleForPlayers} onChange={() => {setWallVisibleForPlayers(!wallVisibleForPlayers)}}/>
            } label="Show Players" />
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box m={2} pt={3}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <QrCode />
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack spacing={2}>
              <Grid container
                alignItems="center"
                justify="center"
                spacing={2}
              >
                <Grid item md={2} sx={null}></Grid>
                <Grid item md={3} sx={12}>
                  <Button
                    variant="contained"
                    md={4} xs={12}
                    onClick={() => {setViewWall(!viewWall)}}
                  >
                    {viewWall ? "Hide Wall View" : "Show Wall View"}
                  </Button>
                </Grid>
                <Grid item md={2} sx={null}></Grid>
                <Grid item md={3} sx={12}>
                  Responses: 123
                </Grid>
                <Grid item md={2} sx={null}></Grid>
              </Grid>
              {viewWall && <FloatingCloud />}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
