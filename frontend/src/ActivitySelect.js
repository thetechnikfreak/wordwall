import React from 'react';
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { formatUnicorn } from "format-unicorn";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Icon from '@mdi/react';
import { mdiAccountGroup, mdiFileWordBox, mdiKnob } from '@mdi/js';

function Copyright() {
  return (
    <div>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href={window.defer_url}>
          {window.site_name}
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Created by the geeks at '}
        <Link color="inherit" href="https://stanleysolutionsnw.com">
          {'Stanley Solutions'}
        </Link>
        {' | Engineering and Creativity Under One Hat.'}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  activity: { height: 100, width: 100 },
}));

const tiers = [
  {
    title: 'Host',
    buttonText: 'Get Started Here',
    buttonVariant: 'outlined',
    icon: mdiKnob,
  },
  {
    title: 'Participate',
    subheader: 'Join In!',
    buttonText: 'Join Your Group',
    buttonVariant: 'contained',
    icon: mdiAccountGroup,
  },
  {
    title: 'Review',
    buttonText: 'See a Completed Wall',
    buttonVariant: 'outlined',
    icon: mdiFileWordBox,
  },
];

const dialogOptions = {
  host: {
    title: "Name your WordWall",
    description: "Give your team a name they can get behind. Then get Collaborating!",
    buttonText: "Start",
    inputPrompt: "New Title",
    inputDefault: "",
    path: "/host/{wall_id}"
  },
  participate: {
    title: "Weigh in with your Words",
    description: "Join your team and start adding words to collaborate!",
    buttonText: "Join",
    inputPrompt: "Game Code",
    inputDefault: "{wall_hash}",
    path: "/play/{userInput}"
  },
  review: {
    title: "Review your Team's WordWall",
    description: "Take a peek at the WordWall your team built!",
    buttonText: "Review",
    inputPrompt: "Game Code",
    inputDefault: "{wall_hash}",
    path: "/review/{userInput}"
  },
};

function ActivityCard({tier, classes, onClick}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Card
      onClick={() => {onClick(tier.title)}}
      onMouseOut={() => setHovered(false)}
      onMouseOver={() => setHovered(true)}
      style={{
          transform: `${hovered ? 'scale(1.1,1.1)' : 'scale(1,1)'}`,
          zIndex: `${hovered ? '999' : '1'}`
      }}
    >
      <CardHeader
        title={tier.title}
        subheader={tier.subheader}
        titleTypographyProps={{ align: 'center' }}
        subheaderTypographyProps={{ align: 'center' }}
        className={classes.cardHeader}
      />
      <CardContent>
        <Grid container justifyContent="center" >
          <Icon path={tier.icon} size={5} />
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant={tier.buttonVariant}
          color="primary"
          onClick={() => {onClick(tier.title)}}
        >
          {tier.buttonText}
        </Button>
      </CardActions>
    </Card>
  );
}

export default function ActivitySelect() {
  const classes = useStyles();
  const [diagOpts, setDiagOpts] = React.useState(null);
  const [userInput, setUserInput] = React.useState("");
  const navigate = useNavigate();

  const prepareDialog = (dialog) => {
    setDiagOpts(dialogOptions[dialog.toLowerCase()])
  }


  const doNavigate = (path) => {
    if (path.includes("host")) {
      // Set the Name
      // Call the API
      fetch(`/api/v1/walls/${window.wall_id}/name`, {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          name: userInput,
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
    // Use the Client-Specific Wall ID or Hash to Navigate
    navigate(path.formatUnicorn({
      wall_id: window.wall_id,
      userInput: userInput,
    }));
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            {window.site_name}
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              href="https://github.com/engineerjoe440/wordwall"
              className={classes.link}
            >
              <Box sx={{ display: 'flex' }}>
                <GitHubIcon />&nbsp;&nbsp;GitHub
              </Box>
            </Link>
          </nav>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          WordWall
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Collaborate with your team to build alignment, focus on goals, and brainstorm
          all with a simple, self-hosted word cloud system with live update!
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={12} sm={6} md={4}>
              <ActivityCard tier={tier} classes={classes} onClick={prepareDialog}/>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
      {/* End footer */}
      {/* Dialog */}
      <Dialog
        open={diagOpts !== null}
        onClose={() => {setDiagOpts(null)}}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle id="dialog-title" textAlign="center">
          {!!diagOpts && diagOpts.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-description" textAlign="center">
          {!!diagOpts && diagOpts.description}
          </DialogContentText>
          <TextField
            id="user-input"
            label={!!diagOpts ? diagOpts.inputPrompt : ""}
            variant="standard"
            defaultValue={
              (!!diagOpts ? diagOpts.inputDefault : "").formatUnicorn({
                wall_hash: window.wall_hash,
              })
            }
            fullWidth
            onChange={(e) => {setUserInput(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setDiagOpts(null)}}>Cancel</Button>
          <Button onClick={() => {doNavigate(diagOpts.path)}} autoFocus>
            {!!diagOpts && diagOpts.buttonText}
          </Button>
        </DialogActions>
      </Dialog>
      {/* End dialog */}
    </React.Fragment>
  );
}
