import * as React from 'react';
import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Icon from '@mdi/react';
import { mdiFileWordBox, mdiPresentation } from '@mdi/js';
import { AppBar, Box, Typography, Toolbar, Container, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TagCloud } from 'react-tagcloud';
import logo from './logo.png';

const PresentationContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',
  background: theme.palette.secondary.alt,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  position: 'relative',
}));

const WordCloudPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  backgroundColor: '#FFFFFF',
  color: theme.palette.primary.main,
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(1, 92, 104, 0.2)',
  minHeight: '70vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
}));

const TitleBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  textAlign: 'center',
}));

const CloudContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const LogoCorner = styled('img')(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  height: '80px',
  opacity: 0.8,
  transition: 'opacity 0.3s ease',
  '&:hover': {
    opacity: 1,
  },
}));

export default function PresentWall() {
  const navigate = useNavigate();
  const [words, setWords] = React.useState([]);

  React.useEffect(() => {
    const getWords = () => {
      fetch(`/api/v1/words/${window.wall_id}`)
        .then(response => {
          if (!response.ok) {
            if (String(response.status) === "404") {
              window.location.href = "/";
              throw new Error("HTTP error " + response.status);
            }
          }
          return response.json();
        })
        .then(json => {
          setWords(json);
        })
        .catch(function () {
          console.error(`Failed to load words for ${window.wall_id}`);
        });
    };
    
    getWords();
    const interval = setInterval(getWords, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const customRenderer = (tag, size, color) => (
    <span
      key={tag.value}
      style={{
        animation: 'fadeIn 0.5s',
        animationFillMode: 'forwards',
        display: 'inline-block',
        padding: '8px 12px',
        margin: '8px',
        fontSize: `${size}px`,
        color: '#015C68',
        fontWeight: size > 40 ? 'bold' : 'normal',
        textShadow: '1px 1px 2px rgba(1, 92, 104, 0.1)',
      }}
    >
      {tag.value}
    </span>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            sx={{ 
              mr: 2,
              color: 'primary.text',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }
            }}
            onClick={() => { navigate("/") }}
            aria-label="home"
          >
            <Icon path={mdiFileWordBox} size={1} />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Icon path={mdiPresentation} size={1} color="#d7f3ff" />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                ml: 2,
                color: 'primary.text',
                fontWeight: 600,
              }}
            >
              Präsentation
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      
      <PresentationContainer>
        <Container maxWidth="lg">
          <WordCloudPaper elevation={12}>
            <TitleBox>
              <Typography 
                variant="h3" 
                component="h1"
                sx={{ 
                  color: 'primary.main',
                  fontWeight: 700,
                  textShadow: '2px 2px 4px rgba(1, 92, 104, 0.1)',
                }}
              >
                Word Wall
              </Typography>
              <Typography 
                variant="subtitle1"
                sx={{ 
                  color: 'primary.main',
                  mt: 1,
                  opacity: 0.8,
                }}
              >
                Live-Wörter-Cloud
              </Typography>
            </TitleBox>
            
            <CloudContainer>
              {words.length > 0 ? (
                <TagCloud
                  minSize={24}
                  maxSize={72}
                  tags={words}
                  renderer={customRenderer}
                />
              ) : (
                <Typography 
                  variant="h5"
                  sx={{ 
                    color: 'primary.main',
                    opacity: 0.6,
                  }}
                >
                  Warte auf Wörter...
                </Typography>
              )}
            </CloudContainer>
            
            <LogoCorner src={logo} alt="Konfi to Go Logo" />
          </WordCloudPaper>
        </Container>
      </PresentationContainer>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </Box>
  );
}
