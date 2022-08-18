import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/system';
import DriverPage from './DriverPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    spacing: 10,
  },
});
darkTheme.spacing(2);

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 10,
            pb: 6,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route path="drivers" element={<DriverPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default App;
