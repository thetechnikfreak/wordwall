import { createTheme } from "@mui/material";


const theme = createTheme({
    palette: {
       primary: {
         main: '#015C68',
         text: '#FFFFFF',
       },
       secondary: {
         main: '#015C68',
         alt: '#d7f3ff',
         altTable: "#eaebea",
         text: '#d7f3ff',
       },
       background: {
          default: '#d7f3ff',
          paper: '#015C68',
        },
    },
});

export default theme;
