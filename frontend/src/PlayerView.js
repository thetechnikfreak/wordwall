import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Grid, TextField, Typography, Toolbar } from '@mui/material';
import Cookies from 'js-cookie';

function WordElement({word, onChange}) {

  return (
    <>
    <Grid item sx={null} md={3}/>
    <Grid item sx={12} md={6}>
      <TextField
        variant="filled"
        fullWidth
        value={word.word}
        onChange={(e) => {onChange(e.target.value, word.id)}} />
    </Grid>
    <Grid item sx={null} md={3}/>
    </>
  );
}

export default function PlayerView() {
  const client_id = Cookies.get('client_token');
  const [myWords, setMyWords] = React.useState([]);

  React.useEffect(()=>{
    // Load Requisites when page Completes
    getWords();
  },[client_id]);


  const getWords = () => {
    if (client_id === undefined) {
        return;
    }
    // Call the API
    fetch(`/api/v1/words/${window.wall_id}?player_id=${client_id}`)
   .then(response => {
       if (!response.ok) {
          if (response.status === 404) {
            addWord();
            return;
          }
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
      setMyWords(json);
      if (json.length === 0) {
        addWord();
      } else if (json.length > 0) {
        if (json[json.length-1].word !== "") {
            addWord();
        }
      }
   })
   .catch(function () {
       console.error(`Failed to load words for Player: ${client_id}`);
   })
  }


  const addWord = () => {
    // Call the API
    fetch(`/api/v1/words/?player_id=${client_id}`, {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          word: "",
          wall_hash: window.wall_hash,
          player_id: client_id,
        })
    })
    .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
       setMyWords(json);
   })
   .catch(function () {
       console.error(`Failed to create word for player: ${client_id}`)
   })
  }

  const changeWord = (word, id) => {
    let lastWord = myWords[myWords.length - 1];
    if (lastWord !== undefined) {
      if ('id' in lastWord) {
        if (lastWord.id === id && lastWord.word === "") {
            // Adding the first bit of the word -- Add Another Row
            addWord();
        }
      }
    }
    // Call the API
    fetch("/api/v1/words/", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          id: id,
          word: word,
          wall_hash: window.wall_hash,
          player_id: client_id,
        })
    })
    .then(response => {
       if (!response.ok) {
           throw new Error("HTTP error " + response.status);
       }
       return response.json();
   })
   .then(json => {
       setMyWords(json);
   })
   .catch(function () {
       console.error(`Failed to update word for player: ${client_id}`)
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
            <MenuIcon />
          </IconButton>
          <Typography variant="h1" fullWidth />
        </Toolbar>
      </AppBar>
      <Box m={2} pt={3}>
        <Grid container spacing={2}>
          {myWords.map((wordDef, _) => (
            <WordElement word={wordDef} onChange={changeWord}/>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
