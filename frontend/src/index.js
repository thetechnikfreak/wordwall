import React from 'react';
import ReactDOM from 'react-dom';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import { ThemeProvider } from '@mui/styles';
import ActivitySelect from "./ActivitySelect";
import theme from "./theme";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ActivitySelect />
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
