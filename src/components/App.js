import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/system';
import DriverPage from './DriverPage';

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
          <DriverPage />
        </Box>
      </main>
    </ThemeProvider>
  );
};

export default App;
