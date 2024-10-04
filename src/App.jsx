// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';

// http://13.127.23.222:3001/
import { baselightTheme } from "src/theme/DefaultColors";
if (typeof global === 'undefined') {
  window.global = window;
}
function App() {
  
  const routing = useRoutes(Router);
  const theme = baselightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
}

export default App