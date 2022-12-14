import React from 'react';
import DriverPage from './Drivers/DriverPage';
import DriverDetail from './Drivers/DriverDetail';
import RacesPage from './Races/RacesPage';
import Home from './Home';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/system';

import { Routes, Route, BrowserRouter } from 'react-router-dom';

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
              <Route path="/" element={<Home />}></Route>
              <Route path="/drivers" element={<DriverPage />}></Route>
              <Route path="/drivers/:id" element={<DriverDetail />}></Route>
              <Route path="/races" element={<RacesPage />}></Route>
            </Routes>
          </BrowserRouter>
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default App;
