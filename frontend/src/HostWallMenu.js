import * as React from 'react';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiFileWordBox } from '@mdi/js';
import {
  AppBar, Box, Button, FormControlLabel, Grid, Stack, Switch, Tooltip,
  TextField, Toolbar
} from '@mui/material';
import FloatingCloud from './FloatingCloud';
import QrCode from './QrCode';

export default function HostWallMenu() {
  const [wallVisibleForPlayers, setWallVisibleForPlayers] = React.useState(false);
  const [viewWall, setViewWall] = React.useState(true);
  const [wordCount, setWordCount] = React.useState(0);
  const [wallName, setWallNames] = React.useState("");
  const [enabledStatus, setEnabledStatus] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(()=>{
    // Load Requisites when page Completes
    getWordCount();
    // Call the API
    fetch(`/api/v1/walls/${window.wall_id}/name`)
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
    setWallNames(json);
   })
   .catch(function () {
       console.error(`Failed to load wall name for ${window.wall_id}`)
   })
   fetch(`/api/v1/walls/${window.wall_id}/enabled`)
  .then(response => {
      if (!response.ok) {
          throw new Error("HTTP error " + response.status);
      }
      return response.json();
  })
  .then(json => {
   setEnabledStatus(json);
  })
  .catch(function () {
      console.error(`Failed to load word count for ${window.wall_id}`)
  })
    setInterval(getWordCount, 1000);
  },[]);

  const getWordCount = () => {
    // Call the API
    fetch(`/api/v1/words/${window.wall_id}/count`)
   .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
    setWordCount(json);
   })
   .catch(function () {
       console.error(`Failed to load word count for ${window.wall_id}`)
   })
  }

  const updateTitle = (newName) => {
    // Call the API
    fetch(`/api/v1/walls/${window.wall_id}/name`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
          name: newName,
        })
    })
    .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
   })
   .catch(function () {
       console.error(`Failed to update the name for wall: ${window.wall_id}`)
   })
  }

  const updateEnabledStatus = () => {
    // Call the API
    fetch(`/api/v1/walls/${window.wall_id}/enabled`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        //make sure to serialize your JSON body
        body: JSON.stringify({
          enable: !enabledStatus,
        })
    })
    .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       } else {
        setEnabledStatus(!enabledStatus);
       }
   })
   .catch(function () {
       console.error(`Failed to update the name for wall: ${window.wall_id}`)
   })
  }

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
          <TextField
            id="wall-name"
            label="Wall Name"
            variant="standard"
            value={wallName}
            fullWidth
            onChange={(e) => {updateTitle(e.target.value)}}
          />
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
                <Grid item md={2} sx={12}>
                  <Button
                    variant="contained"
                    md={4} xs={12}
                    onClick={() => {setViewWall(!viewWall)}}
                  >
                    {viewWall ? "Hide Wall View" : "Show Wall View"}
                  </Button>
                </Grid>
                <Grid item md={1} sx={null}></Grid>
                <Grid item md={2} sx={12}>
                  Responses:
                  {wordCount}
                </Grid>
                <Grid item md={1} sx={null}></Grid>
                <Grid item md={2} sx={12}>
                  <Button
                    variant="contained"
                    md={4} xs={12}
                    onClick={updateEnabledStatus}
                  >
                    {enabledStatus ? "Disable Wall" : "Enable Wall"}
                  </Button>
                </Grid>
                <Grid item md={2} sx={null}></Grid>
              </Grid>
              {viewWall &&
                <FloatingCloud
                  wall_id={window.wall_id}
                  onClick={() => {
                    navigate(`/review/${window.wall_hash}`)
                  }}
                />
              }
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
